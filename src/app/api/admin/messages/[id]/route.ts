import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { validateCsrfToken } from "@/lib/csrf";
import { logger } from "@/lib/logger";
import { rateLimit, getRateLimitKey, RATE_LIMITS } from "@/lib/rate-limit";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const csrfToken = req.headers.get("x-csrf-token");
  if (!csrfToken || !(await validateCsrfToken(csrfToken))) {
    return NextResponse.json({ error: "Invalid request" }, { status: 403 });
  }

  const key = getRateLimitKey(req);
  const rl = await rateLimit(`admin:${key}`, RATE_LIMITS.admin.limit, RATE_LIMITS.admin.windowMs);

  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
  }

  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    if (typeof body.isRead !== "boolean") {
      return NextResponse.json({ error: "isRead must be boolean" }, { status: 400 });
    }

    await prisma.contactMessage.update({
      where: { id },
      data: { isRead: body.isRead },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Failed to update message", { error: error instanceof Error ? error.message : "Unknown" });
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const csrfToken = req.headers.get("x-csrf-token");
  if (!csrfToken || !(await validateCsrfToken(csrfToken))) {
    return NextResponse.json({ error: "Invalid request" }, { status: 403 });
  }

  const key = getRateLimitKey(req);
  const rl = await rateLimit(`admin-delete:${key}`, RATE_LIMITS.admin.limit, RATE_LIMITS.admin.windowMs);

  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.contactMessage.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Failed to delete message", { error: error instanceof Error ? error.message : "Unknown" });
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
