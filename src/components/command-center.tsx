"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Phone, PhoneCall, Coffee, CheckCircle2, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "On Call" | "Wrap" | "Available";
const STATUSES: Status[] = ["On Call", "Wrap", "Available"];
const AGENTS = ["Mariam H.", "Youssef A.", "Nadia K.", "Omar S.", "Layla M.", "Karim T."];

const statusStyle: Record<Status, { dot: string; text: string }> = {
  "On Call": { dot: "bg-blade-400", text: "text-blade-300" },
  Wrap: { dot: "bg-amber", text: "text-amber" },
  Available: { dot: "bg-emerald-400", text: "text-emerald-300" },
};

const SEED = [62, 64, 63, 67, 66, 70, 69, 73, 72, 76, 75, 79, 78, 82, 81, 85, 84, 88, 87, 91, 90, 94, 93, 97];

export function CommandCenter({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10%" });
  const reduce = useReducedMotion();

  const [dials, setDials] = useState(16240);
  const [connect, setConnect] = useState(58.6);
  const [conv, setConv] = useState(642);
  const [talk, setTalk] = useState(4.6);
  const [series, setSeries] = useState<number[]>(SEED);
  const [agentStatus, setAgentStatus] = useState<Status[]>([
    "On Call", "On Call", "Wrap", "Available", "On Call", "Wrap",
  ]);
  const [ping, setPing] = useState<string | null>(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    if (reduce) {
      setBooting(false);
      return;
    }
    const t = setTimeout(() => setBooting(false), 1900);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => {
      // Numbers only ever climb — a floor that's already strong and keeps scaling up.
      setDials((d) => d + Math.floor(Math.random() * 6) + 2);
      setConnect((c) => clamp(c + (Math.random() - 0.35) * 0.5, 56, 67));
      setConv((c) => (Math.random() > 0.45 ? c + 1 : c));
      setTalk((t) => clamp(t + (Math.random() - 0.5) * 0.18, 4.1, 5.3));
      setSeries((s) => [...s.slice(1), clamp(s[s.length - 1] + (Math.random() - 0.38) * 8, 64, 100)]);
      setAgentStatus((arr) => {
        const i = Math.floor(Math.random() * arr.length);
        const next = [...arr];
        next[i] = STATUSES[Math.floor(Math.random() * STATUSES.length)];
        return next;
      });
    }, 1400);
    return () => clearInterval(id);
  }, [inView, reduce]);

  useEffect(() => {
    if (!inView || reduce) return;
    const msgs = [
      "🔥 New booked demo — Acme Corp",
      "✅ Daily target hit: 18,000 dials",
      "📈 Connect rate up 4% this hour",
      "💸 Deal closed — $24,000 ARR",
    ];
    let i = 0;
    const id = setInterval(() => {
      setPing(msgs[i % msgs.length]);
      i++;
      setTimeout(() => setPing(null), 3200);
    }, 6000);
    return () => clearInterval(id);
  }, [inView, reduce]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-abyss p-3 shadow-[var(--shadow-lg)] ring-1 ring-blade-500/20 sm:p-4",
        className
      )}
      style={{ contain: "paint" }}
    >
      <div className="flex items-center justify-between rounded-t-2xl border-b border-white/10 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-2 text-xs font-medium text-white/55">GoStaffer · Command Center</span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live
        </span>
      </div>

      <div className="grid gap-3 p-2 sm:grid-cols-2">
        <Kpi label="Dials today" value={dials.toLocaleString("en-US")} Icon={Phone} accent />
        <Kpi label="Connect rate" value={`${connect.toFixed(1)}%`} Icon={Activity} />
        <Kpi label="Conversions" value={conv.toLocaleString("en-US")} Icon={CheckCircle2} />
        <Kpi label="Avg talk time" value={`${talk.toFixed(1)}m`} Icon={PhoneCall} />

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:col-span-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-white/55">Dials / hour</span>
            <span className="text-xs text-blade-300">last 24h</span>
          </div>
          <AreaChart data={series} animate={!reduce && inView} />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:col-span-2">
          <span className="mb-2 block text-xs font-medium text-white/55">Agent floor</span>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {AGENTS.map((name, i) => {
              const st = agentStatus[i];
              const s = statusStyle[st];
              return (
                <div
                  key={name}
                  className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.04] px-3 py-2"
                >
                  <span className="flex min-w-0 items-center gap-2 text-sm text-white/90">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 text-[10px] font-semibold text-white/60">
                      {name.split(" ").map((p) => p[0]).join("")}
                    </span>
                    <span className="truncate">{name}</span>
                  </span>
                  {/* fixed-width, right-aligned so a changing status never reflows the row */}
                  <span className="flex w-[5.75rem] shrink-0 justify-end">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={st}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className={cn("flex items-center gap-1.5 whitespace-nowrap text-xs font-medium", s.text)}
                      >
                        <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
                        {st}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {ping && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl border border-white/10 bg-abyss2/95 p-3 backdrop-blur sm:left-auto sm:right-4 sm:max-w-xs"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[#4A154B] text-sm text-white">#</span>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-white">#sales-wins</p>
              <p className="truncate text-xs text-white/55">{ping}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* boot sequence — the widget "initializes" before the live data appears */}
      <AnimatePresence>
        {booting && (
          <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-abyss"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-20" aria-hidden />
            <div className="relative grid place-items-center">
              <motion.div
                className="absolute h-28 w-28 rounded-full bg-cyan/15 blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              />
              {[0, 1].map((i) => (
                <motion.span
                  key={i}
                  className="absolute h-16 w-16 rounded-full border border-cyan/40"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: [0.5, 2], opacity: [0.5, 0] }}
                  transition={{ duration: 1.8, delay: i * 0.55, repeat: Infinity, ease: "easeOut" }}
                />
              ))}
              <motion.div
                className="relative h-16 w-16 overflow-hidden"
                initial={{ scale: 0.8, opacity: 0, rotate: -6 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/mark-white.png" alt="" className="h-full w-full object-contain" />
                <motion.span
                  className="absolute inset-y-0 w-1/3 -skew-x-12"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(220,246,255,0.85), transparent)" }}
                  initial={{ x: "-120%" }}
                  animate={{ x: "360%" }}
                  transition={{ duration: 0.85, delay: 0.45, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
            <motion.div
              className="mt-5 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="h-[3px] w-32 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, var(--blue-500), var(--cyan))" }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.3, duration: 1.3, ease: [0.3, 0, 0.2, 1] }}
                />
              </div>
              <BootStatus />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BootStatus() {
  const lines = ["Connecting to telephony", "Syncing agent floor", "Streaming live metrics"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => Math.min(v + 1, lines.length - 1)), 520);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <span className="mono text-[0.6rem] uppercase tracking-[0.18em] text-white/45">
      {lines[i]}
      <span className="ml-0.5 animate-pulse">…</span>
    </span>
  );
}

function Kpi({
  label,
  value,
  Icon,
  accent,
}: {
  label: string;
  value: string;
  Icon: typeof Phone;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4",
        accent ? "border-blade-500/30 bg-blade-500/15" : "border-white/10 bg-white/[0.03]"
      )}
    >
      <div className="flex items-center justify-between text-white/55">
        <span className="text-xs font-medium">{label}</span>
        <Icon className={cn("h-4 w-4", accent ? "text-blade-300" : "text-white/55")} />
      </div>
      <div className="mt-1.5 whitespace-nowrap font-display text-2xl font-bold text-white tnum sm:text-3xl">{value}</div>
    </div>
  );
}

function AreaChart({ data, animate }: { data: number[]; animate: boolean }) {
  const w = 520;
  const h = 110;
  const max = 100;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => [i * step, h - (v / max) * (h - 8) - 4]);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="cc-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--blade-500)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--blade-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d={area} fill="url(#cc-fill)" initial={false} animate={{ d: area }} transition={{ duration: animate ? 0.6 : 0 }} />
      <motion.path
        d={line}
        fill="none"
        stroke="var(--blade-400)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={false}
        animate={{ d: line }}
        transition={{ duration: animate ? 0.6 : 0 }}
      />
    </svg>
  );
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}
