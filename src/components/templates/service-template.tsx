import Link from "next/link";
import { Check, ArrowRight, Clock, Wallet, Eye } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { FeatureGrid } from "@/components/feature-grid";
import { CtaBand } from "@/components/cta-band";
import { FAQ } from "@/components/faq";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { faqLd, serviceLd, breadcrumbLd } from "@/lib/seo";
import type { ServiceContent } from "@/lib/pages-content";

const INCLUDED = [
  { Icon: Clock, t: "Kickoff in 24 hours", d: "We start within a day and get you live in days — no six-week setup." },
  { Icon: Wallet, t: "Pay by the minute", d: "No platform fees, no per-seat contracts, no lock-in." },
  { Icon: Eye, t: "Full visibility", d: "Watch every call and result live in your Command Center." },
];

function faqsFor(data: ServiceContent) {
  const noun = data.eyebrow.toLowerCase();
  return [
    { q: `How fast can a ${noun} team go live?`, a: "We kick off within 24 hours of our call and get simple campaigns live in a few days. Setups that need custom tech or extra hiring take a week or two — we scope the exact timeline upfront." },
    { q: "What does it cost?", a: "Pay-per-minute with zero platform fees — you only pay for the minutes the team is actually talking. Add credit to a wallet and draw down as you go. See the Pricing page for current rates." },
    { q: "Do I have to change my software?", a: "No. We connect to the CRM, phone system, and tools you already use, so nothing changes on your end." },
    { q: "How do I know it's working?", a: "You watch every call, connect rate, and conversion in real time, and we tune daily. With pay-per-minute and no long lock-in, you stay in control." },
  ];
}

export function ServiceTemplate({ data }: { data: ServiceContent }) {
  const base = data.kind === "Service" ? "/services" : "/solutions";
  return (
    <>
      <JsonLd
        data={[
          serviceLd({ name: data.eyebrow, description: data.lead, path: `${base}/${data.slug}`, serviceType: data.eyebrow }),
          faqLd(faqsFor(data)),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: data.kind === "Service" ? "Services" : "Solutions", path: base },
            { name: data.eyebrow, path: `${base}/${data.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={data.eyebrow}
        title={<>{data.title}<span className="serif-i font-normal text-gradient">{data.highlight}</span></>}
        lead={data.lead}
      />

      {/* how it works */}
      <Section tone="bone">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow={data.kind} title="How it works" lead={data.intro} />
            <Link
              href="/how-it-works"
              className="mono mt-6 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-blue-700 link-underline"
            >
              See our 24-hour kickoff <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal>
            <FeatureGrid features={data.features} cols={2} />
          </Reveal>
        </div>
      </Section>

      {/* outcomes — dark electric band */}
      <Section tone="mesh">
        <div className="orb orb-cyan float-b absolute -right-10 top-0 h-72 w-72 opacity-30" aria-hidden />
        <Reveal>
          <SectionHeading
            onDark
            eyebrow="What you can expect"
            title={<>Outcomes that <span className="serif-i font-normal text-gradient-light">show up in the numbers</span></>}
          />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2">
          {data.outcomes.map((o, i) => (
            <RevealItem
              key={o}
              className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.06] p-5"
            >
              <span className="mono text-sm font-bold text-cyan tnum">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-base font-medium text-white sm:text-lg">{o}</span>
              <Check className="ml-auto h-5 w-5 shrink-0 text-cyan" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* what's included */}
      <Section tone="paper">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="No surprises"
              title="Every engagement includes"
              lead="The rate is all-in. Trained people, smart tooling, and total transparency — handled for you."
            />
          </Reveal>
          <RevealGroup className="grid gap-3">
            {INCLUDED.map((x) => (
              <RevealItem key={x.t} className="flex items-start gap-4 rounded-2xl border border-line bg-paper p-5 shadow-[var(--shadow-sm)]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white" style={{ background: "var(--grad-aurora)" }}>
                  <x.Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-base font-semibold text-ink">{x.t}</span>
                  <span className="mt-0.5 block text-sm text-slate">{x.d}</span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

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
            <span className="text-mute">Explore more:</span>
            <Link href="/solutions/human-vs-ai" className="font-medium text-blue-700 link-underline">Human vs AI</Link>
            <span className="text-line-2">·</span>
            <Link href="/pricing" className="font-medium text-blue-700 link-underline">Pricing</Link>
            <span className="text-line-2">·</span>
            <Link href={base} className="font-medium text-blue-700 link-underline">
              All {data.kind === "Service" ? "services" : "solutions"} <ArrowRight className="inline h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        title={`Ready to launch ${data.eyebrow.toLowerCase()}?`}
        lead="Tell us your goals and volume. We'll scope a precision-trained team within 24 hours and get you live in days."
      />
    </>
  );
}
