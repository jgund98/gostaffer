/* ============================================================
   GoStaffer — site content & data (single source of truth)
   Existing copy/stats ported from gostaffer.com. New facts are
   marked TODO(owner).
   ============================================================ */

// TODO(owner): set GoStaffer's own booking link. Left inert ("#") for now so the
// "Book a call" CTAs do nothing rather than point anywhere off-brand.
export const CALENDAR_URL = "#";
export const PORTAL_URL = "https://portal.gostaffer.com";
export const CONTACT_EMAIL = "hello@gostaffer.com"; // TODO(owner): confirm

export const HQ_CITY = "West Palm Beach, FL";
export const HQ_LINE = "Headquartered in West Palm Beach, FL · Calling team in Cairo, Egypt";
export const OPS_CITY = "Cairo, Egypt";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
};

export const NAV: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Outbound Sales", href: "/services/outbound", desc: "Closers who book meetings." },
      { label: "Inbound & Support", href: "/services/inbound", desc: "Every call answered, on-brand." },
      { label: "Customer Service", href: "/solutions/customer-service", desc: "Service that keeps people loyal." },
      { label: "Lead Generation", href: "/solutions/lead-generation", desc: "Qualified, not just dialed." },
      { label: "Data & Back-Office", href: "/solutions/data-processing", desc: "Clean data, fast turnaround." },
      { label: "Product Support", href: "/services/product-support", desc: "Technical help that retains." },
      { label: "Technology & AI", href: "/technology", desc: "Custom builds & AI implementation." },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Home Services", href: "/industries/home-services", desc: "Book every job, day or night." },
      { label: "Healthcare", href: "/industries/healthcare", desc: "Patient outreach with empathy." },
      { label: "Solar & Energy", href: "/industries/solar-energy", desc: "Qualified appointments, on tap." },
      { label: "Insurance", href: "/industries/insurance", desc: "Quote, bind, and retain." },
      { label: "Real Estate", href: "/industries/real-estate", desc: "Turn leads into showings." },
      { label: "Automotive", href: "/industries/automotive", desc: "Keep the service drive full." },
      { label: "SaaS & Technology", href: "/industries/saas", desc: "Pipeline and support that scale." },
      { label: "Financial & Debt", href: "/industries/debt-settlement", desc: "Sensitive calls, handled with care." },
      { label: "Legal", href: "/industries/legal", desc: "Every inquiry, a qualified intake." },
      { label: "E-commerce", href: "/industries/e-commerce", desc: "Convert carts, keep customers." },
      { label: "Education", href: "/industries/education", desc: "Enroll and retain students." },
      { label: "Travel", href: "/industries/travel", desc: "Bookings and support, 24/7." },
      { label: "Logistics", href: "/industries/logistics", desc: "Keep freight moving." },
    ],
  },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Results", href: "/results" },
];

export const STATS = [
  { value: 500_000, suffix: "+", label: "Dials per month", prefix: "" },
  { value: 150, suffix: "+", label: "Staffers placed", prefix: "" },
  { value: 24, suffix: "h", label: "Time to kickoff", prefix: "" },
  { value: 10, suffix: "+", label: "Years in operation", prefix: "" },
  { value: 2.4, suffix: "M", label: "Calls per year", prefix: "" },
  { value: 98, suffix: "%", label: "English fluency", prefix: "" },
  { value: 60, suffix: "%", label: "Cost reduction", prefix: "" },
  { value: 50_000, suffix: "/yr", label: "IT grads in Egypt", prefix: "" },
];

export const HOME_STATS = [
  { value: 500_000, suffix: "+", label: "Dials per month" },
  { value: 150, suffix: "+", label: "Staffers placed" },
  { value: 24, suffix: "h", label: "Avg. time to kickoff" },
  { value: 2.4, suffix: "M", label: "Calls handled / year" },
];

export type Tier = {
  name: string;
  perHr: string; // primary (e.g. "$12.00")
  perMin: string; // secondary equivalent (e.g. "$0.20")
  blurb: string;
  features: string[];
  featured?: boolean;
  note?: string;
};

