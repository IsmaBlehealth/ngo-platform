import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emailSchema } from "@/lib/validation";
import { rateLimit, getRateLimitKey, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const key = getRateLimitKey(req);
  const rl = rateLimit(`newsletter:${key}`, 3, 60_000);

  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = emailSchema.safeParse(body.email);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const email = parsed.data;

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json({ message: "Already subscribed" });
      }
      await prisma.newsletterSubscriber.update({
        where: { email },
        data: { isActive: true },
      });
    } else {
      await prisma.newsletterSubscriber.create({
        data: { email },
      });
    }

    logger.info("Newsletter subscription", { email });

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    logger.error("Newsletter subscription error", { error: String(error) });
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = emailSchema.safeParse(body.email);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await prisma.newsletterSubscriber.update({
      where: { email: parsed.data },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true, message: "Unsubscribed successfully" });
  } catch (error) {
    logger.error("Newsletter unsubscribe error", { error: String(error) });
    return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 });
  }
}
