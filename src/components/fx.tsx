"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Broadcast "signal" rings — concentric pulses radiating outward (pure CSS). */
export function SignalRings({ className, count = 4 }: { className?: string; count?: number }) {
  return (
    <div className={cn("pointer-events-none aspect-square", className)} aria-hidden>
      <div className="relative h-full w-full">
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className="signal-ring" style={{ animationDelay: `${(i * 4) / count}s` }} />
        ))}
      </div>
    </div>
  );
}

const BALLS = [
  { r: 46, cx: ["140", "220", "160", "140"], cy: ["160", "130", "240", "160"], dur: "14s" },
  { r: 38, cx: ["240", "180", "260", "240"], cy: ["200", "260", "150", "200"], dur: "17s" },
  { r: 30, cx: ["200", "150", "230", "200"], cy: ["120", "200", "180", "120"], dur: "12s" },
];

/** Gooey meta-balls — soft blobs that merge as they drift. */
export function MetaBalls({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  // Animate continuously (3 cheap SMIL blobs) — gating on in-view made the glow
  // visibly "flick on" mid-scroll. `contain: paint` keeps it cheap off-screen.
  const animate = !reduce;

  return (
    <div className={cn("pointer-events-none", className)} style={{ contain: "paint" }} aria-hidden>
      <svg className="h-full w-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="goo" x="-12%" y="-12%" width="124%" height="124%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" />
          </filter>
          <radialGradient id="mb" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--blue-500)" stopOpacity="0.7" />
          </radialGradient>
        </defs>
        <g filter="url(#goo)" fill="url(#mb)">
          {BALLS.map((b, i) => (
            <circle key={i} r={b.r} cx={b.cx[0]} cy={b.cy[0]}>
              {animate && <animate attributeName="cx" values={b.cx.join(";")} dur={b.dur} repeatCount="indefinite" />}
              {animate && <animate attributeName="cy" values={b.cy.join(";")} dur={b.dur} repeatCount="indefinite" />}
            </circle>
          ))}
        </g>
      </svg>
    </div>
  );
}
