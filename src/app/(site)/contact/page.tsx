import type { Metadata } from "next";
import { CalendarDays, Clock, Mail, Zap, MapPin, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";
import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";
import { PortalOrb } from "@/components/portal-orb";
import { CALENDAR_URL, CONTACT_EMAIL, HQ_CITY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get Started — Your Calling Team in 24 Hours",
  description:
    "Tell us your goals and call volume. A GoStaffer strategist scopes your dedicated team within 24 hours and gets you live in days. No platform fees, no long contracts.",
  alternates: { canonical: "/contact" },
};

const STATS = [
  { v: "150+", l: "agents on the floor" },
  { v: "< 1", l: "business-day reply" },
  { v: "$0", l: "platform fees" },
];

const PROOF = [
  { Icon: Zap, t: "24-hour kickoff", d: "Live in days, not months." },
  { Icon: Clock, t: "Timezone-matched", d: "Coverage that spans your hours, 24/7." },
  { Icon: MapPin, t: "U.S. accountable", d: `Run from our HQ — ${HQ_CITY}.` },
];

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Get started"
        title={<>Get started in <span className="serif-i font-normal text-gradient">24 hours</span></>}
        lead="Tell us what you're trying to accomplish. We'll scope your team and model the economics within a day — then get you live in days, not months."
        cta={false}
      />

      <section className="bg-mist py-[var(--section-y)]">
        <Container>
          <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            <Reveal className="flex">
              <LeadForm />
            </Reveal>

            {/* dark, tech-forward panel — equal weight, with the reactive orb */}
            <Reveal className="flex">
              <div className="relative flex w-full flex-col overflow-hidden rounded-3xl bg-navy p-7 text-white shadow-[var(--shadow-lg)] sm:p-9">
                <div className="mesh mesh-animated absolute inset-0 opacity-90" aria-hidden />
                <PortalOrb className="absolute inset-0 h-full w-full opacity-[0.5] [mask-image:radial-gradient(70%_60%_at_60%_40%,black,transparent)]" />

                <div className="relative flex h-full flex-col">
                  <div className="mono inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-cyan">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
                    </span>
                    Live calling floor
                  </div>

                  <h2 className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-3xl">
                    Real people, on your phones —{" "}
                    <span className="serif-i font-normal text-gradient-light">fast.</span>
                  </h2>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {STATS.map((s) => (
                      <div key={s.l} className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-center">
                        <div className="font-display text-xl font-bold sm:text-2xl">{s.v}</div>
                        <div className="mt-0.5 text-[0.7rem] leading-tight text-white/55">{s.l}</div>
                      </div>
                    ))}
                  </div>

                  {/* calendar CTA */}
                  <div className="mt-6 rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan/20 text-cyan">
                        <CalendarDays className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-semibold">Prefer to talk now?</h3>
                        <p className="text-sm text-white/60">Book a 15-minute strategy call.</p>
                      </div>
                    </div>
                    <a
                      href={CALENDAR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                    >
                      Open the calendar <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>

                  {/* proof */}
                  <ul className="mt-6 flex flex-col gap-4">
                    {PROOF.map((p) => (
                      <li key={p.t} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10 text-cyan">
                          <p.Icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm">
                          <span className="font-semibold text-white">{p.t}</span>{" "}
                          <span className="text-white/55">— {p.d}</span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <Mail className="h-4 w-4" /> {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
