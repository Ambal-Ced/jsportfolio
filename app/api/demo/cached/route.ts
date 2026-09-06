import { NextResponse } from "next/server";
import { etagFor, isNotModified } from "@/lib/cache/conditional";
import { cached } from "@/lib/cache/layered";
import { runWithRequestCache } from "@/lib/cache/requestCache";
import { runRead } from "@/lib/http/pipeline";

export async function GET(request: Request) {
  const limited = runRead(request, "api");
  if (limited) return limited;

  return runWithRequestCache(async () => {
    const payload = await cached("posts", "feed-demo", async () => {
      return { items: ["post-a", "post-b", "post-c"], generatedAt: Date.now() };
    });
    const body = JSON.stringify(payload);
    const etag = etagFor(body);
    if (isNotModified(request, etag)) {
      return new NextResponse(null, { status: 304, headers: { ETag: etag } });
    }
    return new NextResponse(body, {
      status: 200,
      headers: {
        "content-type": "application/json",
        ETag: etag,
        "cache-control": "private, max-age=30, must-revalidate",
      },
    });
  });
}
