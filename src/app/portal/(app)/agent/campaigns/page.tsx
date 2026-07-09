import Link from "next/link";
import { PhoneCall, TrendingUp, Target, FileText, ArrowUpRight } from "lucide-react";
import { PageHead, Card, Pill } from "@/components/portal/ui";
import { CAMPAIGNS, byClient, type Campaign } from "@/lib/portal-data";

const STATUS: Record<Campaign["status"], { tone: "green" | "amber" | "neutral"; label: string }> = {
  live: { tone: "green", label: "Live" },
  paused: { tone: "amber", label: "Paused" },
  draft: { tone: "neutral", label: "Draft" },
};

export default function AgentCampaignsPage() {
  const campaigns = byClient(CAMPAIGNS, "acme");

  return (
    <div className="flex flex-col gap-6">
      <PageHead title="My campaigns" sub="The campaigns you're dialing." />

      <div className="flex flex-col gap-4">
        {campaigns.map((c) => {
          const s = STATUS[c.status];
          return (
            <Card key={c.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="font-display text-base font-semibold text-ink">{c.name}</h2>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate">
                    <PhoneCall className="h-3.5 w-3.5 text-blade-700" />
                    {c.type}
                  </p>
                </div>
                <Pill tone={s.tone} dot>
                  {s.label}
                </Pill>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-bone px-2.5 py-1 font-mono text-xs font-semibold text-blade-700">
                  <FileText className="h-3 w-3" />
                  Script {c.scriptVersion}
                </span>
                <span className="text-xs text-mute">Updated {c.updated}</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-line bg-mist px-3 py-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate">
                    <TrendingUp className="h-3.5 w-3.5 text-cyan" />
                    Connect rate
                  </div>
                  <div className="mt-1 font-display text-xl font-bold tracking-tight text-ink tnum">{c.connectRate}%</div>
                </div>
                <div className="rounded-xl border border-line bg-mist px-3 py-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate">
                    <Target className="h-3.5 w-3.5 text-emerald" />
                    Conversion
                  </div>
                  <div className="mt-1 font-display text-xl font-bold tracking-tight text-ink tnum">{c.conversion}%</div>
                </div>
              </div>

              <Link
                href="/portal/agent/scripts"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blade-700 hover:underline"
              >
                View scripts
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
