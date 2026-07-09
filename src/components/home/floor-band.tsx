import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";

/* Floor band — a cinematic, full-bleed look inside the actual room that runs
   your calls. Deliberately different from the HumanProof portrait band: a wide
   environmental "live ops" scene with centered copy + live-floor stats.
   The <Image> is a direct child (not inside Reveal) so it loads eagerly. */
const LIVE = [
  { k: "47", v: "Agents live" },
  { k: "1,284", v: "Calls today" },
  { k: "0:09", v: "Avg. pickup" },
];

export function FloorBand() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/img/people/floor.webp"
        alt="GoStaffer agents taking calls on the floor"
        fill
        sizes="100vw"
        className="object-cover object-[center_38%]"
      />
      {/* cinematic green grade — top & bottom vignette for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,20,14,0.86) 0%, rgba(5,26,18,0.55) 42%, rgba(5,26,18,0.58) 58%, rgba(3,16,11,0.92) 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(120deg, rgba(36,165,109,0.16), transparent 55%)" }}
        aria-hidden
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl py-24 text-center sm:py-28 lg:py-32">
          <Reveal>
            <span className="mono inline-flex items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-cyan">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              On the floor — right now
            </span>
            <p className="mt-6 text-balance font-display text-3xl font-semibold leading-[1.06] text-white sm:text-4xl md:text-[3rem]">
              This is the room that{" "}
              <span className="serif-i font-normal text-gradient-light">answers your phones.</span>
            </p>
            <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/70">
              No offshore mystery, no bots on a loop — a managed floor of trained agents, live every
              business hour, working your campaigns like they sit down the hall.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {LIVE.map((s) => (
                <div key={s.v} className="text-center">
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
