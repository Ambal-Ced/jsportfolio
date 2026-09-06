"use client";

import { useState } from "react";

const docs = [
  {
    id: "resume",
    label: "Resume",
    src: "/self/resume.webp",
    fileName: "Justine-Cedrick-Ambal-Resume.webp",
  },
  {
    id: "cv",
    label: "CV",
    src: "/self/cv.webp",
    fileName: "Justine-Cedrick-Ambal-CV.webp",
  },
] as const;

function DownloadLink({
  href,
  fileName,
  className,
}: {
  href: string;
  fileName: string;
  className?: string;
}) {
  return (
    <a href={href} download={fileName} className={className}>
      Download
    </a>
  );
}

export function ResumeViewer() {
  const [open, setOpen] = useState<(typeof docs)[number] | null>(null);

  return (
    <>
      <ul className="mt-10 grid min-w-0 gap-6 sm:grid-cols-2">
        {docs.map((doc) => (
          <li key={doc.id} className="min-w-0">
            <article className="cert-card w-full min-w-0 rounded-2xl border border-line bg-card p-4 text-foreground hover:border-accent/50">
              <p className="text-center text-lg font-semibold tracking-wide text-accent">{doc.label}</p>
              <button
                type="button"
                onClick={() => setOpen(doc)}
                className="mt-4 block w-full text-left"
              >
                <div className="flex h-72 w-full items-center justify-center overflow-hidden rounded-xl bg-well">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={doc.src} alt={doc.label} className="responsive-media max-h-full" />
                </div>
                <p className="mt-3 text-center text-sm text-muted">Click to view fullscreen</p>
              </button>
              <DownloadLink
                href={doc.src}
                fileName={doc.fileName}
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-black hover:opacity-90"
              />
            </article>
          </li>
        ))}
      </ul>

      {open ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute right-4 top-[calc(var(--header-h)+0.75rem)] flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:border-accent hover:text-accent"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div
            className="absolute left-4 top-[calc(var(--header-h)+1rem)] flex items-center gap-3"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-sm font-semibold tracking-wide text-accent">{open.label}</p>
            <DownloadLink
              href={open.src}
              fileName={open.fileName}
              className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-black hover:opacity-90"
            />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={open.src}
            alt={open.label}
            className="max-h-[90vh] max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
