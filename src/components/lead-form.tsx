"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-[10px] border border-line-2 bg-paper px-4 py-3 text-sm text-ink placeholder:text-mute transition-colors focus:border-blade-500 focus:outline-none";

export function LeadForm() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  // Records when the form became interactive; the API rejects near-instant
  // submits (bots). Set client-side only, so no SSR hydration mismatch.
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setState("sending");

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    (data as Record<string, unknown>).form_ts = mountedAt.current;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setState("done");
    } catch (err) {
      setState("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (state === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card flex w-full flex-col items-center gap-4 rounded-3xl p-10 text-center"
      >
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blade-tint text-blade-700">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="font-display text-2xl font-semibold text-ink">You&apos;re in the queue.</h3>
        <p className="max-w-sm text-sm text-slate">
          A GoStaffer strategist will reach out within one business day. Want to skip the wait? Grab a
          time on the calendar.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card w-full rounded-3xl p-6 sm:p-8">
      {/* honeypot — hidden from humans, bots fill it and get silently dropped */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="name" label="Full name" placeholder="Jordan Avery" required />
        <Input name="company" label="Company" placeholder="Acme Inc." required />
        <Input name="email" label="Work email" type="email" placeholder="you@company.com" required />
        <Input name="phone" label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-semibold text-slate">Monthly call volume</label>
        <select name="volume" className={field} defaultValue="">
          <option value="" disabled>Select a range</option>
          <option>Under 10,000 minutes</option>
          <option>10,000 – 50,000 minutes</option>
          <option>50,000 – 200,000 minutes</option>
          <option>200,000+ minutes</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-semibold text-slate">What do you want to accomplish?</label>
        <textarea
          name="message"
          rows={4}
          placeholder="We need to scale outbound sales and cut cost-per-acquisition…"
          className={cn(field, "resize-none")}
        />
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-blade-600 font-semibold text-white transition-colors hover:bg-blade-700 disabled:opacity-70"
      >
        {state === "sending" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
        ) : (
          <>Request my team <ArrowRight className="h-4 w-4" /></>
        )}
      </button>
      {error && (
        <p className="mt-3 text-center text-[13px] font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
      <p className="mt-3 text-center text-[11px] text-mute">No spam. We reply within one business day.</p>
    </form>
  );
}

function Input({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold text-slate">
        {label}
        {required && <span className="text-blade-600"> *</span>}
      </label>
      <input id={name} name={name} type={type} placeholder={placeholder} required={required} className={field} />
    </div>
  );
}
