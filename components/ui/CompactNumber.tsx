import { compactNumber } from "@/lib/format/compactNumber";

export function CompactNumber({ value }: { value: number }) {
  const parts = compactNumber(value);
  return (
    <span
      title={parts.full}
      className="inline-grid grid-cols-[minmax(3ch,auto)_1ch_2ch_1.25ch] items-baseline font-medium tabular-nums"
    >
      <span className="text-right">{parts.integer}</span>
      <span className="text-center">.</span>
      <span className="text-left">{parts.fraction}</span>
      <span className="text-left">{parts.suffix}</span>
    </span>
  );
}
