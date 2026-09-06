import { NextResponse } from "next/server";
import { resetBreaker } from "@/lib/resilience/circuitBreaker";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { name?: string; state?: "closed" | "open" | "half_open" };
  resetBreaker(body.name ?? "http", body.state ?? "open");
  return NextResponse.json({ ok: true });
}
