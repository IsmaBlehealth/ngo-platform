import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emailSchema } from "@/lib/validation";
import { rateLimit, getRateLimitKey, getClientIp, RATE_LIMITS } from "@/lib/rate-limit";
import { validateCsrfToken } from "@/lib/csrf";
import { logger } from "@/lib/logger";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const csrfToken = req.headers.get("x-csrf-token");
  if (!csrfToken || !(await validateCsrfToken(csrfToken))) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  const key = getRateLimitKey(req);
  const rl = rateLimit(`forgot-password:${key}`, 3, 300_000);

  if (!rl.allowed) {
    logger.security("Rate limit exceeded: forgot-password", { ip: getClientIp(req) });
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const body = await req.json();
    const parsed = emailSchema.safeParse(body.email);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const email = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const rawToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

      await prisma.passwordResetToken.create({
        data: {
          token: hashedToken,
          userId: user.id,
          expires: new Date(Date.now() + 60 * 60 * 1000),
        },
      });

      logger.info("Password reset token generated", { userId: user.id, email });
    } else {
      logger.info("Password reset requested for non-existent email", { email });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Forgot password error", { error: String(error) });
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
