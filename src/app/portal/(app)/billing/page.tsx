"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, X, Trash2, CreditCard, Landmark, CheckCircle2, Send, FileText, DollarSign, CalendarClock, Download,
  Wallet as WalletIcon, RefreshCw, Zap, ArrowDownLeft, ArrowUpRight,
} from "lucide-react";
import { INVOICES, CLIENTS, fmtUSD, clientById, WALLET, CLIENT_WALLETS, LEDGER, DIALER_SEATS } from "@/lib/portal-data";
import { Card, InvoiceBadge, Avatar, initialsOf, StatCard, Pill } from "@/components/portal/ui";
import { cn } from "@/lib/utils";

const TABS = ["Wallet", "Invoices", "Payment methods", "Ledger", "Auto-bill"] as const;

export default function Billing() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Wallet");
  const [creating, setCreating] = useState(false);

  const outstanding = INVOICES.filter((i) => i.status === "due" || i.status === "overdue").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Billing &amp; wallet</h1>
          <p className="mt-1 text-sm text-slate">A prepaid wallet funds usage; we auto-bill every 2 weeks and draw from credits.</p>
        </div>
        <button onClick={() => setCreating(true)} className="btn-electric inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-white">
          <Plus className="h-4 w-4" /> New invoice
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Client credits on file" value={fmtUSD(Object.values(CLIENT_WALLETS).reduce((s, w) => s + w.balance, 0))} delta="Across all client wallets" Icon={WalletIcon} accent />
        <StatCard label="Outstanding" value={fmtUSD(outstanding)} delta="2 invoices open" Icon={FileText} />
        <StatCard label="Next auto-bill" value="Jul 6" delta="4 clients · est. $19,231" Icon={CalendarClock} />
      </div>

      {/* tabs */}
      <div className="flex items-center gap-1 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn("relative px-4 py-2.5 text-sm font-semibold transition-colors", tab === t ? "text-ink" : "text-mute hover:text-slate")}
          >
            {t}
            {tab === t && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded bg-blade-600" />}
          </button>
        ))}
      </div>

      {tab === "Wallet" && <WalletPanel />}
      {tab === "Invoices" && <Invoices />}
      {tab === "Payment methods" && <PaymentMethods />}
      {tab === "Ledger" && <Ledger />}
      {tab === "Auto-bill" && <AutoBill />}

      <AnimatePresence>{creating && <CreateInvoice onClose={() => setCreating(false)} />}</AnimatePresence>
    </div>
  );
}

