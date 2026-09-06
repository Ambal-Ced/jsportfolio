"use client";

import { useEffect, useRef } from "react";

export type CheckState = "empty" | "partial" | "checked";

export function TriStateCheckbox({
  state,
  onChange,
  label,
}: {
  state: CheckState;
  onChange: (next: CheckState) => void;
  label?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = state === "partial";
  }, [state]);

  function cycle() {
    if (state === "empty") onChange("checked");
    else if (state === "checked") onChange("empty");
    else onChange("checked");
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <input
        ref={ref}
        type="checkbox"
        checked={state === "checked"}
        onChange={cycle}
        className="h-4 w-4 accent-zinc-900"
        aria-checked={state === "partial" ? "mixed" : state === "checked"}
      />
      {label}
    </label>
  );
}

export function selectionState(selected: number, total: number): CheckState {
  if (selected === 0) return "empty";
  if (selected === total) return "checked";
  return "partial";
}
