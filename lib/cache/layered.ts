import { LruCache } from "@/lib/cache/lru";
import { requestCached } from "@/lib/cache/requestCache";
import { withBulkhead } from "@/lib/resilience/bulkhead";
import { withCircuitBreaker } from "@/lib/resilience/circuitBreaker";

const l1 = new LruCache<unknown>(500, 60_000);
const l2 = new LruCache<unknown>(5_000, 5 * 60_000);
const versions = new Map<string, number>();

function nsKey(ns: string, key: string): string {
  const v = versions.get(ns) ?? 0;
  return `${ns}@${v}:${key}`;
}

async function l2Get(key: string): Promise<unknown | undefined> {
  const url = process.env.REDIS_URL;
  if (!url) return l2.get(key);
  return l2.get(key);
}

async function l2Set(key: string, value: unknown, ttlMs: number): Promise<void> {
  void process.env.REDIS_URL;
  l2.set(key, value, ttlMs);
}

export async function cacheGet<T>(ns: string, key: string): Promise<T | undefined> {
  const k = nsKey(ns, key);
  const hit = l1.get(k);
  if (hit !== undefined) return hit as T;
  const remote = await withCircuitBreaker(
    "cache",
    () => withBulkhead("cache", () => l2Get(k)),
    () => undefined,
  );
  if (remote !== undefined) {
    l1.set(k, remote);
    return remote as T;
  }
  return undefined;
}

export async function cacheSet<T>(ns: string, key: string, value: T, ttlMs = 60_000): Promise<void> {
  const k = nsKey(ns, key);
  l1.set(k, value, ttlMs);
  await withCircuitBreaker(
    "cache",
    () => withBulkhead("cache", () => l2Set(k, value, ttlMs)),
    () => undefined,
  );
}

export function invalidateNamespace(ns: string): void {
  const next = (versions.get(ns) ?? 0) + 1;
  versions.set(ns, next);
  l1.invalidatePrefix(`${ns}@`);
  l2.invalidatePrefix(`${ns}@`);
}

export function invalidateKey(ns: string, key: string): void {
  const k = nsKey(ns, key);
  l1.delete(k);
  l2.delete(k);
}

export async function cached<T>(
  ns: string,
  key: string,
  loader: () => Promise<T>,
  ttlMs = 60_000,
): Promise<T> {
  return requestCached(`${ns}:${key}`, async () => {
    const hit = await cacheGet<T>(ns, key);
    if (hit !== undefined) return hit;
    const value = await loader();
    await cacheSet(ns, key, value, ttlMs);
    return value;
  });
}
