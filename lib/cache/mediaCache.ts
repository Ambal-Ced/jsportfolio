"use client";

const memory = new Map<string, string>();
const inflight = new Map<string, Promise<string>>();

async function fromCacheApi(url: string): Promise<Blob | null> {
  if (!("caches" in window)) return null;
  const cache = await caches.open("prep-media-v1");
  const hit = await cache.match(url);
  if (hit) return hit.blob();
  const res = await fetch(url);
  if (!res.ok) throw new Error("media fetch failed");
  const blob = await res.blob();
  void cache.put(url, new Response(blob, { headers: { "content-type": blob.type } })).catch(() => undefined);
  return blob;
}

/** Load image/video bytes once; reuse an object URL so lists do not refetch. */
export async function loadMediaOnce(url: string): Promise<string> {
  const cached = memory.get(url);
  if (cached) return cached;
  const pending = inflight.get(url);
  if (pending) return pending;

  const job = (async () => {
    let blob: Blob | null = null;
    try {
      blob = await fromCacheApi(url);
    } catch {
      blob = null;
    }
    if (!blob) {
      const res = await fetch(url);
      if (!res.ok) throw new Error("media fetch failed");
      blob = await res.blob();
    }
    const objectUrl = URL.createObjectURL(blob);
    memory.set(url, objectUrl);
    return objectUrl;
  })();

  inflight.set(url, job);
  try {
    return await job;
  } finally {
    inflight.delete(url);
  }
}
