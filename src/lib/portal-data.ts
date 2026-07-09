/* ============================================================
   Portal mock data — UI only. No backend; these stand in for what
   the real admin/client portal will load from the API later.
   ============================================================ */

export type ClientStatus = "active" | "onboarding" | "paused" | "invited";

export type Client = {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  status: ClientStatus;
  services: string[];
  industry: string;
  agents: number;
  perMin: number; // $/min
  minutesPeriod: number; // minutes this billing period
  mrr: number;
  joined: string; // ISO-ish display date
  onboardStep: number; // 0..5 (5 = live)
  grad: string; // avatar gradient
};

export const CLIENTS: Client[] = [
  {
    id: "acme",
    company: "Acme Corp",
    contact: "David Reyes",
    email: "david@acme.com",
    phone: "+1 (305) 555-0142",
    status: "active",
    services: ["Outbound sales", "Appointment setting"],
    industry: "Home services",
    agents: 8,
    perMin: 0.2,
    minutesPeriod: 41280,
    mrr: 8256,
    joined: "Mar 2026",
    onboardStep: 5,
    grad: "from-[#1f9e68] to-[#2fd39e]",
  },
  {
    id: "northwind",
    company: "Northwind Insurance",
    contact: "Karen Mitchell",
    email: "karen@northwind.co",
    phone: "+1 (212) 555-0188",
    status: "active",
    services: ["Inbound support", "Customer service"],
    industry: "Insurance",
    agents: 12,
    perMin: 0.22,
    minutesPeriod: 58940,
    mrr: 12966,
    joined: "Jan 2026",
    onboardStep: 5,
    grad: "from-[#0ea5a5] to-[#1f9e68]",
  },
  {
    id: "brightsmile",
    company: "BrightSmile Dental",
    contact: "Marcus Lee",
    email: "marcus@brightsmile.com",
    phone: "+1 (480) 555-0119",
    status: "onboarding",
    services: ["Inbound answering", "Scheduling"],
    industry: "Healthcare",
    agents: 4,
    perMin: 0.21,
    minutesPeriod: 0,
    mrr: 0,
    joined: "Jun 2026",
    onboardStep: 3,
    grad: "from-[#2fd39e] to-[#35d6a0]",
  },
  {
    id: "summit",
    company: "Summit Solar",
    contact: "Jenna Brooks",
    email: "jenna@summitsolar.io",
    phone: "+1 (602) 555-0173",
    status: "invited",
    services: ["Outbound sales", "Lead generation"],
    industry: "Solar / energy",
    agents: 6,
    perMin: 0.2,
    minutesPeriod: 0,
    mrr: 0,
    joined: "Jun 2026",
    onboardStep: 0,
    grad: "from-[#f59e0b] to-[#ef6b3d]",
  },
  {
    id: "vertex",
    company: "Vertex Realty",
    contact: "Mark Sullivan",
    email: "mark@vertexrealty.com",
    phone: "+1 (713) 555-0150",
    status: "paused",
    services: ["Outbound sales"],
    industry: "Real estate",
    agents: 5,
    perMin: 0.2,
    minutesPeriod: 12400,
    mrr: 0,
    joined: "Nov 2025",
    onboardStep: 5,
    grad: "from-[#64748b] to-[#94a3b8]",
  },
];

export type InvoiceStatus = "paid" | "due" | "overdue" | "draft";
export type Invoice = {
  id: string;
  number: string;
  clientId: string;
  type: "auto" | "one-off";
  period: string;
  amount: number;
  status: InvoiceStatus;
  issued: string;
  due: string;
};

export const INVOICES: Invoice[] = [
  { id: "i1", number: "GS-2041", clientId: "northwind", type: "auto", period: "Jun 1–14", amount: 6483, status: "paid", issued: "Jun 15", due: "Jun 22" },
  { id: "i2", number: "GS-2042", clientId: "acme", type: "auto", period: "Jun 1–14", amount: 4128, status: "paid", issued: "Jun 15", due: "Jun 22" },
  { id: "i3", number: "GS-2048", clientId: "acme", type: "one-off", period: "Custom CRM build", amount: 2400, status: "due", issued: "Jun 20", due: "Jul 4" },
  { id: "i4", number: "GS-2051", clientId: "northwind", type: "auto", period: "Jun 15–28", amount: 6720, status: "due", issued: "Jun 29", due: "Jul 6" },
  { id: "i5", number: "GS-2039", clientId: "vertex", type: "auto", period: "May 15–28", amount: 2480, status: "overdue", issued: "May 29", due: "Jun 5" },
  { id: "i6", number: "GS-2052", clientId: "brightsmile", type: "one-off", period: "Onboarding setup", amount: 750, status: "draft", issued: "—", due: "—" },
];

