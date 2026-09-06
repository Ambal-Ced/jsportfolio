"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TriStateCheckbox, selectionState } from "@/components/ui/TriStateCheckbox";
import { LIST_ITEMS } from "@/lib/demo/listItems";
import { rememberScroll } from "@/lib/nav/scrollRestore";

export default function ListPage() {
  const items = LIST_ITEMS;
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const state = useMemo(() => selectionState(selected.size, items.length), [selected, items.length]);

  function toggleAll(next: typeof state) {
    if (next === "checked") setSelected(new Set(items.map((i) => i.id)));
    else setSelected(new Set());
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">List</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Open a row, then use the browser back control. Scroll is restored and shifted by the sticky header height.
      </p>
      <div className="sticky top-14 z-10 border-b border-zinc-200 bg-background py-2 dark:border-zinc-800">
        <TriStateCheckbox state={state} onChange={toggleAll} label="Select all" />
      </div>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 border-b border-zinc-200 py-3 dark:border-zinc-800">
            <input
              type="checkbox"
              checked={selected.has(item.id)}
              onChange={() => toggleOne(item.id)}
              className="h-4 w-4 accent-zinc-900"
            />
            <Link
              href={`/demo/list/${item.id}`}
              onClick={() => rememberScroll()}
              className="flex-1 scroll-mt-[var(--header-h)] hover:underline"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
