import { NextResponse } from "next/server";
import { RateLimitError, type RateBucket, enforceRateLimit } from "@/lib/limits/rateLimit";
import { CircuitOpenError } from "@/lib/resilience/circuitBreaker";
import {
  readIdempotency,
  requireIdempotencyKey,
  writeIdempotency,
} from "@/lib/http/idempotency";

export function jsonError(message: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

export async function runMutation(
  request: Request,
  bucket: RateBucket,
  handler: () => Promise<NextResponse>,
): Promise<NextResponse> {
  try {
    enforceRateLimit(bucket, request.headers);
  } catch (err) {
    if (err instanceof RateLimitError) {
      return new NextResponse(JSON.stringify({ error: err.message }), {
        status: 429,
        headers: {
          "content-type": "application/json",
          "retry-after": String(err.retryAfterSec),
        },
      });
    }
    throw err;
  }

  let key: string;
  try {
    key = requireIdempotencyKey(request.headers);
  } catch {
    return jsonError("Missing Idempotency-Key", 400);
  }

  const existing = readIdempotency(key);
  if (existing) {
    return new NextResponse(existing.body, {
      status: existing.status,
      headers: { "content-type": existing.contentType, "x-idempotent-replay": "1" },
    });
  }

  try {
    const res = await handler();
    const body = await res.text();
    writeIdempotency(key, res.status, body, res.headers.get("content-type") || "application/json");
    return new NextResponse(body, {
      status: res.status,
      headers: res.headers,
    });
  } catch (err) {
    if (err instanceof CircuitOpenError) {
      return jsonError("Service unavailable (circuit open)", 503, { dependency: err.dependency });
    }
    throw err;
  }
}

export function runRead(request: Request, bucket: RateBucket = "api"): NextResponse | null {
  try {
    enforceRateLimit(bucket, request.headers);
    return null;
  } catch (err) {
    if (err instanceof RateLimitError) {
      return new NextResponse(JSON.stringify({ error: err.message }), {
        status: 429,
        headers: {
          "content-type": "application/json",
          "retry-after": String(err.retryAfterSec),
        },
      });
    }
    throw err;
  }
}
