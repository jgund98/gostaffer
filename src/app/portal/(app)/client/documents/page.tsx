import { FileText, Download } from "lucide-react";
import { PageHead, Card, Pill } from "@/components/portal/ui";
import { DOCUMENTS, byClient, type Doc } from "@/lib/portal-data";

const STATUS_TONE: Record<Doc["status"], "green" | "amber" | "neutral"> = {
  signed: "green",
  pending: "amber",
  draft: "neutral",
};

const STATUS_LABEL: Record<Doc["status"], string> = {
  signed: "Signed",
  pending: "Pending",
  draft: "Draft",
};

export default function DocumentsPage() {
  const rows = byClient(DOCUMENTS, "acme");

  return (
    <div>
      <PageHead title="Documents" sub="Agreements and forms on your account." />

      <Card className="overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-line bg-bone px-5 py-3 text-xs font-semibold uppercase tracking-wide text-mute">
          <span>Document</span>
          <span>Status</span>
          <span>Date</span>
          <span className="text-right">Action</span>
        </div>

        <div className="divide-y divide-line">
          {rows.map((d) => (
            <div key={d.id} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-5 py-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blade-tint text-blade-700">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium text-ink">{d.name}</span>
                      <Pill tone="neutral">{d.type}</Pill>
                    </div>
                    {d.status === "pending" && (
                      <p className="mt-0.5 text-xs text-[#b06a00]">Awaiting your signature</p>
                    )}
                  </div>
                </div>
              </div>

              <Pill tone={STATUS_TONE[d.status]} dot>
                {STATUS_LABEL[d.status]}
              </Pill>

              <span className="text-sm text-slate tnum">{d.date}</span>

              <div className="text-right">
                <button className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-line px-3 text-sm font-semibold text-slate transition-colors hover:bg-bone">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
