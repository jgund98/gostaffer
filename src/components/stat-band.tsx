import { CountUp } from "@/components/count-up";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type Stat = { value: number; suffix?: string; prefix?: string; label: string };
type Tone = "paper" | "bone" | "electric" | "ink";

export function StatBand({
  stats,
  tone = "electric",
  heading,
}: {
  stats: Stat[];
  tone?: Tone;
  heading?: string;
}) {
  const dark = tone === "electric" || tone === "ink";
  return (
    <Section tone={tone} className="py-16 sm:py-20">
      {heading && (
        <Reveal>
          <h2 className={cn("mb-12 max-w-2xl text-2xl font-semibold sm:text-3xl", dark ? "text-white" : "text-ink")}>
            {heading}
          </h2>
        </Reveal>
      )}
      <RevealGroup
        className={cn(
          "grid grid-cols-2 gap-x-6 gap-y-12",
          stats.length === 4 ? "lg:grid-cols-4" : "sm:grid-cols-4"
        )}
      >
        {stats.map((s) => (
          <RevealItem key={s.label} className="relative">
            <span
              className={cn("mb-4 block h-[3px] w-9 rounded-full", dark ? "bg-white/80" : "")}
              style={dark ? undefined : { background: "var(--grad-aurora)" }}
            />
            <div
              className={cn(
                "font-display text-[2.75rem] font-bold leading-none tnum sm:text-5xl lg:text-[3.4rem]",
                dark ? "text-white" : "text-gradient"
              )}
            >
              <CountUp
                to={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                decimals={Number.isInteger(s.value) ? 0 : 1}
              />
            </div>
            <div className={cn("mono mt-3 text-xs uppercase tracking-wider", dark ? "text-white/70" : "text-slate")}>
              {s.label}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
