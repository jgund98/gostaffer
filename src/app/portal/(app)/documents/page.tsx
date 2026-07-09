import { FileText, Eye, Download, FolderOpen } from "lucide-react";
import { PageHead, Card, Pill, Avatar, initialsOf, EmptyState } from "@/components/portal/ui";
import { DOCUMENTS, clientById } from "@/lib/portal-data";

const STATUS_TONE = { signed: "green", pending: "amber", draft: "neutral" } as const;
const STATUS_LABEL = { signed: "Signed", pending: "Pending", draft: "Draft" } as const;

export default function DocumentsPage() {
  return (
    <div>
      <PageHead title="Documents" sub="Agreements, NDAs, and order forms across every client." />

      {DOCUMENTS.length === 0 ? (
        <EmptyState Icon={FolderOpen} title="No documents yet" body="Signed agreements, NDAs, and order forms will show up here as clients sign." />
      ) : (
      <Card className="overflow-hidden">
        <div className="hidden grid-cols-[2.2fr_1.3fr_0.9fr_0.7fr_auto] gap-4 border-b border-line bg-bone/60 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-mute lg:grid">
          <span>Document</span>
          <span>Client</span>
          <span>Status</span>
          <span>Date</span>
          <span />
        </div>

        <div className="divide-y divide-line">
          {DOCUMENTS.map((doc) => {
            const client = clientById(doc.clientId);
            const status = (
              <Pill tone={STATUS_TONE[doc.status]} dot={doc.status !== "draft"}>
                {STATUS_LABEL[doc.status]}
              </Pill>
            );
            return (
              <div
                key={doc.id}
                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-bone/50 lg:grid lg:grid-cols-[2.2fr_1.3fr_0.9fr_0.7fr_auto] lg:items-center lg:gap-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blade-tint text-blade-700">
                      <FileText className="h-4 w-4" />
                    </span>
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="truncate font-medium text-ink">{doc.name}</span>
                      <span className="shrink-0 rounded-md bg-cloud px-1.5 py-0.5 text-[0.68rem] font-semibold text-slate">{doc.type}</span>
                    </div>
                  </div>
                  <span className="shrink-0 lg:hidden">{status}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Avatar initials={initialsOf(client?.company ?? "?")} grad={client?.grad ?? "from-[#64748b] to-[#94a3b8]"} size={28} />
                  <span className="text-sm text-slate">{client?.company ?? "Unknown"}</span>
                </div>

                <div className="hidden lg:block">{status}</div>

                <div className="text-sm text-slate tnum">{doc.date}</div>

                <div className="flex items-center gap-1 lg:justify-end">
                  <button type="button" className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate transition-colors hover:bg-bone">
                    <Eye className="h-3.5 w-3.5" /> View
                  </button>
                  <button type="button" className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate transition-colors hover:bg-bone">
                    <Download className="h-3.5 w-3.5" /> Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      )}
    </div>
  );
}
