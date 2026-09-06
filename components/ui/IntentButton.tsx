"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";

type Status = "idle" | "loading" | "success" | "failed";

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v3a5 5 0 0 0-5 5H4z" />
    </svg>
  );
}

function Check() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path fill="currentColor" d="M9.2 16.2 5.5 12.5l1.4-1.4 2.3 2.3 7-7 1.4 1.4z" />
    </svg>
  );
}

function lockBox(el: HTMLButtonElement): { w: number; h: number } {
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  el.style.width = `${w}px`;
  el.style.height = `${h}px`;
  el.style.minWidth = `${w}px`;
  el.style.minHeight = `${h}px`;
  return { w, h };
}

export function IntentButton({
  children,
  onIntent,
  className = "",
  tone = "neutral",
}: {
  children: ReactNode;
  onIntent: (idempotencyKey: string) => Promise<void>;
  className?: string;
  tone?: "neutral" | "delete";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inflight = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);

  const locked: CSSProperties | undefined = box
    ? { width: box.w, height: box.h, minWidth: box.w, minHeight: box.h }
    : undefined;

  async function handleClick() {
    if (inflight.current) return;
    inflight.current = true;
    const el = ref.current;
    if (el && !box) setBox(lockBox(el));
    setStatus("loading");
    const key = crypto.randomUUID();
    try {
      await onIntent(key);
      setStatus("success");
    } catch {
      setStatus("failed");
    } finally {
      inflight.current = false;
    }
  }

  const failed = status === "failed";
  const deleteTone = tone === "delete";

  return (
    <button
      ref={ref}
      type="button"
      disabled={status === "loading"}
      onClick={handleClick}
      style={locked}
      className={`inline-flex h-9 items-center justify-center gap-2 overflow-hidden rounded-md px-3 text-sm font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed ${
        failed || deleteTone
          ? "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-600"
          : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      } ${className}`}
    >
      {status === "loading" ? (
        <Spinner />
      ) : status === "success" ? (
        <Check />
      ) : status === "failed" ? (
        "Failed"
      ) : (
        children
      )}
    </button>
  );
}
