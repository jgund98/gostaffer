import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";

/* Human-proof band — a full-bleed portrait with a green scrim on its airy
   side, carrying one confident line. A real human beat right before the CTA. */
export function HumanProof() {
  return (
    <section className="relative overflow-hidden">
      {/* the photo fills the band; negative space sits on the left */}
      <Image
        src="/img/people/rep-glasses.webp"
        alt="A GoStaffer customer-service agent smiling on a call"
        fill
        sizes="100vw"
        className="object-cover object-[75%_center]"
        priority={false}
      />
      {/* green scrim — opaque on the left for legibility, clearing toward the face */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,26,18,0.92) 0%, rgba(6,32,24,0.78) 34%, rgba(8,40,27,0.30) 58%, transparent 78%)",
        }}
        aria-hidden
      />

      <Container className="relative">
        <div className="max-w-xl py-24 sm:py-28 lg:py-36">
          <Reveal>
            <span className="mono inline-flex items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-cyan">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              Real, not robotic
            </span>
            <p className="mt-6 text-balance font-display text-3xl font-semibold leading-[1.08] text-white sm:text-4xl md:text-[2.9rem]">
              Your customers hear a person who{" "}
              <span className="serif-i font-normal text-gradient-light">actually cares</span> — never
              a script.
            </p>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-white/70">
              Warm, fluent, and coached every week. It&apos;s the difference between a call that
              converts and one that gets hung up on.
            </p>

            <div className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
              {[
                { k: "98%", v: "Neutral-accent fluency" },
                { k: "100%", v: "Calls scored & coached" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-3xl font-bold text-white">{s.k}</div>
                  <div className="mono mt-1.5 text-[0.62rem] uppercase tracking-[0.14em] text-white/60">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