export const ACTIVITY = [
  { who: "Karen Mitchell", what: "paid invoice GS-2041", when: "12m ago", kind: "billing" as const },
  { who: "BrightSmile Dental", what: "completed onboarding step 3 of 5", when: "1h ago", kind: "onboard" as const },
  { who: "You", what: "sent an invite to Summit Solar", when: "3h ago", kind: "invite" as const },
  { who: "Acme Corp", what: "ran 1,240 minutes today", when: "5h ago", kind: "usage" as const },
  { who: "Vertex Realty", what: "invoice GS-2039 is overdue", when: "1d ago", kind: "alert" as const },
];

// options for the onboarding wizard
export const SERVICE_OPTIONS = [
  "Outbound sales",
  "Appointment setting",
  "Lead generation",
  "Inbound answering",
  "Customer service",
  "Technical support",
  "Scheduling",
  "Win-back / retention",
];

export const INDUSTRY_OPTIONS = [
  "Home services",
  "Healthcare",
  "Insurance",
  "Real estate",
  "Solar / energy",
  "E-commerce",
  "Financial services",
  "Other",
];

export const TOOL_OPTIONS = ["Salesforce", "HubSpot", "Zoho", "GoHighLevel", "Zendesk", "Calendly", "Custom / other"];
export const LANGUAGES = ["English", "Arabic", "Spanish", "French"];

// report mini-series (dials / hour-ish, already trending up)
export const REPORT_SERIES = [62, 66, 64, 70, 74, 71, 78, 82, 80, 86, 90, 88, 94, 97];

export const fmtUSD = (n: number, d = 0) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: d, maximumFractionDigits: d });

export const clientById = (id: string) => CLIENTS.find((c) => c.id === id);

/* ============================================================
   Portal v2 — campaigns, onboarding, team, leads, docs, requests,
   recordings, approvals, compliance. All mock, UI only.
   ============================================================ */

export type Campaign = {
  id: string;
  clientId: string;
  name: string;
  type: string;
  status: "live" | "paused" | "draft";
  scriptVersion: string;
  connectRate: number;
  conversion: number;
  objections: number;
  dispositions: number;
  updated: string;
};

export const CAMPAIGNS: Campaign[] = [
  { id: "c1", clientId: "acme", name: "HVAC — Spring Tune-Up Outbound", type: "Outbound sales", status: "live", scriptVersion: "v4", connectRate: 47, conversion: 6.1, objections: 12, dispositions: 9, updated: "2h ago" },
  { id: "c2", clientId: "acme", name: "Missed-Call Win-Back", type: "Win-back", status: "live", scriptVersion: "v2", connectRate: 52, conversion: 8.4, objections: 7, dispositions: 6, updated: "1d ago" },
  { id: "c3", clientId: "northwind", name: "Policy Renewal Reminders", type: "Inbound + outbound", status: "live", scriptVersion: "v7", connectRate: 61, conversion: 22, objections: 15, dispositions: 11, updated: "5h ago" },
  { id: "c4", clientId: "northwind", name: "New-Quote Speed-to-Lead", type: "Outbound", status: "paused", scriptVersion: "v3", connectRate: 44, conversion: 14, objections: 10, dispositions: 8, updated: "3d ago" },
  { id: "c5", clientId: "brightsmile", name: "New-Patient Scheduling", type: "Inbound answering", status: "draft", scriptVersion: "v1", connectRate: 0, conversion: 0, objections: 5, dispositions: 6, updated: "Jun 22" },
];

export const ONBOARD_STAGES = ["Invited", "Discovery", "Build", "Training", "Live"] as const;
export type OnboardStage = (typeof ONBOARD_STAGES)[number];

export type OnboardCard = {
  clientId: string;
  stage: OnboardStage;
  owner: string;
  due: string;
  checklist: { label: string; done: boolean }[];
};

