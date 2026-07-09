import { PageHead, Card, Pill } from "@/components/portal/ui";
import { Tabs } from "@/components/portal/tabs";
import { WALLET, fmtUSD } from "@/lib/portal-data";

// GoStaffer-side staff roles (the real operational role model).
type TeamRole = "Super Admin" | "Admin" | "Supervisor" | "BPO Rep";
const TEAM: { name: string; email: string; role: TeamRole; scope: string }[] = [
  { name: "Jordan Gund", email: "jordan@gostaffer.com", role: "Super Admin", scope: "All organizations" },
  { name: "Rachel Mercer", email: "rachel@gostaffer.com", role: "Admin", scope: "All organizations" },
  { name: "Sam Rivera", email: "sam@gostaffer.com", role: "Supervisor", scope: "Acme, Northwind" },
  { name: "Karim Tawfik", email: "karim@gostaffer.com", role: "BPO Rep", scope: "Assigned campaigns" },
];

const ROLE_TONE = {
  "Super Admin": "violet",
  Admin: "blue",
  Supervisor: "amber",
  "BPO Rep": "neutral",
} as const;

// Client-side roles live on each client organization.
const CLIENT_ROLES: { role: string; can: string }[] = [
  { role: "Owner", can: "Full access — billing, approvals, team, requests" },
  { role: "Buyer", can: "Request agents, approve scripts, manage billing" },
  { role: "Viewer", can: "Read-only — reports, recordings, invoices" },
];

const NOTIFICATIONS = [
  { label: "New client onboarded", on: true },
  { label: "Invoice paid", on: true },
  { label: "Overdue invoice", on: true },
  { label: "New client request", on: false },
];

function Switch({ on }: { on: boolean }) {
  return (
    <span
      className={
        on
          ? "inline-flex h-6 w-11 items-center rounded-full bg-blade-500 p-0.5 justify-end"
          : "inline-flex h-6 w-11 items-center rounded-full bg-cloud p-0.5 justify-start"
      }
    >
      <span className="h-5 w-5 rounded-full bg-white shadow-[var(--shadow-sm)]" />
    </span>
  );
}

function TeamTab() {
  return (
    <div className="flex flex-col gap-5">
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5">
          <span className="text-sm font-semibold text-ink">GoStaffer staff</span>
          <span className="text-xs text-mute">Role controls what each person can see and do across client orgs.</span>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-y border-line bg-bone/60 text-xs uppercase tracking-wide text-mute">
            <tr>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Role</th>
              <th className="px-5 py-3 font-semibold">Scope</th>
              <th className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {TEAM.map((u) => (
              <tr key={u.email} className="hover:bg-bone/50">
                <td className="px-5 py-4"><div className="font-medium text-ink">{u.name}</div><div className="text-xs text-mute">{u.email}</div></td>
                <td className="px-5 py-4"><Pill tone={ROLE_TONE[u.role]}>{u.role}</Pill></td>
                <td className="px-5 py-4 text-slate">{u.scope}</td>
                <td className="px-5 py-4"><Pill tone="green" dot>Active</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <h3 className="font-display text-base font-semibold text-ink">Client account roles</h3>
        <p className="mt-1 text-sm text-slate">Each client organization manages its own users with these roles.</p>
        <div className="mt-4 flex flex-col divide-y divide-line">
          {CLIENT_ROLES.map((r) => (
            <div key={r.role} className="flex items-start justify-between gap-4 py-3">
              <Pill tone="blue">{r.role}</Pill>
              <span className="flex-1 text-right text-sm text-slate">{r.can}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function NotificationsTab() {
  return (
    <Card className="overflow-hidden">
      <ul className="divide-y divide-line">
        {NOTIFICATIONS.map((n) => (
          <li key={n.label} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-medium text-ink">{n.label}</p>
              <p className="mt-0.5 text-xs text-mute">Email + in-app notification</p>
            </div>
            <Switch on={n.on} />
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Field({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
      <div className="flex items-center justify-between rounded-xl border border-line bg-paper px-4 py-3">
        <span className="text-sm font-medium text-ink tnum">{value}</span>
        {sub && <span className="text-xs text-mute">{sub}</span>}
      </div>
    </div>
  );
}

function BillingTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <h3 className="mb-4 font-display text-base font-semibold text-ink">Billing model</h3>
        <div className="grid gap-4">
          <Field label="Agent hourly rate" value="$12 / hr" sub="= $0.20 / min" />
          <Field label="Dialer seat price" value="$500" sub="/ seat · period" />
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-ink">Auto-bill cadence</label>
            <div className="flex items-center justify-between rounded-xl border border-line bg-bone/40 px-4 py-3">
              <span className="text-sm font-medium text-ink">Every 2 weeks · next Jul 6</span>
              <Pill tone="blue">Selected</Pill>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-ink">Wallet auto-reload</h3>
          <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-blade-600"><span className="absolute right-0.5 h-5 w-5 rounded-full bg-white" /></span>
        </div>
        <div className="grid gap-4">
          <Field label="Reload when below" value={fmtUSD(WALLET.threshold)} />
          <Field label="Reload amount" value={fmtUSD(WALLET.amount)} />
          <Field label="Charge method" value={WALLET.method} />
        </div>
      </Card>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div>
      <PageHead title="Settings" />
      <Tabs
        tabs={[
          { label: "Team & roles", content: <TeamTab />, count: TEAM.length },
          { label: "Notifications", content: <NotificationsTab /> },
          { label: "Billing settings", content: <BillingTab /> },
        ]}
      />
    </div>
  );
}
