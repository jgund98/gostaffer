import type { Metadata } from "next";
import { Brain, HeartHandshake, Wrench, Gauge, ShieldAlert, Repeat } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { CostCalculator } from "@/components/cost-calculator";
import { FeatureGrid } from "@/components/feature-grid";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { FAQ } from "@/components/faq";

export const metadata: Metadata = {
  title: "Human vs AI Calling — The Real Cost Compared",
  description:
    "AI calling bots vs real human agents: the true per-minute cost, what converts, and where AI actually helps. An honest comparison from a human-led BPO.",
  alternates: { canonical: "/solutions/human-vs-ai" },
};

const WHY_HUMANS = [
  {
    Icon: HeartHandshake,
    title: "Real empathy, real rapport",
    body: "Buyers feel the difference in three seconds. Humans read tone, hesitation, and intent — and adapt mid-sentence.",
  },
  {
    Icon: Brain,
    title: "Thinks on its feet",
    body: "No script survives a real conversation. Our people adjust to whatever a customer throws at them — a bot just gets stuck.",
  },
  {
    Icon: Wrench,
    title: "Nothing to maintain",
    body: "No tech to babysit, no systems to keep tuning, no 2am breakdowns. We handle the quality; you just get the results.",
  },
];

const AI_PROBLEMS = [
  { Icon: Gauge, title: "Those awkward pauses", body: "The little delays while a bot 'thinks' instantly tell your customer they're talking to a machine — and a lot of them hang up." },
  { Icon: ShieldAlert, title: "It says the wrong thing", body: "When a bot makes a promise it shouldn't or goes off-script, that becomes your problem — and your liability — in an instant." },
  { Icon: Repeat, title: "The hidden upkeep", body: "That 'cheap' price tag ignores the people you'd need to keep the whole system running every single week." },
];

const FAQS = [
  {
    q: "Where do the AI cost figures come from?",
    a: "They add up the published prices of the five tools every AI calling system has to run on — recognizing speech, the AI itself, generating a voice, the phone line, and the setup that ties it together. In the real world that lands between $0.32 and $0.50 a minute, before anyone's paid to keep it running.",
  },
  {
    q: "Isn't AI getting better fast?",
    a: "It is — and we use it. We put smart technology behind every one of our people: practice, live coaching, and quality checks. We just don't put a robot on the phone, because that's where a real person wins the deal.",
  },
  {
    q: "What does GoStaffer actually cost?",
    a: "Pay-per-minute with zero platform fees: $0.12/min for data & inbound, $0.14/min for outbound support, and $0.20/min for outbound sales. You fund a wallet and draw down as you go.",
  },
];

export default function HumanVsAI() {
  return (
    <>
      <PageHero
        eyebrow="Human vs AI"
        title={<>The math on AI calling <span className="serif-i font-normal text-gradient">doesn&apos;t add up</span></>}
        lead="Once you add up everything it really takes to run an AI calling system, it costs about the same as a trained person who actually closes deals — and you're still stuck with a robot. See for yourself."
        cta={false}
      />

      <Section tone="bone">
        <Reveal>
          <SectionHeading
            eyebrow="See it for yourself"
            title="Add up the real cost of AI calling"
            lead="Slide to match how much calling you do. The bar shows what an AI system really costs to run — and the big number is what you'd keep in your pocket with GoStaffer instead."
          />
        </Reveal>
        <Reveal>
          <div className="mt-12">
            <CostCalculator variant="full" />
          </div>
        </Reveal>
      </Section>

      <Section tone="paper">
        <Reveal>
          <SectionHeading
            eyebrow="Why people win"
            title="Same price. Far better results."
            lead="Even when the cost comes out the same, a real person closes more deals and keeps more customers than a bot ever could. That's the whole point."
          />
        </Reveal>
        <div className="mt-12">
          <FeatureGrid features={WHY_HUMANS} />
        </div>
      </Section>

      <Section tone="bone">
        <Reveal>
          <SectionHeading eyebrow="The fine print AI vendors skip" title="What 'cheap per minute' really costs" />
        </Reveal>
        <div className="mt-12">
          <FeatureGrid features={AI_PROBLEMS} />
        </div>
      </Section>

      <Section tone="paper">
        <Reveal>
          <SectionHeading align="center" eyebrow="Questions" title="The honest answers" />
        </Reveal>
        <div className="mt-12">
          <FAQ items={FAQS} />
        </div>
      </Section>

      <CtaBand
        title="See the numbers for your business"
        lead="Tell us how much calling you do, and we'll show you exactly what you'd save — free, no pressure."
        primaryLabel="Get my estimate"
      />
    </>
  );
}
