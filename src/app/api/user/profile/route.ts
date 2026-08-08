import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { nameSchema } from "@/lib/validation";
import { validateCsrfToken } from "@/lib/csrf";
import { logger } from "@/lib/logger";
import { rateLimit, getRateLimitKey, RATE_LIMITS } from "@/lib/rate-limit";

export async function PATCH(req: NextRequest) {
  const csrfToken = req.headers.get("x-csrf-token");
  if (!csrfToken || !(await validateCsrfToken(csrfToken))) {
    return NextResponse.json({ error: "Invalid request" }, { status: 403 });
  }

  const key = getRateLimitKey(req);
  const rl = await rateLimit(`profile:${key}`, RATE_LIMITS.profileUpdate.limit, RATE_LIMITS.profileUpdate.windowMs);

  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
  }

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
    logger.error("Profile update error", { error: error instanceof Error ? error.message : "Unknown" });
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}