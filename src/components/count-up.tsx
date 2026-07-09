"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function CountUp({
  to,
  from = 0,
  duration = 1.6,
  decimals,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(from);

  const dp =
    decimals ?? (Number.isInteger(to) ? 0 : to.toString().split(".")[1]?.length ?? 1);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(from, to, {
      duration,
      ease: [0.2, 0.6, 0.2, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, from, duration, reduce]);

  return (
    <span ref={ref} className={cn("tnum", className)}>
      {prefix}
      {val.toLocaleString("en-US", {
        minimumFractionDigits: dp,
        maximumFractionDigits: dp,
      })}
      {suffix}
    </span>
  );
}
