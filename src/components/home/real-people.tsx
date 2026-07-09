"use client";

import Image from "next/image";
import { Phone, ShieldCheck, TrendingUp } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { openLiveRep } from "@/components/live-rep";

/* Real people band — puts an actual face on the "hear a real rep" promise.
   Portrait framed with a green ring + edge-blend, fused with live product
   chips so the human and the software read as one thing. */
export function RealPeople() {
  return (
    <Section tone="bone">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.02fr] lg:gap-16">
        {/* left — copy */}
        <Reveal>
          <Eyebrow>The human difference</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-[2.1rem] font-semibold leading-[1.02] text-ink sm:text-4xl md:text-[3rem]">
            Real people.{" "}
            <span className="serif-i font-normal text-gradient">On your phones.</span> Today.
          </h2>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-slate">
            No bots reading a script. Every GoStaffer rep is a trained, coached human who learns
            your business, handles the hard objections, and sounds like they sit in your office —
            because to your customers, they may as well.
          </p>

          <ul className="mt-7 flex flex-col gap-3 text-[0.98rem] text-graphite">
            {[
              { Icon: ShieldCheck, t: "Coached to your targets before they ever go live" },
              { Icon: TrendingUp, t: "Every call scored for quality and sentiment" },
              { Icon: Phone, t: "Warm, neutral-accent English your customers trust" },
            ].map((f) => (
              <li key={f.t} className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blade-tint text-blade-700">
                  <f.Icon className="h-4 w-4" />
                </span>
                {f.t}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={openLiveRep}
            className="btn-electric group/btn mt-9 inline-flex h-[3.25rem] items-center justify-center gap-2.5 rounded-[10px] px-7 text-base font-semibold"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Hear a real rep — live
          </button>
        </Reveal>

        {/* right — portrait fused with live UI chips */}
        <Reveal>
          <div className="relative mx-auto max-w-[30rem] lg:mr-0">
            {/* green glow behind the frame */}
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-blade-500/15 blur-3xl" aria-hidden />

            <div className="grad-ring relative overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-lg)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/img/people/rep-agent.webp"
                  alt="A GoStaffer agent on a live call"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover object-[center_20%]"
                  priority
                />
                {/* subtle brand tint + bottom scrim to seat the chips */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 45%, rgba(5,26,18,0.35) 100%), linear-gradient(120deg, rgba(36,165,109,0.14), transparent 55%)",
                  }}
                  aria-hidden
                />
              </div>
            </div>

            {/* floating chip — live call, top-left */}
            <div className="glass absolute -left-4 top-6 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 shadow-[var(--shadow-md)] sm:-left-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald" />
              </span>
              <span className="text-sm font-semibold text-ink">On a call</span>
              <span className="tnum text-sm text-mute">04:12</span>
            </div>

            {/* floating chip — QA score, bottom-right */}
            <div className="glass absolute -bottom-5 right-2 rounded-xl px-4 py-3 shadow-[var(--shadow-md)] sm:-right-5">
              <div className="mono text-[0.6rem] uppercase tracking-[0.16em] text-mute">Quality score</div>
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-bold text-blade-700">98</span>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald">
                  <TrendingUp className="h-3 w-3" /> sentiment
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