export const ONBOARD_BOARD: OnboardCard[] = [
  {
    clientId: "summit", stage: "Invited", owner: "Jordan G.", due: "Jun 27",
    checklist: [
      { label: "Invite sent (SMS + email)", done: true },
      { label: "Account activated", done: false },
      { label: "Discovery call booked", done: false },
    ],
  },
  {
    clientId: "brightsmile", stage: "Build", owner: "Rachel M.", due: "Jun 28",
    checklist: [
      { label: "Discovery call complete", done: true },
      { label: "Offer & scripts captured", done: true },
      { label: "CRM / calendar connected", done: true },
      { label: "Playbook & objections built", done: false },
      { label: "Compliance reviewed", done: false },
    ],
  },
  {
    clientId: "acme", stage: "Live", owner: "Sam R.", due: "—",
    checklist: [
      { label: "Team trained to benchmark", done: true },
      { label: "Go-live approved by client", done: true },
      { label: "Live dialing", done: true },
    ],
  },
  {
    clientId: "northwind", stage: "Live", owner: "Sam R.", due: "—",
    checklist: [
      { label: "Team trained to benchmark", done: true },
      { label: "Go-live approved by client", done: true },
      { label: "Live dialing", done: true },
    ],
  },
];

export type Agent = {
  id: string;
  name: string;
  grad: string;
  role: string;
  clientId: string | null;
  status: "On Call" | "Available" | "Wrap" | "Offline";
  qa: number;
  langs: string;
  tenure: string;
};

export const AGENTS_TEAM: Agent[] = [
  { id: "a1", name: "Mariam H.", grad: "from-[#1f9e68] to-[#2fd39e]", role: "Senior Agent", clientId: "acme", status: "On Call", qa: 98, langs: "EN / AR", tenure: "3y" },
  { id: "a2", name: "Youssef A.", grad: "from-[#0ea5a5] to-[#1f9e68]", role: "Team Lead", clientId: "northwind", status: "Available", qa: 96, langs: "EN / AR", tenure: "5y" },
  { id: "a3", name: "Nadia K.", grad: "from-[#2fd39e] to-[#35d6a0]", role: "Agent", clientId: "acme", status: "Wrap", qa: 94, langs: "EN / AR / FR", tenure: "2y" },
  { id: "a4", name: "Omar S.", grad: "from-[#f59e0b] to-[#ef6b3d]", role: "Agent", clientId: "northwind", status: "On Call", qa: 92, langs: "EN / AR", tenure: "1y" },
  { id: "a5", name: "Layla M.", grad: "from-[#a855f7] to-[#6366f1]", role: "Agent", clientId: "brightsmile", status: "Offline", qa: 95, langs: "EN / AR", tenure: "2y" },
  { id: "a6", name: "Karim T.", grad: "from-[#0ea5a5] to-[#2fd39e]", role: "QA Specialist", clientId: null, status: "Available", qa: 99, langs: "EN / AR", tenure: "4y" },
];

export type LeadList = {
  id: string;
  clientId: string;
  name: string;
  total: number;
  dialed: number;
  dnc: boolean;
  uploaded: string;
};

export const LEAD_LISTS: LeadList[] = [
  { id: "l1", clientId: "acme", name: "Spring promo — FL homeowners", total: 12480, dialed: 8240, dnc: true, uploaded: "Jun 18" },
  { id: "l2", clientId: "acme", name: "Past customers (24mo)", total: 4210, dialed: 4210, dnc: true, uploaded: "Jun 10" },
  { id: "l3", clientId: "northwind", name: "Renewals due — Q3", total: 9870, dialed: 5120, dnc: true, uploaded: "Jun 20" },
  { id: "l4", clientId: "northwind", name: "Web quote requests", total: 2340, dialed: 1990, dnc: false, uploaded: "Jun 23" },
];

export type Doc = {
  id: string;
  clientId: string;
  name: string;
  type: "MSA" | "NDA" | "BAA" | "Order Form" | "DPA";
  status: "signed" | "pending" | "draft";
  date: string;
};

export const DOCUMENTS: Doc[] = [
  { id: "d1", clientId: "acme", name: "Master Services Agreement", type: "MSA", status: "signed", date: "Mar 4" },
  { id: "d2", clientId: "acme", name: "Mutual NDA", type: "NDA", status: "signed", date: "Mar 1" },
  { id: "d3", clientId: "northwind", name: "Business Associate Agreement", type: "BAA", status: "signed", date: "Jan 9" },
  { id: "d4", clientId: "brightsmile", name: "Order Form — 4 agents", type: "Order Form", status: "pending", date: "Jun 22" },
  { id: "d5", clientId: "brightsmile", name: "HIPAA BAA", type: "BAA", status: "pending", date: "Jun 22" },
  { id: "d6", clientId: "summit", name: "Master Services Agreement", type: "MSA", status: "draft", date: "—" },
];

