import type { Metadata } from "next";
import { Quote, TrendingUp, PhoneCall, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { StatBand } from "@/components/stat-band";
import { CtaBand } from "@/components/cta-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Results — Outbound Call Center Case Studies",
  description:
    "See how GoStaffer clients replaced in-house teams, lifted connect rates and booked more meetings — real outbound and support results, by the numbers.",
  alternates: { canonical: "/results" },
};

const STATS = [
  { value: 500_000, suffix: "+", label: "Dials / month delivered" },
  { value: 2.4, suffix: "M", label: "Calls handled / year" },
  { value: 24, suffix: "h", label: "Average time to launch" },
  { value: 60, suffix: "%", label: "Average cost reduction" },
];

const CASES = [
  {
    Icon: TrendingUp,
    tag: "B2B SaaS · Outbound Sales",
    title: "Replaced a 40-seat domestic team — and beat it in a month",
    body: "A growth-stage software company swapped an expensive in-house SDR floor for a GoStaffer outbound team. Inside four weeks the team passed the old benchmarks on booked demos, at a fraction of the cost.",
    metric: "+ booked demos, − 60% cost",
  },
  {
    Icon: PhoneCall,
    tag: "Insurance · Lead Qualification",
    title: "Turned a flood of raw leads into sales-ready conversations",
    body: "A multi-state agency was drowning in low-quality leads. GoStaffer qualified hard against their ICP and transferred only ready-to-talk prospects — so closers spent time selling, not dialing.",
    metric: "Higher close rate per lead",
  },
  {
    Icon: Clock,
    tag: "E-commerce · Support",
    title: "Never missed another customer during peak season",
    body: "A DTC brand kept losing sales to unanswered calls and chats during promotions. A 24/7 GoStaffer support team picked up every contact and recovered abandoned carts in real time.",
    metric: "Calls answered around the clock",
  },
];

const QUOTES = [
  {
    quote:
      "GoStaffer replaced a 40-seat domestic team and outperformed it inside a month. The economics weren't even the best part — the conversations actually sound like our brand.",
    name: "David Chen",
    role: "VP of Growth, TechFlow",
  },
  {
    quote:
      "We were skeptical about offshore. Within two weeks they knew our product better than some of our own new hires. Booked meetings went up, not down.",
    name: "Marcus Reyes",
    role: "Head of Sales, Northbeam (representative)",
  },
];

export default function Results() {
  return (
    <>
      <PageHero
        eyebrow="Results"
        title={<>The numbers behind the <span className="serif-i font-normal text-gradient">conversations</span></>}
        lead="A decade of outbound and support work, and the same story every time: more booked meetings, higher connect rates, and a cost structure that actually makes sense."
      />

      <StatBand stats={STATS} tone="electric" />

      <Section tone="paper">
        <Reveal>
          <SectionHeading
            eyebrow="Case studies"
            title="What it looks like in practice"
            lead="A few representative engagements. The specifics change by industry — the pattern doesn't."
          />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3">
          {CASES.map((c) => (
            <RevealItem
              key={c.title}
              className="flex flex-col rounded-3xl border border-line bg-paper p-7 shadow-[var(--shadow-sm)]"
            >
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-white"
                style={{ background: "var(--grad-aurora)" }}
              >
                <c.Icon className="h-5 w-5" />
              </span>
              <span className="mono mt-5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-blue-700">
                {c.tag}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink">{c.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{c.body}</p>
              <div className="mt-5 border-t border-line pt-4 font-display text-sm font-semibold text-blue-700">
                {c.metric}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-6 text-xs text-mute">
          Representative engagements for illustration. TODO(owner): replace with named case studies and verified metrics.
        </p>
      </Section>

      <Section tone="bone">
        <Reveal>
          <SectionHeading align="center" eyebrow="In their words" title="Why teams stay" />
        </Reveal>
        <RevealGroup className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
          {QUOTES.map((q) => (
            <RevealItem key={q.name} className="rounded-3xl border border-line bg-paper p-7 shadow-[var(--shadow-sm)]">
              <Quote className="h-7 w-7 text-blue-600" />
              <blockquote className="mt-4 text-balance font-display text-lg font-medium leading-snug text-ink">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-blade-tint font-display text-sm font-bold text-blue-700">
                  {q.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{q.name}</span>
                  <span className="block text-xs text-mute">{q.role}</span>
                </span>
              </figcaption>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand
        title="Your results start with one conversation"
        lead="Tell us your goals and volume — we'll model what a GoStaffer team would do for your numbers, free."
        primaryLabel="Get my estimate"
      />
    </>
  );
}
