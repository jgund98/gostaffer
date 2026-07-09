"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** Segmented control + the active panel. Pure UI; first tab active by default. */
export function Tabs({
  tabs,
}: {
  tabs: { label: string; content: React.ReactNode; count?: number }[];
}) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="inline-flex flex-wrap gap-1 rounded-xl border border-line bg-paper p-1 shadow-[var(--shadow-sm)]">
        {tabs.map((t, idx) => (
          <button
            key={t.label}
            onClick={() => setI(idx)}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-colors",
              idx === i ? "bg-ink text-white" : "text-slate hover:bg-bone"
            )}
          >
            {t.label}
            {typeof t.count === "number" && (
              <span
                className={cn(
                  "rounded-full px-1.5 text-[0.68rem]",
                  idx === i ? "bg-white/20 text-white" : "bg-cloud text-mute"
                )}
              >
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="mt-6">{tabs[i].content}</div>
    </div>
  );
}
