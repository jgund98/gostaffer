import { CreditCard, Clock, Wallet as WalletIcon, Plus, RefreshCw } from "lucide-react";
import { PageHead, Card, SectionTitle, InvoiceBadge } from "@/components/portal/ui";
import { INVOICES, byClient, clientById, fmtUSD, WALLET } from "@/lib/portal-data";

export default function BillingPage() {
  const acme = clientById("acme");
  const minutes = acme?.minutesPeriod ?? 0;
  const rate = acme?.perMin ?? 0;
  const estimate = minutes * rate;
  const invoices = byClient(INVOICES, "acme");

  return (
    <div>
      <PageHead title="Billing &amp; wallet" sub="Your prepaid wallet, usage, payment method, and invoices." />

      {/* wallet */}
      <div className="mb-6 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <Card className="relative overflow-hidden p-6">
          <div className="orb orb-cyan absolute -right-10 -top-10 h-40 w-40 opacity-20" aria-hidden />
          <div className="relative">
            <div className="flex items-center gap-2 text-sm font-medium text-slate"><WalletIcon className="h-4 w-4 text-blade-700" /> Wallet balance</div>
            <div className="mt-2 font-display text-4xl font-bold tracking-tight text-ink tnum">{fmtUSD(WALLET.balance)}</div>
            <div className="mt-1 text-sm text-slate">Your bi-weekly invoice is paid automatically from your wallet — top up or let auto-reload handle it.</div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button className="btn-electric inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-white"><Plus className="h-4 w-4" /> Add funds</button>
              <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-line-2 px-4 text-sm font-semibold text-ink hover:bg-bone"><RefreshCw className="h-4 w-4" /> Auto-reload on</button>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <SectionTitle>Auto-reload</SectionTitle>
          <p className="-mt-2 text-sm text-slate">We top up automatically so dialing never pauses.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-line p-3"><div className="text-xs text-mute">When below</div><div className="mt-0.5 font-display text-lg font-bold text-ink tnum">{fmtUSD(WALLET.threshold)}</div></div>
            <div className="rounded-xl border border-line p-3"><div className="text-xs text-mute">Reload</div><div className="mt-0.5 font-display text-lg font-bold text-ink tnum">{fmtUSD(WALLET.amount)}</div></div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-bone px-3.5 py-2.5 text-sm text-slate"><CreditCard className="h-4 w-4 text-blade-700" /> Charges {WALLET.method}</div>
        </Card>
      </div>

      <div className="mb-6 grid gap-5 lg:grid-cols-2">
        {/* Payment method */}
        <Card className="p-6">
          <SectionTitle>Payment method</SectionTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-bone text-blade-700">
                <CreditCard className="h-5 w-5" />
              </span>
              <div>
                <div className="font-medium text-ink">Visa •••• 6411</div>
                <div className="text-xs text-mute">Expires 04 / 28</div>
              </div>
            </div>
            <button className="inline-flex h-9 items-center justify-center rounded-lg border border-line px-3 text-sm font-semibold text-slate transition-colors hover:bg-bone">
              Update
            </button>
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-lg bg-bone px-3 py-2.5 text-sm text-slate">
            <Clock className="h-4 w-4 shrink-0 text-blade-700" />
            Auto-bill on · billed every 2 weeks · next on Jul 6
          </div>
        </Card>

        {/* This period usage — billed by the hour (shown per-minute too) */}
        <Card className="p-6">
          <SectionTitle>This period</SectionTitle>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs font-medium text-mute">Hours billed</div>
              <div className="mt-1 font-display text-2xl font-bold text-ink tnum">{Math.round(minutes / 60).toLocaleString("en-US")}</div>
              <div className="text-xs text-mute">{minutes.toLocaleString("en-US")} min</div>
            </div>
            <div>
              <div className="text-xs font-medium text-mute">Rate</div>
              <div className="mt-1 font-display text-2xl font-bold text-ink tnum">{fmtUSD(rate * 60, 0)}<span className="text-sm font-semibold text-mute">/hr</span></div>
              <div className="text-xs text-mute">= {fmtUSD(rate, 2)}/min</div>
            </div>
            <div>
              <div className="text-xs font-medium text-mute">Estimated</div>
              <div className="mt-1 font-display text-2xl font-bold text-blade-700 tnum">{fmtUSD(estimate)}</div>
            </div>
          </div>
        </Card>
      </div>

      <SectionTitle>Invoices</SectionTitle>
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-4 border-b border-line bg-bone px-5 py-3 text-xs font-semibold uppercase tracking-wide text-mute">
          <span>Number</span>
          <span>Period</span>
          <span className="text-right">Amount</span>
          <span>Status</span>
          <span>Issued / Due</span>
          <span className="text-right">Action</span>
        </div>

        <div className="divide-y divide-line">
          {invoices.map((inv) => {
            const payable = inv.status === "due" || inv.status === "overdue";
            return (
              <div
                key={inv.id}
                className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-4 px-5 py-4"
              >
                <span className="font-medium text-ink tnum">{inv.number}</span>
                <span className="truncate text-sm text-slate">{inv.period}</span>
                <span className="text-right font-medium text-ink tnum">{fmtUSD(inv.amount)}</span>
                <span>
                  <InvoiceBadge status={inv.status} />
                </span>
                <span className="text-sm text-mute tnum">
                  {inv.issued} / {inv.due}
                </span>
                <div className="text-right">
                  <button
                    className={
                      payable
                        ? "btn-electric inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-semibold text-white"
                        : "inline-flex h-9 items-center justify-center rounded-lg border border-line px-3 text-sm font-semibold text-slate transition-colors hover:bg-bone"
                    }
                  >
                    {payable ? "Pay" : "View"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