export type Request = {
  id: string;
  clientId: string;
  title: string;
  kind: "Team change" | "Script change" | "Pause" | "Question" | "Integration";
  status: "open" | "in-progress" | "done";
  when: string;
};

export const REQUESTS: Request[] = [
  { id: "r1", clientId: "acme", title: "Add 2 agents for the spring push", kind: "Team change", status: "in-progress", when: "1h ago" },
  { id: "r2", clientId: "northwind", title: "Tweak renewal script — new disclosure", kind: "Script change", status: "open", when: "3h ago" },
  { id: "r3", clientId: "acme", title: "Connect our new GoHighLevel pipeline", kind: "Integration", status: "open", when: "yesterday" },
  { id: "r4", clientId: "northwind", title: "Pause web-quote campaign next week", kind: "Pause", status: "done", when: "2d ago" },
];

export type Recording = {
  id: string;
  clientId: string;
  agent: string;
  contact: string;
  duration: string;
  outcome: "Booked" | "Callback" | "Not interested" | "Voicemail";
  score: number;
  date: string;
};

export const RECORDINGS: Recording[] = [
  { id: "rec1", clientId: "acme", agent: "Mariam H.", contact: "+1 (305) •• 0142", duration: "4:12", outcome: "Booked", score: 98, date: "Today 11:04a" },
  { id: "rec2", clientId: "acme", agent: "Nadia K.", contact: "+1 (754) •• 8810", duration: "2:48", outcome: "Callback", score: 91, date: "Today 10:31a" },
  { id: "rec3", clientId: "acme", agent: "Mariam H.", contact: "+1 (561) •• 4420", duration: "6:03", outcome: "Booked", score: 96, date: "Today 9:58a" },
  { id: "rec4", clientId: "acme", agent: "Omar S.", contact: "+1 (305) •• 1190", duration: "1:22", outcome: "Voicemail", score: 88, date: "Yesterday" },
  { id: "rec5", clientId: "acme", agent: "Nadia K.", contact: "+1 (786) •• 7732", duration: "3:35", outcome: "Not interested", score: 90, date: "Yesterday" },
];

export type Approval = {
  id: string;
  clientId: string;
  item: string;
  type: "Script" | "Document" | "Change";
  status: "pending" | "approved";
  date: string;
};

export const APPROVALS: Approval[] = [
  { id: "ap1", clientId: "acme", item: "Spring Tune-Up script — v4", type: "Script", status: "pending", date: "1h ago" },
  { id: "ap2", clientId: "acme", item: "Add 2 agents — order form", type: "Document", status: "pending", date: "3h ago" },
  { id: "ap3", clientId: "acme", item: "Win-Back script — v2", type: "Script", status: "approved", date: "Jun 20" },
];

export const AUDIT: { who: string; action: string; when: string }[] = [
  { who: "Mariam H.", action: "started a recorded call — consent captured", when: "2m ago" },
  { who: "System", action: "scrubbed 412 numbers against DNC registry", when: "1h ago" },
  { who: "Rachel M.", action: "updated Northwind renewal script (disclosure added)", when: "3h ago" },
  { who: "David Reyes (Acme)", action: "approved Win-Back script v2", when: "Jun 20" },
];

export const byClient = <T extends { clientId: string | null }>(rows: T[], id: string) => rows.filter((r) => r.clientId === id);

/* ============================================================
   Portal v3 — wallet/billing engine, staffing pipeline, time clock,
   weekly metrics, training, messaging, tasks. Ported (as UI) from
   the operational back-office model. All mock.
   ============================================================ */

// --- Wallet + ledger (prepaid credits) ---
// A wallet belongs to each CLIENT org. WALLET is the logged-in client's (Acme's)
// wallet for the client view; CLIENT_WALLETS is the admin's per-client view.
export const WALLET = {
  balance: 14820,
  autoReload: true,
  threshold: 2000,
  amount: 5000,
  method: "Visa •••• 6411",
  pending: 0,
};

