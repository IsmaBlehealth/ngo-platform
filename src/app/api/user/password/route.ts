import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { passwordSchema } from "@/lib/validation";
import { logger } from "@/lib/logger";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Both passwords are required" }, { status: 400 });
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
    await prisma.user.update({
      where: { id: session.user.id },
      data: { passwordHash },
    });

    logger.info("Password changed", { userId: session.user.id });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Password change error", { error: String(error) });
    return NextResponse.json({ error: "Failed to change password" }, { status: 500 });
  }
}
