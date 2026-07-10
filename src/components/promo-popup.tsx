"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, Sparkles, ArrowRight } from "lucide-react";

const PERKS = ["A dedicated, coached team", "Live in days — not months", "No setup fees, cancel anytime"];

export function PromoPopup() {
  const [open, setOpen] = useState(false);

  // Always surface the offer a few seconds after the page loads — every visit,
  // returning users included (no session gate).
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 4000);
    return () => clearTimeout(t);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* backdrop — click to dismiss */}
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Special offer"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative z-10 grid max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-paper shadow-[var(--shadow-lg)] ring-1 ring-black/10 sm:grid-cols-2"
          >
            {/* left — rep photo, green-graded */}
            <div className="relative hidden min-h-[30rem] sm:block">
              <Image
                src="/img/people/rep-glasses.webp"
                alt="A GoStaffer team ready to take your calls"
                fill
                sizes="(max-width: 640px) 100vw, 900px"
                className="object-cover object-[68%_center]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(8,40,27,0.10), rgba(8,40,27,0.28)), linear-gradient(90deg, transparent 65%, rgba(11,45,31,0.35))",
                }}
                aria-hidden
              />
            </div>

            {/* right — the offer */}
            <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-mute transition-colors hover:bg-black/5 hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>

              <span className="mono inline-flex w-fit items-center gap-1.5 rounded-md bg-blade-tint px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-blade-700">
                <Sparkles className="h-3 w-3" /> Limited offer
              </span>

              <h2 className="mt-4 font-display text-3xl font-bold leading-[1.05] text-ink sm:text-4xl">
                Your first two weeks are{" "}
                <span className="serif-i font-normal text-blade-600">on us.</span>
              </h2>
              <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-slate">
                Put a dedicated GoStaffer team on your phones risk-free. If they don&apos;t out-work
                your current setup, you don&apos;t pay a cent.
              </p>

              <ul className="mt-6 flex flex-col gap-2.5">
                {PERKS.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-[0.98rem] text-ink">
                    <Check className="h-4 w-4 shrink-0 text-blade-600" /> {p}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-[10px] bg-blade-600 px-6 text-base font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Claim 2 weeks free <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-center text-sm font-medium text-mute transition-colors hover:text-ink"
                >
                  No thanks, maybe later
                </button>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-mute">New clients only.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
