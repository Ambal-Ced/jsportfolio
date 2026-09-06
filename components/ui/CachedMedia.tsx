"use client";

import { useEffect, useState } from "react";
import { loadMediaOnce } from "@/lib/cache/mediaCache";

export function CachedMedia({
  src,
  alt,
  kind = "image",
  className,
}: {
  src: string;
  alt: string;
  kind?: "image" | "video";
  className?: string;
}) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    loadMediaOnce(src)
      .then((u) => {
        if (alive) setUrl(u);
      })
      .catch(() => {
        if (alive) setUrl(null);
      });
    return () => {
      alive = false;
    };
  }, [src]);

  if (!url) {
    return <div className={`bg-zinc-200 dark:bg-zinc-800 ${className ?? ""}`} aria-hidden />;
  }

  if (kind === "video") {
    return <video src={url} className={className} controls muted playsInline />;
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={alt} className={className} />;
}
