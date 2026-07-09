import {
  FileText,
  UploadCloud,
  Video,
  Calendar,
  Clock,
  Users,
  CalendarPlus,
} from "lucide-react";
import { PageHead, Card, Pill, Avatar, initialsOf } from "@/components/portal/ui";
import { Tabs } from "@/components/portal/tabs";
import {
  clientById,
  MATERIALS,
  TRAINING_SESSIONS,
  EVALUATIONS,
  type Material,
  type TrainingSession,
} from "@/lib/portal-data";

const PEOPLE_GRAD = "from-[#1f9e68] to-[#2fd39e]";

const MATERIAL_TONE: Record<
  Material["type"],
  "neutral" | "blue" | "green" | "amber" | "violet"
> = {
  Script: "blue",
  Rebuttal: "amber",
  FAQ: "green",
  "Training Video": "violet",
  Documentation: "neutral",
  Other: "neutral",
};

const SESSION_TONE: Record<
  TrainingSession["status"],
  "blue" | "green" | "neutral"
> = {
  Scheduled: "blue",
  Completed: "green",
  Cancelled: "neutral",
};

function MaterialsTab() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6">
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line-2 bg-bone/40 px-6 py-10 text-center transition-colors hover:border-blade-500/50 hover:bg-blade-tint">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-blade-tint text-blade-700">
            <UploadCloud className="h-5 w-5" />
          </span>
          <span className="font-display text-sm font-semibold text-ink">
            Upload material
          </span>
          <span className="text-xs text-slate">
            Drag &amp; drop a script, rebuttal, FAQ, doc, or video — or click to browse.
          </span>
          <input type="file" className="hidden" />
        </label>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs font-semibold uppercase tracking-wide text-mute">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Size</th>
                <th className="px-5 py-3">Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {MATERIALS.map((m) => {
                const client = clientById(m.clientId);
                const Icon = m.type === "Training Video" ? Video : FileText;
                return (
                  <tr key={m.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-bone text-blade-700">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="font-medium text-ink">{m.name}</span>
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Pill tone={MATERIAL_TONE[m.type]}>{m.type}</Pill>
                    </td>
                    <td className="px-5 py-3.5 text-slate">
                      {client?.company ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 text-slate tnum">{m.size}</td>
                    <td className="px-5 py-3.5 text-slate">{m.uploaded}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function SessionsTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button className="btn-electric inline-flex h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-white">
          <CalendarPlus className="h-4 w-4" />
          Schedule session
        </button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs font-semibold uppercase tracking-wide text-mute">
                <th className="px-5 py-3">Campaign</th>
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">When</th>
                <th className="px-5 py-3">Agents</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {TRAINING_SESSIONS.map((s) => {
                const client = clientById(s.clientId);
                return (
                  <tr key={s.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-3.5 font-medium text-ink">
                      {s.campaign}
                    </td>
                    <td className="px-5 py-3.5 text-slate">
                      {client?.company ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 text-slate">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-mute" />
                        {s.date}
                        <span className="text-mute">·</span>
                        <Clock className="h-3.5 w-3.5 text-mute" />
                        {s.time} {s.tz}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate">
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-mute" />
                        {s.agents} agents
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <Pill tone={SESSION_TONE[s.status]} dot>
                        {s.status}
                      </Pill>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {s.status === "Scheduled" && (
                        <button className="text-sm font-semibold text-blade-700 hover:text-cyan">
                          Join Meet
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function EvaluationsTab() {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs font-semibold uppercase tracking-wide text-mute">
              <th className="px-5 py-3">Agent</th>
              <th className="px-5 py-3">Client</th>
              <th className="px-5 py-3">Scores</th>
              <th className="px-5 py-3">Result</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {EVALUATIONS.map((e) => {
              const client = clientById(e.clientId);
              const scores: { label: string; n: number }[] = [
                { label: "Script", n: e.script },
                { label: "Comm", n: e.communication },
                { label: "System", n: e.system },
                { label: "Ready", n: e.readiness },
              ];
              return (
                <tr key={e.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-3">
                      <Avatar initials={initialsOf(e.agent)} grad={PEOPLE_GRAD} size={32} />
                      <span className="font-medium text-ink">{e.agent}</span>
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-slate">
                    {client?.company ?? "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="flex flex-wrap gap-1.5">
                      {scores.map((sc) => (
                        <span
                          key={sc.label}
                          className="inline-flex items-center gap-1 rounded-md bg-bone px-2 py-0.5 text-xs font-medium text-slate"
                        >
                          <span className="text-mute">{sc.label}</span>
                          <span className="font-semibold text-ink tnum">
                            {sc.n}/5
                          </span>
                        </span>
                      ))}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Pill tone={e.result === "Approve to Go Live" ? "green" : "amber"}>
                      {e.result}
                    </Pill>
                  </td>
                  <td className="px-5 py-3.5 text-slate">{e.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default function TrainingPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHead title="Training" sub="Materials, sessions, and go-live evaluations." />
      <Tabs
        tabs={[
          { label: "Materials", count: MATERIALS.length, content: <MaterialsTab /> },
          { label: "Sessions", content: <SessionsTab /> },
          { label: "Evaluations", content: <EvaluationsTab /> },
        ]}
      />
    </div>
  );
}
