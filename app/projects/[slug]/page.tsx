import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectOpenView } from "@/components/portfolio/ProjectOpenView";
import { getProject, projects } from "@/lib/portfolio/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getProject(slug);
  return {
    title: item ? `${item.title} | Projects` : "Project",
    description: item?.subtitle ?? "Project details",
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const item = getProject(slug);
  if (!item) notFound();

  return <ProjectOpenView item={item} />;
}
