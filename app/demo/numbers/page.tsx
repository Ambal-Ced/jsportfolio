import { CompactNumber } from "@/components/ui/CompactNumber";

const values = [0, 1.5, 12, 12.5, 999, 1000, 12450, 1_000_000, 2_350_000.25, -1400];

export default function NumbersPage() {
  return (
    <main className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Numbers</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Tabular lining figures, decimal in a fixed column, K/M compact form. Hover for full precision.
      </p>
      <div className="w-56">
        {values.map((v) => (
          <div
            key={v}
            className="flex items-center justify-between border-b border-zinc-200 py-1 dark:border-zinc-800"
          >
            <CompactNumber value={v} />
          </div>
        ))}
      </div>
    </main>
  );
}
