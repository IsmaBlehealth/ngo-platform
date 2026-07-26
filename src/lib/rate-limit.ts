const requests = new Map<string, { count: number; resetAt: number }>();

const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, value] of requests) {
    if (value.resetAt < now) requests.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  cleanup();

  const now = Date.now();
  const entry = requests.get(key);

  if (!entry || entry.resetAt < now) {
    requests.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: limit - entry.count,
    resetAt: entry.resetAt,
  };
}

function getIpFromRequest(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "127.0.0.1";
}

export function getClientIp(request: Request): string {
  return getIpFromRequest(request);
}

function getSessionCookieId(request: Request): string {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/rl_session=([^;]+)/);
  return match ? match[1] : "";
}

export function getRateLimitKey(request: Request): string {
  const ip = getIpFromRequest(request);
  const sessionId = getSessionCookieId(request);
  if (sessionId) return `${ip}:${sessionId}`;
  return ip;
}

export const RATE_LIMITS = {
  contact: { limit: 5, windowMs: 60_000 },
  donation: { limit: 10, windowMs: 60_000 },
  register: { limit: 3, windowMs: 300_000 },
  webhook: { limit: 100, windowMs: 60_000 },
} as const;
