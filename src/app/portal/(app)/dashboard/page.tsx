"use client";

import Link from "next/link";
import {
  Users, DollarSign, Clock, FileText, UserPlus, ArrowUpRight, ArrowRight, Phone,
  Activity, ListTodo, AlertTriangle, CheckCircle2, Rocket,
} from "lucide-react";
import { CLIENTS, INVOICES, ACTIVITY, CRITICAL_TASKS, AGENTS_TEAM, REPORT_SERIES, fmtUSD, clientById } from "@/lib/portal-data";
import { Card, StatusBadge, Avatar, initialsOf, Pill } from "@/components/portal/ui";
import { Stagger, Item, DashStat, AreaChart, Meter, LiveDot, useLive, useHover } from "@/components/portal/dash";

const ICONS = { billing: DollarSign, onboard: Rocket, invite: UserPlus, usage: Phone, alert: AlertTriangle } as const;

export default function AdminDashboard() {
  const active = CLIENTS.filter((c) => c.status === "active");
  const inPipeline = CLIENTS.filter((c) => c.status === "onboarding" || c.status === "invited");
  const mrr = active.reduce((s, c) => s + c.mrr, 0);
  const minutes = useLive(CLIENTS.reduce((s, c) => s + c.minutesPeriod, 0), () => Math.floor(Math.random() * 60) + 10, 1800);
  const outstanding = INVOICES.filter((i) => i.status === "due" || i.status === "overdue").reduce((s, i) => s + i.amount, 0);
  const onCall = useHover(142, 4, 2800);
  const dialsHr = useHover(2850, 70, 2400);
  const openTasks = CRITICAL_TASKS.filter((t) => t.status !== "completed").length;

  return (
    <div className="flex flex-col gap-7">
      {/* hero */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-1.5 inline-flex items-center gap-2 text-xs font-semibold text-emerald">
            <LiveDot /> {onCall} agents on calls right now
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Good afternoon, Jordan</h1>
          <p className="mt-1 text-sm text-slate">Here&apos;s how your book of business is running today.</p>
        </div>
        <Link href="/portal/onboard" className="btn-electric inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-white">
          <UserPlus className="h-4 w-4" /> Onboard a client
        </Link>
      </div>

      {/* KPIs */}
      <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Item><DashStat label="Active clients" value={active.length} delta={`+${inPipeline.length} in pipeline`} Icon={Users} accent /></Item>
        <Item><DashStat label="Recurring revenue" value={mrr} prefix="$" delta="+14% vs last month" Icon={DollarSign} /></Item>
        <Item><DashStat label="Minutes this period" value={minutes} delta="+8.2% week over week" Icon={Clock} /></Item>
        <Item><DashStat label="Outstanding" value={outstanding} prefix="$" delta="2 invoices awaiting" Icon={FileText} /></Item>
      </Stagger>

      {/* network volume + live floor */}
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Item>
          <Card className="p-5 sm:p-6">
            <div className="mb-1 flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">Network volume</h2>
                <p className="text-sm text-slate">Dialing minutes across all live clients</p>
              </div>
              <Pill tone="green" dot>Trending up</Pill>
            </div>
            <AreaChart data={REPORT_SERIES} live height={150} className="mt-3" />
            <div className="mt-2 flex items-center gap-2 text-xs text-mute"><LiveDot /> Live from the floor</div>
          </Card>
        </Item>

        <Item>
          <Card className="flex h-full flex-col p-5 sm:p-6">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-emerald"><LiveDot /> Live floor</div>
            <Meter value={47} label="connect rate" />
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-line/70 bg-bone/40 p-3">
                <div className="font-display text-xl font-bold text-ink tnum">{onCall}</div>
                <div className="text-xs text-mute">On call now</div>
              </div>
              <div className="rounded-xl border border-line/70 bg-bone/40 p-3">
                <div className="font-display text-xl font-bold text-ink tnum">{dialsHr.toLocaleString()}</div>
                <div className="text-xs text-mute">Dials / hour</div>
              </div>
            </div>
          </Card>
        </Item>
      </div>

      {/* pipeline + needs attention */}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Item>
          <Card className="p-5 sm:p-6">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">Onboarding pipeline</h2>
                <p className="text-sm text-slate">Clients getting set up right now</p>
              </div>
              <Link href="/portal/onboarding" className="text-sm font-semibold text-blade-700 hover:text-blade-600">Tracker →</Link>
            </div>
            <div className="flex flex-col divide-y divide-line">
              {inPipeline.map((c) => (
                <Link key={c.id} href={`/portal/clients/${c.id}`} className="group flex items-center gap-4 py-3.5">
                  <Avatar initials={initialsOf(c.company)} grad={c.grad} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-semibold text-ink">{c.company}</span>
                      <StatusBadge status={c.status} />
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-cloud">
                        <div className="h-full rounded-full bg-gradient-to-r from-blade-500 to-cyan" style={{ width: `${(c.onboardStep / 5) * 100}%` }} />
                      </div>
                      <span className="text-xs text-mute">Step {c.onboardStep}/5</span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-mute transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </Card>
        </Item>

        <Item>
          <Card className="flex h-full flex-col p-5 sm:p-6">
            <h2 className="mb-3 font-display text-lg font-semibold text-ink">Needs attention</h2>
            <div className="flex flex-col gap-2">
              {INVOICES.filter((i) => i.status === "overdue" || i.status === "due").map((inv) => {
                const c = clientById(inv.clientId);
                return (
                  <div key={inv.id} className="flex items-center justify-between rounded-xl border border-line bg-bone/50 px-3.5 py-2.5">
                    <div className="flex items-center gap-2.5">
                      {c && <Avatar initials={initialsOf(c.company)} grad={c.grad} size={28} />}
                      <div>
                        <div className="text-sm font-semibold text-ink">{c?.company}</div>
                        <div className="text-xs text-mute">{inv.number} · due {inv.due}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-ink tnum">{fmtUSD(inv.amount)}</div>
                      <div className={`text-xs font-semibold ${inv.status === "overdue" ? "text-[#dc2626]" : "text-blade-700"}`}>{inv.status === "overdue" ? "Overdue" : "Due soon"}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link href="/portal/tasks" className="mt-3 flex items-center justify-between rounded-xl bg-spark/12 px-3.5 py-2.5 text-sm font-semibold text-[#b06a00] transition-colors hover:bg-spark/20">
              <span className="flex items-center gap-2"><ListTodo className="h-4 w-4" /> {openTasks} critical tasks open</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-auto flex items-center gap-2 pt-3 text-xs text-emerald"><CheckCircle2 className="h-4 w-4" /> Auto-billing runs every 2 weeks — next Jul 6.</div>
          </Card>
        </Item>
      </div>

      {/* activity */}
      <Item>
        <Card className="p-5 sm:p-6">
          <div className="mb-1 flex items-center gap-2">
            <Activity className="h-4 w-4 text-blade-700" />
            <h2 className="font-display text-lg font-semibold text-ink">Recent activity</h2>
          </div>
          <div className="mt-2 grid gap-1 sm:grid-cols-2">
            {ACTIVITY.map((a, i) => {
              const Icon = ICONS[a.kind];
              return (
                <div key={i} className="flex items-start gap-3 rounded-lg px-1 py-2">
                  <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${a.kind === "alert" ? "bg-[#ef4444]/12 text-[#dc2626]" : "bg-blade-tint text-blade-700"}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1 text-sm">
                    <span className="font-semibold text-ink">{a.who}</span> <span className="text-slate">{a.what}</span>
                    <div className="text-xs text-mute">{a.when}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </Item>
    </div>
  );
}
