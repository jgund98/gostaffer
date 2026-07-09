import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  lead,
  cta = true,
  align = "left",
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  cta?: boolean;
  align?: "left" | "center";
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "hero-dark mesh mesh-animated relative overflow-hidden border-b border-white/10 pb-20 pt-32 text-white sm:pt-40",
        className
      )}
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="orb orb-cyan float-b absolute right-[-8%] top-[-12%] h-[48vh] w-[48vh] opacity-40" aria-hidden />
      <Container className="relative">
        <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
          {eyebrow && (
            <Reveal>
              <Eyebrow onDark>{eyebrow}</Eyebrow>
            </Reveal>
          )}
          <Reveal>
            <h1 className="mt-5 text-balance font-display text-[2.6rem] font-bold leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-[4rem]">
              {title}
            </h1>
          </Reveal>
          {lead && (
            <Reveal>
              <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed text-white/70", align === "center" && "mx-auto")}>
                {lead}
              </p>
            </Reveal>
          )}
          {cta && (
            <Reveal>
              <div className={cn("mt-9 flex flex-col gap-3 sm:flex-row", align === "center" && "justify-center")}>
                <Button href="/contact" size="lg">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
                <Link
                  href="/contact"
                  className="inline-flex h-[3.25rem] items-center justify-center gap-2 rounded-[10px] border border-white/20 px-7 text-base font-semibold text-white transition-colors hover:border-white/50"
                >
                  Book a Call
                </Link>
              </div>
            </Reveal>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
