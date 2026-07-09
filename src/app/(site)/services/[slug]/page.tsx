import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceTemplate } from "@/components/templates/service-template";
import { SERVICES } from "@/lib/pages-content";

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = SERVICES[slug];
  if (!data) return {};
  return {
    title: `${data.eyebrow} Call Center Services`,
    description: data.lead,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = SERVICES[slug];
  if (!data) notFound();
  return <ServiceTemplate data={data} />;
}
