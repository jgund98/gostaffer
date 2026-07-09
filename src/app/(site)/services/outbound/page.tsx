import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PhoneOutgoing, Crosshair, TrendingUp, Users2, Target, Repeat } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FeatureGrid } from "@/components/feature-grid";
import { StatBand } from "@/components/stat-band";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { BladeReveal } from "@/components/blade-slice";

export const metadata: Metadata = {
  title: "Outbound Call Center & Appointment Setting Services",
  description:
    "Outbound sales, cold calling, appointment setting and B2B lead generation by trained closers. Pay per minute, no platform fees, live in days — US-accountable.",
  alternates: { canonical: "/services/outbound" },
};

const FEATURES = [
  { Icon: Crosshair, title: "Precision targeting", body: "We tune lists, timing, and cadence from your historical data — every dial aimed, not sprayed." },
  { Icon: Users2, title: "Trained closers", body: "Elite reps drilled on AI roleplay until they beat your benchmarks before going live." },
  { Icon: TrendingUp, title: "Real-time optimization", body: "Live QA and agent assist surface what's working and correct what isn't, mid-campaign." },
  { Icon: Target, title: "Appointment setting", body: "Booked, qualified meetings handed to your AEs — not a pile of half-warm leads." },
  { Icon: Repeat, title: "Persistent follow-up", body: "Multi-touch sequences across calls and callbacks so no opportunity slips." },
  { Icon: PhoneOutgoing, title: "500k+ dials / month", body: "Proven capacity to scale volume without the quality drop-off domestic teams hit." },
];

const STATS = [
  { value: 500_000, suffix: "+", label: "Dials per month" },
  { value: 60, suffix: "%", label: "Lower cost vs. domestic" },
  { value: 24, suffix: "h", label: "To live campaigns" },
  { value: 98, suffix: "%", label: "English fluency" },
];

export default function Outbound() {
  return (
    <>
      <section className="hero-dark mesh mesh-animated relative overflow-hidden border-b border-white/10 pt-28 text-white sm:pt-32">
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
        <div className="orb orb-cyan float-b absolute left-[-8%] top-[18%] h-[45vh] w-[45vh] opacity-35" aria-hidden />
        <Container className="relative grid items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <Eyebrow onDark>Outbound</Eyebrow>
            <BladeReveal>
              <h1 className="mt-4 max-w-xl font-display text-[2.6rem] font-bold leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]">
                Outbound firepower that <span className="serif-i font-normal text-gradient">closes</span>
              </h1>
            </BladeReveal>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              High-volume dialing with trained closers and AI behind every call. Sales,
              appointment setting, and lead gen that move your pipeline — billed by the hour.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Link
                href="/pricing"
                className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-[10px] border border-white/20 px-7 text-base font-semibold text-white transition-colors hover:border-white/50"
              >
                View pricing
              </Link>
            </div>
          </div>
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-[var(--shadow-lg)]">
              <Image
                src="/img/outbound-hero.png"
                alt="GoStaffer outbound operations floor"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/30 to-transparent" />
            </div>
          </Reveal>
        </Container>
      </section>

      <StatBand stats={STATS} tone="bone" />

      <Section tone="paper">
        <Reveal>
          <SectionHeading
            eyebrow="What you get"
            title="Built to convert, engineered to scale"
            lead="Every outbound campaign runs on the same precision system: aimed lists, trained reps, and AI assist closing the loop."
          />
        </Reveal>
        <div className="mt-12">
          <FeatureGrid features={FEATURES} />
        </div>
      </Section>

      <Section tone="bone">
        <div className="rounded-3xl border border-line bg-paper p-8 text-center shadow-[var(--shadow-md)] sm:p-12">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-balance font-display text-2xl font-semibold text-ink sm:text-3xl">
              Not sure outbound is the right motion?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate">
              Explore inbound, support, and data solutions — or compare the true cost against AI calling.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
              <Link href="/solutions/human-vs-ai" className="font-medium text-blade-700 link-underline">Human vs AI →</Link>
              <span className="text-line-2">·</span>
              <Link href="/services/inbound" className="font-medium text-blade-700 link-underline">Inbound →</Link>
              <span className="text-line-2">·</span>
              <Link href="/solutions/lead-generation" className="font-medium text-blade-700 link-underline">Lead generation →</Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Point your outbound at the right targets"
        lead="Tell us your offer and lists. We'll build a precision-trained team within 24 hours and get you live in days."
      />
    </>
  );
}
