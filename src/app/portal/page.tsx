import type { Metadata } from "next";
import Link from "next/link";
import { PortalLogin } from "@/components/portal-login";
import { PortalOrb } from "@/components/portal-orb";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Portal Login",
  description: "Sign in to your GoStaffer Command Center.",
  robots: { index: false },
};

export default function Portal() {
  return (
    <section className="grid min-h-[100svh] lg:grid-cols-[1.05fr_0.95fr]">
      {/* left — the interactive call-network orb */}
      <div className="relative h-60 overflow-hidden bg-[#051a12] sm:h-72 lg:h-auto">
        <div className="orb orb-cyan absolute -right-16 top-1/4 h-72 w-72 opacity-30" aria-hidden />
        <PortalOrb className="absolute inset-0 h-full w-full" />

        <Link href="/" className="absolute left-6 top-6 z-10 lg:left-10 lg:top-10">
          <Logo white className="h-9" />
        </Link>

        <div className="absolute inset-x-6 bottom-6 z-10 hidden max-w-md lg:bottom-10 lg:left-10 lg:block">
          <div className="mono mb-3 inline-flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-cyan">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
            </span>
            Live network
          </div>
          <h2 className="font-display text-3xl font-semibold leading-tight text-white">
            Every call, every result —{" "}
            <span className="serif-i font-normal text-gradient-light">one live view.</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/55">
            Your Command Center connects your campaigns, your team, and your numbers in real time.
          </p>
        </div>
      </div>

      {/* right — the login */}
      <div className="relative flex items-center justify-center overflow-hidden bg-mist px-5 py-16 lg:py-20">
        <div className="dot-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_50%_at_50%_40%,black,transparent)]" />
        <div className="relative w-full max-w-md">
          <PortalLogin />
          <p className="mt-6 text-center text-xs text-slate">
            Not a client yet?{" "}
            <Link href="/contact" className="font-medium text-blade-700 link-underline">
              Get started →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
