import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/portfolio/BackLink";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { certificates } from "@/lib/portfolio/certificates";

export const metadata: Metadata = {
  title: "Certificates | Justine Cedrick R. Ambal",
  description: "Certificates for Justine Cedrick R. Ambal",
};

export default function CertificatePage() {
  return (
    <div className="min-h-full bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 pt-[calc(var(--header-h)+1.25rem)] sm:px-6">
        <BackLink href="/#projects" />
      </div>

      <main className="mx-auto w-full max-w-6xl min-w-0 px-4 py-8 sm:py-10">
        <p className="text-center text-sm tracking-[0.2em] text-muted uppercase">Folder</p>
        <h1 className="mt-3 text-center text-3xl font-bold tracking-tight text-accent sm:text-4xl">Certificate</h1>

        <ul className="mt-10 grid min-w-0 gap-6 overflow-visible sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {certificates.map((item) => (
            <li key={item.slug} className="min-w-0">
              <Link
                href={`/certificate/${item.slug}`}
                className="cert-card block min-w-0 rounded-2xl border border-line bg-card p-4 text-foreground hover:border-accent/50"
              >
                <div className="flex h-40 w-full min-w-0 items-center justify-center overflow-hidden rounded-xl bg-well sm:h-52">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.title} className="responsive-media max-h-full" />
                </div>
                <h2 className="wrap-anywhere mt-4 text-sm font-semibold sm:text-base">{item.title}</h2>
                <p className="wrap-anywhere mt-2 text-sm text-muted">{item.subtitle}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
