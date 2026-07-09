import { Bot, Globe2, Check, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Mark } from "@/components/logo";

const PROBLEMS = [
  {
    key: "ai",
    tag: "Option A",
    title: "Robocallers & AI bots",
    Icon: Bot,
    cons: ["Sound robotic", "Can't build real trust", "Break and need babysitting"],
  },
  {
    key: "bpo",
    tag: "Option B",
    title: "Old-school call centers",
    Icon: Globe2,
    cons: ["Never learn your business", "Locked-in contracts & hidden fees", "Weeks to get running"],
  },
];

const PROS = [
  "Skilled, friendly agents who actually close",
  "Smart technology coaching every call",
  "Pay by the minute — no platform fees",
  "Kickoff in 24 hours, live in days",
  "Works inside the tools you already use",
  "See every call and result in real time",
];

export function Hybrid() {
  return (
    <Section tone="bone">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="A better way"
          title={
            <>
              Robots annoy customers. Big call centers{" "}
              <span className="serif-i font-normal text-gradient">don&apos;t get your business.</span>
            </>
          }
          lead="There's a better option: real, professional people who sound like part of your team — backed by smart technology that makes them faster, sharper, and far more affordable than hiring in-house."
        />
      </Reveal>

      <div className="mx-auto mt-14 max-w-4xl">
        {/* the two also-rans — deliberately small & muted */}
        <RevealGroup className="grid gap-3 sm:grid-cols-2">
          {PROBLEMS.map((p) => (
            <RevealItem key={p.key} className="h-full">
              {/* styling/hover live on this inner div, NOT the framer-animated
                  RevealItem — a CSS `transition` on the reveal element re-animates
                  framer's per-frame opacity/transform writes and flickers. */}
              <div className="h-full rounded-2xl border border-line bg-paper/50 p-5 opacity-80 transition-opacity duration-300 lg:hover:opacity-100">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-cloud text-mute">
                  <p.Icon className="h-4 w-4" />
                </span>
                <div>
                  <span className="mono block text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-mute">
                    {p.tag}
                  </span>
                  <h3 className="font-display text-sm font-semibold text-graphite">{p.title}</h3>
                </div>
              </div>
              <ul className="mt-3 flex flex-col gap-1.5">
                {p.cons.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-[0.82rem] text-mute">
                    <X className="h-3.5 w-3.5 shrink-0" />
                    <span className="line-through decoration-mute/40">{c}</span>
                  </li>
                ))}
              </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* connective tissue */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="h-px flex-1 bg-line" />
          <span className="mono px-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-blade-700">
            So we built a third way
          </span>
          <div className="h-px flex-1 bg-line" />
        </div>

        {/* the answer — a dominant dark electric panel that visually wins */}
        <Reveal>
          <div
            data-anim
            className="mesh mesh-animated relative overflow-hidden rounded-[1.75rem] p-8 text-white shadow-[var(--shadow-lg)] ring-1 ring-blade-500/30 sm:p-10"
          >
            <div className="orb orb-cyan float-b absolute -right-10 -top-10 h-56 w-56 opacity-40" aria-hidden />
            <div className="orb orb-indigo float-a absolute -bottom-16 -left-10 h-64 w-64 opacity-30" aria-hidden />
            <Mark
              white
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -right-10 h-60 w-60 -rotate-12 select-none opacity-[0.06]"
            />

            <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <span className="mono inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cyan">
                  <span className="h-[6px] w-[6px] rotate-45 bg-cyan" />
                  The GoStaffer way
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-[2rem]">
                  Real people your customers trust — at a price that{" "}
                  <span className="serif-i font-normal text-gradient-light">finally makes sense.</span>
                </h3>
                <Link
                  href="/solutions/human-vs-ai"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan transition-colors hover:text-white"
                >
                  See how the costs compare <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <ul className="grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                {PROS.map((pro) => (
                  <li key={pro} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cyan/20">
                      <Check className="h-3 w-3 text-cyan" />
                    </span>
                    <span className="text-white/90">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
