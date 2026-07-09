"use client";

import { useState } from "react";
import { CheckCircle2, FileText, Pen } from "lucide-react";
import { PageHead, Card, Pill } from "@/components/portal/ui";
import { APPROVALS, byClient } from "@/lib/portal-data";

const TYPE_TONE: Record<string, "blue" | "violet" | "amber"> = {
  Script: "blue",
  Document: "violet",
  Change: "amber",
};

export default function ApprovalsPage() {
  const rows = byClient(APPROVALS, "acme");
  const [approved, setApproved] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(rows.filter((r) => r.status === "approved").map((r) => [r.id, true]))
  );

  const pendingCount = rows.filter((r) => r.status !== "approved" && !approved[r.id]).length;

  return (
    <div>
      <PageHead title="Approvals" sub="Review and approve scripts and documents." />

      <Card className="mb-5 flex items-center gap-3 p-4">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-bone text-blade-700">
          <Pen className="h-4 w-4" />
        </span>
        <div>
          <div className="font-display text-lg font-bold text-ink tnum">{pendingCount}</div>
          <div className="text-sm text-slate">{pendingCount === 1 ? "item awaiting" : "items awaiting"} your approval</div>
        </div>
      </Card>

      <Card className="divide-y divide-line">
        {rows.map((r) => {
          const isApproved = approved[r.id];
          return (
            <div key={r.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 shrink-0 text-slate" />
                  <span className="font-medium text-ink">{r.item}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <Pill tone={TYPE_TONE[r.type]}>{r.type}</Pill>
                  <span className="text-xs text-mute">{r.date}</span>
                </div>
              </div>

              {isApproved ? (
                <Pill tone="green" dot>
                  Approved
                </Pill>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setApproved((p) => ({ ...p, [r.id]: true }))}
                    className="btn-electric inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-4 text-sm font-semibold text-white"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Approve
                  </button>
                  <button className="inline-flex h-10 items-center justify-center rounded-lg border border-line px-4 text-sm font-semibold text-slate transition-colors hover:bg-bone">
                    Request changes
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </Card>
    </div>
  );
}
