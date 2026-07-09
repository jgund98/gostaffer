import {
  PhoneIncoming,
  Headphones,
  Wrench,
  TrendingUp,
  Heart,
  Filter,
  Database,
  HeartPulse,
  ShieldCheck,
  Landmark,
  Plane,
  ShoppingCart,
  Building2,
  type LucideIcon,
  Clock,
  Languages,
  Gauge,
  Users2,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  FileText,
  Repeat,
  Target,
  Sun,
  Cpu,
  Car,
  Scale,
  GraduationCap,
  Truck,
} from "lucide-react";

export type Stat = { value: number; suffix?: string; prefix?: string; label: string };
export type Feat = { Icon: LucideIcon; title: string; body: string };

export type ServiceContent = {
  slug: string;
  kind: "Service" | "Solution";
  Icon: LucideIcon;
  eyebrow: string;
  title: string;
  highlight: string;
  lead: string;
  intro: string;
  features: Feat[];
  outcomes: string[];
  stats: Stat[];
};

export type IndustryContent = {
  slug: string;
  Icon: LucideIcon;
  eyebrow: string;
  title: string;
  highlight: string;
  lead: string;
  challenges: Feat[];
  plays: string[];
  stats: Stat[];
};

const COMMON_STATS: Stat[] = [
  { value: 24, suffix: "h", label: "To get started" },
  { value: 98, suffix: "%", label: "Clear, fluent English" },
  { value: 60, suffix: "%", label: "Cheaper than hiring at home" },
  { value: 150, suffix: "+", label: "Agents ready to work" },
];

export const SERVICES: Record<string, ServiceContent> = {
  inbound: {
    slug: "inbound",
    kind: "Service",
    Icon: PhoneIncoming,
    eyebrow: "Inbound",
    title: "Never miss another ",
    highlight: "customer call",
    lead: "Overflow, after-hours, or your full front desk — friendly agents who pick up fast and sound just like your best employee.",
    intro:
      "Every missed call is money walking out the door. Our team answers quickly, solves the problem on the first call, and passes along anything they can't — so your customers always feel taken care of.",
    features: [
      { Icon: Clock, title: "Answered around the clock", body: "Day, night, weekends, holidays — your customers reach a real person instead of voicemail." },
      { Icon: CheckCircle2, title: "Solved on the first call", body: "Agents know your business well enough to actually fix the issue, not just take a message." },
      { Icon: Languages, title: "Fluent in English & Arabic", body: "Clear, neutral-accent agents your customers understand and trust." },
      { Icon: Gauge, title: "Every call checked for quality", body: "We listen, score, and coach so the experience stays consistently great." },
    ],
    outcomes: ["More calls answered", "Fewer hang-ups", "A consistent, on-brand experience", "Lower cost than in-house staff"],
    stats: COMMON_STATS,
  },
  support: {
    slug: "support",
    kind: "Service",
    Icon: Headphones,
    eyebrow: "Support",
    title: "Customer care that ",
    highlight: "keeps people loyal",
    lead: "Patient, friendly help across phone, chat, and email — so small problems never turn into lost customers.",
    intro:
      "Great support is one of the cheapest ways to keep customers. Our agents calm tense moments, solve issues fast, and leave people feeling heard — every single time.",
    features: [
      { Icon: Heart, title: "Genuinely helpful people", body: "Trained to stay calm, build trust, and turn frustrated callers into loyal fans." },
      { Icon: Sparkles, title: "Fast, accurate answers", body: "Agents get the right answer in front of them instantly, so customers aren't left waiting." },
      { Icon: Repeat, title: "Phone, chat, and email", body: "One trained team covering every way your customers reach out." },
      { Icon: Gauge, title: "Measured by happy customers", body: "We optimize for your satisfaction scores, not just how fast we can hang up." },
    ],
    outcomes: ["Happier customers", "Faster resolutions", "Fewer cancellations", "Help available 24/7"],
    stats: COMMON_STATS,
  },
  "product-support": {
    slug: "product-support",
    kind: "Service",
    Icon: Wrench,
    eyebrow: "Product Support",
    title: "Technical help that ",
    highlight: "earns trust",
    lead: "Agents who actually understand your product — so they can troubleshoot, guide, and only escalate when they truly need to.",
    intro:
      "Technical questions need people who get it. We train our agents deep on your product and give them the right tools, so customers get real answers and your engineers stay focused on building.",
    features: [
      { Icon: Wrench, title: "Trained deep on your product", body: "Agents learn your product inside-out before they ever take a live call." },
      { Icon: FileText, title: "Clean hand-offs to your team", body: "When something needs your engineers, they get the full story — no back-and-forth." },
      { Icon: Sparkles, title: "Answers at their fingertips", body: "The right troubleshooting steps surface instantly, so issues get solved faster." },
      { Icon: Gauge, title: "Full visibility for you", body: "Every issue and resolution is logged and visible in your dashboard." },
    ],
    outcomes: ["Faster fixes", "Fewer interruptions for your engineers", "Happier, more loyal users", "Lower support costs"],
    stats: COMMON_STATS,
  },
};

