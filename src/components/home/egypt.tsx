import { Languages, Clock, TrendingDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { Parallax } from "@/components/parallax";
import { CountUp } from "@/components/count-up";
import { CallNetwork } from "@/components/call-network";

const STATS = [
  { Icon: Languages, value: 98, suffix: "%", label: "Clear, fluent English" },
  { Icon: Clock, value: 24, suffix: "/7", label: "Coverage in your time zone" },
  { Icon: TrendingDown, value: 60, suffix: "%", label: "Cheaper than hiring at home" },
];

export function Egypt() {
  return (
    <Section tone="paper">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="An American company"
              title={<>A U.S. company. A <span className="serif-i font-normal text-gradient">world-class team.</span></>}
              lead="GoStaffer is headquartered in West Palm Beach, Florida — so you're working with an American company you can hold accountable. Our calling team is based in Cairo, where we hire the top bilingual talent, putting world-class staff on your phones for a fraction of what it costs to hire at home."
            />
          </Reveal>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {STATS.map((s) => (
              <Reveal key={s.label}>
                <div className="h-full bg-paper p-5">
                  <s.Icon className="h-5 w-5 text-blue-600" />
                  <div className="mt-3 font-display text-3xl font-bold text-ink">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mono mt-1.5 text-[0.66rem] uppercase tracking-wider text-slate">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mesh relative overflow-hidden rounded-3xl border border-white/10 p-3 shadow-[var(--shadow-lg)] sm:p-4">
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden />
            <Parallax speed={26} className="relative">
              <CallNetwork />
            </Parallax>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
