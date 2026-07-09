"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Mark } from "@/components/logo";

// Demo gate for the v2 preview. NOT real security (it's client-side) — swap for
// real auth before this holds anything sensitive.
const DEMO_EMAIL = "admin@gostaffer.com";
const DEMO_PASSWORD = "gostaffer2026";

const field =
  "w-full rounded-[10px] border border-line-2 bg-paper py-3 pl-11 pr-4 text-sm text-ink placeholder:text-mute transition-colors focus:border-blade-500 focus:outline-none";

export function PortalLogin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError("Incorrect email or password.");
      return;
    }
    setLoading(true);
    setTimeout(() => router.push("/portal/dashboard"), 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card rounded-3xl p-7 sm:p-9"
    >
      <div className="flex flex-col items-center text-center">
        <Mark className="h-12 w-12" />
        <h1 className="mt-5 font-display text-2xl font-bold text-ink">Command Center</h1>
        <p className="mt-1 text-sm text-slate">Sign in to your live campaign dashboard.</p>
      </div>

      <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required className={field} />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-mute" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className={field} />
        </div>

        {error && <p className="-mt-1 text-sm font-medium text-[#dc2626]">{error}</p>}

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-slate">
            <input type="checkbox" className="accent-blade-600" /> Remember me
          </label>
          <span className="font-medium text-blade-700">Forgot password?</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-blade-600 font-semibold text-white transition-colors hover:bg-blade-700 disabled:opacity-70"
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</>
          ) : (
            <>Sign in <ArrowRight className="h-4 w-4" /></>
          )}
        </button>
      </form>

      <p className="mt-5 text-center text-[11px] text-mute">
        Preview only — secure authentication lives in the GoStaffer Portal.
      </p>
    </motion.div>
  );
}
