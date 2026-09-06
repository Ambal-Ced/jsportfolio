"use client";

export function CountBadge({ count }: { count: number }) {
  const label = count > 99 ? "99+" : String(count);
  return (
    <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-zinc-800 px-1.5 py-0.5 text-xs font-medium text-white tabular-nums dark:bg-zinc-200 dark:text-zinc-900">
      {label}
    </span>
  );
}
