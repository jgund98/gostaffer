"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X, Play, ShieldCheck, Headphones, Star, ArrowRight } from "lucide-react";

/* ============================================================
   LiveRep — "Hear a real rep, live" experience.

   Lets a visitor connect to an actual rep on the Cairo floor and
   hear the fluency/enthusiasm for themselves — the strongest answer
   to the #1 objection (accents). Two entry points (hero invite +
   persistent desktop launcher) share one panel. Business-hours
   aware, with a sample-call fallback when reps are off shift.

   NOTE: UI only for now — "Call me now" is a local confirmation
   stub and nothing is submitted anywhere. Avatars are initials
   placeholders; swap in real (consented) rep photos via `photo`.
   ============================================================ */

const OPEN_EVENT = "gostaffer:open-live-rep";

/** Open the LiveRep panel from anywhere (e.g. the hero invite). */
export function openLiveRep() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_EVENT));
}

type Rep = { name: string; initials: string; grad: string; role: string; photo?: string };

export const REPS: Rep[] = [
  // photo: drop real (consented) head-shots at these paths and they appear automatically;
  // until then the gradient initials show as a graceful fallback.
  { name: "Mariam H.", initials: "M", grad: "from-[#1f9e68] to-[#2fd39e]", role: "Senior Agent", photo: "/img/team/mariam.webp" },
  { name: "Youssef A.", initials: "Y", grad: "from-[#0ea5a5] to-[#1f9e68]", role: "Team Lead", photo: "/img/team/youssef.webp" },
];

/** Reps are on the floor Mon–Fri, 8am–6pm ET. */
export function repsOnline(): boolean {
  try {
    const et = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
    const day = et.getDay(); // 0 Sun … 6 Sat
    const hr = et.getHours();
    return day >= 1 && day <= 5 && hr >= 8 && hr < 18;
  } catch {
    return true;
  }
}

/** Live, self-updating business-hours flag for use in other components (e.g. the hero CTA). */
export function useRepsOnline(): boolean {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const tick = () => setOnline(repsOnline());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return online;
}

function Avatar({
  rep,
  size = 40,
  ring,
  ringCls,
}: {
  rep: Rep;
  size?: number;
  ring?: boolean;
  ringCls?: string;
}) {
  const [imgOk, setImgOk] = useState(true);
  const showPhoto = rep.photo && imgOk;
  return (
    <span
      className={
        "relative inline-grid place-items-center overflow-hidden rounded-full bg-gradient-to-br font-display font-bold text-white shadow-sm " +
        rep.grad +
        (ring ? " ring-2 ring-white/80" : "") +
        (ringCls ? " " + ringCls : "")
      }
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {showPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={rep.photo}
          alt={rep.name}
          onError={() => setImgOk(false)}
          className="h-full w-full rounded-full object-cover object-[center_22%]"
        />
      ) : (
        rep.initials
      )}
    </span>
  );
}

export function AvatarStack() {
  return (
    <span className="flex -space-x-2">
      {REPS.map((r) => (
        // a slight border drawn directly on the circle (centered, no off-axis outline)
        <Avatar key={r.name} rep={r} size={30} ringCls="ring-2 ring-white/45" />
      ))}
    </span>
  );
}

/** The hero invite — a distinctive, clickable "hear a rep live" pill. */
export function LiveRepInvite({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openLiveRep}
      className={
        "group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] py-2 pl-2 pr-4 text-left backdrop-blur-sm transition-colors hover:border-cyan/50 hover:bg-white/[0.1] " +
        className
      }
    >
      <AvatarStack />
      <span className="flex flex-col leading-tight">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
          </span>
          Hear a real rep — live
          <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </span>
        <span className="text-xs text-white/55">Talk to our Cairo floor right now</span>
      </span>
    </button>
  );
}