export const CLIENT_WALLETS: Record<string, { balance: number; autoReload: boolean }> = {
  acme: { balance: 14820, autoReload: true },
  northwind: { balance: 22400, autoReload: true },
  brightsmile: { balance: 3200, autoReload: false },
  vertex: { balance: 1180, autoReload: false },
};

export type LedgerEntry = {
  id: string;
  type: "credit" | "debit";
  category: "Top-up" | "Invoice payment" | "Dialer seats" | "Refund";
  description: string;
  amount: number;
  balanceAfter: number;
  date: string;
};

export const LEDGER: LedgerEntry[] = [
  { id: "lg1", type: "credit", category: "Top-up", description: "Auto-reload (Visa •••• 6411)", amount: 5000, balanceAfter: 14820, date: "Jun 24" },
  { id: "lg2", type: "debit", category: "Invoice payment", description: "Invoice GS-2042 — Acme", amount: -4128, balanceAfter: 9820, date: "Jun 22" },
  { id: "lg3", type: "debit", category: "Dialer seats", description: "8 seats — Acme HVAC", amount: -4000, balanceAfter: 13948, date: "Jun 18" },
  { id: "lg4", type: "credit", category: "Top-up", description: "Manual top-up", amount: 10000, balanceAfter: 17948, date: "Jun 10" },
];

// --- Dialer seats ---
export type DialerSeat = {
  id: string;
  clientId: string;
  campaign: string;
  qty: number;
  pricePer: number;
  periodStart: string;
  periodEnd: string;
  status: "Active" | "Expiring";
};

export const DIALER_SEATS: DialerSeat[] = [
  { id: "ds1", clientId: "acme", campaign: "HVAC — Spring Tune-Up", qty: 8, pricePer: 500, periodStart: "Jun 1", periodEnd: "Jun 30", status: "Active" },
  { id: "ds2", clientId: "northwind", campaign: "Policy Renewals", qty: 12, pricePer: 500, periodStart: "Jun 1", periodEnd: "Jun 30", status: "Active" },
  { id: "ds3", clientId: "acme", campaign: "Win-Back", qty: 2, pricePer: 500, periodStart: "Jun 15", periodEnd: "Jun 30", status: "Expiring" },
];

// --- Agent staffing pipeline ---
// matches the operational pipeline (Requested → … → Live), incl. the Assigned stage.
export const AGENT_PIPELINE = ["Requested", "Accepted", "Provisioning", "Assigned", "Training", "Ready to go live", "Live"] as const;
export type PipelineStage = (typeof AGENT_PIPELINE)[number];

// per-agent stage + days in stage (keyed by AGENTS_TEAM id)
export const AGENT_STAGE: Record<string, { stage: PipelineStage; days: number }> = {
  a1: { stage: "Live", days: 64 },
  a2: { stage: "Live", days: 120 },
  a3: { stage: "Live", days: 41 },
  a4: { stage: "Training", days: 3 },
  a5: { stage: "Provisioning", days: 2 },
  a6: { stage: "Ready to go live", days: 1 },
};

export type AgentRequest = {
  id: string;
  clientId: string;
  campaign: string;
  num: number;
  type: "Sales" | "Non-Sales";
  status: "pending" | "accepted" | "denied";
  readinessDays: number | null;
  launch: string;
  when: string;
};

export const AGENT_REQUESTS: AgentRequest[] = [
  { id: "areq1", clientId: "acme", campaign: "HVAC — Spring Tune-Up", num: 2, type: "Sales", status: "pending", readinessDays: null, launch: "—", when: "1h ago" },
  { id: "areq2", clientId: "brightsmile", campaign: "New-Patient Scheduling", num: 4, type: "Non-Sales", status: "accepted", readinessDays: 4, launch: "Jul 1", when: "yesterday" },
  { id: "areq3", clientId: "northwind", campaign: "Renewals overflow", num: 3, type: "Non-Sales", status: "pending", readinessDays: null, launch: "—", when: "3h ago" },
  { id: "areq4", clientId: "vertex", campaign: "Listing outreach", num: 2, type: "Sales", status: "denied", readinessDays: null, launch: "—", when: "2d ago" },
];

// --- Critical tasks (internal ops queue) ---
export type CriticalTask = {
  id: string;
  clientId: string | null;
  title: string;
  type: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "pending" | "in-progress" | "completed";
  due: string;
};

