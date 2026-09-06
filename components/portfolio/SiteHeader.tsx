"use client";

import { useEffect, useState, type MouseEvent, type Ref } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";

export const siteNav = [
  { href: "/#top", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader({
  logoRef,
  hidden = false,
  revealed = true,
  introLift = false,
  animate = false,
  onNavigate,
}: {
  logoRef?: Ref<HTMLAnchorElement>;
  hidden?: boolean;
  revealed?: boolean;
  introLift?: boolean;
  animate?: boolean;
  onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const [logoFailed, setLogoFailed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    function onResize() {
      if (window.innerWidth >= 768) setMenuOpen(false);
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  function go(href: string, event: MouseEvent<HTMLAnchorElement>) {
    setMenuOpen(false);
    onNavigate?.(href, event);
  }

  return (
    <header
      data-sticky-header
      className={`site-header fixed inset-x-0 top-0 border-b border-line bg-background ${
        introLift ? "z-[110]" : "z-50"
      } ${revealed ? "" : "pointer-events-none"}`}
      style={{
        transform: hidden || !revealed ? "translateY(-100%)" : "translateY(0)",
        opacity: revealed ? 1 : 0,
      }}
    >
      <div className="mx-auto flex min-h-16 w-full max-w-6xl min-w-0 items-center justify-between gap-3 px-4 py-3 sm:min-h-20 sm:px-6 sm:py-4">
        <Link
          ref={logoRef}
          href="/#top"
          aria-label="ARZEN"
          onClick={(event) => go("/#top", event)}
          className={`flex h-8 min-w-0 shrink items-center ${revealed ? (animate ? "logo-in" : "") : "opacity-0"}`}
        >
          {logoFailed ? (
            <span className="logo-wordmark text-foreground">ARZEN</span>
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/arzen.png"
                alt="ARZEN"
                onError={() => setLogoFailed(true)}
                className="logo-dark h-7 w-auto max-w-[36vw] object-contain object-left sm:h-8 sm:max-w-[12rem]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/arzenwhite.png"
                alt="ARZEN"
                onError={() => setLogoFailed(true)}
                className="logo-light h-7 w-auto max-w-[36vw] object-contain object-left sm:h-8 sm:max-w-[12rem]"
              />
            </>
          )}
        </Link>

        <nav
          className={`hidden items-center justify-end gap-x-6 text-base font-medium tracking-wide md:flex ${
            revealed ? (animate ? "nav-in" : "") : "opacity-0"
          }`}
        >
          {siteNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(event) => go(item.href, event)}
              className="leading-none text-foreground transition-colors hover:text-muted"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <button
          type="button"
          className={`relative z-[1] flex h-10 w-10 items-center justify-center rounded-md border border-line text-foreground md:hidden ${
            revealed ? (animate ? "nav-in" : "") : "opacity-0"
          }`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
            <span
              className={`block h-0.5 w-full bg-foreground transition-transform duration-300 ease-out ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-full bg-foreground transition-opacity duration-300 ease-out ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-full bg-foreground transition-transform duration-300 ease-out ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div className={`site-menu md:hidden ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="site-menu-inner">
          <div className="border-t border-line bg-background px-4 py-4">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1">
              {siteNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => go(item.href, event)}
                  className="rounded-lg px-2 py-3 text-base font-medium text-foreground hover:bg-card"
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-2 pt-2">
                <ThemeToggle showLabel />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
