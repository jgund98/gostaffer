import Link from "next/link";
import { UserPlus, Search, SlidersHorizontal, ChevronRight } from "lucide-react";
import { CLIENTS, fmtUSD } from "@/lib/portal-data";
import { Card, StatusBadge, Avatar, initialsOf } from "@/components/portal/ui";

const FILTERS = ["All", "Active", "Onboarding", "Invited", "Paused"];

export default function Clients() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Clients</h1>
          <p className="mt-1 text-sm text-slate">{CLIENTS.length} accounts · {CLIENTS.filter((c) => c.status === "active").length} live</p>
        </div>
        <Link href="/portal/onboard" className="btn-electric inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-white">
          <UserPlus className="h-4 w-4" /> Onboard a client
        </Link>
      </div>

      {/* filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[12rem] flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" />
          <input
            placeholder="Search clients…"
            className="h-10 w-full rounded-lg border border-line-2 bg-paper pl-9 pr-3 text-sm text-ink placeholder:text-mute focus:border-blade-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {FILTERS.map((f, i) => (
            <button
              key={f}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${i === 0 ? "bg-ink text-white" : "border border-line-2 text-slate hover:bg-bone"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="ml-auto inline-flex h-10 items-center gap-2 rounded-lg border border-line-2 px-3 text-sm font-medium text-slate hover:bg-bone">
          <SlidersHorizontal className="h-4 w-4" /> <span className="hidden sm:inline">Filters</span>
        </button>
      </div>

      {/* table */}
      <Card className="overflow-hidden">
        <div className="hidden grid-cols-[2.2fr_1.2fr_1fr_0.8fr_1fr_auto] gap-4 border-b border-line bg-bone/60 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-mute lg:grid">
          <span>Client</span>
          <span>Services</span>
          <span>Status</span>
          <span>Agents</span>
          <span>MRR</span>
          <span />
        </div>
        <div className="divide-y divide-line">
          {CLIENTS.map((c) => (
            <Link
              key={c.id}
              href={`/portal/clients/${c.id}`}
              className="grid grid-cols-1 items-center gap-3 px-5 py-4 transition-colors hover:bg-bone/50 lg:grid-cols-[2.2fr_1.2fr_1fr_0.8fr_1fr_auto] lg:gap-4"
            >
              <div className="flex items-center gap-3">
                <Avatar initials={initialsOf(c.company)} grad={c.grad} />
                <div className="min-w-0">
                  <div className="truncate font-semibold text-ink">{c.company}</div>
                  <div className="truncate text-xs text-mute">{c.contact} · {c.industry}</div>
                </div>
              </div>
              <div className="text-sm text-slate">
                <span className="line-clamp-1">{c.services.join(", ")}</span>
              </div>
              <div><StatusBadge status={c.status} /></div>
              <div className="text-sm text-slate">{c.agents > 0 ? `${c.agents} agents` : "—"}</div>
              <div className="font-semibold text-ink tnum">{c.mrr > 0 ? fmtUSD(c.mrr) : "—"}</div>
              <ChevronRight className="hidden h-4 w-4 text-mute lg:block" />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
