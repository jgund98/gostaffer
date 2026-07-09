"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export type Review = {
  quote: string;
  name: string;
  role: string;
  tag: string;
};

export function RotatingReviews({ reviews, interval = 6500 }: { reviews: Review[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % reviews.length), interval);
    return () => clearInterval(id);
  }, [paused, reduce, reviews.length, interval]);

  const r = reviews[i];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[18rem] overflow-hidden rounded-3xl border border-white/15 bg-white/[0.08] p-7 backdrop-blur-sm sm:min-h-[17rem] sm:p-9">
        <Quote className="h-8 w-8 text-cyan" />
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <blockquote className="mt-4 text-balance font-display text-lg font-medium leading-snug text-white sm:text-xl">
              “{r.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 font-display text-sm font-bold text-white">
                {r.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">{r.name}</span>
                <span className="block truncate text-xs text-white/65">{r.role}</span>
              </span>
              <span className="mono ml-auto hidden shrink-0 rounded-md bg-white/10 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wider text-cyan sm:block">
                {r.tag}
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* progress dots */}
      <div className="mt-5 flex items-center gap-2">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Show review ${idx + 1}`}
            onClick={() => setI(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              idx === i ? "w-7 bg-white" : "w-1.5 bg-white/35 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </div>
  );
}
