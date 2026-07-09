"use client";

import Link from "next/link";
import { Phone, MessagesSquare, Clock, PlayCircle, ArrowRight, Sparkles, Headset } from "lucide-react";
import { Card, Pill, Avatar, initialsOf } from "@/components/portal/ui";
import { Stagger, Item, DashStat, AreaChart, Meter, LiveDot, useLive } from "@/components/portal/dash";
import { AGENTS_TEAM, RECORDINGS, REPORT_SERIES, byClient } from "@/lib/portal-data";

const OUTCOME = { Booked: "green", Callback: "blue", "Not interested": "neutral", Voicemail: "amber" } as const;
const AGENT_STATUS = { "On Call": "blue", Available: "green", Wrap: "amber", Offline: "neutral" } as const;

export default function ClientDashboard() {
  const dials = useLive(1240, () => Math.floor(Math.random() * 4) + 1, 2000);
  const convos = useLive(318, () => (Math.random() > 0.5 ? 1 : 0), 2600);
  const team = byClient(AGENTS_TEAM, "acme");
  const calls = byClient(RECORDINGS, "acme").slice(0, 4);

  return (
    <div className="flex flex-col gap-7">
      {/* hero */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-1.5 inline-flex items-center gap-2 text-xs font-semibold text-emerald">
            <LiveDot /> Your team is on the phones now
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Welcome back, David</h1>
          <p className="mt-1 text-sm text-slate">Here&apos;s how your GoStaffer team is performing today.</p>
        </div>
        <Link href="/portal/client/reports" className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-line-2 bg-paper px-4 text-sm font-semibold text-ink transition-colors hover:bg-bone">
          Full reports <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* KPIs */}
      <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Item><DashStat label="Dials today" value={dials} delta="+11% vs yesterday" Icon={Phone} accent /></Item>
        <Item><DashStat label="Conversations" value={convos} delta="+8% vs last week" Icon={MessagesSquare} /></Item>
        <Item><DashStat label="Hours on the phone" raw="62.4" delta="across your team today" Icon={Headset} /></Item>
        <Item><DashStat label="Avg talk time" raw="3:42" delta="Healthy range" Icon={Clock} /></Item>
      </Stagger>

      {/* chart + team */}
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Item>
          <Card className="p-5 sm:p-6">
            <div className="mb-1 flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">Connected conversations</h2>
                <p className="text-sm text-slate">Last 14 days · today is climbing live</p>
              </div>
              <Pill tone="green" dot>+18% WoW</Pill>
            </div>
            <AreaChart data={REPORT_SERIES} live height={150} className="mt-3" />
            <div className="mt-2 flex items-center gap-2 text-xs text-mute">
              <LiveDot /> Updating live
            </div>
          </Card>
        </Item>

        <Item>
          <Card className="flex h-full flex-col p-5 sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">Your team</h2>
              <Pill tone="blue"><Headset className="h-3 w-3" /> {team.length} live</Pill>
            </div>
            <div className="flex flex-col gap-2.5">
              {team.map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-xl border border-line/70 bg-bone/40 p-2.5">
                  <Avatar initials={initialsOf(a.name)} grad={a.grad} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-ink">{a.name}</div>
                    <div className="text-xs text-mute">{a.role}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Pill tone={AGENT_STATUS[a.status]} dot={a.status !== "Offline"}>{a.status}</Pill>
                    <span className="text-[0.68rem] font-medium text-emerald">{a.qa}% QA</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/portal/client/team" className="mt-auto pt-3 text-sm font-semibold text-blade-700 hover:text-blade-600">
              See your whole team →
            </Link>
          </Card>
        </Item>
      </div>

      {/* recent calls + connect ring / CTA */}
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Item>
          <Card className="p-5 sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">Recent calls</h2>
                <p className="text-sm text-slate">Hear your team on the phone</p>
              </div>
              <Link href="/portal/client/recordings" className="text-sm font-semibold text-blade-700 hover:text-blade-600">All recordings →</Link>
            </div>
            <div className="divide-y divide-line">
              {calls.map((c) => (
                <div key={c.id} className="flex items-center gap-3 py-3">
                  <button className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cyan/15 text-blade-700 transition-colors hover:bg-cyan/25">
                    <PlayCircle className="h-5 w-5" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-ink">{c.agent} <span className="font-normal text-mute">· {c.contact}</span></div>
                    <div className="text-xs text-mute">{c.date}</div>
                  </div>
                  <span className="hidden text-xs text-mute tnum sm:block">{c.duration}</span>
                  <Pill tone={OUTCOME[c.outcome]}>{c.outcome}</Pill>
                </div>
              ))}
            </div>
          </Card>
        </Item>

        <Item>
          <div className="flex h-full flex-col gap-6">
            <Card className="p-5 sm:p-6">
              <div className="font-display text-base font-semibold text-ink">Strong week</div>
              <p className="mt-1 text-sm text-slate">Connect rate is up 6 points — well above industry average.</p>
              <Meter value={64} label="connect rate" className="mt-4" />
            </Card>
            <Card className="relative overflow-hidden p-5 sm:p-6">
              <div className="relative">
                <span className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: "var(--grad-aurora)" }}>
                  <Sparkles className="h-5 w-5" />
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">Need a change?</h3>
                <p className="mt-1 text-sm text-slate">Add agents, tweak a script, or ask anything — your success team replies fast.</p>
                <Link href="/portal/client/requests" className="btn-electric mt-4 inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-white">
                  New request <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          </div>
        </Item>
      </div>
    </div>
  );
}
