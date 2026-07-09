import { cn } from "@/lib/utils";
import { Container } from "./container";

type Tone = "paper" | "bone" | "mesh" | "electric" | "ink";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  bone: "bg-bone text-ink",
  mesh: "mesh mesh-animated text-white",
  electric: "block-electric text-white",
  ink: "bg-navy text-white",
};

export function Section({
  id,
  tone = "paper",
  className,
  containerClassName,
  bleed = false,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  bleed?: boolean;
  children: React.ReactNode;
}) {
  const dark = tone === "mesh" || tone === "electric" || tone === "ink";
  return (
    <section
      id={id}
      className={cn("relative overflow-hidden py-[var(--section-y)]", toneClass[tone], className)}
    >
      {dark && (
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      )}
      {bleed ? children : <Container className={cn("relative", containerClassName)}>{children}</Container>}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
  onDark = false,
}: {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "mono inline-flex items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em]",
        onDark ? "text-cyan" : "text-blue-700",
        className
      )}
    >
      <span
        className="h-[7px] w-[7px] rotate-45"
        style={{ background: onDark ? "var(--cyan)" : "var(--grad-aurora)" }}
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "max-w-3xl text-balance text-[2.1rem] font-semibold leading-[1.02] sm:text-4xl md:text-[3rem]",
          onDark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "max-w-2xl text-[1.05rem] leading-relaxed",
            onDark ? "text-white/70" : "text-slate",
            align === "center" && "mx-auto"
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
