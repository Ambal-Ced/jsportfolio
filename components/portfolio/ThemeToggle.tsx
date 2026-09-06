"use client";

import { useEffect, useState } from "react";
import { applyTheme, readTheme, type Theme } from "@/lib/portfolio/theme";

export function ThemeToggle({ showLabel }: { showLabel?: boolean }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-card px-2.5 py-1.5 text-xs font-semibold tracking-wide text-foreground hover:border-accent sm:px-3"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      {isLight ? (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="none" aria-hidden="true">
          <path
            d="M12 3v1.5M12 19.5V21M4.9 4.9l1.1 1.1M18 18l1.1 1.1M3 12h1.5M19.5 12H21M4.9 19.1 6 18M18 6l1.1-1.1"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="currentColor" aria-hidden="true">
          <path d="M16.4 13.2A6.4 6.4 0 0 1 10.8 4.4 7.2 7.2 0 1 0 19.6 13.2a6.3 6.3 0 0 1-3.2 0Z" />
        </svg>
      )}
      <span className={showLabel ? "" : "hidden sm:inline"}>{isLight ? "Light" : "Dark"}</span>
    </button>
  );
}
