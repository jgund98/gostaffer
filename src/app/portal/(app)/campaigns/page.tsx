import { Quote } from "lucide-react";
import { PageHead, Card, SectionTitle, Pill, Avatar, initialsOf } from "@/components/portal/ui";
import { CAMPAIGNS, clientById, type Campaign } from "@/lib/portal-data";

const STATUS: Record<Campaign["status"], { label: string; tone: "green" | "amber" | "neutral" }> = {
  live: { label: "Live", tone: "green" },
  paused: { label: "Paused", tone: "amber" },
  draft: { label: "Draft", tone: "neutral" },
};

const OBJECTIONS: { objection: string; rebuttal: string }[] = [
  {
    objection: "“I’m not interested.”",
    rebuttal: "Totally fair — most folks say that before they hear the one thing that saves them money. Can I take 20 seconds?",
  },
  {
    objection: "“Now’s not a good time.”",
    rebuttal: "I hear you. Would later today or tomorrow morning work better for a quick 5-minute call?",
  },
  {
    objection: "“We already have a provider.”",
    rebuttal: "Great — so you already see the value. We usually beat the current rate by 10–15%. Worth a quick comparison?",
  },
];

export default function CampaignsPage() {
  const featured = CAMPAIGNS.find((c) => c.status === "live") ?? CAMPAIGNS[0];
  const featuredClient = clientById(featured.clientId);
  const featuredName = featuredClient?.company ?? featured.clientId;

  return (
    <div>
      <PageHead
        title="Campaigns & scripts"
        sub="Every active campaign, its script version, and how it’s performing — plus the scripts agents are reading from."
      >
        <Pill tone="green" dot>
          {CAMPAIGNS.filter((c) => c.status === "live").length} live
        </Pill>
      </PageHead>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="hidden grid-cols-12 gap-3 bg-bone/60 px-5 py-3 text-xs uppercase tracking-wide text-mute lg:grid">
              <div className="col-span-5">Campaign</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Connect</div>
              <div className="col-span-2 text-right">Conv.</div>
              <div className="col-span-1 text-right">Updated</div>
            </div>

            <div className="divide-y divide-line">
              {CAMPAIGNS.map((c) => {
                const client = clientById(c.clientId);
                const name = client?.company ?? c.clientId;
                const s = STATUS[c.status];
                return (
                  <div key={c.id} className="flex flex-col gap-3 px-5 py-4 hover:bg-bone/50 lg:grid lg:grid-cols-12 lg:items-center lg:gap-3">
                    <div className="flex items-center gap-3 lg:col-span-5">
                      <Avatar initials={initialsOf(name)} grad={client?.grad ?? "from-[#64748b] to-[#94a3b8]"} size={36} />
                      <div className="min-w-0">
                        <div className="truncate font-semibold text-ink">{c.name}</div>
                        <div className="truncate text-xs text-mute">
                          {name} · {c.type}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:contents">
                      <div className="flex items-center gap-2 lg:col-span-2">
                        <Pill tone={s.tone} dot={c.status !== "draft"}>
                          {s.label}
                        </Pill>
                        <span className="rounded-md bg-cloud px-1.5 py-0.5 text-[0.68rem] font-semibold text-slate">
                          {c.scriptVersion}
                        </span>
                      </div>

                      <div className="text-sm font-semibold text-ink tnum lg:col-span-2 lg:text-right">{c.status === "draft" ? <span className="text-mute">—</span> : `${c.connectRate}%`}</div>
                      <div className="text-sm font-semibold text-ink tnum lg:col-span-2 lg:text-right">{c.status === "draft" ? <span className="text-mute">—</span> : `${c.conversion}%`}</div>
                      <div className="text-xs text-mute lg:col-span-1 lg:text-right">{c.updated}</div>

                      <div className="-mt-1 flex gap-4 text-xs text-mute lg:col-span-12 lg:pl-[3.25rem]">
                        <span className="tnum">{c.objections} objections</span>
                        <span className="tnum">{c.dispositions} dispositions</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-5">
            <SectionTitle sub={`${featuredName} · ${featured.name} · ${featured.scriptVersion}`}>
              Script & objections
            </SectionTitle>

            <div className="rounded-xl border border-line bg-bone/50 p-4">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-mute">
                <Quote className="h-3.5 w-3.5" />
                Opening
              </div>
              <p className="font-mono text-sm leading-relaxed text-slate">
                “Hi, is this {"{first_name}"}? This is {"{agent}"} calling on behalf of {featuredName}. I’ll be quick —
                we’re reaching out about {"{offer}"} and I think there’s a real chance to save you money. Do you have 30
                seconds?”
              </p>
            </div>

            <div className="mt-5 space-y-3">
              {OBJECTIONS.map((o) => (
                <div key={o.objection} className="rounded-xl border border-line p-3.5">
                  <div className="text-sm font-semibold text-ink">{o.objection}</div>
                  <div className="mt-1 text-sm text-slate">
                    <span className="font-semibold text-blade-700">Rebuttal · </span>
                    {o.rebuttal}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
