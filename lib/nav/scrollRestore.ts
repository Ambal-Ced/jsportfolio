"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const STORAGE = "prep-scroll-map";

type Entry = { y: number; stickyOffset: number };

function readMap(): Record<string, Entry> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE) || "{}") as Record<string, Entry>;
  } catch {
    return {};
  }
}

function writeMap(map: Record<string, Entry>): void {
  sessionStorage.setItem(STORAGE, JSON.stringify(map));
}

function headerHeight(): number {
  const el = document.querySelector<HTMLElement>("[data-sticky-header]");
  return el?.offsetHeight ?? 0;
}

function save(path: string): void {
  const map = readMap();
  map[path] = { y: window.scrollY, stickyOffset: headerHeight() };
  writeMap(map);
}

function restore(path: string): void {
  const entry = readMap()[path];
  if (!entry) return;
  const offset = entry.stickyOffset || headerHeight();
  const top = Math.max(0, entry.y - offset);
  window.scrollTo({ top, left: 0, behavior: "auto" });
}

export function ScrollRestore() {
  const pathname = usePathname();
  const prev = useRef(pathname);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const applyPad = () => {
      const h = headerHeight();
      if (h > 0) html.style.setProperty("--header-h", `${h}px`);
    };
    applyPad();
    restore(pathname);

    const onScroll = () => save(pathname);
    const onLeave = () => save(prev.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", onLeave);
    const ro = new ResizeObserver(applyPad);
    const header = document.querySelector("[data-sticky-header]");
    if (header) ro.observe(header);

    return () => {
      save(prev.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onLeave);
      ro.disconnect();
    };
  }, [pathname]);

  useLayoutEffect(() => {
    if (prev.current !== pathname) {
      save(prev.current);
      prev.current = pathname;
    }
  }, [pathname]);

  return null;
}

export function rememberScroll(): void {
  if (typeof window === "undefined") return;
  save(window.location.pathname);
}
