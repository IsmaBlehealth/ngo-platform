import "server-only";
import Redis from "ioredis";

const globalForRedis = globalThis as unknown as { redis?: Redis };

function createClient(): Redis | null {
  const url = process.env.REDIS_URL;
  if (!url) return null;
  try {
    const client = new Redis(url, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      connectTimeout: 2000,
    });
    // Swallow connection errors — callers fall back to in-memory stores.
    client.on("error", () => {});
    return client;
  } catch {
    return null;
  }
}

/**
 * Returns a shared Redis client, or null when REDIS_URL is not configured.
 * All callers must implement an in-memory fallback for the null case.
 */
export function getRedis(): Redis | null {
  if (globalForRedis.redis) return globalForRedis.redis;
  const client = createClient();
  if (client) globalForRedis.redis = client;
  return client;
}
