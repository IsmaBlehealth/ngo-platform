import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { passwordSchema } from "@/lib/validation";
import { validateCsrfToken } from "@/lib/csrf";
import { logger } from "@/lib/logger";
import { rateLimit, getRateLimitKey, RATE_LIMITS } from "@/lib/rate-limit";
import { revokeAllSessions } from "@/lib/session-revocation";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
  const csrfToken = req.headers.get("x-csrf-token");
  if (!csrfToken || !(await validateCsrfToken(csrfToken))) {
    return NextResponse.json({ error: "Invalid request" }, { status: 403 });
  }

  const key = getRateLimitKey(req);
  const rl = await rateLimit(`password-change:${key}`, RATE_LIMITS.passwordChange.limit, RATE_LIMITS.passwordChange.windowMs);

  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
  }

  const contentLength = Number(req.headers.get("content-length") || 0);
  if (contentLength > 65536) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword || typeof currentPassword !== "string" || typeof newPassword !== "string") {
      return NextResponse.json({ error: "Both passwords are required" }, { status: 400 });
    }

    if (currentPassword.length > 512) {
      return NextResponse.json({ error: "Current password is too long" }, { status: 400 });
    }

    const passwordCheck = passwordSchema.safeParse(newPassword);
    if (!passwordCheck.success) {
      return NextResponse.json({ error: "New password does not meet security requirements" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user?.passwordHash) {
      return NextResponse.json({ error: "No password set" }, { status: 400 });
    }

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await prisma.$transaction([
      prisma.user.update({
        where: { id: session.user.id },
        data: { passwordHash },
      }),
      prisma.session.deleteMany({
        where: { userId: session.user.id },
      }),
    ]);

    // Invalidate all outstanding JWTs for this user.
    await revokeAllSessions(session.user.id);

    logger.info("Password changed — sessions invalidated", { userId: session.user.id });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Password change error", { error: error instanceof Error ? error.message : "Unknown" });
    return NextResponse.json({ error: "Failed to change password" }, { status: 500 });
  }
}
