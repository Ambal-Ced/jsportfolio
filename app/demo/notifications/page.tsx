import { CountBadge } from "@/components/ui/CountBadge";

const samples = [0, 1, 12, 99, 100, 142, 1042];

export default function NotificationsPage() {
  return (
    <main className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Notifications</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Any count above 99 renders as 99+.</p>
      <ul className="flex flex-col gap-3">
        {samples.map((n) => (
          <li key={n} className="flex items-center gap-3">
            <CountBadge count={n} />
            <span className="tabular-nums text-sm text-zinc-600 dark:text-zinc-400">raw {n}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
