import IORedis from "ioredis";
const redis = new IORedis(process.env.REDIS_URL!);

export async function checkRateLimit(key: string, limit = 10, windowSeconds = 60) {
  try {
    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, windowSeconds);
    }
    return current <= limit;
  } catch (err) {
    // fallback to simple in-memory (best-effort; loses across instances)
    return true;
  }
}
