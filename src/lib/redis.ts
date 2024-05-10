import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.REDIS_URL as string,
  token: process.env.REDIS_TOKEN as string,
});

export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export const getIP = (headers: Headers) => {
  return headers.get("x-forwarded-for") || headers.get("cf-connecting-ip") || headers.get("x-real-ip") || "0.0.0.0";
};

export type SetRateLimitOptions = {
  ip: string;
  feature?: string;
};

export const setRateLimit = async (options: SetRateLimitOptions) => {
  const { success } = await ratelimit.limit(options.ip);
  if (!success) {
    let message = "Oops! It seems like you've hit the rate limit for";
    if (options.feature) {
      message += ` ${options.feature} feature.`;
    } else {
      message += " this action.";
    }

    message += " Please try again later.";

    return { success: false, message };
  }

  return { success, message: "" };
};