export const CRITICAL_TASKS: CriticalTask[] = [
  { id: "t1", clientId: "acme", title: "Provision 2 agents for HVAC spring push", type: "provision_agents", priority: "high", status: "in-progress", due: "Jun 27" },
  { id: "t2", clientId: "vertex", title: "Scope on-hold request — Listing outreach", type: "request_scoping", priority: "medium", status: "pending", due: "Jun 28" },
  { id: "t3", clientId: "brightsmile", title: "Schedule training session before go-live", type: "schedule_training", priority: "critical", status: "pending", due: "Jun 26" },
  { id: "t4", clientId: "northwind", title: "Add TCPA disclosure to renewal script", type: "script_update", priority: "high", status: "pending", due: "Jun 27" },
  { id: "t5", clientId: null, title: "Weekly performance metrics entry due", type: "metrics_entry", priority: "low", status: "pending", due: "Jun 29" },
];

// --- Time clock ---
export type TimeEntry = {
  id: string;
  agent: string;
  clientId: string;
  campaign: string;
  date: string;
  clockIn: string;
  clockOut: string | null;
  hours: number;
};

export const TIME_ENTRIES: TimeEntry[] = [
  { id: "te1", agent: "Mariam H.", clientId: "acme", campaign: "HVAC — Spring Tune-Up", date: "Jun 25", clockIn: "9:00a", clockOut: null, hours: 0 },
  { id: "te2", agent: "Nadia K.", clientId: "acme", campaign: "Win-Back", date: "Jun 25", clockIn: "9:02a", clockOut: null, hours: 0 },
  { id: "te3", agent: "Youssef A.", clientId: "northwind", campaign: "Policy Renewals", date: "Jun 25", clockIn: "8:30a", clockOut: null, hours: 0 },
  { id: "te4", agent: "Mariam H.", clientId: "acme", campaign: "HVAC — Spring Tune-Up", date: "Jun 24", clockIn: "9:00a", clockOut: "5:30p", hours: 8.5 },
  { id: "te5", agent: "Omar S.", clientId: "northwind", campaign: "Policy Renewals", date: "Jun 24", clockIn: "9:00a", clockOut: "5:00p", hours: 8 },
];

// --- Weekly performance metrics (per agent) ---
export type WeekPerf = {
  id: string;
  agent: string;
  clientId: string;
  weekOf: string;
  contactRate: number;
  aht: string;
  callsPerHr: number;
  transfersPerHr: number;
  inbound: number;
  outbound: number;
  conversions: number;
};

export const WEEK_PERF: WeekPerf[] = [
  { id: "wp1", agent: "Mariam H.", clientId: "acme", weekOf: "Jun 16", contactRate: 47, aht: "4:12", callsPerHr: 18.4, transfersPerHr: 2.1, inbound: 0, outbound: 742, conversions: 41 },
  { id: "wp2", agent: "Nadia K.", clientId: "acme", weekOf: "Jun 16", contactRate: 44, aht: "3:48", callsPerHr: 19.1, transfersPerHr: 1.8, inbound: 0, outbound: 768, conversions: 33 },
  { id: "wp3", agent: "Youssef A.", clientId: "northwind", weekOf: "Jun 16", contactRate: 61, aht: "5:02", callsPerHr: 14.2, transfersPerHr: 3.4, inbound: 210, outbound: 360, conversions: 58 },
  { id: "wp4", agent: "Omar S.", clientId: "northwind", weekOf: "Jun 16", contactRate: 58, aht: "4:40", callsPerHr: 15.0, transfersPerHr: 3.1, inbound: 188, outbound: 372, conversions: 49 },
];

// --- Training: materials, sessions, evaluations ---
export type Material = {
  id: string;
  clientId: string;
  name: string;
  type: "Script" | "Rebuttal" | "Documentation" | "FAQ" | "Training Video" | "Other";
  size: string;
  uploaded: string;
};

export const MATERIALS: Material[] = [
  { id: "m1", clientId: "acme", name: "HVAC Spring Tune-Up — master script", type: "Script", size: "82 KB", uploaded: "Jun 18" },
  { id: "m2", clientId: "acme", name: "Top 12 objections + rebuttals", type: "Rebuttal", size: "44 KB", uploaded: "Jun 18" },
  { id: "m3", clientId: "acme", name: "Pricing & scheduling FAQ", type: "FAQ", size: "31 KB", uploaded: "Jun 19" },
  { id: "m4", clientId: "northwind", name: "Renewal call walkthrough", type: "Training Video", size: "128 MB", uploaded: "Jun 12" },
  { id: "m5", clientId: "brightsmile", name: "New-patient intake doc", type: "Documentation", size: "56 KB", uploaded: "Jun 22" },
];

