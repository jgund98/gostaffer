import { Award, CheckCircle2, PhoneCall, ShieldCheck } from "lucide-react";
import {
  PageHead,
  Card,
  SectionTitle,
  StatCard,
} from "@/components/portal/ui";
import { WEEK_PERF } from "@/lib/portal-data";

export default function AgentPerformancePage() {
  const perf = WEEK_PERF.find((w) => w.agent === "Mariam H.");

  const rows: { label: string; value: string }[] = perf
    ? [
        { label: "Contact rate", value: `${perf.contactRate}%` },
        { label: "Avg handle time", value: perf.aht },
        { label: "Calls / hour", value: perf.callsPerHr.toFixed(1) },
        { label: "Transfers / hour", value: perf.transfersPerHr.toFixed(1) },
        { label: "Inbound", value: String(perf.inbound) },
        { label: "Outbound", value: String(perf.outbound) },
        { label: "Conversions", value: String(perf.conversions) },
      ]
    : [];

  return (
    <div className="flex flex-col gap-6">
      <PageHead title="My performance" sub="Your weekly scorecard and QA." />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="QA score" value="98" delta="≥90 to stay live" Icon={Award} accent />
        <StatCard
          label="Conversions"
          value={String(perf?.conversions ?? 0)}
          delta="this week"
          Icon={CheckCircle2}
        />
        <StatCard
          label="Contact rate"
          value={`${perf?.contactRate ?? 0}%`}
          delta="connected"
          Icon={PhoneCall}
        />
        <StatCard label="Calls / hr" value={perf?.callsPerHr.toFixed(1) ?? "0"} delta="pace" Icon={ShieldCheck} />
      </div>

      {/* This week — label/value list */}
      <Card className="p-5">
        <SectionTitle sub={perf ? `Week of ${perf.weekOf}` : undefined}>This week</SectionTitle>
        <dl className="divide-y divide-line">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between py-3">
              <dt className="text-sm text-slate">{r.label}</dt>
              <dd className="font-display text-base font-semibold text-ink tnum">{r.value}</dd>
            </div>
          ))}
        </dl>
      </Card>

      {/* QA note */}
      <Card className="flex items-start gap-3 bg-blade-tint p-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-paper text-blade-700">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <p className="text-sm text-slate">
          <span className="font-semibold text-ink">Stay live:</span> your QA score must stay at or
          above <span className="font-semibold text-ink tnum">90</span> to remain active on this
          campaign. Coaching clips are reviewed weekly.
        </p>
      </Card>
    </div>
  );
}
