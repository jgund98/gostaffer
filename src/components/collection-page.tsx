import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/reveal";
import type { NavItem } from "@/lib/site";

export function CollectionPage({
  eyebrow,
  title,
  highlight,
  lead,
  items,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  lead: string;
  items: NonNullable<NavItem["children"]>;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={<>{title} <span className="text-gradient">{highlight}</span></>}
        lead={lead}
      />
      <Section tone="bone">
        <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <RevealItem key={it.href}>
              <Link
                href={it.href}
                className="group flex h-full flex-col bg-paper p-7 transition-colors hover:bg-frost"
              >
                <span className="flex items-center justify-between">
                  <span className="font-display text-lg font-semibold text-ink">{it.label}</span>
                  <ArrowUpRight className="h-5 w-5 -translate-x-1 text-blade-600 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
                {it.desc && <span className="mt-2 text-sm leading-relaxed text-slate">{it.desc}</span>}
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
