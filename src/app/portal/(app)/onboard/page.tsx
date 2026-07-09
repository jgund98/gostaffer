"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Check, Building2, Headset, Wrench, CreditCard, Send,
  Phone, Mail, Upload, ShieldCheck, Smartphone, CheckCircle2, Sparkles, PartyPopper,
} from "lucide-react";
import { SERVICE_OPTIONS, INDUSTRY_OPTIONS, TOOL_OPTIONS, LANGUAGES, fmtUSD } from "@/lib/portal-data";
import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Contact", Icon: Building2 },
  { label: "Needs", Icon: Headset },
  { label: "Setup", Icon: Wrench },
  { label: "Billing", Icon: CreditCard },
  { label: "Invite", Icon: Send },
];

type Form = {
  company: string; contact: string; email: string; phone: string; role: string;
  services: string[]; industry: string; languages: string[]; minutes: string; agents: string; hours: string;
  goal: string; leadSource: string; tools: string[]; compliance: string[];
  perMin: string; cadence: "biweekly" | "monthly"; method: "card" | "ach"; sendLink: boolean;
};

const INIT: Form = {
  company: "", contact: "", email: "", phone: "", role: "",
  services: [], industry: "", languages: ["English"], minutes: "", agents: "", hours: "Business hours (ET)",
  goal: "", leadSource: "", tools: [], compliance: ["Call recording consent"],
  perMin: "0.20", cadence: "biweekly", method: "card", sendLink: true,
};

export default function Onboard() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [f, setF] = useState<Form>(INIT);
  const set = (patch: Partial<Form>) => setF((p) => ({ ...p, ...patch }));
  const toggle = (key: "services" | "languages" | "tools" | "compliance", v: string) =>
    setF((p) => ({ ...p, [key]: p[key].includes(v) ? p[key].filter((x) => x !== v) : [...p[key], v] }));

  const firstName = f.contact.trim().split(" ")[0] || "there";
  const estInvoice = useMemo(() => {
    const m = parseFloat(f.minutes.replace(/[^0-9.]/g, "")) || 0;
    const rate = parseFloat(f.perMin) || 0;
    return (m / 2) * rate; // biweekly ≈ half a month of minutes
  }, [f.minutes, f.perMin]);

  if (sent) return <SuccessScreen f={f} firstName={firstName} onAnother={() => { setF(INIT); setStep(0); setSent(false); }} />;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Onboard a client</h1>
        <p className="mt-1 text-sm text-slate">Two minutes to set them up — they finish on their own phone.</p>
      </div>

      <Stepper step={step} />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* form */}
        <div className="rounded-2xl border border-line bg-paper p-5 shadow-[var(--shadow-sm)] sm:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22 }}
            >
              {step === 0 && <StepContact f={f} set={set} />}
              {step === 1 && <StepNeeds f={f} set={set} toggle={toggle} />}
              {step === 2 && <StepSetup f={f} set={set} toggle={toggle} />}
              {step === 3 && <StepBilling f={f} set={set} estInvoice={estInvoice} />}
              {step === 4 && <StepReview f={f} estInvoice={estInvoice} />}
            </motion.div>
          </AnimatePresence>

          <div className="mt-7 flex items-center justify-between gap-3 border-t border-line pt-5">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex h-11 items-center gap-1.5 rounded-xl px-4 text-sm font-semibold text-slate transition-colors hover:bg-bone disabled:opacity-0"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="btn-electric inline-flex h-11 items-center gap-2 rounded-xl px-6 text-sm font-semibold text-white"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => setSent(true)}
                className="btn-electric inline-flex h-11 items-center gap-2 rounded-xl px-6 text-sm font-semibold text-white"
              >
                <Send className="h-4 w-4" /> Create account &amp; send invite
              </button>
            )}
          </div>
        </div>

        {/* live invite preview */}
        <InvitePreview f={f} firstName={firstName} />
      </div>
    </div>
  );
}

/* ---------- stepper ---------- */
function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center">
      {STEPS.map((s, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={s.label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full border-2 transition-colors",
                  done ? "border-blade-600 bg-blade-600 text-white" : active ? "border-blade-600 bg-blade-tint text-blade-700" : "border-line-2 bg-paper text-mute"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : <s.Icon className="h-4 w-4" />}
              </span>
              <span className={cn("hidden text-xs font-semibold sm:block", active || done ? "text-ink" : "text-mute")}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <div className={cn("mx-2 h-0.5 flex-1 rounded", done ? "bg-blade-500" : "bg-line-2")} />}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- field primitives ---------- */
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-mute">{hint}</span>}
    </label>
  );
}
const inputCls = "h-11 w-full rounded-xl border border-line-2 bg-paper px-3.5 text-sm text-ink placeholder:text-mute focus:border-blade-500 focus:outline-none";

