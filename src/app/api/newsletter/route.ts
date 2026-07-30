import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emailSchema } from "@/lib/validation";
import { rateLimit, getRateLimitKey } from "@/lib/rate-limit";
import { validateCsrfToken } from "@/lib/csrf";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const csrfToken = req.headers.get("x-csrf-token");
  if (!csrfToken || !(await validateCsrfToken(csrfToken))) {
    return NextResponse.json({ error: "Invalid request" }, { status: 403 });
  }

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
  }

  const body = await req.json();

  if (body.website) {
    return NextResponse.json({ success: true });
  }

  const key = getRateLimitKey(req);
  const rl = rateLimit(`newsletter:${key}`, 3, 60_000);

  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
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
    logger.error("Newsletter subscription error", { error: error instanceof Error ? error.message : "Unknown" });
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const csrfToken = req.headers.get("x-csrf-token");
  if (!csrfToken || !(await validateCsrfToken(csrfToken))) {
    return NextResponse.json({ error: "Invalid request" }, { status: 403 });
  }

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
  }

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
    logger.error("Newsletter unsubscribe error", { error: error instanceof Error ? error.message : "Unknown" });
    return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 });
  }
}
