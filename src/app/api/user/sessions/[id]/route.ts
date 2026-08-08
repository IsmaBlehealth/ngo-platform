import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { validateCsrfToken } from "@/lib/csrf";
import { logger } from "@/lib/logger";
import { rateLimit, getRateLimitKey, RATE_LIMITS } from "@/lib/rate-limit";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const csrfToken = req.headers.get("x-csrf-token");
  if (!csrfToken || !(await validateCsrfToken(csrfToken))) {
    return NextResponse.json({ error: "Invalid request" }, { status: 403 });
  }

  const key = getRateLimitKey(req);
  const rl = await rateLimit(`sessions-delete:${key}`, RATE_LIMITS.sessions.limit, RATE_LIMITS.sessions.windowMs);

  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const targetSession = await prisma.session.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!targetSession || targetSession.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.session.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Failed to delete session", { error: error instanceof Error ? error.message : "Unknown" });
    return NextResponse.json({ error: "Failed to delete session" }, { status: 500 });
  }
}
