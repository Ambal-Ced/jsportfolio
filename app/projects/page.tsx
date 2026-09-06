import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/portfolio/BackLink";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { projects } from "@/lib/portfolio/projects";

export const metadata: Metadata = {
  title: "Projects | Justine Cedrick R. Ambal",
  description: "Projects by Justine Cedrick R. Ambal",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-full bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 pt-[calc(var(--header-h)+1.25rem)] sm:px-6">
        <BackLink href="/#projects" />
      </div>

      <main className="mx-auto w-full max-w-6xl min-w-0 px-4 py-8 sm:py-10">
        <p className="text-center text-sm tracking-[0.2em] text-muted uppercase">Folder</p>
        <h1 className="mt-3 text-center text-3xl font-bold tracking-tight text-accent sm:text-4xl">Projects</h1>

        <ul className="mt-10 grid min-w-0 gap-6 overflow-visible sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {projects.map((item) => (
            <li key={item.slug} className="min-w-0">
              <article className="cert-card flex h-full min-w-0 flex-col rounded-2xl border border-line bg-card p-4 text-foreground hover:border-accent/50">
                <Link href={`/projects/${item.slug}`} className="min-w-0">
                  <div className="flex h-40 w-full min-w-0 items-center justify-center overflow-hidden rounded-xl bg-white sm:h-44">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt={item.title} className="responsive-media max-h-28 object-contain" />
                  </div>
                  <h2 className="wrap-anywhere mt-4 text-center text-sm font-semibold text-accent sm:text-base">
                    {item.title}
                  </h2>
                </Link>
                {item.tags.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap justify-center gap-2">
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
                <div className="mt-auto flex justify-center pt-4">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                    >
                      View this project
                    </a>
                  ) : (
                    <Link
                      href={`/projects/${item.slug}`}
                      className="inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                    >
                      View this project
                    </Link>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
