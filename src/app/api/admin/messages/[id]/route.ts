import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    logger.error("Failed to update message", { error: String(error) });
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.contactMessage.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Failed to delete message", { error: String(error) });
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
