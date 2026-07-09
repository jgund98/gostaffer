import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceTemplate } from "@/components/templates/service-template";
import { SOLUTIONS } from "@/lib/pages-content";

export function generateStaticParams() {
  return Object.keys(SOLUTIONS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = SOLUTIONS[slug];
  if (!data) return {};
  return {
    title: `${data.eyebrow} — Outsourced Call Teams`,
    description: data.lead,
    alternates: { canonical: `/solutions/${slug}` },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = SOLUTIONS[slug];
  if (!data) notFound();
  return <ServiceTemplate data={data} />;
}
