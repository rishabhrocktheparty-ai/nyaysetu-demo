import IORedis from "ioredis";

// Only connect to Redis if REDIS_URL is provided. Otherwise use an
// in-memory best-effort fallback so local dev works without Redis.
const REDIS_URL = process.env.REDIS_URL;
let redis: IORedis | null = null;
if (REDIS_URL) {
  try {
    redis = new IORedis(REDIS_URL);
    // avoid throwing on initial connection failures; handlers will catch errors
  } catch (e) {
    redis = null;
  }
}

type MemEntry = { count: number; expiresAt: number };
const memory = new Map<string, MemEntry>();

export async function checkRateLimit(key: string, limit = 10, windowSeconds = 60) {
  // Try Redis first when available
  if (redis) {
    try {
      const current = await redis.incr(key);
      if (current === 1) {
        await redis.expire(key, windowSeconds);
      }
      return current <= limit;
    } catch (err) {
      // If Redis is unreachable, fall through to memory fallback
      // (best-effort; not accurate across multiple instances)
    }
  }

  // In-memory fallback (single-process, non-persistent)
  const now = Date.now();
  const existing = memory.get(key);
  if (!existing || existing.expiresAt <= now) {
    memory.set(key, { count: 1, expiresAt: now + windowSeconds * 1000 });
    return 1 <= limit;
  }

  existing.count += 1;
  memory.set(key, existing);
  return existing.count <= limit;
}