export function LiveRep() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const online = useRepsOnline();

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) setSent(false);
  }, [open]);

  const rep = REPS[0];

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Hear a real rep, live"
              data-lenis-prevent
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="relative max-h-[88vh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/10 bg-[#08281b] text-white shadow-2xl"
            >
              {/* glow header */}
              <div className="relative overflow-hidden px-6 pb-5 pt-6">
                <div className="mesh mesh-animated absolute inset-0 opacity-70" aria-hidden />
                <div className="orb orb-cyan absolute -right-10 -top-12 h-40 w-40" aria-hidden />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="relative flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                  <span className="relative flex h-2 w-2">
                    {online && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
                    )}
                    <span
                      className={
                        "relative inline-flex h-2 w-2 rounded-full " + (online ? "bg-emerald" : "bg-spark")
                      }
                    />
                  </span>
                  {online ? "Reps online now" : "Reps offline — sample available"}
                </div>

                <div className="relative mt-4 flex items-center gap-4">
                  <span className="relative">
                    <Avatar rep={rep} size={64} ring />
                    <span
                      className={
                        "absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full ring-2 ring-[#08281b] " +
                        (online ? "bg-emerald" : "bg-spark")
                      }
                    />
                  </span>
                  <div>
                    <div className="font-display text-xl font-bold">{rep.name}</div>
                    <div className="text-sm text-white/65">{rep.role} · Cairo, Egypt 🇪🇬</div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <Badge icon={<Headphones className="h-3 w-3" />}>Bilingual EN / AR</Badge>
                      <Badge icon={<Star className="h-3 w-3" />}>4.9 rated</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* body */}
              <div className="px-6 pb-6 pt-5">
                <h3 className="font-display text-lg font-semibold leading-snug">
                  Worried about accents? Don&apos;t take our word for it.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {online
                    ? "Drop your number and a rep will call you back shortly — no pitch, no obligation. Hear the clarity and energy for yourself."
                    : "Our reps are online Mon–Fri, 8am–6pm ET. Leave your number for the next rep on shift, or hear a 30-second sample call right now."}
                </p>

                {!online && (
                  <button
                    type="button"
                    className="mt-4 flex w-full items-center gap-3 rounded-xl border border-white/12 bg-white/[0.04] p-3 text-left transition-colors hover:bg-white/[0.08]"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cyan/20 text-cyan">
                      <Play className="h-4 w-4 fill-current" />
                    </span>
                    <span className="flex flex-1 flex-col">
                      <span className="text-sm font-semibold">Play a 30-second sample call</span>
                      <span className="mt-1 flex h-4 items-end gap-[2px]">
                        {SAMPLE_BARS.map((h, i) => (
                          <span key={i} className="w-[3px] rounded-full bg-cyan/50" style={{ height: `${h}%` }} />
                        ))}
                      </span>
                    </span>
                  </button>
                )}

                {sent ? (
                  <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald/30 bg-emerald/10 p-4">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-emerald" />
                    <p className="text-sm text-white/85">
                      {online
                        ? `Got it — ${rep.name.split(" ")[0]} will give you a call back shortly.`
                        : "Got it — the first rep on shift will call you. Talk soon!"}
                    </p>
                  </div>
                ) : (
                  <form
                    className="mt-5 flex flex-col gap-2.5 sm:flex-row"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Your phone number"
                      className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 text-sm text-white placeholder:text-white/40 focus:border-cyan focus:outline-none sm:flex-1"
                    />
                    <button
                      type="submit"
                      className="btn-electric inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold sm:w-auto"
                    >
                      <Phone className="h-4 w-4" />
                      {online ? "Call me now" : "Request a call"}
                    </button>
                  </form>
                )}

                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-white/45">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Real human · no bots · no obligation · we never share your number
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Badge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[0.68rem] font-medium text-white/80">
      {icon}
      {children}
    </span>
  );
}

const SAMPLE_BARS = [30, 55, 40, 70, 90, 60, 80, 45, 65, 85, 50, 72, 38, 60, 48, 78, 42, 58];
