export type HedgeOptions = {
  delayMs: number;
};

/**
 * Send to replica-1. If it is still pending after delayMs, hedge with replica-2.
 * First successful response wins; the other is aborted.
 */
export async function hedgeRequest<T>(
  replica1: (signal: AbortSignal) => Promise<T>,
  replica2: (signal: AbortSignal) => Promise<T>,
  options: HedgeOptions = { delayMs: 40 },
): Promise<{ value: T; winner: "replica-1" | "replica-2" }> {
  const c1 = new AbortController();
  const c2 = new AbortController();

  const p1 = replica1(c1.signal).then((value) => ({ value, winner: "replica-1" as const }));

  const hedgeGate = await Promise.race([
    p1.then((v) => ({ tag: "done" as const, v })),
    new Promise<{ tag: "hedge" }>((resolve) => {
      setTimeout(() => resolve({ tag: "hedge" }), options.delayMs);
    }),
  ]);

  if (hedgeGate.tag === "done") {
    c2.abort();
    return hedgeGate.v;
  }

  const p2 = replica2(c2.signal).then((value) => ({ value, winner: "replica-2" as const }));
  const winner = await Promise.any([p1, p2]);
  if (winner.winner === "replica-1") c2.abort();
  else c1.abort();
  return winner;
}

async function delay(ms: number, signal: AbortSignal): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const t = setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(t);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

/** In-process replicas for the prep demo (no real cluster). */
export async function demoHedgedRead(
  signalSlowMs = 180,
  signalFastMs = 30,
): Promise<{ value: string; winner: "replica-1" | "replica-2" }> {
  return hedgeRequest(
    async (signal) => {
      await delay(signalSlowMs, signal);
      return "from-replica-1";
    },
    async (signal) => {
      await delay(signalFastMs, signal);
      return "from-replica-2";
    },
    { delayMs: 40 },
  );
}
