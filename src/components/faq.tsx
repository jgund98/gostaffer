"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type QA = { q: string; a: string };

export function FAQ({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
      {items.map((it, i) => {
        const active = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(active ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={active}
            >
              <span className="font-display text-base font-semibold text-ink sm:text-lg">{it.q}</span>
              <Plus
                className={cn(
                  "h-5 w-5 shrink-0 text-blade-600 transition-transform duration-300",
                  active && "rotate-45"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {active && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-9 text-sm leading-relaxed text-slate">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
