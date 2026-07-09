"use client";

import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import { RotatingText } from "@/components/rotating-text";
import { openLiveRep, useRepsOnline, AvatarStack } from "@/components/live-rep";
import { HeroNetwork } from "@/components/home/hero-network";
import { Parallax } from "@/components/parallax";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CommandCenter } from "@/components/command-center";

const ease = [0.16, 1, 0.3, 1] as const;

// Flip to false to restore the business-hours logic (Book a Call when reps are offline).
const ALWAYS_SHOW_REP = true;

export function Hero() {
  const online = useRepsOnline();
  const showRep = ALWAYS_SHOW_REP || online;
  return (
    <section className="mesh mesh-animated relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <HeroNetwork />
      <div className="orb orb-blue float-a absolute -left-24 top-20 hidden h-80 w-80 sm:block" aria-hidden />
      <div className="orb orb-cyan float-b absolute -right-10 top-0 h-72 w-72" aria-hidden />
      <div className="orb orb-indigo float-a absolute -bottom-10 left-1/3 hidden h-96 w-96 sm:block" aria-hidden />

      <Container className="relative grid items-center gap-10 pb-16 pt-28 sm:gap-12 sm:pt-32 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:pb-24 lg:pt-36">
        {/* left — streamlined */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mono flex items-center gap-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-cyan sm:text-[0.72rem] sm:tracking-[0.2em]"
          >
            <span className="h-[7px] w-[7px] shrink-0 rotate-45 bg-cyan" />
            <span className="whitespace-nowrap">Dedicated remote staff, done for you</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="mt-6 font-display font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:leading-[0.98] sm:tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.05rem, 8.5vw, 4.3rem)" }}
          >
            Win more customers on the phone{" "}
            <span className="serif-i font-normal text-gradient-light">without the call center.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease }}
            className="mt-5 flex flex-wrap items-baseline gap-x-1.5 font-display text-xl font-medium leading-none text-white/55 sm:text-[1.55rem]"
          >
            <span className="relative top-[0.5px] font-semibold leading-none text-white/75">GoStaffer</span>
            <RotatingText
              words={[
                "calls your leads",
                "qualifies every lead",
                "books your meetings",
                "follows up in seconds",
                "fills your calendar",
                "answers every call",
                "never misses a call",
                "wins back lost customers",
              ]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.66, duration: 0.6, ease }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="/contact" size="lg" className="w-full justify-center sm:w-auto">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>

            {showRep ? (
              <button
                type="button"
                onClick={openLiveRep}
                className="group inline-flex h-[3.25rem] w-full items-center justify-center gap-3 rounded-[10px] border border-cyan/40 bg-cyan/[0.08] py-2 pl-3 pr-5 text-base font-semibold text-white transition-colors hover:border-cyan/70 hover:bg-cyan/[0.14] sm:w-auto sm:justify-start sm:pl-2 sm:pr-6"
              >
                <AvatarStack />
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
                  </span>
                  Hear a real rep — call now
                </span>
              </button>
            ) : (
              <a
                href="/contact"
                className="inline-flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-[10px] border border-white/25 px-7 text-base font-semibold text-white transition-colors hover:border-white/55 hover:bg-white/5 sm:w-auto"
              >
                <PhoneCall className="h-4 w-4" /> Book a Call
              </a>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-6 max-w-md text-balance text-sm text-white/55"
          >
            {showRep ? (
              <>
                <span className="font-semibold text-white/80">Worried about accents?</span> A real rep in Cairo is
                on the floor right now — get on the phone and hear them for yourself.
              </>
            ) : (
              "10+ years staffing U.S. businesses · 150+ pros on the floor"
            )}
          </motion.p>
        </div>

        {/* right — a real agent emerging from the mesh, her live dashboard in front */}
        <Parallax speed={46} className="relative w-full">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease }}
            className="relative w-full"
          >
            <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-blade-500/15 blur-3xl" />
            <CommandCenter />
          </motion.div>
        </Parallax>
      </Container>
    </section>
  );
}
