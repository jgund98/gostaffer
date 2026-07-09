"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Wallet, ArrowUpRight, Plus } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { cn } from "@/lib/utils";

export function WalletWidget({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduce = useReducedMotion();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (inView) setPct(85);
  }, [inView]);

  return (
    <div ref={ref} className={cn("card overflow-hidden rounded-3xl p-6 sm:p-7", className)}>
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate">
          <Wallet className="h-4 w-4 text-blade-600" /> Campaign wallet
        </span>
        <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">Active</span>
      </div>

      <div className="mt-5">
        <div className="font-display text-4xl font-bold text-ink sm:text-5xl">
          <CountUp to={2450} prefix="$" decimals={2} />
        </div>
        <p className="mt-1 text-sm text-mute">Available balance</p>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs text-mute">
          <span>Monthly budget used</span>
          <span className="font-semibold text-ink">{pct}%</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-cloud">
          <motion.div
            className="h-full rounded-full bg-blade-500"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: reduce ? 0 : 1.1, ease: [0.2, 0.6, 0.2, 1] }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="inline-flex items-center justify-center gap-1.5 rounded-[10px] bg-blade-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blade-700">
          <Plus className="h-4 w-4" /> Fund wallet
        </button>
        <button className="inline-flex items-center justify-center gap-1.5 rounded-[10px] border border-line-2 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-blade-500">
          Statements <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 space-y-2.5 border-t border-line pt-4">
        {[
          { label: "Outbound Sales — week 14", amt: "−$612.40" },
          { label: "Top-up (Visa ••42)", amt: "+$2,000.00" },
          { label: "Inbound Support — week 13", amt: "−$318.10" },
        ].map((r) => (
          <div key={r.label} className="flex items-center justify-between text-xs">
            <span className="text-slate">{r.label}</span>
            <span className={cn("font-semibold tnum", r.amt.startsWith("+") ? "text-emerald-600" : "text-ink")}>
              {r.amt}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-mute">Illustrative — wallet & billing live in the Portal.</p>
    </div>
  );
}
