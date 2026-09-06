export type CompactParts = {
  compact: string;
  integer: string;
  fraction: string;
  suffix: "" | "K" | "M";
  full: string;
};

function splitFixed(n: number, digits: number): { integer: string; fraction: string } {
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  const s = abs.toFixed(digits);
  const [i, f = ""] = s.split(".");
  return { integer: sign + i, fraction: f };
}

export function compactNumber(value: number): CompactParts {
  const full = value.toLocaleString("en-US", { maximumFractionDigits: 20 });
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    const scaled = value / 1_000_000;
    const { integer, fraction } = splitFixed(scaled, 1);
    return { compact: `${integer}.${fraction}M`, integer, fraction, suffix: "M", full };
  }
  if (abs >= 1_000) {
    const scaled = value / 1_000;
    const { integer, fraction } = splitFixed(scaled, 1);
    return { compact: `${integer}.${fraction}K`, integer, fraction, suffix: "K", full };
  }
  const { integer, fraction } = splitFixed(value, 2);
  return { compact: `${integer}.${fraction}`, integer, fraction, suffix: "", full };
}
