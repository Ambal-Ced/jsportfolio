type Slot = {
  active: number;
  waiters: Array<() => void>;
};

const pools = new Map<string, Slot>();

export type BulkheadOptions = {
  maxConcurrent: number;
};

const defaults: Record<string, number> = {
  db: 10,
  cache: 20,
  http: 8,
};

function slot(name: string): Slot {
  let s = pools.get(name);
  if (!s) {
    s = { active: 0, waiters: [] };
    pools.set(name, s);
  }
  return s;
}

export function getBulkheadLimit(name: string): number {
  return defaults[name] ?? 8;
}

/**
 * Each dependency has its own concurrency pool so a stuck DB cannot starve
 * cache or HTTP (bulkhead isolation).
 */
export async function withBulkhead<T>(
  name: string,
  fn: () => Promise<T>,
  options?: Partial<BulkheadOptions>,
): Promise<T> {
  const max = options?.maxConcurrent ?? getBulkheadLimit(name);
  const s = slot(name);

  if (s.active >= max) {
    await new Promise<void>((resolve) => s.waiters.push(resolve));
  }

  s.active += 1;
  try {
    return await fn();
  } finally {
    s.active -= 1;
    const next = s.waiters.shift();
    if (next) next();
  }
}

export function inspectBulkheads(): Record<string, { active: number; queued: number; max: number }> {
  const names = new Set([...pools.keys(), ...Object.keys(defaults)]);
  const out: Record<string, { active: number; queued: number; max: number }> = {};
  for (const name of names) {
    const s = slot(name);
    out[name] = { active: s.active, queued: s.waiters.length, max: getBulkheadLimit(name) };
  }
  return out;
}
