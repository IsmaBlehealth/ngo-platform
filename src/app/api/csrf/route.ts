import { NextResponse } from "next/server";
import { generateCsrfToken } from "@/lib/csrf";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const token = await generateCsrfToken();
    return NextResponse.json(
      { csrfToken: token },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    logger.error("CSRF token generation failed", { error: error instanceof Error ? error.message : "Unknown" });
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
