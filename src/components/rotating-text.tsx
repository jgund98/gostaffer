"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function RotatingText({
  words,
  interval = 2200,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduce]);

  // The word renders in normal flow — it's the last thing on its line, so a changing
  // width never reflows anything, and being in-flow means it sets its own baseline,
  // lining up exactly with neighbouring text. The y-translate is a transform, so at
  // rest (y:0) the baseline is untouched.
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={words[i]}
        initial={reduce ? false : { y: "0.42em", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduce ? undefined : { y: "-0.42em", opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
        className={"inline-block whitespace-nowrap align-baseline text-gradient " + (className ?? "")}
      >
        {words[i]}
      </motion.span>
    </AnimatePresence>
  );
}
