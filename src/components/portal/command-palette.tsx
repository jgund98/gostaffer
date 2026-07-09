"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search, CornerDownLeft, ArrowUp, ArrowDown, LayoutGrid, Users, UserPlus, ClipboardCheck,
  UserCheck, Megaphone, Headset, GraduationCap, Clock, ListChecks, Inbox, MessageSquare,
  ShieldCheck, FileText, CreditCard, BarChart3, Settings, ListTodo, PlayCircle, BadgeCheck, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EVT = "cb:cmdk";
export function openCommandPalette() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(EVT));
}

type Cmd = { label: string; href: string; group: string; Icon: typeof Search; hint?: string };

const COMMANDS: Cmd[] = [
  // quick actions
  { label: "Onboard a client", href: "/portal/onboard", group: "Actions", Icon: UserPlus, hint: "New" },
  { label: "Create an invoice", href: "/portal/billing", group: "Actions", Icon: CreditCard, hint: "New" },
  { label: "New client request", href: "/portal/client/requests", group: "Actions", Icon: Inbox, hint: "New" },
  // admin
  { label: "Dashboard", href: "/portal/dashboard", group: "Admin", Icon: LayoutGrid },
  { label: "Critical tasks", href: "/portal/tasks", group: "Admin", Icon: ListTodo },
  { label: "Clients", href: "/portal/clients", group: "Admin", Icon: Users },
  { label: "Onboarding tracker", href: "/portal/onboarding", group: "Admin", Icon: ClipboardCheck },
  { label: "Agent requests", href: "/portal/agent-requests", group: "Admin", Icon: UserCheck },
  { label: "Campaigns & scripts", href: "/portal/campaigns", group: "Admin", Icon: Megaphone },
  { label: "Team & assignments", href: "/portal/team", group: "Admin", Icon: Headset },
  { label: "Training", href: "/portal/training", group: "Admin", Icon: GraduationCap },
  { label: "Time clock", href: "/portal/timeclock", group: "Admin", Icon: Clock },
  { label: "Leads & lists", href: "/portal/leads", group: "Admin", Icon: ListChecks },
  { label: "Requests", href: "/portal/requests", group: "Admin", Icon: Inbox },
  { label: "Messages", href: "/portal/messages", group: "Admin", Icon: MessageSquare },
  { label: "Compliance", href: "/portal/compliance", group: "Admin", Icon: ShieldCheck },
  { label: "Documents", href: "/portal/documents", group: "Admin", Icon: FileText },
  { label: "Billing & wallet", href: "/portal/billing", group: "Admin", Icon: CreditCard },
  { label: "Reports", href: "/portal/reports", group: "Admin", Icon: BarChart3 },
  { label: "Settings", href: "/portal/settings", group: "Admin", Icon: Settings },
  // agent
  { label: "Agent · Dashboard", href: "/portal/agent", group: "Agent", Icon: LayoutGrid },
  { label: "Agent · My campaigns", href: "/portal/agent/campaigns", group: "Agent", Icon: Megaphone },
  { label: "Agent · Scripts & materials", href: "/portal/agent/scripts", group: "Agent", Icon: FileText },
  { label: "Agent · My performance", href: "/portal/agent/performance", group: "Agent", Icon: BarChart3 },
  { label: "Agent · Time clock", href: "/portal/agent/timeclock", group: "Agent", Icon: Clock },
  { label: "Agent · Messages", href: "/portal/agent/messages", group: "Agent", Icon: MessageSquare },
  // client
  { label: "Client · Dashboard", href: "/portal/client", group: "Client", Icon: LayoutGrid },
  { label: "Client · Reports", href: "/portal/client/reports", group: "Client", Icon: BarChart3 },
  { label: "Client · Call recordings", href: "/portal/client/recordings", group: "Client", Icon: PlayCircle },
  { label: "Client · Approvals", href: "/portal/client/approvals", group: "Client", Icon: BadgeCheck },
  { label: "Client · Requests", href: "/portal/client/requests", group: "Client", Icon: Inbox },
  { label: "Client · Messages", href: "/portal/client/messages", group: "Client", Icon: MessageSquare },
  { label: "Client · Billing & wallet", href: "/portal/client/billing", group: "Client", Icon: CreditCard },
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return COMMANDS;
    return COMMANDS.filter((c) => c.label.toLowerCase().includes(term) || c.group.toLowerCase().includes(term));
  }, [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onEvt = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(EVT, onEvt);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(EVT, onEvt);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => setActive(0), [q]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].href);
    }
  };

  let idx = -1;
  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ y: -12, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line/80 bg-paper shadow-[0_24px_60px_-15px_rgba(16,24,40,0.35)]"
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-mute" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Jump to anything…"
                className="h-14 flex-1 bg-transparent text-[15px] text-ink placeholder:text-mute focus:outline-none"
              />
              <kbd className="hidden rounded-md border border-line bg-bone px-1.5 py-0.5 text-[0.65rem] font-semibold text-mute sm:block">esc</kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <div className="px-3 py-10 text-center text-sm text-mute">No matches for &ldquo;{q}&rdquo;</div>
              )}
              {results.map((c) => {
                idx++;
                const showGroup = c.group !== lastGroup;
                lastGroup = c.group;
                const isActive = idx === active;
                const myIdx = idx;
                return (
                  <div key={c.href + c.label}>
                    {showGroup && (
                      <div className="mono px-3 pb-1 pt-2 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-mute">{c.group}</div>
                    )}
                    <button
                      onMouseEnter={() => setActive(myIdx)}
                      onClick={() => go(c.href)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                        isActive ? "bg-blade-tint text-blade-700" : "text-slate hover:bg-bone"
                      )}
                    >
                      <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-lg", isActive ? "bg-paper text-blade-700" : "bg-bone text-mute")}>
                        <c.Icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1 font-medium text-ink">{c.label}</span>
                      {c.hint && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blade-tint px-2 py-0.5 text-[0.62rem] font-semibold text-blade-700">
                          <Zap className="h-2.5 w-2.5" /> {c.hint}
                        </span>
                      )}
                      {isActive && <CornerDownLeft className="h-3.5 w-3.5 text-blade-600" />}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 border-t border-line bg-bone/40 px-4 py-2.5 text-[0.68rem] text-mute">
              <span className="flex items-center gap-1"><ArrowUp className="h-3 w-3" /><ArrowDown className="h-3 w-3" /> navigate</span>
              <span className="flex items-center gap-1"><CornerDownLeft className="h-3 w-3" /> open</span>
              <span className="ml-auto flex items-center gap-1 font-semibold text-slate">GoStaffer Portal</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