export const SOLUTIONS: Record<string, ServiceContent> = {
  sales: {
    slug: "sales",
    kind: "Solution",
    Icon: TrendingUp,
    eyebrow: "Sales",
    title: "More booked meetings, ",
    highlight: "more closed deals",
    lead: "Experienced closers who call your leads, handle every objection, and fill your calendar — paid by the minute, not the salary.",
    intro:
      "This is what we do best. Skilled salespeople who sound like part of your team, coached live on every call, working your leads until they turn into real revenue.",
    features: [
      { Icon: Target, title: "Closers who know how to sell", body: "Practiced against real scenarios until they beat your targets — before they touch a live lead." },
      { Icon: Sparkles, title: "Coached on every call", body: "The right thing to say surfaces live, in the moment, so good reps become great ones." },
      { Icon: PhoneCall, title: "Handles every objection", body: "They adapt to whatever a prospect throws at them — no rigid, robotic script." },
      { Icon: Users2, title: "One person owns your results", body: "A dedicated team lead accountable to your numbers, not a faceless call center." },
    ],
    outcomes: ["More booked meetings", "A higher close rate", "Lower cost per customer", "A faster-growing pipeline"],
    stats: COMMON_STATS,
  },
  "customer-service": {
    slug: "customer-service",
    kind: "Solution",
    Icon: Heart,
    eyebrow: "Customer Service",
    title: "Service that turns customers into ",
    highlight: "regulars",
    lead: "Every interaction handled with care — fast, friendly, and consistent across phone, chat, and email.",
    intro:
      "Good service is what keeps people coming back and telling their friends. Our team delivers it every time, so you keep more customers without lifting a finger.",
    features: [
      { Icon: Heart, title: "Relationships, not transactions", body: "Agents trained to build rapport, not just close out a ticket." },
      { Icon: Repeat, title: "Phone, chat, and email", body: "One friendly team covering every channel your customers use." },
      { Icon: Sparkles, title: "Quick, confident answers", body: "Instant access to the right information keeps conversations smooth." },
      { Icon: Gauge, title: "Focused on keeping customers", body: "We tune everything to your satisfaction and retention numbers." },
    ],
    outcomes: ["More repeat customers", "Higher satisfaction scores", "More word-of-mouth referrals", "A lower cost to serve"],
    stats: COMMON_STATS,
  },
  "lead-generation": {
    slug: "lead-generation",
    kind: "Solution",
    Icon: Filter,
    eyebrow: "Lead Generation",
    title: "Real conversations with ",
    highlight: "ready-to-buy prospects",
    lead: "We reach out to the right people and hand your sales team meetings worth taking — not a list of half-interested names.",
    intro:
      "Volume alone doesn't grow a business. We call the right prospects, ask the right questions, and only pass along the ones genuinely ready to talk — so your closers spend time selling, not chasing.",
    features: [
      { Icon: Target, title: "We call the right people", body: "We focus your outreach on the prospects who actually look like your best customers." },
      { Icon: Filter, title: "Qualified before they reach you", body: "We confirm budget, need, and timing so only real opportunities land on your calendar." },
      { Icon: PhoneCall, title: "Persistent, friendly follow-up", body: "We keep reaching out across calls and callbacks so no good lead slips away." },
      { Icon: Gauge, title: "See exactly what's working", body: "Every lead and call is visible to you in real time." },
    ],
    outcomes: ["More qualified meetings", "Better-quality leads", "More selling, less chasing", "A predictable pipeline"],
    stats: COMMON_STATS,
  },
  "data-processing": {
    slug: "data-processing",
    kind: "Solution",
    Icon: Database,
    eyebrow: "Data Processing",
    title: "Clean, accurate data — ",
    highlight: "handled for you",
    lead: "Data entry, updates, and document work done quickly and correctly, so the rest of your business runs on records you can trust.",
    intro:
      "Messy data quietly costs you sales and hours every week. Our team keeps your records clean, complete, and up to date — accurately, at volume, with a real person checking the work.",
    features: [
      { Icon: Database, title: "Accurate data entry", body: "High-volume entry and updates done right, against your existing systems." },
      { Icon: CheckCircle2, title: "Records you can trust", body: "We clean up duplicates and fill in the gaps so your data is always reliable." },
      { Icon: FileText, title: "Document handling", body: "Pulling information from forms and documents — checked by a human, not just a machine." },
      { Icon: Gauge, title: "Quality you can count on", body: "Accuracy is measured and reported — no silent mistakes piling up." },
    ],
    outcomes: ["Cleaner, more reliable records", "Faster turnaround", "Fewer costly errors", "Lower cost per record"],
    stats: COMMON_STATS,
  },
};

