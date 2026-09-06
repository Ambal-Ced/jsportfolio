export type BreakerState = "closed" | "open" | "half_open";

export type CircuitBreakerOptions = {
  failureThreshold: number;
  cooldownMs: number;
  successThreshold: number;
};

type BreakerRecord = {
  state: BreakerState;
  failures: number;
  successes: number;
  openedAt: number;
};

const defaults: CircuitBreakerOptions = {
  failureThreshold: 3,
  cooldownMs: 8_000,
  successThreshold: 1,
};

const breakers = new Map<string, BreakerRecord>();

function record(name: string): BreakerRecord {
  let r = breakers.get(name);
  if (!r) {
    r = { state: "closed", failures: 0, successes: 0, openedAt: 0 };
    breakers.set(name, r);
  }
  return r;
}

export class CircuitOpenError extends Error {
  constructor(public readonly dependency: string) {
    super(`Circuit open for ${dependency}`);
    this.name = "CircuitOpenError";
  }
}

export function getBreakerState(name: string): BreakerState {
  const r = record(name);
  if (r.state === "open" && Date.now() - r.openedAt >= defaults.cooldownMs) {
    r.state = "half_open";
    r.successes = 0;
  }
  return r.state;
}

export async function withCircuitBreaker<T>(
  name: string,
  fn: () => Promise<T>,
  fallback?: () => Promise<T> | T,
  options: Partial<CircuitBreakerOptions> = {},
): Promise<T> {
  const opts = { ...defaults, ...options };
  const r = record(name);

  if (r.state === "open") {
    if (Date.now() - r.openedAt < opts.cooldownMs) {
      if (fallback) return await fallback();
      throw new CircuitOpenError(name);
    }
    r.state = "half_open";
    r.successes = 0;
  }

  try {
    const result = await fn();
    if (r.state === "half_open") {
      r.successes += 1;
      if (r.successes >= opts.successThreshold) {
        r.state = "closed";
        r.failures = 0;
        r.successes = 0;
      }
    } else {
      r.failures = 0;
    }
    return result;
  } catch (err) {
    r.failures += 1;
    if (r.state === "half_open" || r.failures >= opts.failureThreshold) {
      r.state = "open";
      r.openedAt = Date.now();
      r.successes = 0;
    }
    if (fallback) return await fallback();
    throw err;
  }
}

export function inspectBreakers(): Record<string, BreakerState> {
  const out: Record<string, BreakerState> = {};
  for (const [k] of breakers) out[k] = getBreakerState(k);
  return out;
}

/** Prep-only: force a breaker state for the demo page. */
export function resetBreaker(name: string, state: BreakerState = "closed"): void {
  breakers.set(name, {
    state,
    failures: state === "open" ? defaults.failureThreshold : 0,
    successes: 0,
    openedAt: state === "open" ? Date.now() : 0,
  });
}
