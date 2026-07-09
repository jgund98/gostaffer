import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { FeatureGrid } from "@/components/feature-grid";
import { StatBand } from "@/components/stat-band";
import { CtaBand } from "@/components/cta-band";
import { FAQ } from "@/components/faq";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { faqLd, serviceLd, breadcrumbLd } from "@/lib/seo";
import type { IndustryContent } from "@/lib/pages-content";

function faqsFor(data: IndustryContent) {
  const noun = data.eyebrow.toLowerCase();
  return [
    { q: `Do your agents understand ${noun}?`, a: `Yes. We train every agent on the language, tone, and rules of ${noun} before they take a live call — and your team lead keeps them sharp as you go.` },
    { q: "How fast can you start?", a: "We kick off within 24 hours — learning your offer, building the playbook, and training the team. Simple campaigns go live in a few days; if you need custom tech or extra hiring it's usually a week or two, scoped upfront." },
    { q: "How does pricing work?", a: "Pay-per-minute with no platform fees — you only pay for the minutes the team is talking. See the Pricing page for current rates." },
    { q: "Can you work inside our systems and stay compliant?", a: "Yes. We connect to the CRM and phone tools you already use, and handle recording, consent, and routing so every campaign stays in bounds." },
  ];
}

export function IndustryTemplate({ data }: { data: IndustryContent }) {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: `${data.eyebrow} Call Center Services`,
            description: data.lead,
            path: `/industries/${data.slug}`,
            serviceType: "Call center & answering services",
          }),
          faqLd(faqsFor(data)),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: data.eyebrow, path: `/industries/${data.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={`Industries · ${data.eyebrow}`}
        title={<>{data.title}<span className="serif-i font-normal text-gradient">{data.highlight}</span></>}
        lead={data.lead}
      />

      {/* the challenge */}
      <Section tone="bone">
        <Reveal>
          <SectionHeading
            eyebrow="The challenge"
            title={<>Why {data.eyebrow.toLowerCase()} is <span className="serif-i font-normal text-gradient">hard to staff</span></>}
            lead="The patterns we see again and again — and the reason a generic call center falls short here."
          />
        </Reveal>
        <div className="mt-12">
          <FeatureGrid features={data.challenges} />
        </div>
      </Section>

      {/* plays — dark electric band */}
      <Section tone="mesh">
        <div className="orb orb-cyan float-b absolute -right-10 top-0 h-72 w-72 opacity-30" aria-hidden />
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              onDark
              eyebrow="How GoStaffer helps"
              title={<>Plays we run for <span className="serif-i font-normal text-gradient-light">{data.eyebrow.toLowerCase()}</span></>}
              lead="AI-assisted teams tuned to the realities of your industry — kicked off in 24 hours, live in days."
            />
          </Reveal>
          <RevealGroup className="overflow-hidden rounded-2xl border border-white/12 bg-white/[0.05]">
            {data.plays.map((p, i) => (
              <RevealItem key={p} className="flex items-center gap-4 border-b border-white/10 px-5 py-4 last:border-0">
                <span className="mono text-sm font-bold text-cyan tnum">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-base font-medium text-white">{p}</span>
                <Check className="ml-auto h-5 w-5 shrink-0 text-cyan" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <StatBand stats={data.stats} tone="paper" />

      {/* faq */}
      <Section tone="bone">
        <Reveal>
          <SectionHeading align="center" eyebrow="Questions" title={`${data.eyebrow}, answered`} />
        </Reveal>
        <div className="mt-12">
          <FAQ items={faqsFor(data)} />
        </div>
        <Reveal>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
            <span className="text-mute">Related:</span>
            <Link href="/services/outbound" className="font-medium text-blue-700 link-underline">Outbound Sales</Link>
            <span className="text-line-2">·</span>
            <Link href="/results" className="font-medium text-blue-700 link-underline">Results</Link>
            <span className="text-line-2">·</span>
            <Link href="/industries" className="inline-flex items-center gap-1 font-medium text-blue-700 link-underline">
              All industries <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        title={`Built for ${data.eyebrow.toLowerCase()}. Kicked off in 24 hours.`}
        lead="Tell us your campaign and compliance needs. We'll tailor a team and get you live in days, not months."
      />
    </>
  );
}
