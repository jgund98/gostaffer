import type { Variants } from "framer-motion";

export const EASE = [0.2, 0.6, 0.2, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

export const stagger = (amount = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: amount, delayChildren: 0.05 } },
});

export const inView = {
  initial: "hidden" as const,
  whileInView: "show" as const,
  viewport: { once: true, margin: "-12%" },
};
