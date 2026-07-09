import { ListChecks, AlertTriangle, CalendarClock } from "lucide-react";
import { PageHead, Card, StatCard, Pill } from "@/components/portal/ui";
import { CRITICAL_TASKS, clientById, type CriticalTask } from "@/lib/portal-data";

const PRIORITY: Record<CriticalTask["priority"], { tone: "red" | "amber" | "blue" | "neutral"; label: string }> = {
  critical: { tone: "red", label: "Critical" },
  high: { tone: "amber", label: "High" },
  medium: { tone: "blue", label: "Medium" },
  low: { tone: "neutral", label: "Low" },
};

const STATUS: Record<CriticalTask["status"], { tone: "neutral" | "amber" | "green"; dot: boolean; label: string }> = {
  pending: { tone: "neutral", dot: false, label: "Pending" },
  "in-progress": { tone: "amber", dot: true, label: "In progress" },
  completed: { tone: "green", dot: true, label: "Completed" },
};

const FILTERS = ["All", "Pending", "In progress", "Completed"];

function humanize(type: string) {
  const s = type.replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function TasksPage() {
  const open = CRITICAL_TASKS.filter((t) => t.status !== "completed").length;
  const hot = CRITICAL_TASKS.filter((t) => t.priority === "high" || t.priority === "critical").length;
  const dueThisWeek = CRITICAL_TASKS.filter((t) => t.status !== "completed").length;

  return (
    <div className="flex flex-col gap-6">
      <PageHead title="Critical tasks" sub="Internal to-dos that keep launches on track." />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Open tasks" value={`${open}`} Icon={ListChecks} accent />
        <StatCard label="High / critical" value={`${hot}`} Icon={AlertTriangle} />
        <StatCard label="Due this week" value={`${dueThisWeek}`} Icon={CalendarClock} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f, i) => (
          <button
            key={f}
            type="button"
            className={
              i === 0
                ? "inline-flex h-8 items-center rounded-full bg-blade-tint px-3.5 text-sm font-semibold text-blade-700"
                : "inline-flex h-8 items-center rounded-full border border-line bg-paper px-3.5 text-sm font-medium text-slate hover:bg-bone/60"
            }
          >
            {f}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="divide-y divide-line">
          {CRITICAL_TASKS.map((t) => {
            const p = PRIORITY[t.priority];
            const s = STATUS[t.status];
            const company = t.clientId ? clientById(t.clientId)?.company ?? "Internal" : "Internal";
            return (
              <div key={t.id} className="flex flex-wrap items-center gap-4 px-5 py-4 hover:bg-bone/50">
                <span
                  className={
                    "h-2.5 w-2.5 shrink-0 rounded-full " +
                    (t.priority === "critical"
                      ? "bg-[#dc2626]"
                      : t.priority === "high"
                        ? "bg-[#b06a00]"
                        : t.priority === "medium"
                          ? "bg-blade-700"
                          : "bg-mute")
                  }
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold text-ink">{t.title}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-mute">
                    <span className="inline-flex items-center rounded-md bg-bone px-2 py-0.5 font-medium text-slate">
                      {humanize(t.type)}
                    </span>
                    <span>·</span>
                    <span>{company}</span>
                  </div>
                </div>
                <Pill tone={p.tone}>{p.label}</Pill>
                <Pill tone={s.tone} dot={s.dot}>
                  {s.label}
                </Pill>
                <div className="w-16 text-right text-sm text-slate tnum">{t.due}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
