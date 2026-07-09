const PROOF = [
  "500K+ dials a month",
  "150+ trained agents",
  "Kickoff in 24 hours",
  "Live in days, not months",
  "98% clear, fluent English",
  "60% cheaper than hiring",
  "10+ years in business",
  "2.4M calls a year",
  "Pay only by the minute",
  "Zero platform fees",
];

export function Marquee() {
  const row = [...PROOF, ...PROOF];
  return (
    <section className="block-electric relative overflow-hidden border-y border-white/10 py-5">
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="flex w-max items-center [animation:marquee_45s_linear_infinite]">
          {row.map((p, i) => (
            <span key={i} className="flex items-center">
              <span className="whitespace-nowrap px-7 font-display text-base font-semibold tracking-tight text-white sm:text-lg">
                {p}
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-white/70" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
