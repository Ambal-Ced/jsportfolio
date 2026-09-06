"use client";

import { IntentButton } from "@/components/ui/IntentButton";

async function post(path: string, key: string, body: unknown) {
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "idempotency-key": key,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("failed");
}

export default function IntentPage() {
  return (
    <main className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">One intent, one request</h1>
      <p className="max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
        Click disables immediately, spinner stays in the same locked box, success is a check, failure is red Failed.
        The handler is guarded in-flight. The server also keys on Idempotency-Key. Re-enable happens when the request
        settles — not on a timer.
      </p>
      <div className="flex flex-wrap gap-3">
        <IntentButton onIntent={(key) => post("/api/demo/intent", key, { slowMs: 1600 })}>
          Save
        </IntentButton>
        <IntentButton onIntent={(key) => post("/api/demo/intent", key, { slowMs: 800, fail: true })}>
          This will fail
        </IntentButton>
        <IntentButton tone="delete" onIntent={(key) => post("/api/demo/delete", key, {})}>
          Delete
        </IntentButton>
      </div>
    </main>
  );
}
