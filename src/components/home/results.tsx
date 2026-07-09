import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { RotatingReviews, type Review } from "@/components/rotating-reviews";

const OUTCOMES = [
  { k: "40 seats", v: "replaced — and beaten" },
  { k: "< 1 mo", v: "to outperform the old team" },
  { k: "60%", v: "lower cost to run" },
];

const REVIEWS: Review[] = [
  {
    quote:
      "GoStaffer replaced a 40-seat domestic team and outperformed it inside a month. The economics weren't even the best part — the conversations actually sound like our brand.",
    name: "David Chen",
    role: "VP of Growth, TechFlow",
    tag: "B2B SaaS",
  },
  {
    quote:
      "Our lead response time went from hours to minutes. Bound policies are up, and my agents finally spend their day closing instead of chasing.",
    name: "Maria Alvarez",
    role: "Founder, Coastline Insurance Group",
    tag: "Insurance",
  },
  {
    quote:
      "These are sensitive calls, so I was nervous about outsourcing. Two weeks in, our enrollment quality was honestly better than our in-house team's.",
    name: "James Whitfield",
    role: "COO, Summit Financial Relief",
    tag: "Financial",
  },
  {
    quote:
      "During our holiday rush they answered every call and recovered carts in real time. We didn't miss a beat — or a sale.",
    name: "Priya Nair",
    role: "Director of CX, Lumen Home",
    tag: "E-commerce",
  },
  {
    quote:
      "No-shows dropped noticeably once GoStaffer took over our reminders and scheduling. Patients keep telling us the agents are warm and easy to understand.",
    name: "Dr. Karen Liu",
    role: "Practice Manager, BrightSmile Dental",
    tag: "Healthcare",
  },
  {
    quote:
      "Speed-to-lead was killing us — leads went cold before we could call. GoStaffer calls in under a minute now, and our showing rate jumped.",
    name: "Marcus Reyes",
    role: "Team Lead, Northbeam Realty",
    tag: "Real Estate",
  },
];

export function Results() {
  return (
    <Section tone="electric" bleed className="py-[var(--section-y)]">
      <div className="orb orb-cyan float-b absolute right-0 top-0 h-72 w-72 opacity-30" aria-hidden />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* left — headline + outcomes + CTAs */}
          <Reveal>
            <Eyebrow onDark>The proof</Eyebrow>
            <h2 className="mt-4 text-balance text-[2.1rem] font-semibold leading-[1.04] text-white sm:text-4xl md:text-[2.9rem]">
              Teams that switch to GoStaffer{" "}
              <span className="serif-i font-normal text-white/85">don&apos;t look back.</span>
            </h2>

            <div className="mt-10 grid grid-cols-3 gap-5">
              {OUTCOMES.map((o) => (
                <div key={o.v} className="border-l-2 border-white/25 pl-4">
                  <div className="whitespace-nowrap font-display text-2xl font-bold leading-none text-white sm:text-[1.9rem]">
                    {o.k}
                  </div>
                  <div className="mono mt-2.5 text-[0.62rem] uppercase leading-relaxed tracking-[0.12em] text-white/70">
                    {o.v}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="/results"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-white px-6 text-[0.95rem] font-semibold text-blue-700 transition-transform hover:-translate-y-0.5"
              >
                See client results <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="mono inline-flex items-center gap-1.5 px-1 text-sm font-semibold uppercase tracking-wider text-white link-underline"
              >
                Get this for your business →
              </Link>
            </div>
          </Reveal>

          {/* right — rotating reviews */}
          <Reveal>
            <RotatingReviews reviews={REVIEWS} />
          </Reveal>
        </div>

        <p className="mt-8 text-xs text-white/55">
          Representative results &amp; reviews shown for illustration. Your numbers depend on your offer, lists, and volume.
        </p>
      </Container>
    </Section>
  );
}
