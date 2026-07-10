"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  Database,
  Boxes,
  PhoneOutgoing,
  Users,
  Headset,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NodeDef = {
  key: string;
  title: string;
  sub: string;
  Icon: typeof Database;
  hub?: boolean;
};

const NODES: NodeDef[] = [
  { key: "crm", title: "Your tools", sub: "CRM · Help desk · DB", Icon: Database },
  { key: "mw", title: "GoStaffer connection", sub: "API · Webhooks · Sync", Icon: Boxes, hub: true },
  { key: "dialer", title: "Phone system", sub: "SIP · Record · Route", Icon: PhoneOutgoing },
];

export function IntegrationFlow({ className }: { className?: string }) {
  const [operator, setOperator] = useState<"gostaffer" | "client">("gostaffer");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "120px" });
  const animate = inView && !reduce;

  return (
    <div ref={ref} className={cn("flex flex-col gap-9", className)}>
      {/* segmented toggle */}
      <div className="mx-auto inline-flex rounded-xl border border-line-2 bg-paper p-1 shadow-[var(--shadow-sm)]">
        {(
          [
            { k: "gostaffer", label: "GoStaffer reps", Icon: Headset },
            { k: "client", label: "Your agents", Icon: Users },
          ] as const
        ).map((o) => (
          <button
            key={o.k}
            onClick={() => setOperator(o.k)}
            className={cn(
              "relative inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold transition-colors",
              operator === o.k ? "text-white" : "text-slate hover:text-ink"
            )}
          >
            {operator === o.k && (
              <motion.span
                layoutId="op-seg"
                className="absolute inset-0 rounded-lg"
                style={{ background: "var(--grad-aurora)" }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              />
            )}
            <o.Icon className="relative h-4 w-4" />
            <span className="relative">{o.label}</span>
          </button>
        ))}
      </div>

      <div className="grid items-stretch gap-3 lg:grid-cols-[auto_1fr] lg:gap-5">
        {/* left rail — the plumbing */}
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
          {NODES.map((n, i) => (
            <div key={n.key} className="contents">
              <FlowNode node={n} />
              {i < NODES.length - 1 && <Connector animate={animate} label={CONNECTOR_LABELS[i]} />}
            </div>
          ))}
        </div>

        {/* the bridge into the workspace */}
        <div className="relative flex flex-col">
          <BridgeWire animate={animate} />
          <LiveScreen operator={operator} animate={animate} />
        </div>
      </div>

      <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-slate">
        Your records flow <span className="font-semibold text-blue-700">in</span>, every result flows{" "}
        <span className="font-semibold text-blue-700">back</span> — one shared workspace, operated by whoever you
        choose. Same screen, same data, your rules.
      </p>
    </div>
  );
}

const CONNECTOR_LABELS = ["records", "calls"];

function FlowNode({ node }: { node: NodeDef }) {
  return (
    <div
      className={cn(
        "group relative flex flex-1 items-center gap-3 overflow-hidden rounded-2xl border p-4 transition-all duration-200",
        node.hub
          ? "border-blade-500/40 bg-blade-tint shadow-[var(--shadow-sm)]"
          : "border-line bg-paper shadow-[var(--shadow-sm)] hover:border-line-2"
      )}
    >
      {node.hub && (
        <>
          <span className="pointer-events-none absolute -left-6 -top-8 h-24 w-24 rounded-full bg-blade-400/25 blur-2xl" aria-hidden />
          <span className="absolute right-3 top-3 mono text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-blade-700/70">
            always-on
          </span>
        </>
      )}
      <span
        className={cn(
          "relative grid h-11 w-11 shrink-0 place-items-center rounded-xl",
          node.hub ? "text-white" : "bg-cloud text-slate"
        )}
        style={node.hub ? { background: "var(--grad-aurora)" } : undefined}
      >
        <node.Icon className="h-5 w-5" />
      </span>
      <span className="relative min-w-0">
        <span className="block font-display text-sm font-semibold leading-tight text-ink">{node.title}</span>
        <span className="mono mt-0.5 block truncate text-[0.66rem] uppercase tracking-wider text-mute">{node.sub}</span>
      </span>
    </div>
  );
}

