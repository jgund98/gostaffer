import { UploadCloud, FileSpreadsheet } from "lucide-react";
import { PageHead, Card, Pill, Progress, Avatar, initialsOf } from "@/components/portal/ui";
import { LEAD_LISTS, clientById } from "@/lib/portal-data";

export default function LeadsPage() {
  return (
    <div>
      <PageHead title="Leads & lists" />

      <Card className="mb-6 border-dashed border-line-2 bg-bone/40 p-8">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blade-tint text-blade-700">
            <UploadCloud className="h-6 w-6" />
          </span>
          <div>
            <p className="font-display text-base font-semibold text-ink">Upload a list</p>
            <p className="mt-0.5 text-sm text-slate">
              Drag a CSV here or{" "}
              <span className="font-semibold text-blade-700">browse files</span>. We&apos;ll scrub
              against DNC automatically.
            </p>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="hidden grid-cols-[1.3fr_1.6fr_0.8fr_1.2fr_1fr_0.8fr] gap-4 border-b border-line bg-bone/60 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-mute lg:grid">
          <span>Client</span>
          <span>List</span>
          <span>Numbers</span>
          <span>Progress</span>
          <span>DNC</span>
          <span>Uploaded</span>
        </div>
        <div className="divide-y divide-line">
          {LEAD_LISTS.map((list) => {
            const client = clientById(list.clientId);
            const pct = list.total ? Math.round((list.dialed / list.total) * 100) : 0;
            const dnc = list.dnc ? (
              <Pill tone="green" dot>DNC scrubbed</Pill>
            ) : (
              <Pill tone="amber" dot>Scrub pending</Pill>
            );
            return (
              <div
                key={list.id}
                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-bone/50 lg:grid lg:grid-cols-[1.3fr_1.6fr_0.8fr_1.2fr_1fr_0.8fr] lg:items-center lg:gap-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar initials={initialsOf(client?.company ?? "?")} grad={client?.grad ?? "from-[#64748b] to-[#94a3b8]"} size={32} />
                    <span className="font-medium text-ink">{client?.company ?? "Unknown"}</span>
                  </div>
                  <span className="shrink-0 lg:hidden">{dnc}</span>
                </div>

                <span className="text-sm font-medium text-ink">{list.name}</span>
                <span className="text-sm tnum text-slate">{list.total.toLocaleString()} <span className="text-mute lg:hidden">numbers</span></span>

                <div className="lg:w-44">
                  <Progress value={pct} />
                  <div className="mt-1.5 text-xs text-mute tnum">{pct}% dialed</div>
                </div>

                <div className="hidden lg:block">{dnc}</div>

                <span className="inline-flex items-center gap-1.5 text-sm text-slate">
                  <FileSpreadsheet className="h-3.5 w-3.5 text-mute" />
                  {list.uploaded}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