export type TrainingSession = {
  id: string;
  clientId: string;
  campaign: string;
  date: string;
  time: string;
  tz: string;
  agents: number;
  status: "Scheduled" | "Completed" | "Cancelled";
};

export const TRAINING_SESSIONS: TrainingSession[] = [
  { id: "ts1", clientId: "brightsmile", campaign: "New-Patient Scheduling", date: "Jun 26", time: "10:00a", tz: "ET", agents: 4, status: "Scheduled" },
  { id: "ts2", clientId: "acme", campaign: "Win-Back", date: "Jun 24", time: "9:00a", tz: "ET", agents: 2, status: "Completed" },
  { id: "ts3", clientId: "northwind", campaign: "Renewals overflow", date: "Jun 27", time: "11:30a", tz: "ET", agents: 3, status: "Scheduled" },
];

export type Evaluation = {
  id: string;
  agent: string;
  clientId: string;
  script: number;
  communication: number;
  system: number;
  readiness: number;
  result: "Approve to Go Live" | "Additional Training";
  date: string;
};

export const EVALUATIONS: Evaluation[] = [
  { id: "ev1", agent: "Nadia K.", clientId: "acme", script: 5, communication: 5, system: 4, readiness: 5, result: "Approve to Go Live", date: "Jun 24" },
  { id: "ev2", agent: "Omar S.", clientId: "northwind", script: 4, communication: 4, system: 3, readiness: 3, result: "Additional Training", date: "Jun 23" },
  { id: "ev3", agent: "Layla M.", clientId: "brightsmile", script: 4, communication: 5, system: 4, readiness: 4, result: "Approve to Go Live", date: "Jun 22" },
];

// --- Messaging ---
export type Conversation = {
  id: string;
  name: string;
  type: "supervisor" | "campaign";
  clientId: string;
  unread: number;
  last: string;
  preview: string;
};

export const CONVERSATIONS: Conversation[] = [
  { id: "cv1", name: "Acme — HVAC campaign", type: "campaign", clientId: "acme", unread: 2, last: "9m", preview: "Can we add a Saturday shift?" },
  { id: "cv2", name: "David Reyes (Acme)", type: "supervisor", clientId: "acme", unread: 0, last: "1h", preview: "Thanks — looks great." },
  { id: "cv3", name: "Northwind — Renewals", type: "campaign", clientId: "northwind", unread: 1, last: "3h", preview: "New disclosure attached." },
  { id: "cv4", name: "Karen Mitchell (Northwind)", type: "supervisor", clientId: "northwind", unread: 0, last: "1d", preview: "Approved the script." },
];

export type Msg = { who: string; type: "client" | "supervisor" | "agent"; text: string; time: string };
export const MESSAGES_BY_CONV: Record<string, Msg[]> = {
  cv1: [
    { who: "David Reyes", type: "client", text: "Hey — the spring push is going well. Can we add a Saturday shift this week?", time: "9:02a" },
    { who: "Sam R. (GoStaffer)", type: "supervisor", text: "Absolutely. I'll add 2 agents for Sat 9–1 ET and confirm tonight.", time: "9:08a" },
    { who: "David Reyes", type: "client", text: "Perfect, thank you!", time: "9:09a" },
  ],
  cv2: [
    { who: "Sam R. (GoStaffer)", type: "supervisor", text: "Win-Back script v2 is live — early numbers look strong.", time: "12:40p" },
    { who: "David Reyes", type: "client", text: "Thanks — looks great.", time: "1:02p" },
  ],
  cv3: [
    { who: "Karen Mitchell", type: "client", text: "New TCPA disclosure attached — please fold into the renewal script.", time: "8:10a" },
    { who: "Sam R. (GoStaffer)", type: "supervisor", text: "Got it, updating now and re-training the team this afternoon.", time: "8:22a" },
  ],
  cv4: [{ who: "Karen Mitchell", type: "client", text: "Approved the script.", time: "Yesterday" }],
};
