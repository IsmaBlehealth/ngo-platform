const requests = new Map<string, { count: number; resetAt: number }>();

const MAX_ENTRIES = 10_000;
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
  retryAfter: number;
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  cleanup();

  if (requests.size > MAX_ENTRIES) {
    const now = Date.now();
    for (const [k, v] of requests) {
      if (v.resetAt < now) requests.delete(k);
    }
    if (requests.size > MAX_ENTRIES) {
      let cleared = 0;
      for (const k of requests.keys()) {
        requests.delete(k);
        cleared++;
        if (cleared >= 1000) break;
      }
    }
  }

  const now = Date.now();
  const entry = requests.get(key);

  if (!entry || entry.resetAt < now) {
    const resetAt = now + windowMs;
    requests.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1, resetAt, retryAfter: 0 };
  }

  if (entry.count >= limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, resetAt: entry.resetAt, retryAfter };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: limit - entry.count,
    resetAt: entry.resetAt,
    retryAfter: 0,
  };
}

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash).toString(36);
}

function getIpFromRequest(request: Request): string {
  const sessionId = getSessionCookieId(request);
  if (sessionId) return hashString(sessionId);
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const ips = xff.split(",").map((s) => s.trim()).filter(Boolean);
    const realIp = ips[0];
    if (realIp && /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(realIp)) return realIp;
  }
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
  forgotPassword: { limit: 3, windowMs: 300_000 },
  resetPassword: { limit: 5, windowMs: 300_000 },
  webhook: { limit: 100, windowMs: 60_000 },
} as const;
