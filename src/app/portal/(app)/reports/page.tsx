import { Phone, Activity, CheckCircle2, Clock, Download, TrendingUp, Trophy } from "lucide-react";
import { CLIENTS, REPORT_SERIES, WEEK_PERF } from "@/lib/portal-data";
import { Card, StatCard, SectionTitle, Avatar } from "@/components/portal/ui";

const RANGES = ["Today", "7 days", "30 days", "Custom"];

const AGENTS = [
  { name: "Mariam H.", initials: "MH", grad: "from-[#1f9e68] to-[#2fd39e]", dials: 412, conv: 38, rate: "9.2%" },
  { name: "Youssef A.", initials: "YA", grad: "from-[#0ea5a5] to-[#1f9e68]", dials: 398, conv: 34, rate: "8.5%" },
  { name: "Nadia K.", initials: "NK", grad: "from-[#2fd39e] to-[#35d6a0]", dials: 421, conv: 31, rate: "7.4%" },
  { name: "Omar S.", initials: "OS", grad: "from-[#f59e0b] to-[#ef6b3d]", dials: 376, conv: 29, rate: "7.7%" },
];

const OUTCOMES = [
  { label: "Meeting booked", pct: 38, color: "var(--blade-500)" },
  { label: "Callback scheduled", pct: 24, color: "var(--cyan)" },
  { label: "Not interested", pct: 21, color: "#94a3b8" },
  { label: "No answer", pct: 17, color: "#cbd5e1" },
];

function DayBars() {
  const max = Math.max(...REPORT_SERIES);
  return (
    <div className="flex h-40 items-end gap-1.5">
      {REPORT_SERIES.map((v, i) => (
        <div key={i} className="group relative flex-1">
          <div
            className="w-full rounded-t bg-gradient-to-t from-blade-500/60 to-blade-400 transition-all hover:from-blade-500 hover:to-cyan"
            style={{ height: `${(v / max) * 100}%` }}
          />
        </div>
      ))}
    </div>
  );
}

export default function Reports() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Reports</h1>
          <p className="mt-1 text-sm text-slate">What your clients see — call stats, outcomes, and team performance, live.</p>
        </div>
        <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-line-2 px-5 text-sm font-semibold text-ink hover:bg-bone">
          <Download className="h-4 w-4" /> Export
        </button>
      </div>

      {/* controls */}
      <div className="flex flex-wrap items-center gap-3">
        <select className="h-10 rounded-lg border border-line-2 bg-paper px-3 text-sm font-medium text-ink focus:border-blade-500 focus:outline-none">
          {CLIENTS.filter((c) => c.minutesPeriod > 0).map((c) => <option key={c.id}>{c.company}</option>)}
        </select>
        <div className="flex items-center gap-1.5">
          {RANGES.map((r, i) => (
            <button key={r} className={`rounded-lg px-3 py-2 text-sm font-medium ${i === 1 ? "bg-ink text-white" : "border border-line-2 text-slate hover:bg-bone"}`}>{r}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Dials" value="124,860" delta="+8.2% vs prior" Icon={Phone} accent />
        <StatCard label="Connect rate" value="58.4%" delta="+1.6 pts" Icon={Activity} />
        <StatCard label="Conversions" value="2,941" delta="+11% vs prior" Icon={CheckCircle2} />
        <StatCard label="Avg talk time" value="4.6m" delta="Healthy range" Icon={Clock} />
      </div>

      <Card className="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <SectionTitle sub="Dialing volume by day — trending up all week">Call volume</SectionTitle>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald"><TrendingUp className="h-3.5 w-3.5" /> +18% over 14 days</span>
        </div>
        <DayBars />
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <SectionTitle>Top performers</SectionTitle>
            <Trophy className="h-4 w-4 text-spark" />
          </div>
          <div className="hidden grid-cols-[2fr_1fr_1fr_1fr] gap-3 border-b border-line pb-2 text-xs font-semibold uppercase tracking-wide text-mute sm:grid">
            <span>Agent</span><span className="text-right">Dials</span><span className="text-right">Conv.</span><span className="text-right">Rate</span>
          </div>
          <div className="divide-y divide-line">
            {AGENTS.map((a, i) => (
              <div key={a.name} className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center gap-3 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="mono w-4 text-xs font-bold text-mute">{i + 1}</span>
                  <Avatar initials={a.initials} grad={a.grad} size={30} />
                  <span className="text-sm font-semibold text-ink">{a.name}</span>
                </div>
                <span className="text-right text-sm text-slate tnum">{a.dials}</span>
                <span className="text-right text-sm text-slate tnum">{a.conv}</span>
                <span className="text-right text-sm font-semibold text-blade-700 tnum">{a.rate}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <SectionTitle>Call outcomes</SectionTitle>
          <div className="flex flex-col gap-4">
            {OUTCOMES.map((o) => (
              <div key={o.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm"><span className="text-slate">{o.label}</span><span className="font-semibold text-ink">{o.pct}%</span></div>
                <div className="h-2.5 overflow-hidden rounded-full bg-cloud"><div className="h-full rounded-full" style={{ width: `${o.pct}%`, background: o.color }} /></div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-blade-tint px-3.5 py-3 text-xs font-medium text-blade-700">
            <CheckCircle2 className="h-4 w-4" /> Weekly digest emails clients every Monday at 8am.
          </div>
        </Card>
      </div>

      {/* per-agent weekly metrics (operational scorecard) */}
      <Card className="overflow-hidden">
        <div className="px-5 py-4">
          <SectionTitle sub="Logged weekly per agent — week of Jun 16">Performance scorecard</SectionTitle>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-y border-line bg-bone/60 text-xs uppercase tracking-wide text-mute">
              <tr>
                <th className="px-5 py-3 font-semibold">Agent</th>
                <th className="px-3 py-3 text-right font-semibold">Contact rate</th>
                <th className="px-3 py-3 text-right font-semibold">AHT</th>
                <th className="px-3 py-3 text-right font-semibold">Calls / hr</th>
                <th className="px-3 py-3 text-right font-semibold">Transfers / hr</th>
                <th className="px-3 py-3 text-right font-semibold">Inbound</th>
                <th className="px-3 py-3 text-right font-semibold">Outbound</th>
                <th className="px-5 py-3 text-right font-semibold">Conversions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {WEEK_PERF.map((w) => (
                <tr key={w.id} className="hover:bg-bone/50">
                  <td className="px-5 py-3.5 font-medium text-ink">{w.agent}</td>
                  <td className="px-3 py-3.5 text-right text-slate tnum">{w.contactRate}%</td>
                  <td className="px-3 py-3.5 text-right text-slate tnum">{w.aht}</td>
                  <td className="px-3 py-3.5 text-right text-slate tnum">{w.callsPerHr}</td>
                  <td className="px-3 py-3.5 text-right text-slate tnum">{w.transfersPerHr}</td>
                  <td className="px-3 py-3.5 text-right text-slate tnum">{w.inbound}</td>
                  <td className="px-3 py-3.5 text-right text-slate tnum">{w.outbound}</td>
                  <td className="px-5 py-3.5 text-right font-semibold text-blade-700 tnum">{w.conversions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
