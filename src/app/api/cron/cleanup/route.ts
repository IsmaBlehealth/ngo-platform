import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();

    const expiredTokens = await prisma.passwordResetToken.deleteMany({
      where: {
        OR: [
          { expires: { lt: now } },
          { used: true, createdAt: { lt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) } },
        ],
      },
    });

    const oldSessions = await prisma.session.deleteMany({
      where: {
        expires: { lt: now },
      },
    });

    const oldWebhookEvents = await prisma.webhookEvent.deleteMany({
      where: {
        processedAt: { lt: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000) },
      },
    });

    logger.info("Cron cleanup completed", {
      expiredTokens: expiredTokens.count,
      oldSessions: oldSessions.count,
      oldWebhookEvents: oldWebhookEvents.count,
    });

    return NextResponse.json({
      success: true,
      cleaned: {
        passwordResetTokens: expiredTokens.count,
        sessions: oldSessions.count,
        webhookEvents: oldWebhookEvents.count,
      },
    });
  } catch (error) {
    logger.error("Cron cleanup failed", { error: error instanceof Error ? error.message : "Unknown" });
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}