function Chips({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = selected.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
              on ? "border-blade-500 bg-blade-tint text-blade-700" : "border-line-2 text-slate hover:border-blade-400"
            )}
          >
            {on && <Check className="h-3.5 w-3.5" />} {o}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- steps ---------- */
function StepHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-1 text-sm text-slate">{sub}</p>
    </div>
  );
}

function StepContact({ f, set }: { f: Form; set: (p: Partial<Form>) => void }) {
  return (
    <div>
      <StepHead title="Who are we setting up?" sub="The basics — and the mobile number we'll text the setup link to." />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company"><input className={inputCls} placeholder="Acme Corp" value={f.company} onChange={(e) => set({ company: e.target.value })} /></Field>
        <Field label="Primary contact"><input className={inputCls} placeholder="David Reyes" value={f.contact} onChange={(e) => set({ contact: e.target.value })} /></Field>
        <Field label="Work email" hint="Where the set-a-password email goes.">
          <div className="relative"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" /><input className={cn(inputCls, "pl-10")} placeholder="david@acme.com" value={f.email} onChange={(e) => set({ email: e.target.value })} /></div>
        </Field>
        <Field label="Mobile number" hint="We'll text a secure setup link here — they finish on their phone.">
          <div className="relative"><Smartphone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" /><input className={cn(inputCls, "pl-10")} placeholder="+1 (305) 555-0142" value={f.phone} onChange={(e) => set({ phone: e.target.value })} /></div>
        </Field>
        <Field label="Role / title (optional)"><input className={inputCls} placeholder="VP of Sales" value={f.role} onChange={(e) => set({ role: e.target.value })} /></Field>
      </div>
    </div>
  );
}

