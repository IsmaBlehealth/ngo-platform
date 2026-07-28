import { NextRequest, NextResponse } from "next/server";
import { paypalProvider } from "@/lib/payments/paypal";
import { prisma } from "@/lib/prisma";
import { rateLimit, getRateLimitKey, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const key = getRateLimitKey(req);
  const rl = rateLimit(`webhook:paypal:${key}`, RATE_LIMITS.webhook.limit, RATE_LIMITS.webhook.windowMs);

  if (!rl.allowed) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const contentLength = Number(req.headers.get("content-length") || 0);
  if (contentLength > 1_048_576) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  const body = await req.text();
  if (body.length > 1_048_576) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }
  const headers: Record<string, string | null> = {
    "paypal-transmission-id": req.headers.get("paypal-transmission-id"),
    "paypal-cert-id": req.headers.get("paypal-cert-id"),
    "paypal-transmission-sig": req.headers.get("paypal-transmission-sig"),
    "paypal-transmission-time": req.headers.get("paypal-transmission-time"),
    "paypal-auth-algo": req.headers.get("paypal-auth-algo"),
  };

  const isValid = await paypalProvider.verifyWebhook(body, headers);
  if (!isValid) {
    logger.security("PayPal webhook signature verification failed", { key });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const result = await paypalProvider.parseWebhook(body, headers);

  // Idempotent event logging
  const eventBody = JSON.parse(body);
  try {
    await prisma.webhookEvent.create({
      data: {
        provider: "paypal",
        providerEventId: eventBody.id || `paypal-${Date.now()}`,
        type: result.type,
      },
    });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return NextResponse.json({ received: true });
    }
    throw error;
  }

  try {
    switch (result.type) {
      case "donation.completed": {
        if (result.providerPaymentId) {
          // PayPal: try to match by providerPaymentId or providerSessionId
          const updated = await prisma.donation.updateMany({
            where: {
              OR: [
                { providerPaymentId: result.providerPaymentId },
                { providerSessionId: result.providerSessionId || "" },
              ],
              provider: "paypal",
            },
            data: {
              status: "COMPLETED",
              providerPaymentId: result.providerPaymentId,
            },
          });
          if (updated.count === 0) {
            logger.warn("PayPal donation completed but no matching record found", { ...result });
          }
        }
        logger.info("PayPal donation completed", { ...result });
        break;
      }
      case "donation.failed": {
        if (result.providerPaymentId) {
          await prisma.donation.updateMany({
            where: { providerPaymentId: result.providerPaymentId, provider: "paypal" },
            data: { status: "FAILED" },
          });
        }
        logger.warn("PayPal payment failed", { ...result });
        break;
      }
      case "donation.refunded": {
        if (result.providerPaymentId) {
          await prisma.donation.updateMany({
            where: { providerPaymentId: result.providerPaymentId, provider: "paypal" },
            data: { status: "REFUNDED" },
          });
        }
        logger.info("PayPal payment refunded", { ...result });
        break;
      }
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error(`Error processing PayPal webhook: ${result.type}`, { error: String(error) });
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
