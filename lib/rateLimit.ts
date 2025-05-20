type RateLimitOptions = {
  interval: number; // 毫秒为单位，例如 60_000 = 1 分钟
  uniqueTokenPerInterval: number; // 每个 token（如 IP）在该时间段内最大请求数
};

const tokenCache = new Map<string, number>();

export function rateLimit(
  token: string,
  options?: Partial<RateLimitOptions>
): { success: boolean } | null {
  const interval = options?.interval || 60_000;
  const uniqueTokenPerInterval = options?.uniqueTokenPerInterval || 3;

  const now = Date.now();
  const windowStart = now - interval;

  // 清理过期 token
  for (const [key, timestamp] of tokenCache.entries()) {
    if (timestamp < windowStart) {
      tokenCache.delete(key);
    }
  }

  const tokenCount = Array.from(tokenCache.keys()).filter((k) => k.startsWith(token)).length;

  if (tokenCount >= uniqueTokenPerInterval) {
    return { success: false };
  }

  tokenCache.set(`${token}-${now}`, now);
  return { success: true };
}