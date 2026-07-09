import { Headphones, Award, PhoneCall, UserX } from "lucide-react";
import { PageHead, Card, StatCard, Pill, Progress, Avatar, initialsOf } from "@/components/portal/ui";
import { AGENTS_TEAM, AGENT_STAGE, AGENT_PIPELINE, clientById, type Agent } from "@/lib/portal-data";

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

function stageTone(stage: string): "green" | "blue" | "amber" | "neutral" {
  if (stage === "Live") return "green";
  if (stage === "Ready to go live") return "blue";
  if (stage === "Training") return "amber";
  return "neutral";
}

export default function TeamPage() {
  const onFloor = AGENTS_TEAM.filter((a) => a.status !== "Offline").length;
  const onCall = AGENTS_TEAM.filter((a) => a.status === "On Call").length;
  const unassigned = AGENTS_TEAM.filter((a) => a.clientId === null).length;
  const avgQa = Math.round(AGENTS_TEAM.reduce((s, a) => s + a.qa, 0) / AGENTS_TEAM.length);

  return (
    <div>
      <PageHead
        title="Team & assignments"
        sub="Who’s on the floor, which client they’re assigned to, and how they’re scoring on QA."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Agents on the floor" value={`${onFloor}`} Icon={Headphones} accent />
        <StatCard label="Avg QA score" value={`${avgQa}`} delta="+2 vs last week" Icon={Award} />
        <StatCard label="On call now" value={`${onCall}`} Icon={PhoneCall} />
        <StatCard label="Unassigned" value={`${unassigned}`} Icon={UserX} />
      </div>

      <Card className="overflow-hidden">
        <div className="hidden grid-cols-12 gap-3 bg-bone/60 px-5 py-3 text-xs uppercase tracking-wide text-mute lg:grid">
          <div className="col-span-4">Agent</div>
          <div className="col-span-3">Pipeline stage</div>
          <div className="col-span-2">Client</div>
          <div className="col-span-1 text-right">QA</div>
          <div className="col-span-2 text-right">Status</div>
        </div>

        <div className="divide-y divide-line">
          {AGENTS_TEAM.map((a) => {
            const client = a.clientId ? clientById(a.clientId) : undefined;
            const s = STATUS[a.status];
            const stage = AGENT_STAGE[a.id];
            const pct = stage ? (AGENT_PIPELINE.indexOf(stage.stage) / (AGENT_PIPELINE.length - 1)) * 100 : 0;
            return (
              <div key={a.id} className="flex flex-col gap-3 px-5 py-4 hover:bg-bone/50 lg:grid lg:grid-cols-12 lg:items-center lg:gap-3">
                <div className="flex items-center justify-between gap-3 lg:col-span-4 lg:justify-start">
                  <div className="flex items-center gap-3">
                    <Avatar initials={initialsOf(a.name)} grad={a.grad} size={38} />
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-ink">{a.name}</div>
                      <div className="truncate text-xs text-mute">{a.role} · {a.langs}</div>
                    </div>
                  </div>
                  {/* status shows top-right on mobile only */}
                  <span className="lg:hidden">
                    <Pill tone={s.tone} dot={s.dot}>{a.status}</Pill>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:contents">
                  <div className="min-w-0 lg:col-span-3">
                    {stage ? (
                      <>
                        <div className="flex items-center gap-2">
                          <Pill tone={stageTone(stage.stage)}>{stage.stage}</Pill>
                          <span className="text-xs text-mute">{stage.days}d in stage</span>
                        </div>
                        <Progress value={pct} className="mt-1.5 max-w-[9rem]" />
                      </>
                    ) : (
                      <span className="text-sm text-mute">—</span>
                    )}
                  </div>

                  <div className="truncate text-sm text-slate lg:col-span-2">{client?.company ?? "Unassigned"}</div>

                  <div className="lg:col-span-1 lg:flex lg:justify-end">
                    <Pill tone={qaTone(a.qa)}>QA {a.qa}</Pill>
                  </div>

                  {/* status (desktop position) */}
                  <div className="hidden lg:col-span-2 lg:flex lg:justify-end">
                    <Pill tone={s.tone} dot={s.dot}>{a.status}</Pill>
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
