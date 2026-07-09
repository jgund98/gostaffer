import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryTemplate } from "@/components/templates/industry-template";
import { INDUSTRIES } from "@/lib/pages-content";

export function generateStaticParams() {
  return Object.keys(INDUSTRIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = INDUSTRIES[slug];
  if (!data) return {};
  return {
    title: `${data.eyebrow} Call Center & Support Services`,
    description: data.lead,
    alternates: { canonical: `/industries/${slug}` },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = INDUSTRIES[slug];
  if (!data) notFound();
  return <IndustryTemplate data={data} />;
}
