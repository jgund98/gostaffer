"use client";

import { useState } from "react";
import { Clock, CalendarDays, CalendarRange } from "lucide-react";
import {
  PageHead,
  Card,
  SectionTitle,
  StatCard,
  Pill,
} from "@/components/portal/ui";
import { TIME_ENTRIES } from "@/lib/portal-data";

export default function TimeClockPage() {
  const [clockedIn, setClockedIn] = useState(true);

  const entries = TIME_ENTRIES.filter((e) => e.agent === "Mariam H.");

  return (
    <div className="flex flex-col gap-6">
      <PageHead title="Time clock" sub="Clock in, clock out, and review your shifts." />

      {/* Clock-in hero */}
      <Card className="relative overflow-hidden p-6">
        <div className="relative flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span
              className="grid h-11 w-11 place-items-center rounded-xl text-white"
              style={{ background: "var(--grad-aurora)" }}
            >
              <Clock className="h-5 w-5" />
            </span>
            <div>
              <Pill tone={clockedIn ? "green" : "neutral"} dot>
                {clockedIn ? "On the clock" : "Off the clock"}
              </Pill>
              <p className="mt-1 font-display text-xl font-bold tracking-tight text-ink">
                {clockedIn ? "On the clock since 9:00a" : "You're clocked out"}
              </p>
              <p className="mt-0.5 text-sm text-slate">
                {clockedIn ? "Elapsed 3h 42m today" : "Tap below to start your shift"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setClockedIn((v) => !v)}
            className="btn-electric w-full rounded-xl px-5 py-4 text-base font-semibold text-white"
          >
            {clockedIn ? "Clock out" : "Clock in"}
          </button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Hours today" value="3.7" delta="in progress" Icon={CalendarDays} accent />
        <StatCard label="Hours this week" value="38.5" delta="of 40 target" Icon={CalendarRange} />
      </div>

      {/* Timesheet — stacked cards on mobile */}
      <Card className="p-5">
        <SectionTitle sub="Your recent shifts">Timesheet</SectionTitle>
        <ul className="flex flex-col gap-3">
          {entries.map((e) => (
            <li
              key={e.id}
              className="rounded-xl border border-line bg-paper px-4 py-3.5"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-base font-semibold text-ink">{e.date}</p>
                {e.clockOut === null ? (
                  <Pill tone="green" dot>
                    On the clock
                  </Pill>
                ) : (
                  <span className="font-display text-base font-bold text-ink tnum">
                    {e.hours.toFixed(1)}h
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-slate">{e.campaign}</p>
              <div className="mt-2 flex items-center gap-4 text-xs text-slate tnum">
                <span>
                  <span className="text-mute">In</span> {e.clockIn}
                </span>
                <span>
                  <span className="text-mute">Out</span> {e.clockOut ?? "—"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
