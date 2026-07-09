import type { Metadata } from "next";
import { Target, ShieldCheck, Rocket, HeartHandshake } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { FeatureGrid } from "@/components/feature-grid";
import { StatBand } from "@/components/stat-band";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { CallNetwork } from "@/components/call-network";
import { STATS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About GoStaffer — American Company, Cairo Team",
  description:
    "GoStaffer is an American company headquartered in West Palm Beach with an elite bilingual calling team in Cairo — offshore value, U.S. accountability, humans amplified by AI.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { Icon: Target, title: "Results over headcount", body: "We bill by the minute and live by your numbers. If something isn't working, that's our problem to fix — not yours." },
  { Icon: HeartHandshake, title: "Human first", body: "AI amplifies our people; it never replaces the conversation. Empathy is the product." },
  { Icon: ShieldCheck, title: "Radical transparency", body: "Live dashboards, recorded calls, scored QA. You see exactly what you're paying for, always." },
  { Icon: Rocket, title: "Speed as a feature", body: "We kick off within 24 hours and get simple campaigns live in days — AI-powered onboarding instead of six-week setups." },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About GoStaffer"
        title={<>An American company with a <span className="serif-i font-normal text-gradient">world-class team</span></>}
        lead="GoStaffer is headquartered in West Palm Beach, Florida, with our calling team based in Cairo. A decade in, we pair top bilingual talent with smart technology to give you results domestic teams can't match on price — and faceless call centers can't match on quality."
      />

      <Section tone="bone">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Where our team comes from"
              title="The talent pool nobody's pricing in"
              lead="Cairo turns out more than 50,000 college-educated, bilingual professionals every year. We hire the top tier and back every one of them with smart technology — all managed by our U.S. team in West Palm Beach."
            />
            <p className="mt-5 text-sm leading-relaxed text-slate">
              The result is clear, neutral-accent English, coverage that spans your customers' hours,
              and a cost roughly 60% below hiring at home — with an American company you can hold
              accountable, not a faceless call center.
            </p>
          </Reveal>
          <Reveal>
            <div className="mesh relative overflow-hidden rounded-3xl border border-white/10 p-3 shadow-[var(--shadow-lg)] sm:p-4">
              <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden />
              <div className="relative">
                <CallNetwork />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper">
        <Reveal>
          <SectionHeading eyebrow="What we stand for" title="Principles that keep us sharp" />
        </Reveal>
        <div className="mt-12">
          <FeatureGrid features={VALUES} cols={2} />
        </div>
      </Section>

      <StatBand stats={STATS} tone="bone" heading="A decade of measurable scale" />

      <CtaBand
        title="Meet the team behind the numbers"
        lead="Book a call and we'll walk you through exactly how a GoStaffer team would run your campaigns."
      />
    </>
  );
}
