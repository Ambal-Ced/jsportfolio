/**
 * Application-level incremental collection for caches.
 * V8 already incrementally marks the JS heap; this does not replace the runtime GC.
 * We expire cache entries in small batches per tick so a large map is never
 * swept in one stop-the-world pass.
 */

export type GcEntry = {
  expiresAt: number;
};

export type IncrementalGcOptions = {
  batchSize: number;
  intervalMs: number;
};

const defaultOptions: IncrementalGcOptions = {
  batchSize: 32,
  intervalMs: 250,
};

type Sweepable<V extends GcEntry> = {
  entries(): IterableIterator<[string, V]>;
  delete(key: string): boolean;
};

let cursor = 0;
const registries: Sweepable<GcEntry>[] = [];
let timer: ReturnType<typeof setInterval> | null = null;

export function registerForIncrementalGc<V extends GcEntry>(map: Sweepable<V>): void {
  registries.push(map);
  ensureTimer();
}

function ensureTimer(): void {
  if (timer) return;
  timer = setInterval(tick, defaultOptions.intervalMs);
  if (typeof timer === "object" && "unref" in timer) {
    timer.unref();
  }
}

function tick(): void {
  const now = Date.now();
  const batch = defaultOptions.batchSize;
  let seen = 0;
  let skipped = cursor;

  for (const map of registries) {
    for (const [key, value] of map.entries()) {
      if (skipped > 0) {
        skipped -= 1;
        continue;
      }
      if (value.expiresAt <= now) map.delete(key);
      seen += 1;
      if (seen >= batch) {
        cursor += seen;
        return;
      }
    }
  }
  cursor = 0;
}
