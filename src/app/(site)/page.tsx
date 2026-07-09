import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Process } from "@/components/home/process";
import { Hybrid } from "@/components/home/hybrid";
import { RealPeople } from "@/components/home/real-people";
import { HumanProof } from "@/components/home/human-proof";
import { Marquee } from "@/components/marquee";
import { ServicesOverview } from "@/components/home/services-overview";
import { IndustriesStrip } from "@/components/home/industries-strip";
import { Results } from "@/components/home/results";
import { CtaBand } from "@/components/cta-band";
import { MetaBalls } from "@/components/fx";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";

// Below-the-fold heavy client components → code-split out of the initial bundle.
// SSR stays ON (default), so the server-rendered HTML and visuals are identical;
// only their JavaScript loads lazily, trimming initial parse/execute time.
const CostCalculator = dynamic(() => import("@/components/cost-calculator").then((m) => m.CostCalculator));
const Egypt = dynamic(() => import("@/components/home/egypt").then((m) => m.Egypt));

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServicesOverview />
      <Hybrid />
      <RealPeople />
      <Process />

      {/* Cost-truth — dark electric band, calculator card lifts off it */}
      <Section tone="mesh" id="cost-truth">
        <MetaBalls className="absolute -left-20 top-0 h-[26rem] w-[26rem] opacity-25" />
        <div className="orb orb-cyan absolute -right-28 -top-16 h-64 w-64 opacity-[0.16]" aria-hidden />
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              onDark
              eyebrow="The truth about AI calling"
              title={<>&ldquo;AI is cheaper&rdquo; <span className="serif-i font-normal text-gradient-light">usually isn&apos;t.</span></>}
              lead="Everyone says AI calling saves money. But once you add up everything it takes to run, the cost catches right up to a real person — and you're still left with a robot. Move the sliders and see."
            />
            <Link
              href="/solutions/human-vs-ai"
              className="mono mt-6 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-cyan link-underline"
            >
              See the full comparison <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal>
            <CostCalculator variant="teaser" />
          </Reveal>
        </div>
      </Section>

      <IndustriesStrip />
      <Egypt />
      <Results />
      <HumanProof />
      <CtaBand />
    </>
  );
}
