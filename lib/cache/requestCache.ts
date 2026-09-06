import { AsyncLocalStorage } from "node:async_hooks";

type Store = Map<string, unknown>;

const als = new AsyncLocalStorage<Store>();

export function runWithRequestCache<T>(fn: () => T | Promise<T>): T | Promise<T> {
  return als.run(new Map(), fn);
}

export function requestGet<T>(key: string): T | undefined {
  return als.getStore()?.get(key) as T | undefined;
}

export function requestSet<T>(key: string, value: T): void {
  als.getStore()?.set(key, value);
}

export async function requestCached<T>(key: string, loader: () => Promise<T>): Promise<T> {
  const hit = requestGet<T>(key);
  if (hit !== undefined) return hit;
  const value = await loader();
  requestSet(key, value);
  return value;
}
