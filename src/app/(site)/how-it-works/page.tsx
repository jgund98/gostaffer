import type { Metadata } from "next";
import { ClipboardList, Sparkles, GraduationCap, Rocket, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { CtaBand } from "@/components/cta-band";
import { FAQ } from "@/components/faq";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { faqLd, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How It Works — A Calling Team, Live in Days",
  description:
    "From kickoff to live dialing: how GoStaffer learns your offer, builds your playbook, trains skilled agents and gets you live in days — billed by the minute.",
  alternates: { canonical: "/how-it-works" },
};

const STEPS = [
  {
    Icon: ClipboardList,
    n: "01",
    title: "We learn your business",
    body: "On a short kickoff call we get your offer, your ideal customer, and your goals. Share a few of your best calls or scripts and we'll absorb the rest — no lengthy documentation required.",
    you: "30-minute kickoff call",
    us: "We study your offer, lists, and best calls",
  },
  {
    Icon: Sparkles,
    n: "02",
    title: "We build your playbook",
    body: "We turn what already works into a clear script with the right answer to every objection your buyers raise — and connect to the tools you already use, so nothing changes on your end.",
    you: "Approve the script & connect your tools",
    us: "Build the playbook, objection trees & integration",
  },
  {
    Icon: GraduationCap,
    n: "03",
    title: "We train your team",
    body: "Your dedicated agents drill against realistic scenarios until they beat your targets — before they ever call a real customer. You meet your team lead and sign off.",
    you: "Meet your team lead",
    us: "Train & rehearse agents to your benchmark",
  },
  {
    Icon: Rocket,
    n: "04",
    title: "You go live",
    body: "Simple campaigns start dialing within days; setups that need custom tech or extra hiring take a week or two — scoped upfront. Then you watch every call, connect rate, and conversion in real time from your Command Center as we tune.",
    you: "Watch results roll in live",
    us: "Launch, monitor, and optimize daily",
  },
];

const FAQS = [
  { q: "What does '24 hours' actually mean?", a: "It's how fast we get moving: within 24 hours of our call we've scoped your campaign and started building. Going fully live is usually a few days for simple campaigns; if you need custom tech or extra hiring it's typically a week or two. We tell you the exact timeline upfront — no surprises." },
  { q: "How much work is this for me?", a: "Very little. A kickoff call, a quick script approval, and a meet-and-greet with your team lead. We do the building, training, and tuning." },
  { q: "Do I have to change my software?", a: "No. We connect to the CRM, phone system, and tools you already use, so your team keeps working exactly as they do today." },
  { q: "What if it's not working?", a: "You see everything live, and we tune daily. Because you pay by the minute with no long lock-in, you stay in control the whole way." },
];

export default function HowItWorks() {
  return (
    <>
      <JsonLd data={[faqLd(FAQS), breadcrumbLd([{ name: "Home", path: "/" }, { name: "How It Works", path: "/how-it-works" }])]} />
      <PageHero
        eyebrow="How it works"
        title={<>From first call with us to <span className="serif-i font-normal text-gradient">live on your phones</span></>}
        lead="No six-week implementation, no IT project. Here's exactly what happens — and how little of it lands on you."
      />

      <Section tone="bone">
        <div className="flex flex-col gap-6">
          {STEPS.map((s) => (
            <Reveal key={s.n}>
              <div className="grid gap-6 rounded-3xl border border-line bg-paper p-6 shadow-[var(--shadow-sm)] sm:grid-cols-[auto_1fr] sm:p-8">
                <div className="flex items-start gap-4">
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-display text-lg font-bold text-white"
                    style={{ background: "var(--grad-aurora)" }}
                  >
                    {s.n}
                  </span>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
                    <s.Icon className="h-5 w-5 text-blue-600" /> {s.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate">{s.body}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-bone p-3">
                      <span className="mono text-[0.62rem] font-semibold uppercase tracking-wider text-mute">Your part</span>
                      <p className="mt-0.5 text-sm font-medium text-ink">{s.you}</p>
                    </div>
                    <div className="rounded-xl bg-blade-tint p-3">
                      <span className="mono text-[0.62rem] font-semibold uppercase tracking-wider text-blue-700">We handle</span>
                      <p className="mt-0.5 text-sm font-medium text-ink">{s.us}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Why it's this fast"
              title="AI-powered onboarding, human-run calls"
              lead="The slow part of standing up a calling team is everything before the first dial. We compress it with smart tooling — then put trained people on the phones."
            />
          </Reveal>
          <RevealGroup className="grid gap-3">
            {[
              "No long documentation — we learn from your real calls",
              "Connects to your existing CRM & phone system",
              "Agents rehearse against AI before going live",
              "You watch every result in real time from day one",
            ].map((t) => (
              <RevealItem key={t} className="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3.5 shadow-[var(--shadow-sm)]">
                <Check className="h-4 w-4 shrink-0 text-blue-600" />
                <span className="text-sm font-medium text-ink">{t}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section tone="bone">
        <Reveal>
          <SectionHeading align="center" eyebrow="Questions" title="Getting started, answered" />
        </Reveal>
        <div className="mt-12">
          <FAQ items={FAQS} />
        </div>
      </Section>

      <CtaBand
        title="Start the 24-hour clock"
        lead="Book a kickoff call. Within 24 hours we'll have your campaign scoped and the build underway — and you live in days."
      />
    </>
  );
}
