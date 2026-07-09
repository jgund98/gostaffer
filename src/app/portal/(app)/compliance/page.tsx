import { Check, ShieldCheck, PhoneOff, FileCheck2, ScrollText } from "lucide-react";
import { PageHead, Card, Pill, SectionTitle } from "@/components/portal/ui";
import { AUDIT } from "@/lib/portal-data";

const CONTROLS = [
  { label: "Call recording", value: "On", Icon: ShieldCheck },
  { label: "DNC scrubbing", value: "Active", Icon: PhoneOff },
  { label: "Consent capture", value: "On", Icon: FileCheck2 },
  { label: "TCPA / HIPAA", value: "Covered", Icon: ShieldCheck },
];

export default function CompliancePage() {
  return (
    <div>
      <PageHead title="Compliance center" />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CONTROLS.map((c) => (
          <Card key={c.label} className="p-5">
            <div className="flex items-center justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald/12 text-emerald">
                <c.Icon className="h-4.5 w-4.5" />
              </span>
              <Pill tone="green" dot>
                {c.value}
              </Pill>
            </div>
            <div className="mt-3 text-sm font-semibold text-ink">{c.label}</div>
            <div className="mt-0.5 inline-flex items-center gap-1 text-xs text-emerald">
              <Check className="h-3 w-3" />
              Enabled
            </div>
          </Card>
        ))}
      </div>

      <SectionTitle sub="Every recorded call, scrub, and approval — fully traceable.">
        Audit log
      </SectionTitle>
      <Card className="overflow-hidden">
        <ul className="divide-y divide-line">
          {AUDIT.map((entry, i) => (
            <li key={i} className="flex items-start gap-3 px-5 py-4">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-bone text-blade-700">
                <ScrollText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-slate">
                  <span className="font-semibold text-ink">{entry.who}</span> {entry.action}
                </p>
              </div>
              <span className="shrink-0 text-xs text-mute">{entry.when}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
