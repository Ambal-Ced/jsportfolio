export type RateBucket = "api" | "login" | "register";

type BucketConfig = {
  capacity: number;
  refillPerMs: number;
};

const configs: Record<RateBucket, BucketConfig> = {
  api: { capacity: 30, refillPerMs: 30 / 60_000 },
  login: { capacity: 5, refillPerMs: 5 / 60_000 },
  register: { capacity: 5, refillPerMs: 5 / 60_000 },
};

type TokenState = {
  tokens: number;
  last: number;
};

const store = new Map<string, TokenState>();

export class RateLimitError extends Error {
  retryAfterSec: number;
  constructor(retryAfterSec: number) {
    super("Too many requests");
    this.name = "RateLimitError";
    this.retryAfterSec = retryAfterSec;
  }
}

function keyOf(bucket: RateBucket, userId: string | null, ip: string): string {
  return userId ? `${bucket}:user:${userId}` : `${bucket}:ip:${ip}`;
}

export function takeToken(
  bucket: RateBucket,
  userId: string | null,
  ip: string,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const cfg = configs[bucket];
  const k = keyOf(bucket, userId, ip);
  const now = Date.now();
  let s = store.get(k);
  if (!s) {
    s = { tokens: cfg.capacity, last: now };
    store.set(k, s);
  }
  const elapsed = now - s.last;
  s.tokens = Math.min(cfg.capacity, s.tokens + elapsed * cfg.refillPerMs);
  s.last = now;
  if (s.tokens < 1) {
    const retryAfterSec = Math.max(1, Math.ceil((1 - s.tokens) / cfg.refillPerMs / 1000));
    return { ok: false, retryAfterSec };
  }
  s.tokens -= 1;
  return { ok: true };
}

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

export function userIdFromRequest(headers: Headers): string | null {
  const direct = headers.get("x-user-id") || headers.get("x-prep-user");
  if (direct) return direct;
  const cookie = headers.get("cookie");
  const match = cookie?.match(/(?:^|;\s*)prep-user-id=([^;]+)/);
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

export function enforceRateLimit(bucket: RateBucket, headers: Headers): void {
  const result = takeToken(bucket, userIdFromRequest(headers), clientIp(headers));
  if (!result.ok) throw new RateLimitError(result.retryAfterSec);
}
