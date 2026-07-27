import { createHmac, randomBytes } from "crypto";
import { cookies } from "next/headers";

const CSRF_SECRET = process.env.NEXTAUTH_SECRET || "";
const SESSION_COOKIE = "rl_session";

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
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return sessionId;
}

export async function generateCsrfToken(): Promise<string> {
  const sessionId = await ensureSessionId();
  const token = randomBytes(32).toString("hex");
  const signature = createHmac("sha256", CSRF_SECRET)
    .update(`${token}.${sessionId}`)
    .digest("hex");
  return `${token}.${signature}`;
}

export async function validateCsrfToken(token: string): Promise<boolean> {
  const store = await cookies();
  const sessionId = store.get(SESSION_COOKIE)?.value || "";

  const [originalToken, signature] = token.split(".");
  if (!originalToken || !signature) return false;

  const expectedSignature = createHmac("sha256", CSRF_SECRET)
    .update(`${originalToken}.${sessionId}`)
    .digest("hex");

  return signature === expectedSignature;
}
