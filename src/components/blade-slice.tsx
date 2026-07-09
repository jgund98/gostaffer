"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * BladeReveal — diagonal "katana slice" entrance.
 * The content sits under two halves that split apart along a diagonal cut,
 * with a thin electric-blue glow sweeping across the cut line.
 * Reduced motion → simple crossfade.
 */
export function BladeReveal({
  children,
  className,
  delay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {/* the content, revealed via clip-path */}
      <motion.div
        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 0, y: 18 }}
        animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.25, duration: 0.7, ease: [0.2, 0.6, 0.2, 1] }}
      >
        {children}
      </motion.div>

      {/* the slicing blade — a thin rotated bar sweeping diagonally */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[3px] w-[160%] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg]"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--blade-400), var(--blade-600), var(--blade-400), transparent)",
          boxShadow: "0 0 22px 3px color-mix(in srgb, var(--blade-500) 60%, transparent)",
        }}
        initial={{ scaleX: 0, opacity: 0, transformOrigin: "left center" }}
        animate={{
          scaleX: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
          transformOrigin: ["left center", "left center", "right center", "right center"],
        }}
        transition={{ delay, duration: 0.7, ease: "easeInOut", times: [0, 0.45, 0.55, 1] }}
      />
    </div>
  );
}

/**
 * SliceBar — a one-shot diagonal slash that wipes across a region.
 * Use sparingly as a section accent.
 */
export function SliceAccent({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-0 top-1/2 z-10 h-px w-full -translate-y-1/2 rotate-[-8deg]",
        className
      )}
      style={{
        background:
          "linear-gradient(90deg, transparent, var(--blade-400), transparent)",
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: [0, 1, 1], opacity: [0, 1, 0.4] }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    />
  );
}
