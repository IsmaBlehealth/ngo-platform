import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "rl_session";

function getCsrfSecret(): string {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is required for CSRF protection");
  }
  return secret;
}

function generateSessionId(): string {
  return randomBytes(16).toString("hex");
}

async function ensureSessionId(): Promise<string> {
  const store = await cookies();
  let sessionId = store.get(SESSION_COOKIE)?.value || "";
  if (!sessionId) {
    sessionId = generateSessionId();
    store.set(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }
  return sessionId;
}

export async function generateCsrfToken(): Promise<string> {
  const sessionId = await ensureSessionId();
  const token = randomBytes(32).toString("hex");
  const signature = createHmac("sha256", getCsrfSecret())
    .update(`${token}.${sessionId}`)
    .digest("hex");
  return `${token}.${signature}`;
}

export async function validateCsrfToken(token: string): Promise<boolean> {
  const store = await cookies();
  const sessionId = store.get(SESSION_COOKIE)?.value || "";

  const [originalToken, signature] = token.split(".");
  if (!originalToken || !signature) return false;

  const expectedSignature = createHmac("sha256", getCsrfSecret())
    .update(`${originalToken}.${sessionId}`)
    .digest("hex");

  try {
    return timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}
