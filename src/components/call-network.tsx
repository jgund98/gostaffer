"use client";

import { useRef, useMemo } from "react";
import { useReducedMotion, useInView } from "framer-motion";

/* ============================================================
   Transatlantic call network — a dotted world map (Atlantic
   hemisphere) zoomed on the US ↔ Alexandria corridor. Alexandria is the
   calling center, with live call arcs to/from the U.S.; Fort
   Lauderdale is marked as the U.S. home office. Dots are
   generated procedurally from real lon/lat geography.
   ============================================================ */

// view crop (lon/lat) — tightly zoomed on North America + the Atlantic + Alexandria
const LON0 = -130, LON1 = 54;
const LAT0 = -6, LAT1 = 58;
const W = 560, H = 195;
const px = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * W;
const py = (lat: number) => ((LAT1 - lat) / (LAT1 - LAT0)) * H;

// continents as unions of ellipses (cx,cy = lon,lat · rx,ry = degrees) — tuned
// to read as recognizable silhouettes rather than vague blobs.
const LAND: [number, number, number, number][] = [
  // North America
  [-100, 54, 30, 8], //  Canada band
  [-97, 43, 25, 8], //   U.S. body
  [-117, 43, 9, 9], //   west coast
  [-80, 41, 11, 8], //   east coast / NE
  [-101, 27, 9, 8], //   Mexico (north)
  [-93, 19, 7, 6], //    Mexico (south)
  [-82, 28, 3.2, 6], //  Florida nub
  // South America (upper, partially in view)
  [-62, -6, 11, 14],
  // Europe
  [10, 52, 14, 8],
  // Africa
  [18, 8, 16, 24], //    main body
  [14, 29, 18, 7], //    N. Africa / Sahara (Alexandria on its NE edge)
  // W. Asia / Middle East
  [44, 30, 14, 11],
];
const isLand = (lon: number, lat: number) =>
  LAND.some(([cx, cy, rx, ry]) => ((lon - cx) / rx) ** 2 + ((lat - cy) / ry) ** 2 <= 1);

const ALEX = { lon: 29.9, lat: 31.2 }; // Alexandria, Egypt
const HQ = { lon: -80.1, lat: 26.1 }; // Fort Lauderdale
const US_CITIES = [
  { lon: -122, lat: 47 }, // Seattle
  { lon: -118, lat: 34 }, // Los Angeles
  { lon: -105, lat: 40 }, // Denver
  { lon: -97, lat: 33 }, // Dallas
  { lon: -88, lat: 42 }, // Chicago
  { lon: -74, lat: 41 }, // New York
  { lon: -84, lat: 34 }, // Atlanta
];

type Pt = { x: number; y: number };
const arc = (a: Pt, b: Pt) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - Math.abs(a.x - b.x) * 0.24;
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
};

export function CallNetwork() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "120px" });
  const reduce = reduceMotion || !inView;

  const dots = useMemo(() => {
    const out: Pt[] = [];
    for (let lon = LON0; lon <= LON1; lon += 3.1) {
      for (let lat = LAT1; lat >= LAT0; lat -= 3.4) {
        if (isLand(lon, lat)) out.push({ x: px(lon), y: py(lat) });
      }
    }
    return out;
  }, []);

  const alex = { x: px(ALEX.lon), y: py(ALEX.lat) };
  const hq = { x: px(HQ.lon), y: py(HQ.lat) };
  const targets = [...US_CITIES.map((c) => ({ x: px(c.lon), y: py(c.lat) })), hq];

  return (
    <div ref={ref} className="relative mx-auto w-full">
      <div className="absolute inset-x-6 top-2 bottom-8 rounded-full bg-cyan/10 blur-3xl" aria-hidden />
      <svg viewBox={`0 0 ${W} ${H + 16}`} className="relative w-full">
        <defs>
          <linearGradient id="cn-out" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--blue-400)" stopOpacity="0.12" />
          </linearGradient>
          <radialGradient id="cn-hub" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="var(--cyan)" />
          </radialGradient>
        </defs>

        {/* dotted world map */}
        <g fill="var(--blue-400)">
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r="2.4" opacity="0.5" />
          ))}
        </g>

        {/* arcs from Alexandria -> US (calls out & back) */}
        {targets.map((t, i) => {
          const p = arc(alex, t);
          return (
            <g key={i}>
              <path d={p} fill="none" stroke="url(#cn-out)" strokeWidth="1.8" opacity="0.6" />
              {!reduce && (
                <>
                  <circle r="3.6" fill="var(--cyan)">
                    <animateMotion dur={`${2.2 + (i % 3) * 0.5}s`} repeatCount="indefinite" path={p} />
                    <animate attributeName="opacity" values="0;1;1;0" dur={`${2.2 + (i % 3) * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                  <circle r="2.7" fill="#dff6ff">
                    <animateMotion dur={`${2.8 + (i % 3) * 0.5}s`} repeatCount="indefinite" path={p} keyPoints="1;0" keyTimes="0;1" calcMode="linear" />
                    <animate attributeName="opacity" values="0;0.9;0.9;0" dur={`${2.8 + (i % 3) * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                </>
              )}
              <circle cx={t.x} cy={t.y} r="3.3" fill="var(--blue-400)" />
            </g>
          );
        })}

        {/* Fort Lauderdale HQ */}
        <circle cx={hq.x} cy={hq.y} r="5.6" fill="#fff" />
        <circle cx={hq.x} cy={hq.y} r="5.6" fill="none" stroke="#fff" opacity="0.7">
          {!reduce && <animate attributeName="r" from="5.6" to="19" dur="2.6s" repeatCount="indefinite" />}
          {!reduce && <animate attributeName="opacity" from="0.6" to="0" dur="2.6s" repeatCount="indefinite" />}
        </circle>
        <text x={hq.x} y={hq.y + 25} textAnchor="middle" className="font-display" fontSize="16" fontWeight="700" fill="#fff">West Palm Beach</text>
        <text x={hq.x} y={hq.y + 37} textAnchor="middle" fontSize="10" letterSpacing="1.6" fill="rgba(220,246,255,0.85)">U.S. HOME OFFICE</text>

        {/* Alexandria — the calling center */}
        <circle cx={alex.x} cy={alex.y} r="9.5" fill="url(#cn-hub)" />
        <circle cx={alex.x} cy={alex.y} r="9.5" fill="none" stroke="var(--cyan)">
          {!reduce && <animate attributeName="r" from="9.5" to="31" dur="2.2s" repeatCount="indefinite" />}
          {!reduce && <animate attributeName="opacity" from="0.8" to="0" dur="2.2s" repeatCount="indefinite" />}
        </circle>
        <text x={alex.x} y={alex.y + 25} textAnchor="middle" className="font-display" fontSize="20" fontWeight="700" fill="#fff">Alexandria</text>
        <text x={alex.x} y={alex.y + 38} textAnchor="middle" fontSize="10.5" letterSpacing="1.6" fill="rgba(47,211,158,0.95)">CALLING CENTER</text>
      </svg>

      <p className="-mt-1 text-center text-sm text-white/65">
        Calls flow from our Alexandria center to every corner of the U.S. — run from our West Palm Beach office.
      </p>
    </div>
  );
}
