import Link from "next/link";
import { PhoneOutgoing, Headphones, Filter, CalendarCheck, Database, ArrowUpRight, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { PortalOrb } from "@/components/portal-orb";

const SERVICES = [
  {
    Icon: PhoneOutgoing,
    title: "Outbound Sales",
    body: "Trained closers who call your leads, handle objections, and book real meetings — paid by the minute.",
    href: "/solutions/sales",
  },
  {
    Icon: Headphones,
    title: "Inbound & Support",
    body: "Every call and ticket answered fast, on-brand, and resolved on the first touch. 24/7 coverage.",
    href: "/services/inbound",
  },
  {
    Icon: Filter,
    title: "Lead Generation",
    body: "We reach the right prospects, qualify them hard, and hand your team conversations worth having.",
    href: "/solutions/lead-generation",
  },
  {
    Icon: CalendarCheck,
    title: "Appointment Setting",
    body: "A full calendar of qualified meetings for your closers — no more chasing half-warm leads.",
    href: "/solutions/sales",
  },
  {
    Icon: Database,
    title: "Data & Back-Office",
    body: "Data entry, CRM hygiene, and document work done accurately and at volume, so your records stay clean.",
    href: "/solutions/data-processing",
  },
];

export function ServicesOverview() {
  return (
    <Section tone="paper">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title={<>One team for every <span className="serif-i font-normal text-gradient">conversation</span> that grows your business</>}
          />
        </Reveal>
        <Reveal>
          <Link
            href="/services"
            className="mono inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-blue-700 link-underline"
          >
            See all services <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>

      <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <RevealItem key={s.title}>
            <Link
              href={s.href}
              className="group flex h-full flex-col bg-paper p-7 transition-colors hover:bg-bone"
            >
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-[0_8px_20px_-8px_rgba(14,165,165,0.6)] transition-transform group-hover:scale-105"
                style={{ background: "var(--grad-aurora)" }}
              >
                <s.Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 flex items-center gap-1.5 font-display text-xl font-semibold text-ink">
                {s.title}
                <ArrowUpRight className="h-4 w-4 -translate-x-1 text-blue-600 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{s.body}</p>
              <span className="mono mt-5 text-[0.7rem] font-semibold uppercase tracking-wider text-blue-700">
                Learn more →
              </span>
            </Link>
          </RevealItem>
        ))}
        {/* CTA tile */}
        <RevealItem>
          <Link
            href="/contact"
            className="group relative flex h-full flex-col justify-between overflow-hidden bg-navy p-7 text-white"
          >
            <div className="mesh mesh-animated absolute inset-0 opacity-90" aria-hidden />
            <PortalOrb className="absolute inset-0 h-full w-full opacity-[0.45] [mask-image:radial-gradient(60%_60%_at_50%_45%,black,transparent)]" />
            <div className="relative">
              <h3 className="font-display text-xl font-semibold">Not sure where to start?</h3>
              <p className="mt-2 text-sm text-white/70">
                Tell us your goal — we&apos;ll recommend the right team and kick off within 24 hours.
              </p>
            </div>
            <span className="relative mono mt-6 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-cyan">
              Get a recommendation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
