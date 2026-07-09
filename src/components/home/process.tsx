"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { PROCESS } from "@/lib/site";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section tone="paper" id="process">
      <Reveal>
        <SectionHeading
          eyebrow="Kickoff in a day, live in days"
          title={<>From first call with us to live on your phones</>}
          lead="No drawn-out setup or IT projects. We kick off within 24 hours — learning your business, building your playbook, and training your team — then get you live in days, not months."
        />
      </Reveal>

      <div ref={ref} className="relative mt-16">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-line lg:block">
          <motion.div style={{ width: lineWidth }} className="h-full bg-blade-500" />
        </div>

        <div className="grid gap-y-10 lg:grid-cols-4 lg:gap-6">
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative lg:pr-6"
            >
              <div
                className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-2xl font-display text-base font-bold text-white shadow-[0_10px_24px_-8px_rgba(14,165,165,0.55)]"
                style={{ background: "var(--grad-aurora)" }}
              >
                {step.n}
              </div>
              <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <Reveal>
        <Link
          href="/how-it-works"
          className="mono mt-12 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-blue-700 link-underline"
        >
          See exactly how onboarding works <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </Section>
  );
}
