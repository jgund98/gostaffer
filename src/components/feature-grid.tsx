import type { LucideIcon } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { cn } from "@/lib/utils";

export type Feature = {
  Icon: LucideIcon;
  title: string;
  body: string;
};

export function FeatureGrid({
  features,
  cols = 3,
  trailing,
  className,
}: {
  features: Feature[];
  cols?: 2 | 3;
  /** Optional node rendered as the final grid cell (e.g. a CTA tile to fill a trailing gap). */
  trailing?: React.ReactNode;
  className?: string;
}) {
  return (
    <RevealGroup
      className={cn(
        "grid gap-px overflow-hidden rounded-2xl border border-line bg-line",
        cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
        className
      )}
    >
      {features.map((f) => (
        <RevealItem
          key={f.title}
          className="group flex flex-col bg-paper p-6 transition-colors duration-200 hover:bg-frost sm:p-7"
        >
          <span
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-[0_8px_20px_-8px_rgba(14,165,165,0.6)] transition-transform group-hover:scale-105"
            style={{ background: "var(--grad-aurora)" }}
          >
            <f.Icon className="h-5 w-5" />
          </span>
          <h3 className="mt-5 font-display text-lg font-semibold text-ink">{f.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate">{f.body}</p>
        </RevealItem>
      ))}
      {trailing && <RevealItem className="flex">{trailing}</RevealItem>}
    </RevealGroup>
  );
}