function StepNeeds({ f, set, toggle }: { f: Form; set: (p: Partial<Form>) => void; toggle: (k: "services" | "languages" | "tools" | "compliance", v: string) => void }) {
  return (
    <div>
      <StepHead title="What do they need a team for?" sub="Pick the services and shape the team." />
      <div className="flex flex-col gap-5">
        <Field label="Services"><Chips options={SERVICE_OPTIONS} selected={f.services} onToggle={(v) => toggle("services", v)} /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Industry">
            <select className={inputCls} value={f.industry} onChange={(e) => set({ industry: e.target.value })}>
              <option value="">Select…</option>
              {INDUSTRY_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Coverage hours">
            <select className={inputCls} value={f.hours} onChange={(e) => set({ hours: e.target.value })}>
              {["Business hours (ET)", "Business hours (PT)", "Extended 8am–9pm", "24/7 coverage"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Est. monthly minutes" hint="Drives the team size & quote."><input className={inputCls} placeholder="40,000" value={f.minutes} onChange={(e) => set({ minutes: e.target.value })} /></Field>
          <Field label="Agents to start"><input className={inputCls} placeholder="6" value={f.agents} onChange={(e) => set({ agents: e.target.value })} /></Field>
        </div>
        <Field label="Languages"><Chips options={LANGUAGES} selected={f.languages} onToggle={(v) => toggle("languages", v)} /></Field>
      </div>
    </div>
  );
}

function StepSetup({ f, set, toggle }: { f: Form; set: (p: Partial<Form>) => void; toggle: (k: "services" | "languages" | "tools" | "compliance", v: string) => void }) {
  const COMPLIANCE = ["Call recording consent", "DNC / DNC scrubbing", "TCPA", "HIPAA", "PCI"];
  return (
    <div>
      <StepHead title="Campaign & tooling" sub="What we're calling about and where it all connects." />
      <div className="flex flex-col gap-5">
        <Field label="What are we calling about?" hint="The offer, the goal, who they're reaching.">
          <textarea rows={3} className={cn(inputCls, "h-auto py-3")} placeholder="Booking demos for our SaaS with inbound trial sign-ups…" value={f.goal} onChange={(e) => set({ goal: e.target.value })} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Lead source / lists"><input className={inputCls} placeholder="HubSpot trial sign-ups" value={f.leadSource} onChange={(e) => set({ leadSource: e.target.value })} /></Field>
          <Field label="Upload scripts / lists" hint="Optional now — they can add later.">
            <div className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-dashed border-line-2 px-3.5 text-sm text-mute hover:border-blade-400 hover:text-slate">
              <Upload className="h-4 w-4" /> Drop files or browse
            </div>
          </Field>
        </div>
        <Field label="Tools to connect"><Chips options={TOOL_OPTIONS} selected={f.tools} onToggle={(v) => toggle("tools", v)} /></Field>
        <Field label="Compliance"><Chips options={COMPLIANCE} selected={f.compliance} onToggle={(v) => toggle("compliance", v)} /></Field>
      </div>
    </div>
  );
}

function StepBilling({ f, set, estInvoice }: { f: Form; set: (p: Partial<Form>) => void; estInvoice: number }) {
  return (
    <div>
      <StepHead title="Plan & billing" sub="Set the rate and how they'll pay. They connect payment when they accept." />
      <div className="flex flex-col gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Per-minute rate" hint="All-in — agents, AI assist, QA, dashboard.">
            <div className="relative"><span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-mute">$</span><input className={cn(inputCls, "pl-7")} value={f.perMin} onChange={(e) => set({ perMin: e.target.value })} /></div>
          </Field>
          <Field label="Estimated first invoice" hint="Based on ~half a month of minutes.">
            <div className="flex h-11 items-center rounded-xl bg-bone px-3.5 font-display text-lg font-bold text-ink">{fmtUSD(estInvoice)}</div>
          </Field>
        </div>

        <Field label="Auto-bill cadence">
          <div className="grid gap-3 sm:grid-cols-2">
            {([["biweekly", "Every 2 weeks", "Recommended — bill on usage, twice a month"], ["monthly", "Monthly", "One invoice per calendar month"]] as const).map(([val, t, d]) => (
              <button key={val} type="button" onClick={() => set({ cadence: val })}
                className={cn("rounded-xl border p-4 text-left transition-colors", f.cadence === val ? "border-blade-500 bg-blade-tint" : "border-line-2 hover:border-blade-400")}>
                <div className="flex items-center justify-between"><span className="font-semibold text-ink">{t}</span>{f.cadence === val && <CheckCircle2 className="h-4 w-4 text-blade-600" />}</div>
                <div className="mt-1 text-xs text-slate">{d}</div>
              </button>
            ))}
          </div>
        </Field>

        <Field label="Payment method they'll connect">
          <div className="grid gap-3 sm:grid-cols-2">
            {([["card", "Credit card", "Visa, Mastercard, Amex"], ["ach", "Bank / ACH", "Direct debit, lower fees"]] as const).map(([val, t, d]) => (
              <button key={val} type="button" onClick={() => set({ method: val })}
                className={cn("rounded-xl border p-4 text-left transition-colors", f.method === val ? "border-blade-500 bg-blade-tint" : "border-line-2 hover:border-blade-400")}>
                <div className="flex items-center justify-between"><span className="font-semibold text-ink">{t}</span>{f.method === val && <CheckCircle2 className="h-4 w-4 text-blade-600" />}</div>
                <div className="mt-1 text-xs text-slate">{d}</div>
              </button>
            ))}
          </div>
        </Field>

        <label className="flex items-center gap-3 rounded-xl border border-line-2 bg-bone/50 p-4">
          <input type="checkbox" checked={f.sendLink} onChange={(e) => set({ sendLink: e.target.checked })} className="h-4 w-4 accent-blade-600" />
          <span className="flex items-center gap-2 text-sm text-ink"><ShieldCheck className="h-4 w-4 text-blade-600" /> Include a secure Stripe payment link in the invite</span>
        </label>
      </div>
    </div>
  );
}

function StepReview({ f, estInvoice }: { f: Form; estInvoice: number }) {
  const rows: [string, string][] = [
    ["Company", f.company || "—"],
    ["Contact", f.contact || "—"],
    ["Email", f.email || "—"],
    ["Mobile", f.phone || "—"],
    ["Services", f.services.join(", ") || "—"],
    ["Industry", f.industry || "—"],
    ["Languages", f.languages.join(", ") || "—"],
    ["Coverage", f.hours],
    ["Est. minutes / mo", f.minutes || "—"],
    ["Rate", `$${f.perMin}/min`],
    ["Auto-bill", f.cadence === "biweekly" ? "Every 2 weeks" : "Monthly"],
    ["First invoice ≈", fmtUSD(estInvoice)],
  ];
  return (
    <div>
      <StepHead title="Review & send" sub="One tap creates their account and fires off the invite." />
      <div className="overflow-hidden rounded-xl border border-line">
        {rows.map(([k, v], i) => (
          <div key={k} className={cn("flex items-center justify-between gap-4 px-4 py-2.5 text-sm", i % 2 ? "bg-bone/40" : "bg-paper")}>
            <span className="text-slate">{k}</span>
            <span className="text-right font-medium text-ink">{v}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-blade-tint p-4 text-sm text-blade-700">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
        On send, {f.contact || "your contact"} gets a text and email to set a password and finish onboarding — they can log in on the spot.
      </div>
    </div>
  );
}

/* ---------- live invite preview ---------- */
function InvitePreview({ f, firstName }: { f: Form; firstName: string }) {
  const link = "cblade.io/setup/" + (f.company.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 6) || "xxxxxx");
  return (
    <div className="lg:sticky lg:top-24">
      <div className="rounded-2xl border border-line bg-paper p-5 shadow-[var(--shadow-sm)]">
        <div className="mono mb-4 flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-blade-700">
          <Send className="h-3.5 w-3.5" /> What they receive
        </div>

        {/* SMS bubble */}
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-mute"><Phone className="h-3.5 w-3.5" /> Text message</div>
        <div className="rounded-2xl rounded-bl-md bg-[#e7f0fb] p-3.5 text-sm text-ink">
          Hi {firstName}, welcome to GoStaffer! 👋 Tap to set your password and finish setup: <span className="font-semibold text-blade-700">{link}</span>
        </div>

        {/* email card */}
        <div className="mb-2 mt-5 flex items-center gap-2 text-xs font-semibold text-mute"><Mail className="h-3.5 w-3.5" /> Email</div>
        <div className="overflow-hidden rounded-xl border border-line">
          <div className="border-b border-line bg-bone/60 px-3.5 py-2 text-xs text-slate"><span className="font-semibold text-ink">Set up your GoStaffer account</span></div>
          <div className="p-3.5 text-sm text-slate">
            <p>Welcome aboard{f.company ? `, ${f.company}` : ""}. Your team is being assembled.</p>
            <div className="my-3 inline-flex rounded-lg bg-blade-600 px-3.5 py-2 text-xs font-semibold text-white">Set my password →</div>
            <p className="text-xs text-mute">Then log in to watch your campaigns go live.</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald/8 px-3 py-2 text-xs font-medium text-emerald">
          <Smartphone className="h-3.5 w-3.5" /> Works on their phone — invite on the spot, they log in immediately.
        </div>
      </div>
    </div>
  );
}

/* ---------- success ---------- */
function SuccessScreen({ f, firstName, onAnother }: { f: Form; firstName: string; onAnother: () => void }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center py-10 text-center">
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="grid h-20 w-20 place-items-center rounded-full text-white" style={{ background: "var(--grad-aurora)" }}>
        <PartyPopper className="h-9 w-9" />
      </motion.div>
      <h1 className="mt-6 font-display text-2xl font-bold text-ink sm:text-3xl">{f.company || "Client"} is set up! 🎉</h1>
      <p className="mt-2 max-w-md text-slate">
        We just texted and emailed <span className="font-semibold text-ink">{firstName}</span> a secure link to set their
        password and finish onboarding. They can log in right now.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald/12 px-4 py-2 text-sm font-semibold text-emerald"><CheckCircle2 className="h-4 w-4" /> SMS sent to {f.phone || "their mobile"}</div>
        <div className="inline-flex items-center gap-2 rounded-full bg-blade-tint px-4 py-2 text-sm font-semibold text-blade-700"><Mail className="h-4 w-4" /> Email sent to {f.email || "their inbox"}</div>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button onClick={onAnother} className="btn-electric inline-flex h-11 items-center gap-2 rounded-xl px-6 text-sm font-semibold text-white">Onboard another</button>
        <Link href="/portal/clients" className="inline-flex h-11 items-center gap-2 rounded-xl border border-line-2 px-6 text-sm font-semibold text-ink hover:bg-bone">View all clients</Link>
      </div>
    </div>
  );
}
