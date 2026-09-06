"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BackLink } from "@/components/portfolio/BackLink";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import type { ProjectItem } from "@/lib/portfolio/projects";

export function ProjectOpenView({ item }: { item: ProjectItem }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setOpen(true));
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  function close() {
    setOpen(false);
    window.setTimeout(() => router.push("/projects"), 420);
  }

  return (
    <div className="min-h-full bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 pt-[calc(var(--header-h)+1.25rem)] sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <BackLink onClick={close} />
          <button
            type="button"
            onClick={close}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:border-accent hover:text-accent"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <main className="mx-auto w-full max-w-6xl min-w-0 px-4 py-8 sm:py-10">
        <div className={`cert-open ${open ? "is-open" : ""}`}>
          <div className="grid min-w-0 items-start gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="flex max-h-[50vh] min-h-48 w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-line bg-well p-3 sm:max-h-[32rem] sm:min-h-72 sm:p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.title} className="responsive-media max-h-full" />
            </div>
            <div className="min-w-0 max-w-full">
              <h1 className="wrap-anywhere text-xl font-bold tracking-tight text-accent sm:text-3xl lg:text-4xl">
                {item.title}
              </h1>
              <p className="wrap-anywhere mt-3 text-base text-muted sm:text-lg">{item.subtitle}</p>
              {item.tags.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-black"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="wrap-anywhere mt-6 text-sm leading-relaxed text-muted sm:mt-8 sm:text-base">
                {item.fullDescription}
              </p>
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-opacity hover:opacity-90"
                >
                  View this project
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
