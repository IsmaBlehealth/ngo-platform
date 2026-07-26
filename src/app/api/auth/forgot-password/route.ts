import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emailSchema } from "@/lib/validation";
import { logger } from "@/lib/logger";
import crypto from "crypto";

export async function POST(req: NextRequest) {
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
          expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
        },
      });

      logger.info("Password reset token generated", { userId: user.id, email });
      console.log(`[DEV] Password reset token for ${email}: ${rawToken}`);
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
