import type { Metadata } from "next";
import { Check, Sparkles } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { WalletWidget } from "@/components/wallet-widget";
import { CostCalculator } from "@/components/cost-calculator";
import { CtaBand } from "@/components/cta-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { FAQ } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { faqLd, breadcrumbLd } from "@/lib/seo";
import { TIERS } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Call Center Pricing — Simple Hourly Rates, No Fees",
  description:
    "Transparent call center pricing: full-time seats from $7.50–$12/hour all-in, no platform fees, no long contracts. See what an outsourced calling team really costs.",
  alternates: { canonical: "/pricing" },
};

const FAQS = [
  { q: "How does the wallet work?", a: "You fund a wallet via Stripe and draw down by the hour as your team works. Top up automatically or manually — no seat licenses, no platform fees, no surprise invoices." },
  { q: "Is there a minimum commitment?", a: "Seats are full-time — we staff each one at 40 hours a week. There's no long-term lock-in, though: you control the wallet and can pause anytime." },
  { q: "What's included in the hourly rate?", a: "Trained agents, AI assist and QA, the live command center, and your dedicated team lead on the Sales tier. The rate is all-in — infrastructure included." },
  { q: "How fast can we launch?", a: "We kick off within 24 hours and get simple campaigns live in a few days. Setups needing custom tech or extra hiring take a week or two — scoped upfront so you always know the timeline." },
];

export default function Pricing() {
  return (
    <>
      <JsonLd data={[faqLd(FAQS), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }])]} />
      <PageHero
        eyebrow="Pricing"
        title={<>Pay for results, <span className="serif-i font-normal text-gradient">not empty seats</span></>}
        lead="Simple hourly pricing for full-time seats — everything included, billed by the hour. No platform fees, no lock-in. Fund a wallet and watch every dollar in your Portal."
        cta={false}
      />

      <Section tone="bone">
        <RevealGroup className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {TIERS.map((t) => (
            <RevealItem
              key={t.name}
              className={cn(
                "relative flex flex-col rounded-3xl border p-7",
                t.featured
                  ? "border-blade-500/50 bg-paper shadow-[var(--shadow-lg)] ring-1 ring-blade-500/20"
                  : "border-line bg-paper shadow-[var(--shadow-sm)]"
              )}
            >
              {/* badge slot — reserved on every card so titles align */}
              <div className="mb-4 h-6">
                {t.featured && (
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-blade-tint px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blade-700">
                    <Sparkles className="h-3 w-3" /> Top performance
                  </span>
                )}
              </div>
              <h3 className="font-display text-lg font-semibold text-ink">{t.name}</h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-5xl font-bold text-ink">{t.perHr}</span>
                <span className="text-sm text-mute">/hr</span>
              </div>
              <p className="mt-1 text-sm text-mute">≈ {t.perMin}/min</p>
              {/* description + optional note — reserved height so dividers align */}
              <div className="mt-5 min-h-[6.5rem]">
                <p className="text-sm leading-relaxed text-slate">{t.blurb}</p>
                {t.note && <p className="mt-2 text-xs leading-snug text-mute">{t.note}</p>}
              </div>
              <ul className="flex-1 space-y-3 border-t border-line pt-6">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-blade-600" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                href="/contact"
                variant={t.featured ? "primary" : "secondary"}
                size="md"
                className="mt-7 w-full"
              >
                Get Started
              </Button>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-6 text-center text-xs text-mute">
          Full-time seats, staffed at 40 hrs/week. Every tier includes AI assist, live QA, and the command center. Volume pricing available.
        </p>
      </Section>

      <Section tone="paper">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Credit-first model"
              title={<>Fund a wallet. <span className="serif-i font-normal text-gradient">Dial.</span> Repeat.</>}
              lead="No invoicing games. Load credit via Stripe, and every hour draws down in real time — visible to the cent in your Portal."
            />
            <ul className="mt-6 space-y-2.5 text-sm text-slate">
              {[
                "Stripe-powered top-ups & auto-reload",
                "Live balance & burn-rate in the Portal",
                "Per-campaign cost attribution",
                "Pause or scale without renegotiating",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-blade-600" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <WalletWidget />
          </Reveal>
        </div>
      </Section>

      <Section tone="bone">
        <Reveal>
          <SectionHeading
            eyebrow="Model your spend"
            title="What would it cost you?"
            lead="Compare a human-led team against the all-in cost of an AI calling stack at your volume."
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
          <SectionHeading align="center" eyebrow="FAQ" title="Pricing, answered" />
        </Reveal>
        <div className="mt-12">
          <FAQ items={FAQS} />
        </div>
      </Section>

      <CtaBand primaryLabel="Fund your first campaign" />
    </>
  );
}
