import { createHmac, randomBytes } from "crypto";

const CSRF_SECRET = process.env.NEXTAUTH_SECRET || "";

export function generateCsrfToken(): string {
  const token = randomBytes(32).toString("hex");
  const signature = createHmac("sha256", CSRF_SECRET)
    .update(token)
    .digest("hex");
  return `${token}.${signature}`;
}

export function validateCsrfToken(token: string): boolean {
  const [originalToken, signature] = token.split(".");
  if (!originalToken || !signature) return false;
  const expectedSignature = createHmac("sha256", CSRF_SECRET)
    .update(originalToken)
    .digest("hex");
  return signature === expectedSignature;
}
