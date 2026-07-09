"use client";

import Link from "next/link";
import { useState } from "react";
import { Clock, Phone, Timer, CheckCircle2, Award, ChevronRight, PlayCircle, Target, Flame } from "lucide-react";
import { Card, SectionTitle, Pill } from "@/components/portal/ui";
import { Stagger, Item, DashStat, Meter, LiveDot, useLive, useElapsed } from "@/components/portal/dash";
import { byClient, RECORDINGS } from "@/lib/portal-data";

const OUTCOME_TONE = { Booked: "green", Callback: "blue", Voicemail: "amber", "Not interested": "neutral" } as const;
const GOAL = 120;

export default function AgentDashboard() {
  const [clockedIn, setClockedIn] = useState(true);
  const elapsed = useElapsed();
  const calls = useLive(86, () => (Math.random() > 0.6 ? 1 : 0), 3000);
  const recentCalls = byClient(RECORDINGS, "acme").filter((r) => r.agent === "Mariam H.").slice(0, 3);
  const pct = Math.min(100, Math.round((calls / GOAL) * 100));

  return (
    <Stagger className="flex flex-col gap-6">
      <Item>
        <div>
          <div className="mb-1 inline-flex items-center gap-2 text-xs font-semibold text-emerald">
            {clockedIn && <LiveDot />} {clockedIn ? "On shift" : "Off shift"}
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Hi, Mariam 👋</h1>
          <p className="mt-1 text-sm text-slate">Here&apos;s your shift at a glance.</p>
        </div>
      </Item>

      {/* clock-in hero with live elapsed */}
      <Item>
        <Card className="relative overflow-hidden p-6">
          <div className="relative flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl text-white" style={{ background: "var(--grad-aurora)" }}>
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <Pill tone={clockedIn ? "green" : "neutral"} dot>{clockedIn ? "On the clock" : "Off the clock"}</Pill>
                <p className="mt-1 font-display text-xl font-bold tracking-tight text-ink tnum">
                  {clockedIn ? elapsed : "You're clocked out"}
                </p>
                <p className="mt-0.5 text-sm text-slate">{clockedIn ? "Since 9:00a today" : "Tap below to start your shift"}</p>
              </div>
            </div>
            <button type="button" onClick={() => setClockedIn((v) => !v)} className="btn-electric w-full rounded-xl px-5 py-4 text-base font-semibold text-white">
              {clockedIn ? "Clock out" : "Clock in"}
            </button>
          </div>
        </Card>
      </Item>

      {/* stats */}
      <Item>
        <div className="grid grid-cols-2 gap-4">
          <DashStat label="Calls today" value={calls} delta="+12 vs yesterday" Icon={Phone} accent />
          <DashStat label="Talk time" raw="4:12" delta="avg handle" Icon={Timer} />
          <DashStat label="Conversions" value={7} delta="+2 today" Icon={CheckCircle2} />
          <DashStat label="QA score" value={98} delta="≥90 to stay live" Icon={Award} />
        </div>
      </Item>

      {/* daily goal ring */}
      <Item>
        <Card className="p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-blade-700" />
            <span className="font-display text-base font-semibold text-ink">Today&apos;s dial goal</span>
          </div>
          <Meter value={pct} label={`${calls} of ${GOAL} calls`} className="mt-3" />
          <p className="mt-3 text-sm text-slate">{pct}% there — on pace for ~128 by end of shift.</p>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-spark/15 px-2.5 py-1 text-xs font-semibold text-[#b06a00]">
            <Flame className="h-3.5 w-3.5" /> 3-day streak hitting goal
          </div>
        </Card>
      </Item>

      {/* campaign */}
      <Item>
        <Card className="p-5">
          <SectionTitle>Your campaign</SectionTitle>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-display text-base font-semibold text-ink">Acme — HVAC Spring Tune-Up</p>
                <p className="mt-0.5 text-sm text-slate">Outbound · Sales</p>
              </div>
              <Pill tone="blue">Script v4</Pill>
            </div>
            <Link href="/portal/agent/scripts" className="inline-flex items-center justify-between rounded-xl border border-line bg-bone px-4 py-3 text-sm font-semibold text-blade-700 transition-colors hover:bg-cloud">
              View scripts <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </Item>

      {/* recent calls */}
      <Item>
        <Card className="p-5">
          <SectionTitle>Recent calls</SectionTitle>
          <ul className="flex flex-col gap-3">
            {recentCalls.map((rec) => (
              <li key={rec.id} className="flex items-center gap-3 rounded-xl border border-line bg-paper px-3 py-3">
                <button className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blade-tint text-blade-700 transition-colors hover:bg-cyan/25">
                  <PlayCircle className="h-5 w-5" />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-ink tnum">{rec.contact}</p>
                  <p className="mt-0.5 text-xs text-slate tnum">{rec.duration} · {rec.date}</p>
                </div>
                <Pill tone={OUTCOME_TONE[rec.outcome]}>{rec.outcome}</Pill>
              </li>
            ))}
          </ul>
          <Link href="/portal/agent/performance" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blade-700">
            All performance <ChevronRight className="h-4 w-4" />
          </Link>
        </Card>
      </Item>
    </Stagger>
  );
}
