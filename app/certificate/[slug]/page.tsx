import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CertificateOpenView } from "@/components/portfolio/CertificateOpenView";
import { certificates, getCertificate } from "@/lib/portfolio/certificates";

type CertificatePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return certificates.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: CertificatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCertificate(slug);
  return {
    title: item ? `${item.title} | Certificates` : "Certificate",
    description: item?.subtitle ?? "Certificate details",
  };
}

export default async function CertificateDetailPage({ params }: CertificatePageProps) {
  const { slug } = await params;
  const item = getCertificate(slug);
  if (!item) notFound();

  return <CertificateOpenView item={item} />;
}