/** Vertical connector between rail nodes, with two-way flowing packets. */
function Connector({ animate, label }: { animate: boolean; label: string }) {
  return (
    <div className="relative flex shrink-0 items-center justify-center sm:w-10 lg:h-9 lg:w-full">
      {/* desktop/stacked = vertical line; sm row = horizontal */}
      <div className="relative hidden h-9 w-px items-center justify-center lg:flex">
        <div className="h-full w-px bg-gradient-to-b from-line-2 via-blade-400/50 to-line-2" />
        {animate && (
          <>
            <span className="absolute inset-0 overflow-hidden">
              <span className="cb-packet-y absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-blade-500 shadow-[0_0_8px_var(--blade-400)]" />
            </span>
            <span className="absolute inset-0 overflow-hidden">
              <span
                className="cb-packet-y absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan/70"
                style={{ animationDirection: "reverse", animationDelay: "1.1s" }}
              />
            </span>
          </>
        )}
        <span className="mono absolute left-3 top-1/2 -translate-y-1/2 text-[0.55rem] uppercase tracking-wider text-mute">
          {label}
        </span>
      </div>
      <div className="relative flex h-px w-full items-center lg:hidden">
        <div className="h-px w-full bg-gradient-to-r from-line-2 via-blade-400/50 to-line-2" />
        {animate && (
          <span className="absolute inset-0 overflow-hidden">
            <span className="cb-packet-x absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blade-500 shadow-[0_0_8px_var(--blade-400)]" />
          </span>
        )}
      </div>
    </div>
  );
}

/** Horizontal bridge from the rail into the live workspace (desktop only). */
function BridgeWire({ animate }: { animate: boolean }) {
  return (
    <div className="pointer-events-none absolute -left-5 top-1/2 hidden h-px w-5 -translate-y-1/2 lg:block">
      <div className="h-full w-full bg-gradient-to-r from-blade-400/50 to-blade-500" />
      {animate && (
        <span className="absolute inset-0 overflow-hidden">
          <span className="cb-packet-x absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blade-500 shadow-[0_0_8px_var(--blade-400)]" />
        </span>
      )}
    </div>
  );
}

/** The showcase: a mini live agent workspace whose operator swaps with the toggle. */
function LiveScreen({ operator, animate }: { operator: "gostaffer" | "client"; animate: boolean }) {
  const isCB = operator === "gostaffer";
  return (
    <div className="relative flex-1 overflow-hidden rounded-2xl border border-line bg-paper shadow-[var(--shadow-md)]">
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-line bg-mist/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex gap-1" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-line-2" />
            <span className="h-2 w-2 rounded-full bg-line-2" />
            <span className="h-2 w-2 rounded-full bg-line-2" />
          </span>
          <span className="ml-1 font-display text-xs font-semibold text-ink">Agent Workspace</span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[0.66rem] font-semibold text-emerald">
          <span className="relative flex h-1.5 w-1.5">
            {animate && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
          </span>
          LIVE
        </span>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-[1.1fr_1fr]">
        {/* left: who's on the call */}
        <div>
          <div className="mono text-[0.62rem] uppercase tracking-wider text-mute">Operated by</div>
          <div className="mt-2 h-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={operator}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="flex items-center gap-2.5"
              >
                <span
                  className="grid h-9 w-9 place-items-center rounded-full font-display text-sm font-bold text-white"
                  style={{ background: isCB ? "linear-gradient(135deg,#1f9e68,#2fd39e)" : "linear-gradient(135deg,#0ea5a5,#1f9e68)" }}
                >
                  {isCB ? "M" : "Y"}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-ink">{isCB ? "Mariam H." : "Your agent"}</span>
                  <span className="block text-xs text-slate">{isCB ? "GoStaffer · Alexandria" : "Your in-house team"}</span>
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 rounded-xl border border-line bg-mist/50 p-3">
            <div className="mono text-[0.62rem] uppercase tracking-wider text-mute">On the line</div>
            <div className="mt-1 text-sm font-semibold text-ink">Acme Corp — David R.</div>
            <div className="text-xs text-slate">+1 (305) 555·0142 · 00:48</div>
          </div>
        </div>

        {/* right: the assist + sync */}
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-blade-500/30 bg-blade-tint p-3">
            <div className="flex items-center gap-1.5 text-[0.66rem] font-semibold text-blade-700">
              <Sparkles className="h-3.5 w-3.5" /> AI assist
            </div>
            <p className="mt-1 text-xs leading-snug text-ink">
              “I can get that set up for you today — does Thursday work?”
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-blade-600 px-3 py-1.5 text-xs font-semibold text-white">Book meeting</span>
            <span className="rounded-lg border border-line-2 px-3 py-1.5 text-xs font-semibold text-slate">Callback</span>
          </div>
          <div className="mt-auto flex items-center gap-1.5 text-xs text-emerald">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Synced back to your CRM
          </div>
        </div>
      </div>
    </div>
  );
}
