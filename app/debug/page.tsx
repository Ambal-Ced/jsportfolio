import Link from "next/link";

const demos = [
  ["Avatars", "/demo/avatars", "Image, then initials, then generic icon. Deterministic color, two letters."],
  ["Notifications", "/demo/notifications", "Counts cap at 99+."],
  ["Numbers", "/demo/numbers", "Tabular compact K/M with full precision on hover."],
  ["Intent", "/demo/intent", "One click, locked size, spinner, check or Failed, idempotency key."],
  ["Form", "/demo/form", "Submit stays available; missing fields highlight."],
  ["List", "/demo/list", "Scroll position + sticky header offset on back."],
  ["Resilience", "/demo/resilience", "Rate limit, circuit breaker, hedge, bulkhead, cache."],
];

export default function DebugPage() {
  return (
    <main className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Prep site</h1>
        <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-400">
          Empty product. Patterns live in <code className="font-mono text-sm">lib/</code> and{" "}
          <code className="font-mono text-sm">components/</code> so a real app can plug in later.
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {demos.map(([title, href, blurb]) => (
          <li key={href}>
            <Link
              href={href}
              className="block rounded-lg border border-zinc-200 p-4 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <div className="font-medium">{title}</div>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{blurb}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}