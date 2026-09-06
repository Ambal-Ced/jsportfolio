"use client";

import { useState } from "react";
import { IntentButton } from "@/components/ui/IntentButton";

type Snapshot = {
  hedge?: { value: string; winner: string };
  breakers?: Record<string, string>;
  bulkheads?: Record<string, { active: number; queued: number; max: number }>;
  cache?: unknown;
  status?: number;
};

export default function ResiliencePage() {
  const [snap, setSnap] = useState<Snapshot | null>(null);

  async function loadHedge() {
    const res = await fetch("/api/demo/hedge");
    setSnap({ ...(await res.json()), status: res.status });
  }

  async function loadCache() {
    const first = await fetch("/api/demo/cached");
    const etag = first.headers.get("etag");
    const second = await fetch("/api/demo/cached", {
      headers: etag ? { "if-none-match": etag } : {},
    });
    const body = second.status === 304 ? { note: "304 not modified" } : await second.json();
    setSnap({ cache: body, status: second.status });
  }

  return (
    <main className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Resilience</h1>
      <p className="max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
        Rate limits (per user and IP, separate login / api / register buckets), circuit breaker, bulkhead pools, hedged
        replica reads, layered + conditional cache. Incremental GC sweeps cache maps in batches.
      </p>
      <div className="flex flex-wrap gap-3">
        <IntentButton
          onIntent={async () => {
            await loadHedge();
          }}
        >
          Hedge request
        </IntentButton>
        <IntentButton
          onIntent={async () => {
            await loadCache();
          }}
        >
          Conditional cache
        </IntentButton>
        <IntentButton
          onIntent={async (key) => {
            await fetch("/api/demo/breaker", {
              method: "POST",
              headers: { "content-type": "application/json", "idempotency-key": key },
              body: JSON.stringify({ name: "http", state: "open" }),
            });
            await loadHedge();
          }}
        >
          Open breaker
        </IntentButton>
        <IntentButton
          onIntent={async (key) => {
            const res = await fetch("/api/demo/login", {
              method: "POST",
              headers: { "content-type": "application/json", "idempotency-key": key },
              body: JSON.stringify({ email: "a@b.c", password: "x" }),
            });
            if (res.status === 429) {
              setSnap({ status: 429 });
              throw new Error("rate limited");
            }
          }}
        >
          Login (rate limited)
        </IntentButton>
      </div>
      {snap ? (
        <pre className="overflow-auto rounded-md border border-zinc-200 p-3 text-xs dark:border-zinc-800">
          {JSON.stringify(snap, null, 2)}
        </pre>
      ) : null}
    </main>
  );
}
