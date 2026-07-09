import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, Mail, Phone, MessageSquare, Pencil, Plus, Check, Circle, Headset, Globe2, Clock, DollarSign, Wrench, FileText, Building2,
} from "lucide-react";
import { CLIENTS, INVOICES, fmtUSD, clientById } from "@/lib/portal-data";
import { Card, StatusBadge, InvoiceBadge, Avatar, initialsOf, Sparkline, SectionTitle } from "@/components/portal/ui";
import { REPORT_SERIES } from "@/lib/portal-data";

export function generateStaticParams() {
  return CLIENTS.map((c) => ({ id: c.id }));
}

const ONBOARD_STEPS = [
  "Account created · invite sent",
  "Contract signed & payment connected",
  "Offer, scripts & lists received",
  "Team trained to your benchmark",
  "Live on the phones",
];

export default async function ClientDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = clientById(id);
  if (!c) notFound();

  const invoices = INVOICES.filter((i) => i.clientId === c.id);
  const live = c.status === "active";

  const rows: [React.ReactNode, string, string][] = [
    [<Headset key="s" className="h-4 w-4" />, "Services", c.services.join(", ")],
    [<Building2 key="i" className="h-4 w-4" />, "Industry", c.industry],
    [<Globe2 key="l" className="h-4 w-4" />, "Languages", "English, Spanish"],
    [<Clock key="h" className="h-4 w-4" />, "Coverage", "Business hours (ET)"],
    [<Headset key="a" className="h-4 w-4" />, "Team size", `${c.agents} agents`],
    [<DollarSign key="r" className="h-4 w-4" />, "Rate", `$${c.perMin}/min`],
  ];

  return (
    <div className="flex flex-col gap-6">
      <Link href="/portal/clients" className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-slate hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> All clients
      </Link>

      {/* header */}
      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar initials={initialsOf(c.company)} grad={c.grad} size={56} />
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-display text-2xl font-bold text-ink">{c.company}</h1>
                <StatusBadge status={c.status} />
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate">
                <span>{c.contact}</span>
                <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {c.email}</span>
                <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {c.phone}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-line-2 px-3.5 text-sm font-semibold text-ink hover:bg-bone"><MessageSquare className="h-4 w-4" /> Message</button>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-line-2 px-3.5 text-sm font-semibold text-ink hover:bg-bone"><Pencil className="h-4 w-4" /> Edit</button>
            <Link href="/portal/billing" className="btn-electric inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold text-white"><Plus className="h-4 w-4" /> Invoice</Link>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="flex flex-col gap-6">
          {/* onboarding */}
          <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <SectionTitle sub={live ? "Fully live and running" : `Step ${c.onboardStep} of 5`}>Onboarding</SectionTitle>
              {!live && <span className="text-sm font-semibold text-blade-700">{Math.round((c.onboardStep / 5) * 100)}%</span>}
            </div>
            <ol className="flex flex-col gap-1">
              {ONBOARD_STEPS.map((s, i) => {
                const done = c.onboardStep > i;
                const current = c.onboardStep === i;
                return (
                  <li key={s} className="flex items-center gap-3 py-2">
                    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${done ? "bg-blade-600 text-white" : current ? "border-2 border-blade-500 text-blade-600" : "border-2 border-line-2 text-mute"}`}>
                      {done ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-2 w-2 fill-current" />}
                    </span>
                    <span className={`text-sm ${done ? "text-ink" : current ? "font-semibold text-ink" : "text-mute"}`}>{s}</span>
                    {current && <span className="ml-auto rounded-full bg-blade-tint px-2.5 py-0.5 text-xs font-semibold text-blade-700">In progress</span>}
                  </li>
                );
              })}
            </ol>
          </Card>

          {/* config */}
          <Card className="p-5 sm:p-6">
            <SectionTitle>Team &amp; campaign</SectionTitle>
            <div className="grid gap-x-6 gap-y-0 sm:grid-cols-2">
              {rows.map(([icon, k, v]) => (
                <div key={k} className="flex items-center gap-3 border-b border-line py-3 last:border-0">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-bone text-blade-700">{icon}</span>
                  <div><div className="text-xs text-mute">{k}</div><div className="text-sm font-medium text-ink">{v}</div></div>
                </div>
              ))}
            </div>
          </Card>

          {/* data & tools */}
          <Card className="p-5 sm:p-6">
            <SectionTitle>Data &amp; integrations</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {["HubSpot", "Calendly", "Twilio"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-bone/60 px-3 py-2 text-sm font-medium text-ink"><Wrench className="h-3.5 w-3.5 text-blade-600" /> {t}</span>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {["offer-and-scripts.pdf", "lead-list-q3.csv"].map((file) => (
                <div key={file} className="flex items-center gap-3 rounded-lg border border-line px-3.5 py-2.5 text-sm"><FileText className="h-4 w-4 text-slate" /> <span className="text-ink">{file}</span><span className="ml-auto text-xs text-mute">uploaded</span></div>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          {/* usage */}
          <Card className="p-5 sm:p-6">
            <SectionTitle sub="Last 14 days">Usage</SectionTitle>
            <div className="mb-3 flex items-end justify-between">
              <div><div className="font-display text-2xl font-bold text-ink tnum">{c.minutesPeriod.toLocaleString()}</div><div className="text-xs text-mute">minutes this period</div></div>
              <div className="text-right"><div className="font-display text-2xl font-bold text-ink tnum">{c.mrr > 0 ? fmtUSD(c.mrr) : "—"}</div><div className="text-xs text-mute">MRR</div></div>
            </div>
            <Sparkline data={REPORT_SERIES} className="h-16" />
            <Link href="/portal/reports" className="mt-3 inline-block text-sm font-semibold text-blade-700">View full report →</Link>
          </Card>

          {/* invoices */}
          <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <SectionTitle>Invoices</SectionTitle>
              <Link href="/portal/billing" className="text-sm font-semibold text-blade-700">All</Link>
            </div>
            <div className="flex flex-col divide-y divide-line">
              {invoices.length ? invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between py-3">
                  <div><div className="text-sm font-semibold text-ink">{inv.number}</div><div className="text-xs text-mute">{inv.period}</div></div>
                  <div className="flex items-center gap-3"><span className="text-sm font-semibold text-ink tnum">{fmtUSD(inv.amount)}</span><InvoiceBadge status={inv.status} /></div>
                </div>
              )) : <p className="py-4 text-center text-sm text-mute">No invoices yet.</p>}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
