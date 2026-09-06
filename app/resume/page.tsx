import type { Metadata } from "next";
import { BackLink } from "@/components/portfolio/BackLink";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { ResumeViewer } from "@/components/portfolio/ResumeViewer";

export const metadata: Metadata = {
  title: "Resume/CV | Justine Cedrick R. Ambal",
  description: "Resume and CV for Justine Cedrick R. Ambal",
};

export default function ResumePage() {
  return (
    <div className="min-h-full bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl min-w-0 px-4 pt-[calc(var(--header-h)+1.25rem)] sm:px-6">
        <BackLink href="/#projects" />
      </div>

      <main className="mx-auto w-full max-w-5xl min-w-0 px-4 py-8 sm:py-10">
        <p className="text-center text-sm tracking-[0.2em] text-muted uppercase">Folder</p>
        <h1 className="mt-3 text-center text-3xl font-bold tracking-tight text-accent sm:text-4xl">Resume &amp; CV</h1>
        <p className="mt-3 text-center text-muted">Choose a document to view it fullscreen.</p>
        <ResumeViewer />
      </main>
    </div>
  );
}
