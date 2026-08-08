import { NextRequest, NextResponse } from "next/server";
import { getPaymentProviderByName, getAvailableProviders, type PaymentProviderName } from "@/lib/payments";
import { prisma } from "@/lib/prisma";
import { donationSchema } from "@/lib/validation";
import { auth } from "@/lib/auth";
import { rateLimit, getRateLimitKey, getClientIp, RATE_LIMITS } from "@/lib/rate-limit";
import { validateCsrfToken } from "@/lib/csrf";
import { logger } from "@/lib/logger";

const APP_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export async function POST(req: NextRequest) {
  const csrfToken = req.headers.get("x-csrf-token");
  if (!csrfToken || !(await validateCsrfToken(csrfToken))) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  const key = getRateLimitKey(req);
  const rl = await rateLimit(`donation:${key}`, RATE_LIMITS.donation.limit, RATE_LIMITS.donation.windowMs);

  if (!rl.allowed) {
    logger.security("Rate limit exceeded: donation", { ip: getClientIp(req) });
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)), "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  }

  try {
    if (!req.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
    }

    const contentLength = Number(req.headers.get("content-length") || 0);
    if (contentLength > 65536) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    const session = await auth();
    const body = await req.json();

    const providerName = (body.provider as PaymentProviderName) || "stripe";

    const availableProviders = getAvailableProviders();
    if (!availableProviders.includes(providerName)) {
      return NextResponse.json(
        { error: "Invalid payment provider" },
        { status: 400, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
      );
    }

    const parsed = donationSchema.safeParse({
      amount: body.amount,
      type: body.type,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid donation details" },
        { status: 400, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
      );
    }

    const { amount, type } = parsed.data;
    const provider = getPaymentProviderByName(providerName);

    const checkoutResult = await provider.createCheckout({
      amount,
      currency: "usd",
      type,
      description: "Donation to Global Approach To Development",
      metadata: {
        userId: session?.user?.id || "anonymous",
        type,
      },
      successUrl: `${APP_URL}/donate/success?provider=${provider.name}`,
      cancelUrl: `${APP_URL}/donate`,
    });

    await prisma.donation.create({
      data: {
        amount: amount / 100,
        type: type as "ONE_TIME" | "MONTHLY",
        status: "PENDING",
        provider: provider.name,
        providerSessionId: checkoutResult.providerSessionId,
        userId: session?.user?.id || null,
      },
    });

    logger.info("Donation session created", {
      provider: provider.name,
      sessionId: checkoutResult.providerSessionId,
      amount: amount / 100,
      type,
      userId: session?.user?.id || "anonymous",
    });

    return NextResponse.json(
      { url: checkoutResult.url, provider: provider.name },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  } catch (error) {
    logger.error("Donation error", { error: error instanceof Error ? error.message : "Unknown" });
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  }
}
