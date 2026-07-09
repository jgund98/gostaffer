import { Clock, CalendarDays, Timer } from "lucide-react";
import { PageHead, Card, StatCard, Pill, Avatar, initialsOf } from "@/components/portal/ui";
import { TIME_ENTRIES, clientById } from "@/lib/portal-data";

export default function TimeclockPage() {
  const clockedIn = TIME_ENTRIES.filter((e) => e.clockOut === null).length;
  const hoursToday = TIME_ENTRIES.filter((e) => e.date === "Jun 25").reduce((s, e) => s + e.hours, 0);
  const hoursWeek = TIME_ENTRIES.reduce((s, e) => s + e.hours, 0) + 142.5;

  return (
    <div className="flex flex-col gap-6">
      <PageHead title="Time clock" sub="Who’s on the clock right now, and hours logged across the team." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Clocked in now" value={`${clockedIn}`} Icon={Clock} accent />
        <StatCard label="Hours today" value={hoursToday.toFixed(1)} Icon={CalendarDays} />
        <StatCard label="Hours this week" value={hoursWeek.toFixed(1)} Icon={Timer} />
      </div>

      <Card className="overflow-hidden">
        <div className="hidden grid-cols-12 gap-3 bg-bone/60 px-5 py-3 text-xs uppercase tracking-wide text-mute lg:grid">
          <div className="col-span-3">Agent</div>
          <div className="col-span-3">Client</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1">In</div>
          <div className="col-span-2">Out</div>
          <div className="col-span-1 text-right">Hours</div>
        </div>

        <div className="divide-y divide-line">
          {TIME_ENTRIES.map((e) => {
            const client = clientById(e.clientId);
            const onClock = e.clockOut === null;
            return (
              <div key={e.id} className="flex flex-col gap-3 px-5 py-4 hover:bg-bone/50 lg:grid lg:grid-cols-12 lg:items-center lg:gap-3">
                <div className="flex items-center gap-3 lg:col-span-3">
                  <Avatar initials={initialsOf(e.agent)} grad="from-[#1f9e68] to-[#2fd39e]" size={34} />
                  <span className="truncate font-semibold text-ink">{e.agent}</span>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:contents">
                  <div className="min-w-0 lg:col-span-3">
                    <div className="truncate text-sm text-slate">{client?.company ?? "Internal"}</div>
                    <div className="truncate text-xs text-mute">{e.campaign}</div>
                  </div>

                  <div className="text-sm text-slate tnum lg:col-span-2">{e.date}</div>

                  <div className="text-sm text-slate tnum lg:col-span-1">{e.clockIn}</div>

                  <div className="lg:col-span-2">
                    {onClock ? (
                      <Pill tone="green" dot>
                        On the clock
                      </Pill>
                    ) : (
                      <span className="text-sm text-slate tnum">{e.clockOut}</span>
                    )}
                  </div>

                  <div className="text-sm font-semibold text-ink tnum lg:col-span-1 lg:text-right">
                    {e.hours > 0 ? e.hours.toFixed(1) : "—"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
