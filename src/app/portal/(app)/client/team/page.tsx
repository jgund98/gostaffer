import Link from "next/link";
import { Headphones, Award, PhoneCall, UserPlus } from "lucide-react";
import {
  PageHead,
  Card,
  StatCard,
  Pill,
  Progress,
  Avatar,
  initialsOf,
} from "@/components/portal/ui";
import { AGENTS_TEAM, AGENT_STAGE, AGENT_PIPELINE, type Agent } from "@/lib/portal-data";

const STATUS: Record<Agent["status"], { tone: "blue" | "green" | "amber" | "neutral"; dot: boolean }> = {
  "On Call": { tone: "blue", dot: true },
  Available: { tone: "green", dot: true },
  Wrap: { tone: "amber", dot: true },
  Offline: { tone: "neutral", dot: false },
};

function qaTone(qa: number): "green" | "blue" | "amber" {
  if (qa >= 96) return "green";
  if (qa >= 92) return "blue";
  return "amber";
}

function stageTone(stage: string): "green" | "blue" | "amber" | "violet" {
  if (stage === "Live") return "green";
  if (stage === "Ready to go live") return "blue";
  if (stage === "Training") return "amber";
  return "violet";
}

export default function ClientTeamPage() {
  const team = AGENTS_TEAM.filter((a) => a.clientId === "acme");
  const onCall = team.filter((a) => a.status === "On Call").length;
  const avgQa = team.length
    ? Math.round(team.reduce((s, a) => s + a.qa, 0) / team.length)
    : 0;
  const lastStep = AGENT_PIPELINE.length - 1;

  return (
    <div className="flex flex-col gap-6">
      <PageHead title="My team" sub="The GoStaffer agents dedicated to your campaigns.">
        <Link
          href="/portal/client/requests"
          className="btn-electric inline-flex h-10 items-center gap-1.5 rounded-xl px-4 text-sm font-semibold text-white"
        >
          <UserPlus className="h-4 w-4" />
          Request more agents
        </Link>
      </PageHead>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Agents on your account" value={`${team.length}`} Icon={Headphones} accent />
        <StatCard label="Avg QA score" value={`${avgQa}`} delta="+2 vs last week" Icon={Award} />
        <StatCard label="On call now" value={`${onCall}`} Icon={PhoneCall} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {team.map((a) => {
          const s = STATUS[a.status];
          const stage = AGENT_STAGE[a.id];
          const idx = stage ? AGENT_PIPELINE.indexOf(stage.stage) : 0;
          const pct = lastStep > 0 ? (idx / lastStep) * 100 : 0;
          return (
            <Card key={a.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar initials={initialsOf(a.name)} grad={a.grad} size={44} />
                  <div className="min-w-0">
                    <div className="truncate font-display font-semibold text-ink">{a.name}</div>
                    <div className="truncate text-xs text-mute">
                      {a.role} · {a.langs}
                    </div>
                  </div>
                </div>
                <Pill tone={s.tone} dot={s.dot}>
                  {a.status}
                </Pill>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Pill tone={qaTone(a.qa)}>QA {a.qa}</Pill>
                {stage && (
                  <Pill tone={stageTone(stage.stage)} dot>
                    {stage.stage}
                  </Pill>
                )}
                {stage && <span className="text-xs text-mute">in stage {stage.days}d</span>}
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs text-slate">
                  <span>Pipeline</span>
                  <span className="tnum">{stage?.stage ?? AGENT_PIPELINE[0]}</span>
                </div>
                <Progress value={pct} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
