import Link from "next/link";
import { HeartPulse, ShieldCheck, Landmark, Plane, ShoppingCart, Building2, ArrowRight, ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

const INDUSTRIES = [
  { Icon: HeartPulse, label: "Healthcare", desc: "Reminders & intake", href: "/industries/healthcare" },
  { Icon: ShieldCheck, label: "Insurance", desc: "Quote, follow up, renew", href: "/industries/insurance" },
  { Icon: Landmark, label: "Financial & Debt", desc: "Sensitive, compliant calls", href: "/industries/debt-settlement" },
  { Icon: Plane, label: "Travel", desc: "24/7 bookings & support", href: "/industries/travel" },
  { Icon: ShoppingCart, label: "E-commerce", desc: "Convert & keep customers", href: "/industries/e-commerce" },
  { Icon: Building2, label: "Real Estate", desc: "Speed-to-lead & showings", href: "/industries/real-estate" },
];

export function IndustriesStrip() {
  return (
    <Section tone="bone">
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Industries we serve"
            title={<>Trained for the rules and rhythm of <span className="serif-i font-normal text-gradient">your industry</span></>}
            lead="Compliance-aware, empathy-trained teams that already speak your customers' language — from healthcare intake to insurance renewals."
          />
          <Link
            href="/industries"
            className="mono mt-6 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-blue-700 link-underline"
          >
            See all industries <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {INDUSTRIES.map((it) => (
            <RevealItem key={it.label}>
              <Link
                href={it.href}
                className="group relative flex h-full min-h-[12rem] flex-col overflow-hidden rounded-2xl border border-line bg-paper p-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/50 hover:shadow-[0_24px_50px_-24px_rgba(36,165,109,0.5)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan/0 blur-2xl transition-all duration-500 group-hover:bg-cyan/25" aria-hidden />
                <it.Icon
                  className="pointer-events-none absolute -bottom-6 -right-5 h-28 w-28 text-blue-500/[0.06] transition-all duration-500 group-hover:scale-110 group-hover:text-blue-500/[0.11]"
                  aria-hidden
                  strokeWidth={1.25}
                />

                <span
                  className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-[0_8px_20px_-8px_rgba(14,165,165,0.55)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  style={{ background: "var(--grad-aurora)" }}
                >
                  <it.Icon className="h-5 w-5" />
                </span>

                <h3 className="relative mt-5 font-display text-lg font-semibold leading-tight text-ink">{it.label}</h3>
                <p className="relative mt-1.5 text-sm leading-snug text-slate">{it.desc}</p>

                <span className="mono relative mt-auto pt-5 inline-flex items-center gap-1 text-[0.66rem] font-semibold uppercase tracking-wider text-blue-700/70 transition-colors group-hover:text-blue-700">
                  See how
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
