import {
  PageHead,
  Card,
  SectionTitle,
  StatCard,
  Progress,
  Sparkline,
} from "@/components/portal/ui";
import { REPORT_SERIES } from "@/lib/portal-data";
import { PhoneCall, Target, CalendarCheck, Timer, Download } from "lucide-react";

const PERIODS = ["7 days", "30 days", "Quarter"];

const OUTCOMES = [
  { label: "Booked", pct: 31, count: 412, bar: "from-emerald to-emerald" },
  { label: "Callback", pct: 24, count: 318, bar: "from-blade-500 to-cyan" },
  { label: "Not interested", pct: 27, count: 358, bar: "from-slate to-slate" },
  { label: "Voicemail", pct: 18, count: 239, bar: "from-spark to-spark" },
];

export default function ClientReportsPage() {
  return (
    <div>
      <PageHead title="Reports" sub="Your GoStaffer performance at a glance.">
        <div className="inline-flex items-center rounded-xl border border-line bg-paper p-1 text-sm">
          {PERIODS.map((p, i) => (
            <span
              key={p}
              className={
                i === 0
                  ? "rounded-lg bg-blade-tint px-3 py-1.5 font-semibold text-blade-700"
                  : "px-3 py-1.5 font-medium text-slate"
              }
            >
              {p}
            </span>
          ))}
        </div>
      </PageHead>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Connect rate" value="47%" delta="+6 pts" Icon={PhoneCall} accent />
        <StatCard label="Conversion" value="6.4%" delta="+1.1 pts" Icon={Target} />
        <StatCard label="Meetings booked" value="184" delta="+22 this week" Icon={CalendarCheck} />
        <StatCard label="Total minutes" value="41,280" delta="+9% vs last week" Icon={Timer} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <SectionTitle sub="Conversations connected per day, last 14 days">Calls per day</SectionTitle>
          <Sparkline data={REPORT_SERIES} className="h-40" />
          <div className="mt-4 grid grid-cols-3 gap-4 border-t border-line pt-4 text-center">
            <div>
              <div className="font-display text-xl font-bold text-ink tnum">97</div>
              <div className="text-xs text-slate">Peak day</div>
            </div>
            <div>
              <div className="font-display text-xl font-bold text-ink tnum">79</div>
              <div className="text-xs text-slate">Daily avg</div>
            </div>
            <div>
              <div className="font-display text-xl font-bold text-emerald tnum">+18%</div>
              <div className="text-xs text-slate">Trend</div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle sub="Where your calls landed">Outcomes breakdown</SectionTitle>
          <ul className="space-y-4">
            {OUTCOMES.map((o) => (
              <li key={o.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{o.label}</span>
                  <span className="tnum text-slate">
                    {o.pct}% · {o.count.toLocaleString()}
                  </span>
                </div>
                <Progress value={o.pct} />
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-4 flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <div className="text-sm font-semibold text-ink">Download this report</div>
          <p className="mt-0.5 text-sm text-slate">Weekly report emails every Monday.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2.5 text-sm font-semibold text-slate transition hover:bg-bone"
        >
          <Download className="h-4 w-4" /> Download PDF
        </button>
      </Card>
    </div>
  );
}
