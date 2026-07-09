import { PageHead, Card, Pill, Avatar, initialsOf } from "@/components/portal/ui";
import { REQUESTS, clientById } from "@/lib/portal-data";

const STATUS_TONE = {
  open: "blue",
  "in-progress": "amber",
  done: "green",
} as const;

const STATUS_LABEL = {
  open: "Open",
  "in-progress": "In progress",
  done: "Done",
} as const;

const FILTERS = ["All", "Open", "In progress", "Done"];

export default function RequestsPage() {
  return (
    <div>
      <PageHead title="Requests" sub="Inbound asks from your clients" />

      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f, i) => (
          <span
            key={f}
            className={
              i === 0
                ? "cursor-default rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-white"
                : "cursor-default rounded-full border border-line bg-paper px-3.5 py-1.5 text-xs font-semibold text-slate transition-colors hover:bg-bone"
            }
          >
            {f}
          </span>
        ))}
      </div>

      <Card className="overflow-hidden">
        <ul className="divide-y divide-line">
          {REQUESTS.map((req) => {
            const client = clientById(req.clientId);
            return (
              <li
                key={req.id}
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-bone/50"
              >
                <Avatar
                  initials={initialsOf(client?.company ?? "?")}
                  grad={client?.grad ?? "from-[#64748b] to-[#94a3b8]"}
                  size={36}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-ink">{req.title}</span>
                    <span className="rounded-md bg-cloud px-1.5 py-0.5 text-[0.68rem] font-semibold text-slate">
                      {req.kind}
                    </span>
                  </div>
                  <div className="mt-0.5 text-xs text-mute">{client?.company ?? "Unknown"}</div>
                </div>
                <Pill tone={STATUS_TONE[req.status]} dot>
                  {STATUS_LABEL[req.status]}
                </Pill>
                <span className="w-20 shrink-0 text-right text-xs text-mute">{req.when}</span>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
