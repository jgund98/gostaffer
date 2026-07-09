import { Quote, MessageSquareWarning, FolderOpen, FileText, Eye } from "lucide-react";
import { PageHead, Card, SectionTitle, Pill } from "@/components/portal/ui";
import { MATERIALS, byClient, type Material } from "@/lib/portal-data";

const SCRIPT_LINES = [
  "Hi, this is Mariam calling from Acme Heating & Cooling — how are you today?",
  "We're reaching out to local homeowners about our Spring Tune-Up, which keeps your AC running efficiently before the summer heat hits.",
  "It's a quick 21-point inspection by a licensed tech — most folks save on their energy bill and avoid breakdowns down the line.",
  "I have a couple of openings this week — would a morning or an afternoon work better for you?",
];

const OBJECTIONS: { objection: string; rebuttal: string }[] = [
  {
    objection: "My system is working fine right now.",
    rebuttal:
      "That's great to hear — and it's actually the perfect time. A tune-up while it's running well catches small issues early, so it keeps working fine all summer instead of failing on the hottest day.",
  },
  {
    objection: "How much does it cost?",
    rebuttal:
      "The Spring Tune-Up is just $89, and most customers earn that back in energy savings within a couple of months. It also includes a full safety check at no extra charge.",
  },
  {
    objection: "I don't have time right now.",
    rebuttal:
      "Totally understand — the visit only takes about 45 minutes and our tech works around your schedule. I can lock in an early-morning slot so it's done before your day even gets going.",
  },
];

const MATERIAL_TONE: Record<Material["type"], "blue" | "violet" | "neutral" | "green" | "amber"> = {
  Script: "blue",
  Rebuttal: "violet",
  Documentation: "neutral",
  FAQ: "green",
  "Training Video": "amber",
  Other: "neutral",
};

export default function AgentScriptsPage() {
  const materials = byClient(MATERIALS, "acme");

  return (
    <div className="flex flex-col gap-6">
      <PageHead title="Scripts & materials" sub="Everything you need for the Acme — HVAC campaign." />

      <Card className="p-5">
        <SectionTitle sub="Lead with warmth, keep it moving.">Opening script</SectionTitle>
        <div className="rounded-2xl border border-line bg-mist p-4">
          <Quote className="h-5 w-5 text-blade-700" />
          <div className="mt-3 flex flex-col gap-3">
            {SCRIPT_LINES.map((line, i) => (
              <p key={i} className="font-mono text-sm leading-relaxed text-ink">
                {line}
              </p>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <SectionTitle sub="Acknowledge, reframe, ask again.">Objections & rebuttals</SectionTitle>
        <div className="flex flex-col gap-4">
          {OBJECTIONS.map((o, i) => (
            <div key={i} className="rounded-2xl border border-line bg-paper p-4">
              <div className="flex items-start gap-2">
                <MessageSquareWarning className="mt-0.5 h-4 w-4 shrink-0 text-[#b06a00]" />
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-wide text-slate">Objection</p>
                  <p className="mt-0.5 text-sm font-semibold text-ink">{o.objection}</p>
                </div>
              </div>
              <div className="mt-3 rounded-xl bg-blade-tint p-3">
                <p className="font-mono text-xs font-semibold uppercase tracking-wide text-blade-700">Rebuttal</p>
                <p className="mt-1 text-sm leading-relaxed text-ink">{o.rebuttal}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <SectionTitle sub="Reference docs, scripts, and training.">Materials</SectionTitle>
        <div className="flex flex-col divide-y divide-line">
          {materials.map((m) => (
            <div key={m.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-bone text-blade-700">
                <FileText className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{m.name}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Pill tone={MATERIAL_TONE[m.type]}>{m.type}</Pill>
                  <span className="text-xs text-mute">{m.size}</span>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-slate hover:bg-cloud hover:text-ink"
              >
                <Eye className="h-4 w-4" />
                View
              </button>
            </div>
          ))}
        </div>
        {materials.length === 0 && (
          <p className="flex items-center gap-2 text-sm text-mute">
            <FolderOpen className="h-4 w-4" />
            No materials yet.
          </p>
        )}
      </Card>
    </div>
  );
}