function Invoices() {
  return (
    <Card className="overflow-hidden">
      <div className="hidden grid-cols-[1.6fr_1fr_1fr_0.8fr_1fr_auto] gap-4 border-b border-line bg-bone/60 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-mute lg:grid">
        <span>Client</span><span>Invoice</span><span>Type</span><span>Status</span><span>Amount</span><span />
      </div>
      <div className="divide-y divide-line">
        {INVOICES.map((inv) => {
          const c = clientById(inv.clientId);
          return (
            <div key={inv.id} className="grid grid-cols-1 items-center gap-2 px-5 py-4 lg:grid-cols-[1.6fr_1fr_1fr_0.8fr_1fr_auto] lg:gap-4">
              <div className="flex items-center gap-3">
                {c && <Avatar initials={initialsOf(c.company)} grad={c.grad} size={32} />}
                <div><div className="font-semibold text-ink">{c?.company}</div><div className="text-xs text-mute">{inv.period}</div></div>
              </div>
              <div className="text-sm text-slate">{inv.number}<div className="text-xs text-mute">issued {inv.issued}</div></div>
              <div>
                <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", inv.type === "auto" ? "bg-blade-tint text-blade-700" : "bg-cloud text-slate")}>
                  {inv.type === "auto" ? "Auto · bi-weekly" : "One-off"}
                </span>
              </div>
              <div><InvoiceBadge status={inv.status} /></div>
              <div className="font-semibold text-ink tnum">{fmtUSD(inv.amount)}</div>
              <div className="flex items-center gap-1">
                <button className="grid h-8 w-8 place-items-center rounded-lg text-mute hover:bg-bone hover:text-slate" title="Download"><Download className="h-4 w-4" /></button>
                {(inv.status === "due" || inv.status === "overdue") && (
                  <button className="rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white hover:bg-graphite">Remind</button>
                )}
                {inv.status === "draft" && (
                  <button className="rounded-lg bg-blade-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blade-700">Send</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function PaymentMethods() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-ink">Methods on file</h3>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate"><span className="h-4 w-7 rounded bg-[#635bff]" /> via Stripe</span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-blade-500/40 bg-blade-tint/50 p-4">
            <CreditCard className="h-6 w-6 text-blade-700" />
            <div className="flex-1"><div className="font-semibold text-ink">Visa ending 4242</div><div className="text-xs text-mute">Expires 08/27 · default</div></div>
            <span className="rounded-full bg-emerald/12 px-2.5 py-1 text-xs font-semibold text-emerald">Default</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-line p-4">
            <Landmark className="h-6 w-6 text-slate" />
            <div className="flex-1"><div className="font-semibold text-ink">Chase ••6789</div><div className="text-xs text-mute">ACH direct debit</div></div>
            <button className="text-xs font-semibold text-blade-700">Make default</button>
          </div>
        </div>
        <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line-2 py-3 text-sm font-semibold text-slate hover:border-blade-400 hover:text-blade-700">
          <Plus className="h-4 w-4" /> Add card or bank account
        </button>
      </Card>

      <Card className="p-6">
        <h3 className="mb-1 font-display text-lg font-semibold text-ink">How clients connect</h3>
        <p className="mb-4 text-sm text-slate">Every invite includes a secure Stripe link. Clients add a card or bank in seconds — you never touch raw card data.</p>
        <ul className="flex flex-col gap-3 text-sm">
          {[["Credit card", "Visa, Mastercard, Amex — instant"], ["Bank / ACH", "Lower fees, great for larger volume"], ["Auto-charge", "We charge the default method each cycle"]].map(([t, d]) => (
            <li key={t} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blade-600" /><span><span className="font-semibold text-ink">{t}</span> — <span className="text-slate">{d}</span></span></li>
          ))}
        </ul>
        <div className="mt-5 flex items-center gap-2 rounded-xl bg-bone px-3.5 py-3 text-xs text-slate"><CheckCircle2 className="h-4 w-4 text-emerald" /> PCI-compliant · cards tokenized by Stripe, never stored by GoStaffer.</div>
      </Card>
    </div>
  );
}

function AutoBill() {
  const autoClients = CLIENTS.filter((c) => c.status === "active");
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
      <Card className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold text-ink">Auto-bill settings</h3>
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-blade-500/40 bg-blade-tint/50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-blade-700">Cycle</div>
            <div className="mt-1 font-display text-xl font-bold text-ink">Every 2 weeks</div>
            <div className="mt-1 text-sm text-slate">Bill accrued minutes + any one-offs. Next run <span className="font-semibold text-ink">Jul 6</span>.</div>
          </div>
          <label className="flex items-center justify-between rounded-xl border border-line p-4 text-sm">
            <span className="text-ink">Charge default method automatically</span>
            <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-blade-600"><span className="absolute right-0.5 h-5 w-5 rounded-full bg-white" /></span>
          </label>
          <label className="flex items-center justify-between rounded-xl border border-line p-4 text-sm">
            <span className="text-ink">Email receipt on each charge</span>
            <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-blade-600"><span className="absolute right-0.5 h-5 w-5 rounded-full bg-white" /></span>
          </label>
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="mb-4 font-display text-lg font-semibold text-ink">On the next run</h3>
        <div className="divide-y divide-line">
          {autoClients.map((c) => (
            <div key={c.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3"><Avatar initials={initialsOf(c.company)} grad={c.grad} size={30} /><div><div className="text-sm font-semibold text-ink">{c.company}</div><div className="text-xs text-mute">{Math.round(c.minutesPeriod / 60).toLocaleString()} hrs × ${(c.perMin * 60).toFixed(0)}/hr</div></div></div>
              <div className="font-semibold text-ink tnum">{fmtUSD((c.minutesPeriod / 2) * c.perMin)}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ---------- wallet (per client — the admin doesn't have one wallet) ---------- */
function WalletPanel() {
  const seatTotal = DIALER_SEATS.reduce((s, d) => s + d.qty * d.pricePer, 0);
  const total = Object.values(CLIENT_WALLETS).reduce((s, w) => s + w.balance, 0);
  const lowCount = Object.values(CLIENT_WALLETS).filter((w) => w.balance < WALLET.threshold).length;
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.5fr]">
        {/* aggregate */}
        <Card className="relative overflow-hidden p-6">
          <div className="orb orb-cyan absolute -right-10 -top-10 h-40 w-40 opacity-20" aria-hidden />
          <div className="relative">
            <div className="flex items-center gap-2 text-sm font-medium text-slate"><WalletIcon className="h-4 w-4 text-blade-700" /> Client credits on file</div>
            <div className="mt-2 font-display text-4xl font-bold tracking-tight text-ink tnum">{fmtUSD(total)}</div>
            <div className="mt-1 text-sm text-slate">Across {Object.keys(CLIENT_WALLETS).length} client wallets. <span className="font-medium text-ink">Each bi-weekly invoice auto-pays from that client&apos;s wallet.</span></div>
            {lowCount > 0 && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-spark/12 px-3.5 py-2.5 text-sm font-medium text-[#b06a00]"><RefreshCw className="h-4 w-4" /> {lowCount} wallet{lowCount > 1 ? "s" : ""} below reload threshold.</div>
            )}
          </div>
        </Card>

        {/* per-client wallets */}
        <Card className="overflow-hidden">
          <div className="px-5 py-3.5 text-sm font-semibold text-ink">Wallets by client</div>
          <div className="divide-y divide-line border-t border-line">
            {Object.entries(CLIENT_WALLETS).map(([id, w]) => {
              const c = clientById(id);
              const low = w.balance < WALLET.threshold;
              return (
                <div key={id} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {c && <Avatar initials={initialsOf(c.company)} grad={c.grad} size={30} />}
                    <div>
                      <div className="text-sm font-semibold text-ink">{c?.company ?? id}</div>
                      <div className="text-xs text-mute">{w.autoReload ? "Auto-reload on" : "Auto-reload off"}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn("font-semibold tnum", low ? "text-[#b06a00]" : "text-ink")}>{fmtUSD(w.balance)}</span>
                    {low ? <Pill tone="amber" dot>Low</Pill> : <Pill tone="green" dot>Funded</Pill>}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* dialer seats */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <div><h3 className="font-display text-lg font-semibold text-ink">Dialer seats</h3><p className="text-sm text-slate">{fmtUSD(seatTotal)} / period · drawn from wallet</p></div>
          <button className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-ink px-3.5 text-sm font-semibold text-white hover:bg-graphite"><Plus className="h-4 w-4" /> Buy seats</button>
        </div>
        <div className="divide-y divide-line border-t border-line">
          {DIALER_SEATS.map((d) => {
            const c = clientById(d.clientId);
            return (
              <div key={d.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  {c && <Avatar initials={initialsOf(c.company)} grad={c.grad} size={30} />}
                  <div><div className="text-sm font-semibold text-ink">{d.campaign}</div><div className="text-xs text-mute">{c?.company} · {d.periodStart}–{d.periodEnd}</div></div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate">{d.qty} × {fmtUSD(d.pricePer)}</span>
                  <span className="font-semibold text-ink tnum">{fmtUSD(d.qty * d.pricePer)}</span>
                  <Pill tone={d.status === "Active" ? "green" : "amber"} dot>{d.status}</Pill>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

/* ---------- ledger ---------- */
function Ledger() {
  return (
    <Card className="overflow-hidden">
      <div className="hidden grid-cols-[1fr_1.6fr_0.8fr_0.9fr] gap-4 border-b border-line bg-bone/60 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-mute sm:grid">
        <span>Date · category</span><span>Description</span><span className="text-right">Amount</span><span className="text-right">Balance</span>
      </div>
      <div className="divide-y divide-line">
        {LEDGER.map((e) => (
          <div key={e.id} className="grid grid-cols-1 items-center gap-2 px-5 py-3.5 sm:grid-cols-[1fr_1.6fr_0.8fr_0.9fr] sm:gap-4">
            <div className="flex items-center gap-2.5">
              <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full", e.type === "credit" ? "bg-emerald/12 text-emerald" : "bg-cloud text-slate")}>
                {e.type === "credit" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
              </span>
              <div><div className="text-sm font-medium text-ink">{e.category}</div><div className="text-xs text-mute">{e.date}</div></div>
            </div>
            <div className="text-sm text-slate">{e.description}</div>
            <div className={cn("text-right font-semibold tnum", e.type === "credit" ? "text-emerald" : "text-ink")}>{e.type === "credit" ? "+" : ""}{fmtUSD(e.amount)}</div>
            <div className="text-right text-sm text-slate tnum">{fmtUSD(e.balanceAfter)}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------- create invoice modal ---------- */
type Line = { id: number; desc: string; qty: string; rate: string };
function CreateInvoice({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState<"one-off" | "auto">("one-off");
  const [client, setClient] = useState(CLIENTS[0].id);
  const [lines, setLines] = useState<Line[]>([{ id: 1, desc: "Agent hours — Jun 15–28", qty: "688", rate: "12.00" }]);
  const [sent, setSent] = useState(false);

  const total = useMemo(() => lines.reduce((s, l) => s + (parseFloat(l.qty) || 0) * (parseFloat(l.rate) || 0), 0), [lines]);
  const addLine = () => setLines((l) => [...l, { id: Date.now(), desc: "", qty: "1", rate: "0" }]);
  const upd = (id: number, patch: Partial<Line>) => setLines((l) => l.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const del = (id: number) => setLines((l) => l.filter((x) => x.id !== id));

  return (
    <motion.div className="fixed inset-0 z-50 flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ x: 60 }} animate={{ x: 0 }} exit={{ x: 60 }} transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="relative flex h-full w-full max-w-lg flex-col bg-paper shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h3 className="font-display text-lg font-semibold text-ink">{sent ? "Invoice sent" : "New invoice"}</h3>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-slate hover:bg-bone"><X className="h-5 w-5" /></button>
        </div>

        {sent ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full text-white" style={{ background: "var(--grad-aurora)" }}><CheckCircle2 className="h-8 w-8" /></span>
            <div><div className="font-display text-xl font-bold text-ink">{fmtUSD(total)} invoice sent</div><p className="mt-1 text-sm text-slate">{clientById(client)?.company} was emailed a Stripe payment link.</p></div>
            <button onClick={onClose} className="btn-electric mt-2 inline-flex h-11 items-center rounded-xl px-6 text-sm font-semibold text-white">Done</button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-1.5 block text-sm font-semibold text-ink">Client</span>
                  <select value={client} onChange={(e) => setClient(e.target.value)} className="h-11 w-full rounded-xl border border-line-2 bg-paper px-3 text-sm text-ink focus:border-blade-500 focus:outline-none">
                    {CLIENTS.map((c) => <option key={c.id} value={c.id}>{c.company}</option>)}
                  </select>
                </label>
                <label className="block"><span className="mb-1.5 block text-sm font-semibold text-ink">Type</span>
                  <div className="grid grid-cols-2 gap-2">
                    {(["one-off", "auto"] as const).map((t) => (
                      <button key={t} onClick={() => setType(t)} className={cn("h-11 rounded-xl border text-sm font-semibold", type === t ? "border-blade-500 bg-blade-tint text-blade-700" : "border-line-2 text-slate")}>
                        {t === "one-off" ? "One-off" : "Recurring"}
                      </button>
                    ))}
                  </div>
                </label>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between"><span className="text-sm font-semibold text-ink">Line items</span><button onClick={addLine} className="inline-flex items-center gap-1 text-sm font-semibold text-blade-700"><Plus className="h-4 w-4" /> Add</button></div>
                <div className="flex flex-col gap-2">
                  {lines.map((l) => (
                    <div key={l.id} className="grid grid-cols-[1fr_4.5rem_4.5rem_auto] items-center gap-2">
                      <input value={l.desc} onChange={(e) => upd(l.id, { desc: e.target.value })} placeholder="Description" className="h-10 rounded-lg border border-line-2 bg-paper px-3 text-sm focus:border-blade-500 focus:outline-none" />
                      <input value={l.qty} onChange={(e) => upd(l.id, { qty: e.target.value })} placeholder="Qty" className="h-10 rounded-lg border border-line-2 bg-paper px-2 text-center text-sm focus:border-blade-500 focus:outline-none" />
                      <input value={l.rate} onChange={(e) => upd(l.id, { rate: e.target.value })} placeholder="Rate" className="h-10 rounded-lg border border-line-2 bg-paper px-2 text-center text-sm focus:border-blade-500 focus:outline-none" />
                      <button onClick={() => del(l.id)} className="grid h-10 w-9 place-items-center rounded-lg text-mute hover:bg-bone hover:text-[#dc2626]"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
                <div className="mono mt-2 grid grid-cols-[1fr_4.5rem_4.5rem_auto] gap-2 px-1 text-[0.6rem] uppercase tracking-wide text-mute">
                  <span>Item</span><span className="text-center">Qty</span><span className="text-center">$/unit</span><span />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl bg-bone p-4">
                <span className="text-sm font-semibold text-slate">Total {type === "auto" ? "/ cycle" : "due"}</span>
                <span className="font-display text-2xl font-bold text-ink tnum">{fmtUSD(total)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-line p-5">
              <button onClick={onClose} className="h-11 flex-1 rounded-xl border border-line-2 text-sm font-semibold text-ink hover:bg-bone">Save draft</button>
              <button onClick={() => setSent(true)} className="btn-electric inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white"><Send className="h-4 w-4" /> Send invoice</button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
