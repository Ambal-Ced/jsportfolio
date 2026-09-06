import { NextResponse } from "next/server";
import { inspectBulkheads, withBulkhead } from "@/lib/resilience/bulkhead";
import { inspectBreakers, withCircuitBreaker } from "@/lib/resilience/circuitBreaker";
import { demoHedgedRead } from "@/lib/resilience/hedge";
import { runRead } from "@/lib/http/pipeline";

export async function GET(request: Request) {
  const limited = runRead(request, "api");
  if (limited) return limited;

  const hedged = await withCircuitBreaker(
    "http",
    () => withBulkhead("http", () => demoHedgedRead()),
    async () => ({ value: "fallback-cache", winner: "replica-1" as const }),
  );

  return NextResponse.json({
    hedge: hedged,
    breakers: inspectBreakers(),
    bulkheads: inspectBulkheads(),
  });
}
