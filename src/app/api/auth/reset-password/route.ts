import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateCsrfToken } from "@/lib/csrf";
import { passwordSchema } from "@/lib/validation";
import { rateLimit, getRateLimitKey, getClientIp } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const csrfToken = req.headers.get("x-csrf-token");
  if (!csrfToken || !(await validateCsrfToken(csrfToken))) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  const key = getRateLimitKey(req);
  const rl = rateLimit(`reset-password:${key}`, 5, 300_000);

  if (!rl.allowed) {
    logger.security("Rate limit exceeded: reset-password", { ip: getClientIp(req) });
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (contentLength > 65536) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    const body = await req.json();
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    const passwordCheck = passwordSchema.safeParse(password);
    if (!passwordCheck.success) {
      return NextResponse.json(
        { error: "Password does not meet security requirements" },
        { status: 400 }
      );
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token: hashedToken },
    });

    if (!resetToken || resetToken.used || resetToken.expires < new Date()) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash },
      }),
      prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { used: true },
      }),
    ]);

    logger.info("Password reset completed", { userId: resetToken.userId });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Reset password error", { error: String(error) });
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
