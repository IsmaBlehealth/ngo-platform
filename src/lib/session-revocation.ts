import "server-only";
import { getRedis } from "@/lib/redis";

// JWT maxAge is 24h; keep revocation markers slightly longer.
const REVOCATION_TTL_MS = 25 * 60 * 60 * 1000;

// In-memory fallback (per-instance) used when Redis is unavailable.
const memoryStore = new Map<string, number>(); // userId -> revokedAt (epoch ms)

/**
 * Revokes every JWT issued for a user before now.
 * Writes to Redis (authoritative across instances) and the local fallback.
 */
export async function revokeAllSessions(userId: string): Promise<void> {
  const revokedAt = Date.now();
  memoryStore.set(userId, revokedAt);
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set(`revoke:${userId}`, String(revokedAt), "PX", REVOCATION_TTL_MS);
    } catch {
      // Memory fallback already recorded the revocation.
    }
  }
}

/**
 * Returns true when a token issued at `tokenIssuedAtMs` predates the user's
 * latest revocation marker. Checks both Redis and the local fallback and
 * honors the newest marker found in either store.
 */
export async function isSessionRevoked(
  userId: string,
  tokenIssuedAtMs: number
): Promise<boolean> {
  let revokedAt = memoryStore.get(userId) ?? 0;

  const redis = getRedis();
  if (redis) {
    try {
      const val = await redis.get(`revoke:${userId}`);
      if (val) revokedAt = Math.max(revokedAt, Number(val));
    } catch {
      // Redis unreachable — rely on the local fallback only.
    }
  }

  return revokedAt > 0 && tokenIssuedAtMs < revokedAt;
}
