"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Flipped to true ONLY after the first client mount (in an effect, never during
// render). This keeps SSR + first hydration in agreement on "no wipe" — mutating
// it during render leaks across SSR requests and causes a hydration mismatch.
// The wipe then plays only on subsequent client-side navigations.
let navigated = false;

/**
 * Route transition — a quick diagonal blade wipe (~450ms) that sweeps across
 * on every navigation, plus a soft content fade-up. Lives in app/template.tsx,
 * which Next remounts per route change.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [wipe] = useState(() => navigated);

  useEffect(() => {
    navigated = true;
  }, []);

  // No wipe on the first paint (avoids the white flash over the hero on load).
  if (reduce || !wipe) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] origin-bottom"
        style={{
          background:
            "linear-gradient(115deg, var(--paper) 0%, var(--blade-tint) 55%, var(--blade-500) 100%)",
        }}
        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        animate={{
          clipPath: [
            "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            "polygon(0 -40%, 100% 0, 100% 60%, 0 100%)",
            "polygon(100% -40%, 100% -40%, 100% 100%, 100% 100%)",
          ],
        }}
        transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1], times: [0, 0.45, 1] }}
      />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18, ease: [0.2, 0.6, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
