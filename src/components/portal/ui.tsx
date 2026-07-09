import { TrendingUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ClientStatus, InvoiceStatus } from "@/lib/portal-data";

// soft, layered "floating" elevation — the premium-SaaS card shadow
const CARD_SHADOW = "shadow-[0_1px_2px_rgba(16,24,40,0.04),0_6px_20px_-12px_rgba(16,24,40,0.14)]";

export function PageHead({
  title,
  sub,
  children,
}: {
  title: string;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h1>
        {sub && <p className="mt-1 text-sm text-slate">{sub}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-1.5 overflow-hidden rounded-full bg-cloud", className)}>
      <div className="h-full rounded-full bg-gradient-to-r from-blade-500 to-cyan transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

type Tone = "neutral" | "blue" | "green" | "amber" | "red" | "violet";
const PILL_TONES: Record<Tone, string> = {
  neutral: "bg-cloud text-slate",
  blue: "bg-blade-500/12 text-blade-700",
  green: "bg-emerald/12 text-emerald",
  amber: "bg-spark/15 text-[#b06a00]",
  red: "bg-[#ef4444]/12 text-[#dc2626]",
  violet: "bg-[#7c3aed]/12 text-[#6d28d9]",
};

export function Pill({ tone = "neutral", dot, children }: { tone?: Tone; dot?: boolean; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", PILL_TONES[tone])}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-2xl border border-line/80 bg-paper", CARD_SHADOW, className)}>{children}</div>
  );
}

export function EmptyState({
  Icon,
  title,
  body,
  action,
}: {
  Icon: LucideIcon;
  title: string;
  body?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line-2 bg-bone/30 px-6 py-14 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-paper text-mute shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-display text-base font-semibold text-ink">{title}</h3>
      {body && <p className="mt-1 max-w-sm text-sm text-slate">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-4">
      <h2 className="font-display text-lg font-semibold text-ink">{children}</h2>
      {sub && <p className="mt-0.5 text-sm text-slate">{sub}</p>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  Icon,
  accent,
}: {
  label: string;
  value: string;
  delta?: string;
  Icon: LucideIcon;
  accent?: boolean;
}) {
  const up = !!delta && delta.trim().startsWith("+");
  return (
    <Card className={cn("group relative overflow-hidden p-5 transition-transform duration-200 hover:-translate-y-0.5", accent && "ring-1 ring-blade-500/20")}>
      <div className="relative flex items-center justify-between">
        <span className="text-[0.8rem] font-medium text-slate">{label}</span>
        <span
          className={cn(
            "grid h-9 w-9 place-items-center rounded-xl shadow-sm",
            accent ? "text-white" : "bg-blade-tint text-blade-700"
          )}
          style={accent ? { background: "var(--grad-aurora)" } : undefined}
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
      </div>
      <div className="relative mt-3.5 font-display text-[2rem] font-bold leading-none tracking-tight text-ink tnum">{value}</div>
      {delta && (
        <div className={cn("relative mt-2 flex items-center gap-1 text-xs font-medium", up ? "text-emerald" : "text-mute")}>
          {up && <TrendingUp className="h-3.5 w-3.5" />}
          {delta}
        </div>
      )}
    </Card>
  );
}

const CLIENT_BADGE: Record<ClientStatus, { label: string; cls: string }> = {
  active: { label: "Active", cls: "bg-emerald/12 text-emerald" },
  onboarding: { label: "Onboarding", cls: "bg-blade-500/12 text-blade-700" },
  invited: { label: "Invited", cls: "bg-spark/15 text-[#b06a00]" },
  paused: { label: "Paused", cls: "bg-cloud text-slate" },
};

export function StatusBadge({ status }: { status: ClientStatus }) {
  const b = CLIENT_BADGE[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", b.cls)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {b.label}
    </span>
  );
}

const INVOICE_BADGE: Record<InvoiceStatus, { label: string; cls: string }> = {
  paid: { label: "Paid", cls: "bg-emerald/12 text-emerald" },
  due: { label: "Due", cls: "bg-blade-500/12 text-blade-700" },
  overdue: { label: "Overdue", cls: "bg-[#ef4444]/12 text-[#dc2626]" },
  draft: { label: "Draft", cls: "bg-cloud text-slate" },
};

export function InvoiceBadge({ status }: { status: InvoiceStatus }) {
  const b = INVOICE_BADGE[status];
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", b.cls)}>{b.label}</span>
  );
}

export function Avatar({ initials, grad, size = 36 }: { initials: string; grad: string; size?: number }) {
  return (
    <span
      className={cn("inline-grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-display font-bold text-white shadow-[0_1px_3px_rgba(16,24,40,0.18)] ring-2 ring-white", grad)}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </span>
  );
}

export function initialsOf(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Tiny inline sparkline (area) for report/usage cards. */
export function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const w = 240;
  const h = 56;
  const max = Math.max(...data);
  const min = Math.min(...data) * 0.92;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => [i * step, h - ((v - min) / (max - min)) * (h - 6) - 3]);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("w-full", className)} preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--blade-500)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--blade-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#spark-fill)" />
      <path d={line} fill="none" stroke="var(--blade-500)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
