"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, animate } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/* ---------------- staggered entrance ---------------- */
export function Stagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } }}
    >
      {children}
    </motion.div>
  );
}
export function Item({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- count-up number ---------------- */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const fromRef = useRef(0);
  const [d, setD] = useState(reduce ? value : 0);
  useEffect(() => {
    if (reduce) {
      setD(value);
      return;
    }
    const controls = animate(fromRef.current, value, { duration: 1.1, ease: EASE, onUpdate: setD });
    fromRef.current = value;
    return () => controls.stop();
  }, [value, reduce]);
  const txt = d.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <span className={className}>
      {prefix}
      {txt}
      {suffix}
    </span>
  );
}

/* ---------------- live ticking value ---------------- */
export function useLive(initial: number, stepFn: () => number, ms = 2400) {
  const [v, setV] = useState(initial);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setV((x) => x + stepFn()), ms);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);
  return v;
}

/* ---------------- bounded live value (hovers around a base) ---------------- */
export function useHover(base: number, range: number, ms = 3000) {
  const [v, setV] = useState(base);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setV(base + Math.round((Math.random() * 2 - 1) * range)), ms);
    return () => clearInterval(id);
  }, [base, range, reduce]);
  return v;
}

/* ---------------- live elapsed clock (agent) ---------------- */
export function useElapsed(startSeconds = 3 * 3600 + 42 * 60) {
  const [s, setS] = useState(startSeconds);
  useEffect(() => {
    const id = setInterval(() => setS((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}h ${String(m).padStart(2, "0")}m ${String(sec).padStart(2, "0")}s`;
}

/* ---------------- live pulse dot ---------------- */
export function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-70" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
    </span>
  );
}

/* ---------------- smooth, drawn-in area chart ---------------- */
function smoothPath(pts: number[][]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

export function AreaChart({
  data,
  height = 130,
  live = false,
  className,
}: {
  data: number[];
  height?: number;
  live?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [series, setSeries] = useState(data);
  // a live running count (only ever climbs) — "today, and counting"
  const [now, setNow] = useState(() => Math.round(data[data.length - 1] * 12));
  useEffect(() => {
    if (!live || reduce) return;
    const id = setInterval(() => {
      // today's point creeps up; the historical trend behind it stays put
      setSeries((s) => {
        const c = [...s];
        c[c.length - 1] = clamp(c[c.length - 1] + Math.random() * 0.7, 45, 100);
        return c;
      });
      setNow((n) => n + Math.floor(Math.random() * 4) + 1);
    }, 2200);
    return () => clearInterval(id);
  }, [live, reduce]);

  const W = 600;
  const H = height;
  const padX = 18; // keep the live "now" dot off the right edge
  const padTop = 18;
  const padBottom = 10;
  const innerW = W - padX * 2;
  const max = Math.max(...series) * 1.06;
  const min = Math.min(...series) * 0.9;
  const step = innerW / (series.length - 1);
  const pts = series.map((v, i) => [padX + i * step, H - ((v - min) / (max - min)) * (H - padTop - padBottom) - padBottom]);
  const line = smoothPath(pts);
  const area = `${line} L ${pts[pts.length - 1][0].toFixed(1)} ${H} L ${pts[0][0].toFixed(1)} ${H} Z`;
  const last = pts[pts.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn("w-full overflow-visible", className)}>
      <defs>
        <linearGradient id="dash-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.3" />
          <stop offset="55%" stopColor="var(--blade-500)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="var(--blade-500)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="dash-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--blade-600)" />
          <stop offset="100%" stopColor="var(--cyan)" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" y1={H * g} x2={W} y2={H * g} stroke="var(--line)" strokeWidth="1" strokeDasharray="2 5" />
      ))}
      <motion.path
        fill="url(#dash-area)"
        initial={{ opacity: 0, d: area }}
        animate={{ opacity: 1, d: area }}
        transition={{ opacity: { duration: 0.8, ease: EASE }, d: { duration: 2, ease: "easeInOut" } }}
      />
      <motion.path
        fill="none"
        stroke="url(#dash-line)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ opacity: 0, d: line }}
        animate={{ opacity: 1, d: line }}
        transition={{ opacity: { duration: 0.8, ease: EASE }, d: { duration: 2, ease: "easeInOut" } }}
      />
      <motion.circle
        r="9"
        fill="var(--cyan)"
        initial={{ cx: last[0], cy: last[1], opacity: 0.18 }}
        animate={{ cx: last[0], cy: last[1], opacity: reduce ? 0.18 : [0.22, 0.07, 0.22] }}
        transition={{ cx: { duration: 2, ease: "easeInOut" }, cy: { duration: 2, ease: "easeInOut" }, opacity: { duration: 2.6, repeat: Infinity } }}
      />
      <motion.circle
        r="3.5"
        fill="var(--cyan)"
        stroke="#fff"
        strokeWidth="1.5"
        initial={{ cx: last[0], cy: last[1] }}
        animate={{ cx: last[0], cy: last[1] }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      {/* live value that tracks the now-dot — the thing that's useful to watch */}
      <motion.text
        fontSize="15"
        fontWeight="700"
        fill="var(--blade-700)"
        textAnchor="end"
        initial={false}
        animate={{ x: last[0] - 9, y: last[1] - 11 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        {now.toLocaleString()}
      </motion.text>
    </svg>
  );
}

/* ---------------- progress ring ---------------- */
export function Ring({
  value,
  size = 104,
  stroke = 10,
  label,
  sub,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  sub?: string;
}) {
  const reduce = useReducedMotion();
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - stroke) / 2;
  const pct = clamp(value, 0, 100);
  // explicit arc from the top (−90°), sweeping clockwise by `pct`
  const a0 = -Math.PI / 2;
  const a1 = a0 + (Math.min(pct, 99.999) / 100) * 2 * Math.PI;
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const large = pct > 50 ? 1 : 0;
  const d = `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  const arcLen = r * (Math.min(pct, 99.999) / 100) * 2 * Math.PI;
  return (
    <div className="relative inline-grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="dash-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--blade-600)" />
            <stop offset="100%" stopColor="var(--cyan)" />
          </linearGradient>
        </defs>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--cloud)" strokeWidth={stroke} />
        <motion.path
          d={d}
          fill="none"
          stroke="url(#dash-ring)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={arcLen}
          initial={reduce ? false : { strokeDashoffset: arcLen }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.3, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center px-5 text-center">
        {label && <div className="font-display text-2xl font-bold leading-none text-ink tnum">{label}</div>}
        {sub && <div className="mono mt-1 max-w-full text-[0.5rem] font-semibold uppercase leading-tight tracking-[0.02em] text-mute">{sub}</div>}
      </div>
    </div>
  );
}

/* ---------------- linear percent meter (unambiguous) ---------------- */
export function Meter({
  value,
  label,
  className,
}: {
  value: number;
  label?: string;
  className?: string;
}) {
  const pct = clamp(value, 0, 100);
  return (
    <div className={className}>
      <div className="flex items-baseline gap-2">
        <CountUp value={pct} suffix="%" className="font-display text-[2.4rem] font-bold leading-none tracking-tight text-ink tnum" />
        {label && <span className="text-sm font-medium text-mute">{label}</span>}
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-cloud">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blade-600 to-cyan"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: EASE }}
        />
      </div>
    </div>
  );
}

/* ---------------- animated KPI stat ---------------- */
export function DashStat({
  label,
  value,
  raw,
  decimals = 0,
  prefix = "",
  suffix = "",
  delta,
  Icon,
  accent,
}: {
  label: string;
  value?: number;
  raw?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  delta?: string;
  Icon: LucideIcon;
  accent?: boolean;
}) {
  const up = !!delta && delta.trim().startsWith("+");
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line/80 bg-paper p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-14px_rgba(16,24,40,0.16)]",
        accent && "ring-1 ring-blade-500/20"
      )}
    >
      <div className="relative flex items-center justify-between">
        <span className="text-[0.8rem] font-medium text-slate">{label}</span>
        <span
          className={cn("grid h-9 w-9 place-items-center rounded-xl shadow-sm", accent ? "text-white" : "bg-blade-tint text-blade-700")}
          style={accent ? { background: "var(--grad-aurora)" } : undefined}
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
      </div>
      <div className="relative mt-3.5 font-display text-[2rem] font-bold leading-none tracking-tight text-ink tnum">
        {raw !== undefined ? raw : <CountUp value={value ?? 0} decimals={decimals} prefix={prefix} suffix={suffix} />}
      </div>
      {delta && (
        <div className={cn("relative mt-2 flex items-center gap-1 text-xs font-medium", up ? "text-emerald" : "text-mute")}>
          {up && <TrendingUp className="h-3.5 w-3.5" />}
          {delta}
        </div>
      )}
    </motion.div>
  );
}
