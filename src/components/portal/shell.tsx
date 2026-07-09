"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid, Users, UserPlus, ClipboardCheck, Megaphone, Headset, ListChecks,
  ShieldCheck, FileText, Inbox, CreditCard, BarChart3, Settings, PlayCircle,
  BadgeCheck, Search, Bell, Menu, X, ChevronRight, Plus,
  ListTodo, Clock, GraduationCap, UserCheck, MessageSquare,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { CommandPalette, openCommandPalette } from "@/components/portal/command-palette";
import { cn } from "@/lib/utils";

type Item = { href: string; label: string; Icon: typeof LayoutGrid };
type Group = { group: string; items: Item[] };

const ADMIN_NAV: Group[] = [
  {
    group: "Overview",
    items: [
      { href: "/portal/dashboard", label: "Dashboard", Icon: LayoutGrid },
      { href: "/portal/tasks", label: "Critical tasks", Icon: ListTodo },
    ],
  },
  {
    group: "Clients",
    items: [
      { href: "/portal/clients", label: "Clients", Icon: Users },
      { href: "/portal/onboard", label: "Onboard a client", Icon: UserPlus },
      { href: "/portal/onboarding", label: "Onboarding tracker", Icon: ClipboardCheck },
      { href: "/portal/agent-requests", label: "Agent requests", Icon: UserCheck },
    ],
  },
  {
    group: "Operations",
    items: [
      { href: "/portal/campaigns", label: "Campaigns & scripts", Icon: Megaphone },
      { href: "/portal/team", label: "Team & assignments", Icon: Headset },
      { href: "/portal/training", label: "Training", Icon: GraduationCap },
      { href: "/portal/timeclock", label: "Time clock", Icon: Clock },
      { href: "/portal/leads", label: "Leads & lists", Icon: ListChecks },
    ],
  },
  {
    group: "Inbox",
    items: [
      { href: "/portal/requests", label: "Requests", Icon: Inbox },
      { href: "/portal/messages", label: "Messages", Icon: MessageSquare },
    ],
  },
  {
    group: "Trust",
    items: [
      { href: "/portal/compliance", label: "Compliance", Icon: ShieldCheck },
      { href: "/portal/documents", label: "Documents", Icon: FileText },
    ],
  },
  {
    group: "Finance & insights",
    items: [
      { href: "/portal/billing", label: "Billing & wallet", Icon: CreditCard },
      { href: "/portal/reports", label: "Reports", Icon: BarChart3 },
    ],
  },
];

const CLIENT_NAV: Group[] = [
  { group: "Overview", items: [{ href: "/portal/client", label: "Dashboard", Icon: LayoutGrid }] },
  {
    group: "Performance",
    items: [
      { href: "/portal/client/reports", label: "Reports", Icon: BarChart3 },
      { href: "/portal/client/recordings", label: "Call recordings", Icon: PlayCircle },
      { href: "/portal/client/team", label: "My team", Icon: Headset },
      { href: "/portal/client/training", label: "Training", Icon: GraduationCap },
    ],
  },
  {
    group: "Account",
    items: [
      { href: "/portal/client/approvals", label: "Approvals", Icon: BadgeCheck },
      { href: "/portal/client/requests", label: "Requests", Icon: Inbox },
      { href: "/portal/client/messages", label: "Messages", Icon: MessageSquare },
      { href: "/portal/client/documents", label: "Documents", Icon: FileText },
      { href: "/portal/client/billing", label: "Billing & wallet", Icon: CreditCard },
    ],
  },
];

const AGENT_NAV: Group[] = [
  { group: "Overview", items: [{ href: "/portal/agent", label: "Dashboard", Icon: LayoutGrid }] },
  {
    group: "My work",
    items: [
      { href: "/portal/agent/campaigns", label: "My campaigns", Icon: Megaphone },
      { href: "/portal/agent/scripts", label: "Scripts & materials", Icon: FileText },
    ],
  },
  {
    group: "Me",
    items: [
      { href: "/portal/agent/performance", label: "My performance", Icon: BarChart3 },
      { href: "/portal/agent/timeclock", label: "Time clock", Icon: Clock },
      { href: "/portal/agent/messages", label: "Messages", Icon: MessageSquare },
    ],
  },
];

type Mode = "admin" | "agent" | "client";

