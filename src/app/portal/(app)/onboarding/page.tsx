import { Check, Circle, Calendar, User } from "lucide-react";
import { PageHead, Card, Pill, Progress, Avatar, initialsOf } from "@/components/portal/ui";
import { ONBOARD_BOARD, ONBOARD_STAGES, clientById } from "@/lib/portal-data";

export default function OnboardingPage() {
  const live = ONBOARD_BOARD.filter((c) => c.stage === "Live").length;

  return (
    <div>
      <PageHead
        title="Onboarding tracker"
        sub="Move each client from invite to live. Track checklists, owners, and due dates across stages."
      >
        <Pill tone="neutral">{ONBOARD_BOARD.length} clients</Pill>
        <Pill tone="green" dot>
          {live} live
        </Pill>
      </PageHead>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {ONBOARD_STAGES.map((stage) => {
          const cards = ONBOARD_BOARD.filter((c) => c.stage === stage);
          return (
            <div key={stage} className="min-w-[280px] flex-1 shrink-0">
              <div className="mb-3 flex items-center justify-between px-1">
                <h2 className="font-display text-sm font-semibold text-ink">{stage}</h2>
                <span className="rounded-full bg-cloud px-2 py-0.5 text-xs font-semibold text-mute tnum">
                  {cards.length}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {cards.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-line-2 bg-bone/40 px-4 py-8 text-center text-xs text-mute">
                    No clients here
                  </div>
                )}

                {cards.map((card) => {
                  const client = clientById(card.clientId);
                  const name = client?.company ?? card.clientId;
                  const total = card.checklist.length;
                  const done = card.checklist.filter((i) => i.done).length;
                  const pct = total ? Math.round((done / total) * 100) : 0;

                  return (
                    <Card key={card.clientId} className="p-4 transition-shadow hover:shadow-[var(--shadow-md)]">
                      <div className="flex items-center gap-3">
                        <Avatar initials={initialsOf(name)} grad={client?.grad ?? "from-[#64748b] to-[#94a3b8]"} size={34} />
                        <div className="min-w-0">
                          <div className="truncate font-semibold text-ink">{name}</div>
                          {client?.industry && <div className="truncate text-xs text-mute">{client.industry}</div>}
                        </div>
                      </div>

                      <div className="mt-3.5">
                        <div className="mb-1.5 flex items-center justify-between text-xs">
                          <span className="font-medium text-slate tnum">
                            {done}/{total} steps
                          </span>
                          <span className="font-semibold text-blade-700 tnum">{pct}%</span>
                        </div>
                        <Progress value={pct} />
                      </div>

                      <ul className="mt-3.5 space-y-1.5">
                        {card.checklist.map((item) => (
                          <li key={item.label} className="flex items-start gap-2 text-sm">
                            {item.done ? (
                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" />
                            ) : (
                              <Circle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mute" />
                            )}
                            <span className={item.done ? "text-mute line-through" : "text-slate"}>{item.label}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3 text-xs text-mute">
                        <span className="inline-flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          {card.owner}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {card.due}
                        </span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
