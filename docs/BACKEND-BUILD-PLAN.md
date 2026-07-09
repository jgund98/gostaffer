# CallBlade — Backend Build Plan & System Spec

> Living document. Source of truth for building the backend behind the existing
> marketing site + 3-role portal. The portal's `src/lib/portal-data.ts` mock layer
> is the schema sketch — most entities/fields map ~1:1 to the tables below.

---

## 0. Readiness — where we are

**Done (UI):** Marketing site; portal shell with **Admin / Agent / Client** view switch;
~35 screens across all three roles; onboarding wizard; billing + wallet UI; reports;
recordings; messaging; training; compliance; command palette; mobile-optimized main views.

**Mock layer = schema sketch.** `portal-data.ts` already defines: organizations (clients),
users, campaigns, agents + pipeline stages, agent requests, critical tasks, time entries,
weekly performance, dialer seats, wallet + ledger, invoices, documents, requests, recordings,
approvals, training (materials/sessions/evaluations), conversations/messages, audit log.

**Remaining UI (non-blocking, do alongside backend):** real auth/login/reset screens,
loading + error states, optimistic updates, a couple admin tables' mobile reflow,
notification center, account/profile settings per role.

**Verdict:** Ready to begin the backend. Build in phases (below), one surface at a time —
**Admin → Agent → Client**, with shared foundations first.

---

## 1. Architecture & Stack (recommended)

