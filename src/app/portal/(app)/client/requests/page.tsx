"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { PageHead, Card, SectionTitle, Pill } from "@/components/portal/ui";
import { REQUESTS, byClient, type Request } from "@/lib/portal-data";

const KINDS: Request["kind"][] = ["Team change", "Script change", "Pause", "Question", "Integration"];

const STATUS_TONE: Record<Request["status"], "blue" | "amber" | "green"> = {
  open: "blue",
  "in-progress": "amber",
  done: "green",
};

const STATUS_LABEL: Record<Request["status"], string> = {
  open: "Open",
  "in-progress": "In progress",
  done: "Done",
};

export default function RequestsPage() {
  const rows = byClient(REQUESTS, "acme");
  const [sent, setSent] = useState(false);
  const [kind, setKind] = useState<Request["kind"]>("Team change");
  const [body, setBody] = useState("");

  return (
    <div>
      <PageHead title="Requests" sub="Ask us for anything — changes, more agents, a pause." />

      <Card className="mb-6 p-6">
        {sent ? (
          <div className="flex items-center gap-3 py-2">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald/12 text-emerald">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <div className="font-display font-semibold text-ink">Sent</div>
              <p className="text-sm text-slate">Your account manager will reply shortly.</p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Request type</label>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value as Request["kind"])}
                className="h-10 w-full rounded-lg border border-line bg-paper px-3 text-sm text-ink outline-none focus:border-blade-500"
              >
                {KINDS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Details</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                placeholder="Tell us what you need…"
                className="w-full resize-none rounded-lg border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none placeholder:text-mute focus:border-blade-500"
              />
            </div>

            <button
              type="submit"
              className="btn-electric inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-4 text-sm font-semibold text-white"
            >
              <Send className="h-4 w-4" />
              Send request
            </button>
          </form>
        )}
      </Card>

      <SectionTitle sub="Open and recent requests on your account.">Your requests</SectionTitle>

      <Card className="divide-y divide-line">
        {rows.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <div className="font-medium text-ink">{r.title}</div>
              <div className="mt-1.5 flex items-center gap-2">
                <Pill tone="neutral">{r.kind}</Pill>
                <span className="text-xs text-mute">{r.when}</span>
              </div>
            </div>
            <Pill tone={STATUS_TONE[r.status]} dot>
              {STATUS_LABEL[r.status]}
            </Pill>
          </div>
        ))}
      </Card>
    </div>
  );
}
