import { PageHead, Card, SectionTitle, Pill } from "@/components/portal/ui";
import { RECORDINGS, byClient } from "@/lib/portal-data";
import { Play, Star } from "lucide-react";

const OUTCOME_TONE = {
  Booked: "green",
  Callback: "blue",
  "Not interested": "neutral",
  Voicemail: "amber",
} as const;

// deterministic pseudo-waveform heights (no randomness — stable server render)
const WAVE = [40, 70, 55, 90, 65, 80, 45, 100, 60, 75, 50, 85, 35, 70];

function Waveform() {
  return (
    <div className="hidden h-6 items-center gap-0.5 sm:flex" aria-hidden>
      {WAVE.map((h, i) => (
        <span
          key={i}
          className="w-0.5 rounded-full bg-cyan/40"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

const TRANSCRIPT = [
  { who: "Agent", line: "Hi, this is Mariam calling from Acme Corp — how are you doing today?" },
  { who: "Customer", line: "Pretty good, thanks. What's this regarding?" },
  { who: "Agent", line: "We're reaching out about your spring HVAC tune-up. I can get a technician to you this week — would Thursday morning work?" },
  { who: "Customer", line: "Thursday actually works well for me." },
  { who: "Agent", line: "Perfect. I've booked you for 9 AM Thursday and you'll get a confirmation by text. Anything else I can help with?" },
  { who: "Customer", line: "No, that's everything. Thank you!" },
];

export default function ClientRecordingsPage() {
  const recordings = byClient(RECORDINGS, "acme");

  return (
    <div>
      <PageHead
        title="Call recordings"
        sub="Listen to your team on the phone — hear the quality for yourself."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-2 lg:col-span-2">
          <ul className="divide-y divide-line">
            {recordings.map((r) => (
              <li key={r.id} className="flex items-center gap-4 px-3 py-3">
                <button
                  type="button"
                  aria-label={`Play call with ${r.agent}`}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan transition hover:bg-cyan/25"
                >
                  <Play className="h-4 w-4 translate-x-[1px] fill-current" />
                </button>

                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-ink">{r.agent}</div>
                  <div className="truncate text-xs tnum text-slate">{r.contact}</div>
                </div>

                <Waveform />

                <span className="hidden w-10 text-right text-xs tnum text-slate sm:inline">
                  {r.duration}
                </span>

                <Pill tone={OUTCOME_TONE[r.outcome]}>{r.outcome}</Pill>

                <span className="hidden md:inline-flex">
                  <Pill tone="violet"><Star className="h-3 w-3 fill-current" />{r.score}</Pill>
                </span>

                <span className="hidden w-24 text-right text-xs text-mute lg:inline">{r.date}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <SectionTitle sub="Mariam H. · Booked · 4:12">Transcript</SectionTitle>
          <div className="space-y-3">
            {TRANSCRIPT.map((t, i) => {
              const isAgent = t.who === "Agent";
              return (
                <div key={i} className={isAgent ? "flex justify-start" : "flex justify-end"}>
                  <div className="max-w-[85%]">
                    <div
                      className={
                        isAgent
                          ? "mb-1 text-xs font-semibold text-blade-700"
                          : "mb-1 text-right text-xs font-semibold text-slate"
                      }
                    >
                      {t.who}
                    </div>
                    <div
                      className={
                        isAgent
                          ? "rounded-2xl rounded-tl-sm bg-blade-tint px-3 py-2 text-sm text-ink"
                          : "rounded-2xl rounded-tr-sm bg-cloud px-3 py-2 text-sm text-ink"
                      }
                    >
                      {t.line}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
