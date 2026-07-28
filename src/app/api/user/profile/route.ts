import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { nameSchema } from "@/lib/validation";
import { logger } from "@/lib/logger";

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const firstNameCheck = nameSchema.safeParse(body.firstName);
    const lastNameCheck = nameSchema.safeParse(body.lastName);

    if (!firstNameCheck.success || !lastNameCheck.success) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        firstName: firstNameCheck.data,
        lastName: lastNameCheck.data,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Profile update error", { error: String(error) });
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}