| Concern | Recommendation | Why |
|---|---|---|
| App | Keep ONE Next.js 16 app (the portal) with **Route Handlers** (`/api/*`) | UI already here; no extra service to run; Vercel-native |
| DB | **Postgres** (Neon or Supabase) | Adam's portal already modeled this; relational fits billing/RBAC |
| ORM | **Drizzle** (or Prisma) | Type-safe, migrations, matches our TS types |
| Auth | **Auth.js (NextAuth)** sessions OR custom JWT (Adam's used JWT+bcrypt) | Email/password + magic-link + Google OAuth; org-scoped |
| Multi-tenancy | `organization_id` on every row + **row-level scoping** in a query layer | Hard isolation between clients |
| Background jobs | **Vercel Cron** + a small worker (or Inngest/Trigger.dev) | ViCidial sync, auto-billing, weekly reports, reminders |
| Object storage | **Vercel Blob** or **S3/GCS** | Call recordings, documents, training materials |
| Realtime | **Pusher/Ably** or **Supabase Realtime** | Live agent floor, dashboards, messaging |
| Email | **Resend** or **Postmark** (or SendGrid) | Transactional templates |
| SMS / Voice | **Twilio** | Invites, OTP, callback, the "hear a rep" demo call |
| Dialer | **ViCidial** (direct) | The operational core — call data, agents, lists, recordings |
| Payments | **Stripe** | Wallet top-ups, invoices, card + ACH, auto-reload |
| Calendar | **Google Calendar/Meet** | Training sessions |
| Observability | **Sentry** + structured logs + **PostHog** | Errors, audit, product analytics |

> Note on Twilio vs email: **Twilio = SMS + voice**; **email = Resend/Postmark/SendGrid**
> (Twilio owns SendGrid, so you *can* consolidate the vendor). "Email motifs" = the
> transactional template set in §5.3.

---

## 2. User Types & Roles (RBAC)

### CallBlade-side (internal)
| Role | Does |
|---|---|
| **super_admin** | Everything; manage admins, global settings, escalations, financial overrides |
| **admin** | Onboard clients, provision agents, billing, campaigns, compliance |
| **supervisor** | Scoped to assigned client orgs: timeclock, performance entry, training, QA, messaging |
| **bpo_rep (agent)** | Their own shift only: clock in/out, scripts, their performance, campaign messages |

### Client-side (external)
| Role | Does |
|---|---|
| **owner** | Full client account: billing/wallet, approvals, requests, reports, users |
| **manager** | Reports, recordings, requests, approvals — no billing |
| **viewer** | Read-only reports + recordings |
| **buyer** | Requests agents, approves quotes/order forms (can = owner in small accounts) |

**Auth model:** users belong to exactly one `organization` (CallBlade is org #1 / internal);
supervisors carry `assigned_org_ids[]`. Invitations create a pending user + send SMS+email
(set-password link). Sessions are org-scoped; every API enforces `role` + `organization_id`.

---

## 3. The Three Surfaces (built separately)

> **Each surface's dashboard is the login landing — the showpiece.** They're now
> live & animated (count-up KPIs, drawn-in charts, progress rings, live floor stats,
> a ticking shift clock). That requires a **realtime aggregate feed**: a worker polls
> ViCidial → caches per-org/per-agent rollups → pushes to clients via the realtime
> layer (with a polling fallback). Prioritize this read-model in Phase 3; it powers all
> three dashboards. Mock values today come from `useLive` ticks in `portal/dash.tsx`.

### 3A. Admin portal (CallBlade ops) — `/portal/*`
**Job:** run the business — onboard, staff, bill, monitor, stay compliant.
**Screens → backend:** Dashboard (aggregates) · Clients CRUD · **Onboarding wizard → invite
(Twilio SMS + email) → account creation** · Onboarding tracker · Agent requests
(accept/hold/escalate → provision) · Campaigns & scripts (push to ViCidial) · Team &
assignments (agents ↔ campaigns, stages) · Training (materials/sessions/evals) · Time clock
(ViCidial pull or manual) · Leads & lists (upload → DNC scrub → ViCidial list) · Requests
inbox · Messages · Compliance + audit · **Billing & wallet** (Stripe, invoices, ledger,
dialer seats) · Reports (ViCidial metrics).

### 3B. Agent portal (BPO rep) — `/portal/agent/*` (mobile-first)
**Job:** the rep's own shift. **Screens → backend:** Dashboard (clock state + today's stats
from ViCidial) · Clock in/out (ViCidial pause/login events or manual) · My campaigns ·
Scripts & materials (read) · My performance (their `performance_metrics`) · Messages
(campaign channels).

### 3C. Client portal (end customer) — `/portal/client/*` — **the nicest POV**
**Job:** at-ease, transparent, self-serve. This surface gets the most design + product love.
**Screens → backend:** Dashboard (their live stats) · Reports (daily/weekly, downloadable,
emailed) · **Call recordings + transcripts** (the accent-confidence feature) · Approvals
(scripts/docs/quotes — e-sign) · Requests (changes, more agents, pause) · Messages (their
success team) · Documents (MSA/BAA/order forms) · **Billing & wallet** (balance, auto-reload,
pay invoices from wallet, payment methods card/ACH, ledger).

---

## 4. Data Model (entities)

> Builds on Adam's schema + our portal additions. One Postgres schema, `organization_id`
> on all tenant rows.

- **organizations** — client tenants (name, slug, stripe_customer_id, google_refresh_token, wallet_balance, auto_reload_*).
- **users** — org_id, email, password_hash, role, assigned_org_ids[], profile, last_login.
- **invitations** — org_id, email, phone, role, token, sent_at, accepted_at (drives SMS+email).
- **campaigns** — org_id, name, type (Sales/Non-Sales/Custom), hourly_rate, status, vicidial_campaign_id, dialer_seats.
- **agents** — org_id, campaign_id, name, type, stage, hourly_rate, vicidial_user.
- **agent_stage_history** — agent_id, stage, changed_at, changed_by (time-in-stage).
- **agent_requests** — org_id, campaign_id, num, type, status (pending/accepted/held/escalated), readiness_days, launch_date.
- **critical_tasks** — internal ops queue (type, priority, status, due, related_id).
- **time_entries** — agent_id, campaign_id, date, clock_in/out, hours (ViCidial or manual).
- **performance_metrics** — agent_id, campaign_id, week, contact_rate, AHT, calls/hr, transfers/hr, inbound/outbound, conversions.
- **dialer_seats** — campaign_id, qty, price_per_seat, billing period, status.
- **wallet (on org)** + **ledger_entries** — credit/debit, category, amount, balance_after, reference_id.
- **invoices** + **invoice_line_items** — number, period, total, status, stripe_payment_id; line = hours × rate (+ one-offs, seats).
- **payment_methods** — stripe_pm_id, type (card/ach/wire), brand/last4, is_default.
- **documents** — org_id, name, type (MSA/NDA/BAA/Order Form/DPA), status, file_url, signed_at.
- **training_materials** — campaign_id, name, type, file_url.
- **training_sessions** + **session_agents** + **training_evaluations** — google_event_id, meet_link, scores (1–5), result.
- **lead_lists** — org_id, campaign_id, name, total, dialed, dnc_scrubbed, vicidial_list_id, file_url.
- **recordings** — org_id, agent, campaign_id, contact (masked), duration, outcome, qa_score, recording_url, transcript_url, vicidial_recording_id.
- **conversations** + **messages** — type (supervisor/campaign), participants, read receipts.
- **approvals** — org_id, item, type (Script/Document/Change), status, decided_by.
- **consent_records / dnc** — TCPA consent, DNC scrub results, recording-consent capture.
- **audit_log** — who/action/entity/when (compliance + security).
- **notifications** — user_id, type, payload, read, channels_sent[].

---

## 5. Third-party Integrations (deep)

### 5.1 ViCidial — the operational core (dialer)
**Why:** ViCidial holds the truth on calls, agents, lists, dispositions, recordings, and
real-time floor status. Everything in Reports/Recordings/Performance/Timeclock ultimately
comes from here.

**What we pull:**
- Call detail + dispositions → `recordings`, conversions, `performance_metrics`.
- Agent login/pause events → `time_entries`, live status.
- Real-time stats (calls/hr, connect rate, agents on call) → live dashboards.
- Recording files + (optional) transcripts → object storage, `recordings`.

**What we push:**
- Provision agents (create ViCidial users) when a request is accepted.
- Create/configure campaigns; upload/refresh lead lists (after DNC scrub).

**Integration methods (pick per env):**
- **Non-Agent API** (`/agc/api.php`, `non_agent_api.php`) for actions (add lead, add user, list updates, real-time stats).
- **Direct DB read-replica** (MariaDB) for heavy reporting/sync (read-only, polled by a cron worker) — fastest for analytics.
- **AGI / dispositions hooks** for near-real-time events.
- Recording retrieval via the recordings path / API.

**Sync worker:** a scheduled job (every 1–5 min for live stats; hourly/daily for aggregates)
maps ViCidial rows → our entities, scoped by `vicidial_campaign_id`/`vicidial_user`.

> ⚠️ Confirm: ViCidial version, whether we get DB/read-replica access or API-only, and the
> hosting (their server vs ours). This shapes the sync design.

### 5.2 Twilio — SMS + Voice
- **Onboarding invite SMS** (set-password link) — fired from the onboarding wizard.
- **OTP / phone verification** (Twilio Verify) for client/agent login hardening.
- **"Hear a real rep" (live demo)** — the marketing CTA: capture the visitor's number →
  Twilio Voice dials a rep on the Cairo floor and bridges the call (click-to-call /
  callback), gated by business hours + rep availability. Off-hours → play a sample recording.
- **Callback / notification SMS** (e.g., "your rep is calling now", invoice due).
- **Click-to-call** from the portal (admin/supervisor → client contact).
- Infra: a Messaging Service + a verified number/short code; status-callback webhooks.

### 5.3 Email — transactional "motifs" (Resend / Postmark / SendGrid)
Template set:
1. **Invite / set password** (onboarding) 2. **Welcome / you're live** 3. **Invoice issued**
4. **Payment receipt** 5. **Payment failed / wallet low / auto-reload ran** 6. **Weekly report**
(client) 7. **Request received / updated** 8. **Approval needed** 9. **Training scheduled
(.ics + Meet link)** 10. **New message** 11. **Account/security** (reset, new login).
Domain auth: SPF/DKIM/DMARC on `callblade.com`. Centralize templates + a send service with
logging into `notifications`.

### 5.4 Stripe — merchant / payments
- **Customer per organization**; **PaymentMethods** = card (Elements) + **ACH** (Financial Connections).
- **Wallet top-ups** (PaymentIntent) → credit `ledger`; **auto-reload** (threshold → off-session PI on default method).
- **Invoices**: generate ours (hours × rate + one-offs + seats) → charge **from wallet**, or
  charge the card if wallet insufficient; store `stripe_payment_id`.
- **Webhooks**: `payment_intent.succeeded/failed`, `setup_intent.succeeded`, `charge.refunded`
  → update ledger/invoice/payment_method. PCI handled by Stripe (no raw card data on us).

### 5.5 Others
- **Google Calendar/Meet** — create training sessions, Meet links, .ics invites (OAuth refresh token per org or central).
- **Object storage** — recordings, documents (signed URLs, retention policy).
- **E-signature** — approvals/order forms (DocuSign/Dropbox Sign, or lightweight click-to-accept + audit).
- **Realtime** — live agent floor, dashboards, messaging (Pusher/Ably/Supabase).

---

## 6. Cross-cutting

### Notifications matrix (event → channels → who)
| Event | In-app | Email | SMS |
|---|---|---|---|
| Client invited | — | ✅ | ✅ |
| Set password done / live | ✅ | ✅ | — |
| Agent request accepted/held | ✅ (admin+client) | ✅ client | — |
| Invoice issued / due | ✅ | ✅ | optional |
| Payment ok / failed / auto-reload | ✅ | ✅ | failed→✅ |
| Approval needed | ✅ | ✅ | — |
| Training scheduled | ✅ | ✅ (+.ics) | — |
| New message | ✅ | digest | — |
| Live-rep callback | — | — | ✅ |
| Wallet low | ✅ | ✅ | — |

### Compliance & security
- **TCPA / DNC** — scrub every uploaded list before it reaches ViCidial; store results; calling-hours rules.
- **Recording consent** — capture + log per jurisdiction; surface in compliance center.
- **HIPAA / BAA** — healthcare clients: BAA on file, PHI handling, restricted access + audit.
- **PCI** — Stripe Elements only; never store raw card data.
- **Isolation** — org-scoped queries, RBAC on every endpoint, full `audit_log`, rate limiting, secrets in env/Vault.
- **Data retention** — recordings/transcripts/PII retention + deletion policy.

---

## 7. Phased Build Plan

> Each phase ends "deployed + demoable on staging." Foundations first, then one surface at a time.

**Phase 0 — Foundations (shared).** DB + Drizzle migrations from §4; Auth.js (email/pw +
magic link + Google), org multi-tenancy + RBAC middleware; environments/secrets; Stripe +
Twilio + email + Sentry wired (test mode); deploy pipeline. *DoD: a seeded org + users can
log in to the right role surface; no business logic yet.*

**Phase 1 — Admin core.** Clients CRUD; **Onboarding wizard → invitation → SMS+email →
set-password → account**; agent requests (accept/hold/escalate) → provisioning record;
campaigns CRUD; team/assignments + stages; admin dashboard aggregates. *Real onboarding works
end-to-end.*

**Phase 2 — Billing & wallet.** Stripe customers + payment methods (card/ACH); wallet
top-up + ledger; auto-reload; invoices (hours × rate + one-offs + dialer seats) charged from
wallet; webhooks; admin billing + client billing (self-serve). *Money moves.*

**Phase 3 — ViCidial integration.** Connect dialer; sync worker; lead upload + DNC scrub →
list; agent provisioning push; pull dispositions/recordings/stats. Powers **time clock**,
**performance**, **recordings**, **reports**. *Operational data is live.*

**Phase 4 — Agent surface.** Clock in/out (events/manual); my stats/performance; scripts &
materials; campaign messages. Mobile-first. *Reps run their shift in-app.*

**Phase 5 — Client surface (the showpiece).** Polished dashboard + reports (downloadable +
weekly email); **recordings + transcripts**; approvals (e-sign); requests; messages;
documents; self-serve billing. *Client experience is the "wow."*

**Phase 6 — Training, compliance, messaging, notifications, realtime.** Google Meet sessions
+ evaluations → agent go-live gate; compliance center + audit; full notification matrix;
realtime floor/dashboards/chat; hardening, load, observability.

---

## 8. Open decisions to confirm (before Phase 0)
1. **Dialer**: ViCidial confirmed? Version + do we get DB read-replica or API-only? Hosting?
2. **Hosting/stack**: one Next.js app on Vercel + Neon/Supabase Postgres — OK?
3. **Auth**: Auth.js vs Clerk vs custom JWT (Adam's was custom JWT).
4. **Email vendor**: Resend / Postmark / SendGrid.
5. **Realtime vendor**: Pusher / Ably / Supabase.
6. **E-sign**: lightweight click-accept vs DocuSign/Dropbox Sign.
7. **Billing rules**: exact hourly rates per campaign type, seat price, auto-bill cadence (bi-weekly confirmed), wallet-vs-card precedence.
8. **Live-rep**: business hours, which numbers/reps, sample-recording fallback.
9. **Recording storage + retention** policy; transcript provider (Whisper/Deepgram/AssemblyAI).
</content>