function isActive(pathname: string, href: string) {
  if (href === "/portal/client" || href === "/portal/agent" || href === "/portal/dashboard") return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

function ViewSwitch({ mode, onNavigate }: { mode: Mode; onNavigate?: () => void }) {
  const opts: { m: Mode; href: string; label: string }[] = [
    { m: "admin", href: "/portal/dashboard", label: "Admin" },
    { m: "agent", href: "/portal/agent", label: "Agent" },
    { m: "client", href: "/portal/client", label: "Client" },
  ];
  return (
    <div className="grid grid-cols-3 gap-1 rounded-xl border border-line bg-bone p-1">
      {opts.map((o) => (
        <Link
          key={o.m}
          href={o.href}
          onClick={onNavigate}
          className={cn("rounded-lg py-1.5 text-center text-xs font-semibold transition-colors", mode === o.m ? "bg-paper text-ink shadow-[var(--shadow-sm)]" : "text-mute hover:text-slate")}
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}

function modeFor(pathname: string): Mode {
  if (pathname.startsWith("/portal/client")) return "client";
  if (pathname.startsWith("/portal/agent")) return "agent";
  return "admin";
}

function SidebarInner({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const mode = modeFor(pathname);
  const nav = mode === "client" ? CLIENT_NAV : mode === "agent" ? AGENT_NAV : ADMIN_NAV;
  const home = mode === "client" ? "/portal/client" : mode === "agent" ? "/portal/agent" : "/portal/dashboard";
  const persona =
    mode === "client"
      ? { name: "David Reyes", sub: "Acme Corp · Client", initials: "DR", grad: "from-[#1f9e68] to-[#2fd39e]" }
      : mode === "agent"
      ? { name: "Mariam H.", sub: "Senior Agent · Cairo", initials: "MH", grad: "from-[#1f9e68] to-[#2fd39e]" }
      : { name: "Jordan G.", sub: "Admin · GoStaffer", initials: "JG", grad: "from-[#0ea5a5] to-[#1f9e68]" };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-4">
        <Link href={home} onClick={onNavigate} className="block w-full">
          <Logo className="h-auto w-full max-w-[134px]" />
        </Link>
      </div>
      <div className="px-3 pb-2">
        <ViewSwitch mode={mode} onNavigate={onNavigate} />
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <nav className="flex flex-col gap-5">
          {nav.map((g) => (
            <div key={g.group}>
              <div className="mono mb-1.5 px-3 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-mute">{g.group}</div>
              <div className="flex flex-col gap-0.5">
                {g.items.map(({ href, label, Icon }) => {
                  const active = isActive(pathname, href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={onNavigate}
                      className={cn(
                        "group relative flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-all",
                        active
                          ? "bg-gradient-to-r from-blade-tint to-blade-tint/30 text-blade-700 shadow-[inset_0_0_0_1px_rgba(31,158,104,0.10)]"
                          : "text-slate hover:bg-bone hover:text-ink"
                      )}
                    >
                      {active && <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-blade-500 to-cyan" />}
                      <Icon className={cn("h-4 w-4 transition-colors", active ? "text-blade-600" : "text-mute group-hover:text-slate")} />
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-line p-3">
        <Link href="/portal/settings" onClick={onNavigate} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate hover:bg-bone hover:text-ink">
          <Settings className="h-4 w-4 text-mute" /> Settings
        </Link>
        <button className="mt-2 flex w-full items-center gap-3 rounded-xl border border-line/70 bg-bone/60 p-2.5 text-left transition-colors hover:bg-bone">
          <span className="relative">
            <span className={cn("grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br text-sm font-bold text-white shadow-[0_1px_3px_rgba(16,24,40,0.18)] ring-2 ring-white", persona.grad)}>{persona.initials}</span>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald ring-2 ring-paper" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-ink">{persona.name}</div>
            <div className="truncate text-xs text-mute">{persona.sub}</div>
          </div>
          <ChevronRight className="h-4 w-4 text-mute" />
        </button>
      </div>
    </div>
  );
}

export function PortalShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const mode = modeFor(pathname);

  return (
    <div className="min-h-[100svh] bg-mist text-ink">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-line/70 bg-paper lg:block">
        <SidebarInner />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-paper shadow-xl">
            <button onClick={() => setOpen(false)} className="absolute right-3 top-4 grid h-9 w-9 place-items-center rounded-lg text-slate hover:bg-bone" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
            <SidebarInner onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line/70 bg-paper/80 px-4 backdrop-blur-xl sm:px-6">
          <button onClick={() => setOpen(true)} className="grid h-9 w-9 place-items-center rounded-lg border border-line-2 text-slate lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>

          <button
            onClick={openCommandPalette}
            className="relative hidden h-9 max-w-xs flex-1 items-center gap-2 rounded-xl border border-line/80 bg-bone/70 pl-9 pr-2 text-sm text-mute transition hover:border-line-2 hover:bg-bone sm:flex"
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" />
            <span className="flex-1 text-left">Search or jump to…</span>
            <kbd className="rounded-md border border-line bg-paper px-1.5 py-0.5 text-[0.65rem] font-semibold text-mute">⌘K</kbd>
          </button>
          <button
            onClick={openCommandPalette}
            aria-label="Search"
            className="grid h-9 w-9 place-items-center rounded-xl border border-line/80 bg-paper text-slate transition-colors hover:bg-bone sm:hidden"
          >
            <Search className="h-4 w-4" />
          </button>

          <div className="ml-auto flex items-center gap-2">
            {mode === "client" ? (
              <Link href="/portal/client/requests" className="btn-electric inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-sm font-semibold text-white">
                <Plus className="h-4 w-4" /> <span className="hidden sm:inline">New request</span>
              </Link>
            ) : mode === "agent" ? (
              <Link href="/portal/agent/timeclock" className="btn-electric inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-sm font-semibold text-white">
                <Clock className="h-4 w-4" /> <span className="hidden sm:inline">Clock in / out</span>
              </Link>
            ) : (
              <Link href="/portal/onboard" className="btn-electric inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-sm font-semibold text-white">
                <UserPlus className="h-4 w-4" /> <span className="hidden sm:inline">Onboard client</span>
              </Link>
            )}
            <button className="relative grid h-9 w-9 place-items-center rounded-xl border border-line/80 bg-paper text-slate transition-colors hover:bg-bone hover:text-ink" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#ef4444] ring-2 ring-paper" />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
      <CommandPalette />
    </div>
  );
}
