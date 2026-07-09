import { CalendarDays, FileText, ShieldCheck, Eye } from "lucide-react";
import {
  PageHead,
  Card,
  SectionTitle,
  Pill,
} from "@/components/portal/ui";
import {
  byClient,
  TRAINING_SESSIONS,
  MATERIALS,
  EVALUATIONS,
  type TrainingSession,
  type Evaluation,
} from "@/lib/portal-data";

const SESSION_TONE: Record<TrainingSession["status"], "blue" | "green" | "neutral"> = {
  Scheduled: "blue",
  Completed: "green",
  Cancelled: "neutral",
};

const RESULT_TONE: Record<Evaluation["result"], "green" | "amber"> = {
  "Approve to Go Live": "green",
  "Additional Training": "amber",
};

export default function ClientTrainingPage() {
  const sessions = byClient(TRAINING_SESSIONS, "acme");
  const materials = byClient(MATERIALS, "acme");
  const evaluations = byClient(EVALUATIONS, "acme");

  return (
    <div className="flex flex-col gap-6">
      <PageHead
        title="Training"
        sub="How we prepare your team before they ever call a customer."
      />

      <Card className="p-6">
        <SectionTitle sub="Live coaching scheduled for your campaigns.">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blade-700" />
            Upcoming sessions
          </span>
        </SectionTitle>

        {sessions.length === 0 ? (
          <p className="rounded-xl bg-bone px-4 py-3 text-sm text-slate">
            No sessions on the calendar right now — your team is fully trained and live. We’ll add new
            sessions here whenever a campaign or script changes.
          </p>
        ) : (
          <div className="divide-y divide-line">
            {sessions.map((s) => (
              <div key={s.id} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <div className="font-medium text-ink">{s.campaign}</div>
                  <div className="mt-1 text-xs text-mute">
                    <span className="tnum">{s.date}</span> · {s.time} {s.tz} · {s.agents} agents
                  </div>
                </div>
                <Pill tone={SESSION_TONE[s.status]} dot>
                  {s.status}
                </Pill>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <SectionTitle sub="Scripts, rebuttals and references your team trains on.">
          <span className="inline-flex items-center gap-2">
            <FileText className="h-5 w-5 text-blade-700" />
            Your materials
          </span>
        </SectionTitle>

        {materials.length === 0 ? (
          <p className="rounded-xl bg-bone px-4 py-3 text-sm text-slate">No materials yet.</p>
        ) : (
          <div className="divide-y divide-line">
            {materials.map((m) => (
              <div key={m.id} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <div className="font-medium text-ink">{m.name}</div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Pill tone="neutral">{m.type}</Pill>
                    <span className="text-xs text-mute tnum">{m.size}</span>
                    <span className="text-xs text-mute">Uploaded {m.uploaded}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-3 py-2 text-sm font-semibold text-slate transition hover:bg-bone"
                >
                  <Eye className="h-4 w-4" /> View
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <SectionTitle sub="Every agent must pass these checks before going live on your account.">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blade-700" />
            Readiness checks
          </span>
        </SectionTitle>

        {evaluations.length === 0 ? (
          <p className="rounded-xl bg-bone px-4 py-3 text-sm text-slate">No readiness checks on file yet.</p>
        ) : (
          <div className="divide-y divide-line">
            {evaluations.map((e) => (
              <div key={e.id} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <div className="font-medium text-ink">{e.agent}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <Pill tone="blue">Script {e.script}/5</Pill>
                    <Pill tone="blue">Comms {e.communication}/5</Pill>
                    <Pill tone="blue">System {e.system}/5</Pill>
                    <Pill tone="blue">Readiness {e.readiness}/5</Pill>
                  </div>
                </div>
                <Pill tone={RESULT_TONE[e.result]} dot>
                  {e.result}
                </Pill>
              </div>
            ))}
          </div>
        )}

        <p className="mt-4 text-sm text-slate">
          Agents must pass every readiness check before they’re cleared to call your customers.
        </p>
      </Card>
    </div>
  );
}
