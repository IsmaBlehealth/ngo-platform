import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessions = await prisma.session.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        expires: true,
      },
      orderBy: { expires: "desc" },
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    logger.error("Failed to fetch sessions", { error: error instanceof Error ? error.message : "Unknown" });
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}