export const TIERS: Tier[] = [
  {
    name: "Data Entry & Back Office",
    perHr: "$7.50",
    perMin: "$0.13",
    note: "Non-communication seats — these agents don't speak to your customers or prospects.",
    blurb: "Accurate data entry, auditing, and back-office work — done at volume, no new hire.",
    features: [
      "Data entry & order processing",
      "Auditing & quality checks",
      "Clean, up-to-date records",
      "Bilingual (English & Arabic) agents",
    ],
  },
  {
    name: "Inbound Support",
    perHr: "$12.00",
    perMin: "$0.20",
    blurb: "Every call answered fast, on-brand, and resolved on the first touch.",
    features: [
      "Every inbound call answered",
      "Customer service & order help",
      "First-call resolution",
      "Bilingual (English & Arabic) agents",
    ],
  },
  {
    name: "Outbound Support",
    perHr: "$12.00",
    perMin: "$0.20",
    blurb: "Follow-ups, reminders, and check-ins that keep your customers coming back.",
    features: [
      "Proactive outbound campaigns",
      "Appointment setting & reminders",
      "Win-back & retention calls",
      "Every call quality-checked",
    ],
  },
  {
    name: "Outbound Sales",
    perHr: "$12.00",
    perMin: "$0.20",
    blurb: "Closers who turn your leads into booked meetings and signed deals.",
    features: [
      "Experienced sales closers",
      "Handles every objection with ease",
      "Coached until they beat your targets",
      "Live coaching on every call",
      "A dedicated team lead who owns your results",
    ],
    featured: true,
  },
];

/* AI-vs-human cost basis (per minute) — owner-published figures */
export const AI_COST = {
  components: [
    { key: "stt", label: "Speech-to-text", value: 0.024, note: "STT" },
    { key: "llm", label: "LLM reasoning", lo: 0.1, hi: 0.2, value: 0.15, note: "LLM" },
    { key: "tts", label: "Text-to-speech", value: 0.16, note: "TTS" },
    { key: "sip", label: "SIP / telephony", value: 0.03, note: "SIP" },
    { key: "orch", label: "Orchestration", value: 0.01, note: "Glue" },
  ],
  perMinLo: 0.32,
  perMinHi: 0.5,
  monthlyLo: 1230,
  monthlyHi: 4710,
};

export const GOSTAFFER_RATE = {
  perMin: 0.2,
  monthly: 1280,
  qualities: [
    "Objection handling: adaptive",
    "Empathy: real",
    "Kickoff: 24 hours",
    "Maintenance: $0",
  ],
};

export const PROCESS = [
  {
    n: "01",
    title: "We map the role",
    body: "We learn your offer, your customers, and what a great day on the phones looks like — so your staffer sounds like your team from the first call.",
  },
  {
    n: "02",
    title: "We hand-pick the talent",
    body: "We match the role to a proven remote professional from our vetted bench, then build the playbook and objection answers around your business.",
  },
  {
    n: "03",
    title: "We train to your targets",
    body: "Your dedicated staffer rehearses real scenarios and gets coached until they beat your numbers — before they ever touch a live customer.",
  },
  {
    n: "04",
    title: "You go live — and watch",
    body: "Most roles are on the phones within days; custom builds take a week or two, always scoped upfront. Then every call, stat, and result streams to you in real time.",
  },
];

export const TESTIMONIAL = {
  quote:
    "GoStaffer stood up a 12-person team for us in under two weeks and it outperformed the domestic desk it replaced inside a month. The savings were nice — the part that surprised me was how much they sound like our own people.",
  name: "David Chen",
  role: "VP of Growth, TechFlow",
};

export const TForDESC =
  "Domestic hiring is slow and expensive. Faceless call centers don't care about your brand. GoStaffer is the middle path — dedicated bilingual staffers in Cairo, trained on your business and backed by AI, managed from West Palm Beach, billed by the minute.";
