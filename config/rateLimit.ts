import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

export async function checkRateLimit(
  identifier: string,
  requests: number,
  window: `${number} ${"s" | "m" | "h" | "d"}`,
) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Upstash is not configured; skipping local rate limiting.");
      return true;
    }

    throw new Error("Upstash rate limiting is not configured.");
  }

  redis ??= new Redis({ url, token });

  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
  });

  const { success } = await limiter.limit(identifier);
  return success;
}
