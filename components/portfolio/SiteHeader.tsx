"use client";

import { useState, type MouseEvent, type Ref } from "react";
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
      <div className="mx-auto flex min-h-16 w-full max-w-6xl min-w-0 items-center justify-between gap-3 px-4 py-3 sm:min-h-20 sm:gap-6 sm:px-6 sm:py-4">
        <Link
          ref={logoRef}
          href="/#top"
          aria-label="ARZEN"
          onClick={onNavigate ? (event) => onNavigate("/#top", event) : undefined}
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
          className={`flex min-w-0 flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm font-medium tracking-wide sm:gap-x-6 sm:text-base ${
            revealed ? (animate ? "nav-in" : "") : "opacity-0"
          }`}
        >
          {siteNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate ? (event) => onNavigate(item.href, event) : undefined}
              className="leading-none text-foreground transition-colors hover:text-muted"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
