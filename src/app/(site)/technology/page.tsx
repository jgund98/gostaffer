import type { Metadata } from "next";
import {
  Boxes,
  Workflow,
  MessageSquareText,
  Mic,
  Gauge,
  Shield,
  Plug,
  Sparkles,
  LayoutDashboard,
  Database,
  Bot,
  Search,
  PenTool,
  Hammer,
  Rocket,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { IntegrationFlow } from "@/components/integration-flow";
import { FeatureGrid } from "@/components/feature-grid";
import { CtaBand } from "@/components/cta-band";
import { FAQ } from "@/components/faq";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { faqLd, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Call Center Technology & AI Implementation",
  description:
    "Beyond calls — custom CRM development, AI agent setup, automation, dashboards and integrations built for your operation. A calling team and a tech partner in one.",
  alternates: { canonical: "/technology" },
};

const WHAT_WE_BUILD = [
  { Icon: Plug, title: "Custom integrations", body: "We connect your CRM, phone system, ticketing, and databases so everything talks to everything — no copy-paste, no silos." },
  { Icon: Bot, title: "AI agents setup", body: "We set up real-time AI assist that puts the right answer in front of every agent, mid-call — built and tuned to your business." },
  { Icon: Workflow, title: "Automation & workflows", body: "We automate the repetitive steps — routing, dispositions, follow-ups — so your team spends time on what matters." },
  { Icon: LayoutDashboard, title: "Custom dashboards", body: "Live reporting built around the numbers you actually care about, visible to the cent in real time." },
  { Icon: Database, title: "Data migration & hygiene", body: "We clean, structure, and move your data — so the whole operation runs on records you can trust." },
  { Icon: MessageSquareText, title: "Voice & chat AI", body: "We deploy AI where it genuinely helps — qualification, FAQs, after-hours — always backed by real people." },
  { Icon: Gauge, title: "QA & analytics", body: "Every interaction auto-scored for tone, adherence, and outcome — so quality stays high as you scale." },
  { Icon: Boxes, title: "Custom CRM development", body: "When off-the-shelf won't do, we build a custom CRM — and the glue between your systems and our calling workflow — around exactly how your team works." },
];

const AI_WORKFLOWS = [
  { Icon: MessageSquareText, title: "The best things to say, ready to go", body: "We study your winning calls and build proven answers to every objection your buyers raise." },
  { Icon: Mic, title: "Realistic practice before going live", body: "Agents rehearse against lifelike scenarios until they beat your targets — before they call a single customer." },
  { Icon: Gauge, title: "Live coaching on every call", body: "The right thing to say appears for the agent in the moment, so every call goes smoothly." },
  { Icon: Sparkles, title: "Every call reviewed, not just a few", body: "Each call is automatically scored for tone and outcome — so quality stays high as you grow." },
];

const PROCESS = [
  { Icon: Search, n: "01", title: "Discover", body: "We map your systems, your goals, and where the friction is — and find the highest-leverage thing to build first." },
  { Icon: PenTool, n: "02", title: "Design", body: "We scope the integration, AI, or automation and show you exactly what it'll do before we build a thing." },
  { Icon: Hammer, n: "03", title: "Build", body: "Our team builds and tests the solution against your real workflow — not a demo." },
  { Icon: Rocket, n: "04", title: "Deploy", body: "We roll it out alongside your calling team, usually fast, with everything visible in your Command Center." },
  { Icon: LifeBuoy, n: "05", title: "Support", body: "We monitor, tune, and improve it as you grow. Maintenance is on us, not you." },
];

const FAQS = [
  { q: "Do you build custom solutions, or just provide agents?", a: "Both. For almost every client we also build the technical solution behind the calls — integrations, AI assist, automation, dashboards, or custom middleware. The people and the technology come together." },
  { q: "What systems do you work with?", a: "We connect to the CRM, phone system, help desk, and databases you already use — and build custom middleware where something off-the-shelf won't do, so our agents work right inside your stack." },
  { q: "Do you replace our team with AI?", a: "No. We put AI behind your people — coaching, practice, QA, and assist — and only deploy AI on the phone or chat where it genuinely helps. A real person stays in the loop." },
  { q: "How long does an implementation take?", a: "We kick off within 24 hours. A straightforward calling campaign goes live in a few days; custom builds — integrations, AI assist, middleware — usually take a week or two and are scoped upfront so you know the timeline before we start. We deploy in stages so you see value early." },
];

export default function Technology() {
  return (
    <>
      <JsonLd data={[faqLd(FAQS), breadcrumbLd([{ name: "Home", path: "/" }, { name: "Technology & AI", path: "/technology" }])]} />
      <PageHero
        eyebrow="Technology & AI"
        title={<>We don&apos;t just make calls — we build the <span className="serif-i font-normal text-gradient">technology behind them</span></>}
        lead="For almost every client, we implement the technical solution to their problem: custom integrations, AI, automation, dashboards, and the middleware that ties it all together. You get a calling team and a tech partner in one."
      />

      {/* what we build */}
      <Section tone="bone">
        <Reveal>
          <SectionHeading
            eyebrow="What we build"
            title="A technical partner, not just a vendor"
            lead="Whatever's slowing your operation down, there's a good chance we can build the fix — and run it for you."
          />
        </Reveal>
        <div className="mt-12">
          <FeatureGrid
            features={WHAT_WE_BUILD}
            trailing={
              <a
                href="/contact"
                className="group relative flex w-full flex-col justify-between overflow-hidden p-6 text-white sm:p-7"
                style={{ background: "var(--grad-aurora)" }}
              >
                <span className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/15 blur-2xl" aria-hidden />
                <span className="relative">
                  <span className="mono text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white/80">
                    Don&apos;t see it?
                  </span>
                  <span className="mt-3 block font-display text-xl font-semibold leading-snug">
                    If you can describe the problem, there&apos;s a good chance we can build the fix.
                  </span>
                </span>
                <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Tell us what&apos;s slowing you down
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            }
          />
        </div>
      </Section>

      {/* integration flow */}
      <Section tone="paper">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Everything in one place"
            title={<>Your tools and our team, <span className="serif-i font-normal text-gradient">working together</span></>}
            lead="Your customer information flows into one simple screen our agents use to make every call — and everything they do flows right back into your systems. Flip the switch below to see how your own team can use the exact same screen."
          />
        </Reveal>
        <div className="mt-14">
          <IntegrationFlow />
        </div>
      </Section>

      {/* AI implementation — dark band */}
      <Section tone="mesh">
        <div className="orb orb-cyan float-b absolute -right-10 top-0 h-72 w-72 opacity-30" aria-hidden />
        <Reveal>
          <SectionHeading
            onDark
            eyebrow="AI implementation"
            title={<>AI that makes great agents <span className="serif-i font-normal text-gradient-light">even better</span></>}
            lead="We've spent years deploying AI in real call operations. It runs quietly in the background — coaching, practice, and quality checks — never as a robot on the phone with your customers."
          />
        </Reveal>
        <div className="mt-12">
          <FeatureGrid features={AI_WORKFLOWS} cols={2} />
        </div>
      </Section>

      {/* build process */}
      <Section tone="bone">
        <Reveal>
          <SectionHeading
            eyebrow="How we build"
            title="From your problem to a working solution"
            lead="A clear, low-lift process — we scope it before we build it, and you see value early."
          />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-5">
          {PROCESS.map((p) => (
            <RevealItem key={p.n} className="flex flex-col rounded-2xl border border-line bg-paper p-5 shadow-[var(--shadow-sm)]">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: "var(--grad-aurora)" }}>
                  <p.Icon className="h-5 w-5" />
                </span>
                <span className="mono text-sm font-bold text-blue-700/40 tnum">{p.n}</span>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">{p.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* middleware story */}
      <Section tone="paper">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Built around your business"
              title={<><Boxes className="mb-1 mr-2 inline h-7 w-7 text-blue-600" />We connect to what you already use</>}
              lead="We recently built a custom connection straight into a client's own systems — so our agents work right inside their tools, and the client's own team uses the very same setup. No ripping anything out, no new software for you to learn."
            />
          </Reveal>
          <RevealGroup className="grid gap-3">
            {[
              { Icon: Plug, t: "Works with the tools you have", d: "CRM, phone system, help desk — we meet your team where they already work." },
              { Icon: Workflow, t: "Set up around how you work", d: "Your process, your rules, built into the calling system." },
              { Icon: Shield, t: "Safe & compliant by default", d: "Recording, consent, and routing handled for you." },
            ].map((x) => (
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
          <SectionHeading align="center" eyebrow="Questions" title="Technology & AI, answered" />
        </Reveal>
        <div className="mt-12">
          <FAQ items={FAQS} />
        </div>
      </Section>

      <CtaBand
        title="Have a technical problem worth solving?"
        lead="Tell us what's slowing you down. We'll scope the build, and have a team — and a solution — in motion fast."
        primaryLabel="Talk to an expert"
      />
    </>
  );
}
