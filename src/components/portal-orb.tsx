"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/* ============================================================
   PortalOrb — a cursor-reactive particle sphere: a rotating global
   call-network. Nodes sit on a sphere, near ones link up (the
   "network"), signal rings pulse outward (calls connecting), and
   the whole thing tilts toward the cursor while nearby nodes light
   up. Canvas 2D, DPR-aware, paused under reduced-motion.
   ============================================================ */

export function PortalOrb({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    // Fibonacci sphere of nodes
    const N = 300;
    const pts: { x: number; y: number; z: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
    }
    // static edges between near neighbours
    const edges: [number, number][] = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const d = pts[i].x * pts[j].x + pts[i].y * pts[j].y + pts[i].z * pts[j].z;
        if (d > 0.905) edges.push([i, j]);
      }
    }
    // a few "active call" nodes that pulse
    const active = [12, 64, 130, 198, 255].map((i) => ({ i, phase: i }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const clamp = (v: number) => Math.max(-1.4, Math.min(1.4, v));
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      // global pointer drives the tilt; clamp so a small embedded orb stays sane
      mouse.tx = clamp(((e.clientX - rect.left) / rect.width) * 2 - 1);
      mouse.ty = clamp(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);

    const rings: { r: number; life: number }[] = [];
    let ringTimer = 0;
    let yaw = 0;
    const proj = new Array<{ sx: number; sy: number; sc: number; z: number }>(N);

    const render = (time: number) => {
      raf = requestAnimationFrame(render);
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      if (!reduce) yaw += 0.0016;

      const pitch = mouse.y * 0.5;
      const cosY = Math.cos(yaw + mouse.x * 0.6);
      const sinY = Math.sin(yaw + mouse.x * 0.6);
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.36;
      const persp = 2.6;
      const mx = cx + mouse.x * w * 0.28;
      const my = cy + mouse.y * h * 0.28;

      ctx.clearRect(0, 0, w, h);

      // core glow
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.5);
      core.addColorStop(0, "rgba(47,211,158,0.20)");
      core.addColorStop(0.45, "rgba(31,158,104,0.10)");
      core.addColorStop(1, "rgba(8,16,34,0)");
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, w, h);

      // signal rings
      if (!reduce) {
        ringTimer -= 1;
        if (ringTimer <= 0) {
          rings.push({ r: radius * 0.5, life: 1 });
          ringTimer = 130;
        }
      }
      for (let k = rings.length - 1; k >= 0; k--) {
        const ring = rings[k];
        ring.r += 1.4;
        ring.life -= 0.006;
        if (ring.life <= 0) {
          rings.splice(k, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(47,211,158,${ring.life * 0.25})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // project
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y1 = p.y * cosP - z1 * sinP;
        const z2 = p.y * sinP + z1 * cosP;
        const sc = persp / (persp - z2);
        proj[i] = { sx: cx + x1 * radius * sc, sy: cy + y1 * radius * sc, sc, z: z2 };
      }

      // edges
      ctx.lineWidth = 1;
      for (let e = 0; e < edges.length; e++) {
        const pa = proj[edges[e][0]];
        const pb = proj[edges[e][1]];
        const op = Math.min((pa.z + 1) / 2, (pb.z + 1) / 2) * 0.45;
        if (op < 0.05) continue;
        ctx.strokeStyle = `rgba(70,193,135,${op})`;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
      }

      // nodes
      for (let i = 0; i < N; i++) {
        const p = proj[i];
        const zf = (p.z + 1) / 2;
        const dist = Math.hypot(p.sx - mx, p.sy - my);
        const excite = Math.max(0, 1 - dist / 170);
        const bright = Math.min(1, zf * 0.7 + excite * 0.8);
        ctx.fillStyle = `rgba(${90 + excite * 120},${215 + excite * 40},${185 + excite * 45},${0.22 + bright * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, (0.6 + zf * 1.7) * p.sc + excite * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // active "call" nodes
      for (const a of active) {
        const p = proj[a.i];
        const zf = (p.z + 1) / 2;
        if (zf < 0.35) continue;
        const pulse = (Math.sin(time / 380 + a.phase) + 1) / 2;
        ctx.fillStyle = `rgba(120,245,210,${0.4 + zf * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 1.6 + zf * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(120,245,210,${(1 - pulse) * zf * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, (2 + pulse * 10) * zf, 0, Math.PI * 2);
        ctx.stroke();
      }

      // cursor spotlight
      const sp = ctx.createRadialGradient(mx, my, 0, mx, my, 130);
      sp.addColorStop(0, "rgba(47,211,158,0.10)");
      sp.addColorStop(1, "rgba(47,211,158,0)");
      ctx.fillStyle = sp;
      ctx.beginPath();
      ctx.arc(mx, my, 130, 0, Math.PI * 2);
      ctx.fill();
    };

    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduce]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
