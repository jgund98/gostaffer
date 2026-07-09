"use client";

import { useState } from "react";
import { Inbox } from "lucide-react";
import { PageHead, Card, StatCard, Pill, Avatar, initialsOf } from "@/components/portal/ui";
import { AGENT_REQUESTS, clientById, type AgentRequest } from "@/lib/portal-data";

type Decision = AgentRequest["status"];

const STATUS: Record<AgentRequest["status"], { tone: "blue" | "green" | "neutral" | "amber"; label: string }> = {
  pending: { tone: "blue", label: "Pending" },
  accepted: { tone: "green", label: "Accepted" },
  denied: { tone: "amber", label: "On hold" },
};

export default function AgentRequestsPage() {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  const pendingCount = AGENT_REQUESTS.filter(
    (r) => (decisions[r.id] ?? r.status) === "pending"
  ).length;

  return (
    <div className="flex flex-col gap-6">
      <PageHead title="Agent requests" sub="Client requests to add agents — accept, place on hold to scope, or escalate." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Pending requests" value={`${pendingCount}`} Icon={Inbox} accent />
      </div>

      <Card className="overflow-hidden">
        <div className="divide-y divide-line">
          {AGENT_REQUESTS.map((r) => {
            const status = decisions[r.id] ?? r.status;
            const s = STATUS[status];
            const client = clientById(r.clientId);
            const readinessDays = r.readinessDays ?? 4;
            const launch = r.launch !== "—" ? r.launch : "Jul 1";

            return (
              <div key={r.id} className="flex flex-wrap items-center gap-4 px-5 py-4 hover:bg-bone/50">
                <Avatar
                  initials={initialsOf(client?.company ?? "Client")}
                  grad={client?.grad ?? "from-[#1f9e68] to-[#2fd39e]"}
                  size={38}
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold text-ink">{client?.company ?? "Client"}</div>
                  <div className="mt-0.5 truncate text-sm text-slate">
                    {r.campaign} · <span className="text-mute">{r.when}</span>
                  </div>
                </div>

                <div className="text-sm font-medium text-ink">
                  {r.num} {r.type} agents
                </div>

                <Pill tone={s.tone} dot={status !== "denied"}>
                  {s.label}
                </Pill>

                {status === "pending" ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDecisions((d) => ({ ...d, [r.id]: "accepted" }))}
                      className="btn-electric inline-flex h-9 items-center justify-center rounded-lg px-3.5 text-sm font-semibold text-white"
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => setDecisions((d) => ({ ...d, [r.id]: "denied" }))}
                      className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium text-slate hover:bg-bone/60"
                    >
                      Hold
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium text-slate hover:bg-bone/60"
                    >
                      Escalate
                    </button>
                  </div>
                ) : status === "accepted" ? (
                  <div className="text-sm text-slate">
                    Ready in {readinessDays}d · launch {launch}
                  </div>
                ) : (
                  <div className="text-sm text-mute">On hold — needs scoping</div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
