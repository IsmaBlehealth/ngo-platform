import { NextRequest, NextResponse } from "next/server";
import { stripeProvider } from "@/lib/payments/stripe";
import { prisma } from "@/lib/prisma";
import { rateLimit, getRateLimitKey, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const key = getRateLimitKey(req);
  const rl = rateLimit(`webhook:stripe:${key}`, RATE_LIMITS.webhook.limit, RATE_LIMITS.webhook.windowMs);

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
    "stripe-signature": req.headers.get("stripe-signature"),
  };

  const isValid = await stripeProvider.verifyWebhook(body, headers);
  if (!isValid) {
    logger.security("Stripe webhook signature verification failed", { key });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const result = await stripeProvider.parseWebhook(body, headers);

  // Extract event ID from body for idempotent logging
  let eventId = `stripe-${Date.now()}`;
  try {
    const parsed = JSON.parse(body);
    if (parsed.id) eventId = parsed.id;
  } catch { /* use fallback */ }

  // Idempotent event logging
  try {
    await prisma.webhookEvent.create({
      data: {
        provider: "stripe",
        providerEventId: eventId,
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
        if (result.providerSessionId) {
          await prisma.donation.updateMany({
            where: { providerSessionId: result.providerSessionId },
            data: {
              status: "COMPLETED",
              providerPaymentId: result.providerPaymentId || undefined,
            },
          });
        }
        logger.info("Stripe donation completed", { ...result });
        break;
      }
      case "donation.failed": {
        if (result.providerPaymentId) {
          await prisma.donation.updateMany({
            where: { providerPaymentId: result.providerPaymentId },
            data: { status: "FAILED" },
          });
        }
        logger.warn("Stripe payment failed", { ...result });
        break;
      }
      case "donation.refunded": {
        if (result.providerPaymentId) {
          await prisma.donation.updateMany({
            where: { providerPaymentId: result.providerPaymentId },
            data: { status: "REFUNDED" },
          });
        }
        logger.info("Stripe payment refunded", { ...result });
        break;
      }
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error(`Error processing Stripe webhook: ${result.type}`, { error: String(error) });
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
