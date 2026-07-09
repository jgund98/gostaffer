"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Minus, Plus, TrendingDown } from "lucide-react";
import { AI_COST, GOSTAFFER_RATE } from "@/lib/site";
import { fmtUSD, cn } from "@/lib/utils";

const AI_SEGMENTS = [
  { key: "stt", label: "Voice recognition", value: 0.024, color: "#94a3b8" },
  { key: "llm", label: "AI model", value: 0.15, color: "#e0a93a" },
  { key: "tts", label: "Voice synthesis", value: 0.16, color: "#d98324" },
  { key: "sip", label: "Phone line", value: 0.03, color: "#a8b3c4" },
  { key: "orch", label: "Setup & upkeep", value: 0.01, color: "#cbd5e1" },
];
const AI_PER_MIN = AI_SEGMENTS.reduce((s, x) => s + x.value, 0);
const CB_PER_MIN = GOSTAFFER_RATE.perMin;

function Stepper({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-end justify-between">
        <label className="text-sm font-medium text-slate">{label}</label>
        <span className="font-display text-lg font-bold text-ink tnum">{format(value)}</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => onChange(Math.max(min, value - step))}
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-2 text-slate transition-colors hover:border-blade-500 hover:text-blade-700 sm:inline-flex"
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="cb-range flex-1"
          style={{ "--pct": `${pct}%` } as React.CSSProperties}
        />
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => onChange(Math.min(max, value + step))}
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line-2 text-slate transition-colors hover:border-blade-500 hover:text-blade-700 sm:inline-flex"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function CostCalculator({
  variant = "full",
  className,
}: {
  variant?: "full" | "teaser";
  className?: string;
}) {
  const [agents, setAgents] = useState(5);
  const [minutes, setMinutes] = useState(10000);
  const reduce = useReducedMotion();

  const calc = useMemo(() => {
    const aiPerAgent = AI_PER_MIN * minutes;
    const cbPerAgent = CB_PER_MIN * minutes;
    const savings = (aiPerAgent - cbPerAgent) * agents;
    return { aiPerAgent, cbPerAgent, savings };
  }, [agents, minutes]);

  const maxBar = Math.max(calc.aiPerAgent, calc.cbPerAgent);
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 120, damping: 20 };

  return (
    <div className={cn("card overflow-hidden rounded-3xl", variant === "full" ? "p-6 sm:p-9" : "p-5 sm:p-7", className)}>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* controls */}
        <div className="flex flex-col gap-6">
          <Stepper label="Agents" value={agents} min={1} max={50} step={1} onChange={setAgents} format={(v) => `${v}`} />
          <Stepper
            label="Monthly agent minutes"
            value={minutes}
            min={2000}
            max={30000}
            step={500}
            onChange={setMinutes}
            format={(v) => v.toLocaleString("en-US")}
          />

          <div className="mt-1 rounded-2xl border border-line bg-mist p-4">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-mute">
              <span>What AI calling really costs / min</span>
              <span className="text-amber">
                {fmtUSD(AI_COST.perMinLo, 2)}–{fmtUSD(AI_COST.perMinHi, 2)}
              </span>
            </div>
            <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-cloud">
              {AI_SEGMENTS.map((s) => (
                <motion.div
                  key={s.key}
                  className="h-full"
                  style={{ background: s.color }}
                  initial={false}
                  animate={{ width: `${(s.value / AI_PER_MIN) * 100}%` }}
                  transition={{ duration: 0.4 }}
                  title={`${s.label}: ${fmtUSD(s.value, 3)}/min`}
                />
              ))}
            </div>
            <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate">
              {AI_SEGMENTS.map((s) => (
                <span key={s.key} className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm" style={{ background: s.color }} />
                  {s.label} {fmtUSD(s.value, s.value < 0.1 ? 3 : 2)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* comparison */}
        <div className="flex flex-col gap-5">
          <CompareRow
            tone="ai"
            title="An AI calling system"
            perMin={`${fmtUSD(AI_COST.perMinLo, 2)}–${fmtUSD(AI_COST.perMinHi, 2)}/min`}
            monthly={calc.aiPerAgent}
            barPct={(calc.aiPerAgent / maxBar) * 100}
            spring={spring}
            sub="Sounds robotic · can't adapt · constant upkeep"
          />
          <CompareRow
            tone="cb"
            title="A GoStaffer agent"
            perMin={`${fmtUSD(CB_PER_MIN, 2)}/min`}
            monthly={calc.cbPerAgent}
            barPct={(calc.cbPerAgent / maxBar) * 100}
            spring={spring}
            sub="Real conversations · adapts instantly · kickoff in 24h"
          />

          <div className="mt-1 rounded-2xl border border-blade-500/30 bg-blade-tint p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-blade-700">
              <TrendingDown className="h-4 w-4" />
              Estimated monthly savings
            </div>
            <div className="mt-1 font-display text-4xl font-bold text-ink tnum sm:text-5xl">
              {fmtUSD(calc.savings)}
            </div>
            <p className="mt-1 text-sm text-slate">
              vs. an AI stack across {agents} agent{agents > 1 ? "s" : ""} —
              <span className="font-medium text-ink"> and they actually close deals.</span>
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-[11px] leading-relaxed text-mute">
        Estimates only. AI figures add up the published costs of the five tools every AI calling system
        runs on, and vary by provider and call complexity. GoStaffer pricing shown at our Outbound Sales rate.
      </p>
    </div>
  );
}

function CompareRow({
  tone,
  title,
  perMin,
  monthly,
  barPct,
  spring,
  sub,
}: {
  tone: "ai" | "cb";
  title: string;
  perMin: string;
  monthly: number;
  barPct: number;
  spring: object;
  sub: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-ink">{title}</span>
        <span className="text-xs text-mute">{perMin}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-9 flex-1 overflow-hidden rounded-lg bg-cloud">
          <motion.div
            className={cn("h-full rounded-lg", tone === "ai" ? "bg-amber" : "bg-blade-500")}
            initial={false}
            animate={{ width: `${Math.max(6, barPct)}%` }}
            transition={spring}
          />
        </div>
        <span className="w-24 shrink-0 text-right font-display text-base font-bold text-ink tnum">
          {fmtUSD(monthly)}
        </span>
      </div>
      <p className="mt-1 text-[11px] text-mute">{sub}</p>
    </div>
  );
}
