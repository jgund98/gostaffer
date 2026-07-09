import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { SignalRings } from "@/components/fx";
import { CALENDAR_URL } from "@/lib/site";

export function CtaBand({
  title = "Ready to grow without the hiring headaches?",
  lead = "Kick off in 24 hours and have a trained team on your phones in days. You only pay for results — never empty seats.",
  primaryHref = "/contact",
  primaryLabel = "Get Started",
}: {
  title?: string;
  lead?: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <section
      data-anim
      className="relative overflow-hidden py-[var(--section-y)]"
      style={{ background: "linear-gradient(125deg, #08281b 0%, #0e3a28 46%, #051a12 100%)" }}
    >
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* colored glows */}
      <div className="absolute left-[12%] top-[-10%] h-[55vh] w-[55vh] rounded-full bg-cyan/30 blur-[120px]" />
      <div className="absolute right-[8%] bottom-[-20%] h-[55vh] w-[55vh] rounded-full bg-violet/30 blur-[120px]" />
      <div className="absolute left-1/2 top-1/2 h-[40vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blade-500/20 blur-[120px]" />
      {/* broadcast signal rings */}
      <SignalRings className="absolute left-1/2 top-1/2 w-[44rem] max-w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-40" count={5} />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-balance text-4xl font-semibold text-white sm:text-5xl lg:text-[3.4rem]">
              {title}
            </h2>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">{lead}</p>
          </Reveal>
          <Reveal>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={primaryHref} size="lg">
                {primaryLabel} <ArrowRight className="h-4 w-4" />
              </Button>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-[10px] border border-white/20 px-7 text-base font-semibold text-white transition-colors hover:border-white/50"
              >
                Book a 15-min call
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
