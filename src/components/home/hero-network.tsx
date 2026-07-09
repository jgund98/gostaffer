"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* ============================================================
   HeroNetwork — a subtle "live calls" network that drifts in the
   hero background: nodes that pulse and arcs with packets traveling
   between them, like calls connecting across the floor. Nodes are
   placed in the negative space (left + edges + lower band) so the
   headline and the Command Center dashboard stay clear.
   ============================================================ */

// viewBox 1200 x 720 — coordinates chosen to dodge the headline (center-left)
// and the dashboard (right). Mostly left side, top strip, and lower band.
const NODES = [
  { x: 96, y: 96 },
  { x: 432, y: 70 },
  { x: 44, y: 372 },
  { x: 176, y: 600 },
  { x: 470, y: 648 },
  { x: 690, y: 58 },
  { x: 1150, y: 656 },
];

// connections (index pairs) — the "calls"
const LINKS: [number, number][] = [
  [0, 1],
  [0, 2],
  [2, 3],
  [3, 4],
  [1, 5],
  [4, 6],
];

const arc = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - Math.abs(a.x - b.x) * 0.16 - 40;
  return `M${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
};

export function HeroNetwork() {
  const reduce = useReducedMotion();
  // Desktop-only — the animated SVG network is too heavy for mobile GPUs.
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  if (!desktop) return null;

  return (
    <svg
      data-anim
      viewBox="0 0 1200 720"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.55]"
      aria-hidden
    >
      <defs>
        <linearGradient id="hn-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.0" />
          <stop offset="50%" stopColor="var(--cyan)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--blue-400)" stopOpacity="0.0" />
        </linearGradient>
        {/* fade the network out where the dashboard sits (right) and behind the headline */}
        <radialGradient id="hn-mask" cx="34%" cy="46%" r="75%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="62%" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.12" />
        </radialGradient>
        <mask id="hn-fade">
          <rect width="1200" height="720" fill="url(#hn-mask)" />
        </mask>
      </defs>

      <g mask="url(#hn-fade)">
        {/* arcs */}
        {LINKS.map(([a, b], i) => {
          const p = arc(NODES[a], NODES[b]);
          return (
            <g key={i}>
              <path d={p} fill="none" stroke="url(#hn-line)" strokeWidth="1.2" />
              {!reduce && (
                <circle r="3" fill="var(--cyan)">
                  <animateMotion
                    dur={`${4.5 + (i % 4) * 1.1}s`}
                    repeatCount="indefinite"
                    path={p}
                    begin={`${i * 0.9}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur={`${4.5 + (i % 4) * 1.1}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.9}s`}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* nodes */}
        {NODES.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="3.5" fill="var(--cyan)" opacity="0.8" />
            {!reduce && (
              <circle cx={n.x} cy={n.y} r="3.5" fill="none" stroke="var(--cyan)" strokeWidth="1">
                <animate attributeName="r" values="3.5;16;3.5" dur={`${3 + (i % 3)}s`} repeatCount="indefinite" begin={`${i * 0.6}s`} />
                <animate attributeName="opacity" values="0.7;0;0.7" dur={`${3 + (i % 3)}s`} repeatCount="indefinite" begin={`${i * 0.6}s`} />
              </circle>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}
