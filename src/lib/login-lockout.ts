import "server-only";
import { getRedis } from "@/lib/redis";

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000;

// In-memory fallback (per-instance) used when Redis is unavailable.
const memoryAttempts = new Map<string, { count: number; lockedUntil: number }>();

function memoryIsLockedOut(email: string): boolean {
  const entry = memoryAttempts.get(email);
  if (!entry) return false;
  if (Date.now() > entry.lockedUntil) {
    memoryAttempts.delete(email);
    return false;
  }
  return true;
}

function memoryRecordFailure(email: string): void {
  const entry = memoryAttempts.get(email);
  if (entry) {
    entry.count++;
    if (entry.count >= MAX_LOGIN_ATTEMPTS) {
      entry.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
    }
  } else {
    memoryAttempts.set(email, { count: 1, lockedUntil: 0 });
  }
}

/** True when the account is currently locked after repeated failed logins. */
export async function isLoginLocked(email: string): Promise<boolean> {
  const redis = getRedis();
  if (redis) {
    try {
      const locked = await redis.get(`loginlock:${email}`);
      if (locked) return true;
      // Not locked in Redis — still honor the local fallback.
    } catch {
      // Redis unreachable — fall through to memory.
    }
  }
  return memoryIsLockedOut(email);
}

/** Records a failed login; locks the account after MAX_LOGIN_ATTEMPTS. */
export async function recordLoginFailure(email: string): Promise<void> {
  memoryRecordFailure(email);
  const redis = getRedis();
  if (redis) {
    try {
      const key = `loginfails:${email}`;
      const count = await redis.incr(key);
      if (count === 1) {
        // Sliding window: reset the counter after the lockout period.
        await redis.pexpire(key, LOCKOUT_DURATION_MS);
      }
      if (count >= MAX_LOGIN_ATTEMPTS) {
        await redis.set(`loginlock:${email}`, "1", "PX", LOCKOUT_DURATION_MS);
        await redis.del(key);
      }
    } catch {
      // Memory fallback already recorded the failure.
    }
  }
}

/** Clears failure counters after a successful login. */
export async function clearLoginFailures(email: string): Promise<void> {
  memoryAttempts.delete(email);
  const redis = getRedis();
  if (redis) {
    try {
      await redis.del(`loginfails:${email}`, `loginlock:${email}`);
    } catch {
      // Memory fallback already cleared.
    }
  }
}