export const INDUSTRIES: Record<string, IndustryContent> = {
  healthcare: {
    slug: "healthcare",
    Icon: HeartPulse,
    eyebrow: "Healthcare",
    title: "Patient calls handled with ",
    highlight: "real care",
    lead: "Reminders, scheduling, and follow-ups managed by warm, professional agents who treat your patients the way you would.",
    challenges: [
      { Icon: Heart, title: "Patients need a human touch", body: "These calls require patience and empathy — not a recording reading a script." },
      { Icon: ShieldCheck, title: "Privacy matters", body: "Every call has to respect patient privacy and consent, every time." },
      { Icon: Clock, title: "No-shows cost you", body: "Empty appointment slots are lost revenue and gaps in care." },
    ],
    plays: ["Appointment reminders & confirmations", "New patient scheduling & intake", "Follow-up after visits", "Insurance & eligibility checks"],
    stats: COMMON_STATS,
  },
  insurance: {
    slug: "insurance",
    Icon: ShieldCheck,
    eyebrow: "Insurance",
    title: "Quote, sign, and ",
    highlight: "keep policyholders",
    lead: "Friendly, careful agents for qualifying leads, following up on policies, and winning renewals — accurately and by the book.",
    challenges: [
      { Icon: Filter, title: "Lead quality is all over the map", body: "Lots of leads, few good ones — qualifying them well is everything." },
      { Icon: ShieldCheck, title: "Every word has to be right", body: "Scripts and disclosures need to stay compliant on every call." },
      { Icon: Repeat, title: "Policies lapse without follow-up", body: "Renewals quietly slip away when no one reaches out in time." },
    ],
    plays: ["Qualifying & transferring leads", "Policy follow-up calls", "Renewal & retention", "Claims status updates"],
    stats: COMMON_STATS,
  },
  "debt-settlement": {
    slug: "debt-settlement",
    Icon: Landmark,
    eyebrow: "Debt Settlement",
    title: "Sensitive calls, ",
    highlight: "handled with care",
    lead: "Calm, respectful, by-the-book conversations for qualifying and enrolling clients — where trust and tone make all the difference.",
    challenges: [
      { Icon: Heart, title: "Emotions run high", body: "These calls take genuine patience and empathy to get right." },
      { Icon: ShieldCheck, title: "Strict rules apply", body: "Every conversation has to stay carefully within the rules." },
      { Icon: Target, title: "The right fit matters", body: "Enrolling the wrong person helps no one — qualifying carefully is key." },
    ],
    plays: ["Qualifying new clients", "Program enrollment", "Collecting documents", "Check-in & retention calls"],
    stats: COMMON_STATS,
  },
  travel: {
    slug: "travel",
    Icon: Plane,
    eyebrow: "Travel",
    title: "Bookings and support that ",
    highlight: "never close",
    lead: "Around-the-clock, multilingual agents for reservations, changes, and support — wherever your travelers are, whenever they call.",
    challenges: [
      { Icon: Clock, title: "Travel never sleeps", body: "Your customers need help at all hours and across time zones." },
      { Icon: Languages, title: "Many languages", body: "Travelers expect to be helped in a language they're comfortable in." },
      { Icon: Repeat, title: "Plans change constantly", body: "Itineraries shift all the time and need quick, calm handling." },
    ],
    plays: ["Reservations & upgrades", "Itinerary changes", "24/7 traveler support", "Loyalty & win-back calls"],
    stats: COMMON_STATS,
  },
  "e-commerce": {
    slug: "e-commerce",
    Icon: ShoppingCart,
    eyebrow: "E-commerce",
    title: "Turn browsers into buyers — and ",
    highlight: "buyers into regulars",
    lead: "Pre-sale chat, order help, and win-back calls that lift your sales and keep customers coming back.",
    challenges: [
      { Icon: Filter, title: "Carts get abandoned", body: "Most shoppers leave without buying unless someone nudges them at the right moment." },
      { Icon: Clock, title: "Support spikes hurt", body: "Sales and busy seasons overwhelm a small in-house team." },
      { Icon: Repeat, title: "One-time buyers don't return", body: "Without follow-up, most customers never come back on their own." },
    ],
    plays: ["Pre-sale chat & conversion", "Order & shipping help", "Abandoned-cart outreach", "Win-back & loyalty calls"],
    stats: COMMON_STATS,
  },
  "real-estate": {
    slug: "real-estate",
    Icon: Building2,
    eyebrow: "Real Estate",
    title: "Turn more leads into ",
    highlight: "showings and closings",
    lead: "Speed-to-lead callbacks, persistent follow-up, and tenant or owner support — so no inquiry goes cold and every lead gets a real conversation.",
    challenges: [
      { Icon: Clock, title: "Leads go cold in minutes", body: "The first agent to call usually wins — and most teams can't answer fast enough." },
      { Icon: Repeat, title: "Follow-up falls through the cracks", body: "Busy agents drop the long nurture sequences that actually convert." },
      { Icon: Filter, title: "After-hours inquiries get missed", body: "Buyers and renters reach out nights and weekends, when no one's at the desk." },
    ],
    plays: ["Speed-to-lead callbacks", "Showing & viewing scheduling", "Long-term lead nurturing", "Tenant & owner support lines"],
    stats: COMMON_STATS,
  },
  "home-services": {
    slug: "home-services",
    Icon: Wrench,
    eyebrow: "Home Services",
    title: "Book every job — and never miss ",
    highlight: "another call",
    lead: "Trained agents answer, qualify, and book HVAC, plumbing, roofing, and garage-door calls around the clock — so every lead turns into a scheduled job.",
    challenges: [
      { Icon: Clock, title: "Missed calls are missed jobs", body: "When the phone rings and no one answers, that customer just calls the next company." },
      { Icon: Repeat, title: "After-hours emergencies", body: "Breakdowns happen nights and weekends — when your office is closed." },
      { Icon: Target, title: "Techs can't answer & work", body: "Your crews are on the tools, not by the phone catching new business." },
    ],
    plays: ["Inbound booking & dispatch", "Emergency after-hours lines", "Estimate & quote follow-up", "Review & reactivation calls"],
    stats: COMMON_STATS,
  },
  "solar-energy": {
    slug: "solar-energy",
    Icon: Sun,
    eyebrow: "Solar & Energy",
    title: "Fill your calendar with ",
    highlight: "qualified appointments",
    lead: "High-volume outbound and speed-to-lead callbacks that qualify homeowners and book solar consultations your closers actually want to run.",
    challenges: [
      { Icon: Filter, title: "Most leads don't qualify", body: "Homeownership, roof, and credit filters matter — screening them by hand burns reps out." },
      { Icon: Clock, title: "Speed wins the deal", body: "Call a web lead in minutes and you book; call in hours and it's gone cold." },
      { Icon: Repeat, title: "No-shows kill the pipeline", body: "Booked consults fall apart without reminders and reconfirmation." },
    ],
    plays: ["Outbound lead qualification", "Speed-to-lead callbacks", "Consultation setting", "Appointment reminders & reconfirms"],
    stats: COMMON_STATS,
  },
  saas: {
    slug: "saas",
    Icon: Cpu,
    eyebrow: "SaaS & Technology",
    title: "Pipeline and support that ",
    highlight: "scale with you",
    lead: "Outbound SDR motions, trial activation, and tier-1 support — skilled agents who sound like part of your product team.",
    challenges: [
      { Icon: Filter, title: "SDR hiring is brutal", body: "Recruiting, ramping, and retaining reps is slow and expensive at every stage." },
      { Icon: Repeat, title: "Trials go cold", body: "Most free trials never activate without a human nudge at the right moment." },
      { Icon: Clock, title: "Support spikes after launches", body: "Tickets pile up the moment you ship — faster than a small team can clear them." },
    ],
    plays: ["Outbound SDR & demo setting", "Trial activation & onboarding", "Tier-1 support & live chat", "Renewal & expansion calls"],
    stats: COMMON_STATS,
  },
  automotive: {
    slug: "automotive",
    Icon: Car,
    eyebrow: "Automotive",
    title: "Keep the service drive and ",
    highlight: "showroom full",
    lead: "A dedicated BDC for sales follow-up, service scheduling, and reactivation — so no internet lead or service reminder ever slips through.",
    challenges: [
      { Icon: Clock, title: "Internet leads need instant calls", body: "Shoppers fill out forms on five dealers — the first to call usually wins the deal." },
      { Icon: Repeat, title: "Service reminders get skipped", body: "Overdue maintenance is revenue sitting in your DMS that no one is calling." },
      { Icon: Target, title: "BDCs are hard to staff", body: "An in-house business development center is costly to run and keep full." },
    ],
    plays: ["Internet lead follow-up", "Service scheduling & reminders", "Sold & unsold follow-up", "Recall & reactivation campaigns"],
    stats: COMMON_STATS,
  },
  legal: {
    slug: "legal",
    Icon: Scale,
    eyebrow: "Legal",
    title: "Turn every inquiry into a ",
    highlight: "qualified intake",
    lead: "Warm, careful intake specialists who answer 24/7, screen by your criteria, and sign retainers — so good cases never reach voicemail.",
    challenges: [
      { Icon: Clock, title: "Callers won't wait", body: "Someone who needs a lawyer calls the next firm the moment they hit voicemail." },
      { Icon: Filter, title: "Intake takes real skill", body: "Screening cases well means asking the right questions with empathy and precision." },
      { Icon: ShieldCheck, title: "Conflicts & confidentiality", body: "Every intake has to be handled accurately and discreetly, by the book." },
    ],
    plays: ["24/7 new-client intake", "Lead screening & qualification", "Retainer & e-sign follow-up", "Existing-client status lines"],
    stats: COMMON_STATS,
  },
  education: {
    slug: "education",
    Icon: GraduationCap,
    eyebrow: "Education",
    title: "Enroll more students and ",
    highlight: "keep them on track",
    lead: "Admissions outreach, enrollment follow-up, and retention check-ins for schools and online programs — patient, encouraging, and on-brand.",
    challenges: [
      { Icon: Repeat, title: "Inquiries fade fast", body: "Prospective students go quiet without consistent, encouraging follow-up." },
      { Icon: Clock, title: "Enrollment windows are tight", body: "Deadlines create surges your admissions team can't always staff for." },
      { Icon: Heart, title: "Retention needs a human", body: "At-risk students re-engage when a real person checks in early." },
    ],
    plays: ["Admissions & inquiry follow-up", "Enrollment & registration support", "Financial-aid & document chase", "Retention & re-engagement calls"],
    stats: COMMON_STATS,
  },
  logistics: {
    slug: "logistics",
    Icon: Truck,
    eyebrow: "Logistics & Transportation",
    title: "Keep freight moving and ",
    highlight: "customers informed",
    lead: "Carrier check-calls, dispatch support, and shipment status lines — skilled agents who keep your operation running around the clock.",
    challenges: [
      { Icon: Clock, title: "Freight never stops", body: "Loads move nights, weekends, and across time zones — and so do the calls." },
      { Icon: Repeat, title: "Check calls eat the day", body: "Tracking down drivers and updating status is endless manual work." },
      { Icon: Languages, title: "Drivers speak many languages", body: "Carriers and drivers expect to be helped in their own language." },
    ],
    plays: ["Carrier check-calls & tracking", "Dispatch & driver support", "Shipment status & ETA lines", "Detention & exception handling"],
    stats: COMMON_STATS,
  },
};

export const serviceSlugs = Object.keys(SERVICES);
export const solutionSlugs = Object.keys(SOLUTIONS);
export const industrySlugs = Object.keys(INDUSTRIES);
