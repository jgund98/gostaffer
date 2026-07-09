"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, stagger, inView } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li" | "span";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={variants} {...inView}>
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className,
  amount = 0.08,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
  as?: "div" | "ul";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={cn(className)} variants={stagger(amount)} {...inView}>
      {children}
    </MotionTag>
  );
}

/** Child of RevealGroup — inherits parent stagger. */
export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  as?: "div" | "li";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
