import { NextResponse } from "next/server";
import { runMutation } from "@/lib/http/pipeline";
import { withBulkhead } from "@/lib/resilience/bulkhead";
import { withCircuitBreaker } from "@/lib/resilience/circuitBreaker";

export async function POST(request: Request) {
  return runMutation(request, "api", async () => {
    const body = (await request.json().catch(() => ({}))) as { fail?: boolean; slowMs?: number };
    return withCircuitBreaker("http", () =>
      withBulkhead("http", async () => {
        await new Promise((r) => setTimeout(r, body.slowMs ?? 1200));
        if (body.fail) {
          return NextResponse.json({ error: "Intent failed" }, { status: 500 });
        }
        return NextResponse.json({ ok: true });
      }),
    );
  });
}
