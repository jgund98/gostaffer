# CallBlade — SEO Strategy & Execution Plan

> Owner: marketing/eng. Goal: rank organically for **offshore BPO / outbound call
> center / appointment-setting / lead-gen / customer-support outsourcing** queries.
> Approach: match the content depth of the companies that rank (Helpware, GigaBPO,
> Outsource Accelerator, Giva) and **beat them on structured data + page speed +
> a sharper differentiator**.

---

## 0. Business model (the thing we're optimizing for)

CallBlade = a **premium, American-accountable BPO** (HQ Fort Lauderdale, FL) with an
**elite bilingual calling team in Cairo, Egypt**. Services: outbound sales, appointment
setting, lead generation, inbound answering, customer support, technical support — **plus**
technology/AI implementation (integrations, AI assist, automation, dashboards, middleware).

**Commercial model:** billed **hourly (~$12/hr all-in)**, marketed **per-minute ($0.20/min)**;
no platform fees, no long contracts; kickoff in 24h, live in days. 10+ yrs, 150+ agents.

**The wedge (our SEO differentiator):** *American company you can hold accountable +
offshore pricing + real bilingual humans amplified by AI* — explicitly **not** a faceless
mega call center and **not** an AI robocaller. This is the angle to repeat across the site.

**ICP / searcher:** SMB–midmarket founders, VPs of Sales/Growth, ops leaders in home
services, insurance, solar, real estate, healthcare, e-commerce, SaaS, etc., who want to
outsource calling without hiring — and want US accountability.

## 1. Competitive landscape (validated)
- **Pricing market:** offshore agents $6–18/hr (US $29+); appointment setting $150–500/booked
  or $15–50/hr; lead-gen retainers $2–10k/mo. → CallBlade's $12/hr is squarely competitive
  offshore **with** US accountability = strong, ownable positioning.
- **Who ranks & how:** Helpware (3,500+ word service pages, 10-Q FAQ, ratings, service+
  industry+location internal linking, "AI + human" messaging); listicle/ranking pages
  (Outsource Accelerator, Giva, GigaBPO) own "best call center outsourcing companies";
  "how much does it cost to outsource a call center" is a high-intent informational money term.
- **Their weakness:** thin/absent schema.org markup. **Our edge.**

---

## 2. Keyword strategy — clusters → pages

| Page | Primary keyword | Secondary |
|---|---|---|
| Home `/` | outbound call center services | bilingual BPO, US-run offshore call center, pay-per-minute call center |
| Services `/services` | call center outsourcing services | inbound & outbound call center, customer support outsourcing |
| Outbound `/services/outbound` | outbound call center services | appointment setting services, B2B lead generation call center, cold calling services |
| Industries `/industries` | call center services by industry | industry-specific BPO, vertical call center |
| Industry `/industries/[x]` | [industry] call center services | [industry] answering service, [industry] appointment setting |
| Technology `/technology` | call center technology & AI services | BPO CRM integration, AI agent assist, dialer integration |
| Results `/results` | outbound call center case studies | call center ROI, BPO results |
| Pricing `/pricing` | call center outsourcing cost / pricing | how much does a call center cost, per-minute call center pricing |
| How it works `/how-it-works` | how call center outsourcing works | call center onboarding, set up a calling team |
| About `/about` | American BPO company | offshore call center US company, Cairo call center |
| Human vs AI `/solutions/human-vs-ai` | AI vs human call center | AI calling cost, AI vs live agents |
| Contact `/contact` | get an outbound calling team | hire a call center, outsource calling |

**Informational/blog targets (Phase 5):** "how much does it cost to outsource a call center",
"offshore vs nearshore vs onshore call center", "what is appointment setting", "in-house vs
outsourced sales team", "how to choose a BPO", "outbound call center best practices",
"is offshore customer support good" + a **glossary** of BPO/call-center terms.

---

## 3. Title + meta rewrite (consistent, keyword-led) — Phase 2
Template: page title `%s · CallBlade` (≤60 chars total). Descriptions ~150–160 chars, with
the differentiator + a soft CTA. (Fixes the lowercase/casing inconsistency on Results, How It
Works, Technology.) Exact strings implemented in each page's `metadata`.

## 4. Structured data (schema.org) — Phase 3, **our ranking edge**
- Global (layout): **Organization**, **LocalBusiness** (FL HQ), **WebSite + SearchAction**.
- **Service** schema on each service page.
- **FAQPage** on every page with an FAQ (How It Works, Technology, Pricing, Industry/Service
  templates) → FAQ rich results.
- **BreadcrumbList** on deep pages.
- **Review / AggregateRating** on Results (testimonials).
Centralized in `src/lib/seo.ts` + `<JsonLd>` component.

## 5. On-page & technical — Phase 2/4
- One keyword-led **H1** per page; clean H2/H3 outline.
- **Alt text** on logos/icons/the call-network map.
- **Internal linking**: services ↔ industries ↔ solutions ↔ technology + **breadcrumbs**.
- **Core Web Vitals**: audit LCP/INP (heavy hero motion) — defer/trim where it hurts.
- Sitemap/robots already solid; extend as pages are added.

## 6. Content depth — Phase 4
Expand service/industry/solution pages to 800–1,500 words (problem → solution → process →
results → FAQ → CTA). Add FAQ where missing. Comparison pages (vs in-house, offshore vs
domestic, human vs AI).

## 7. Content engine / authority — Phase 5
Resource center/blog (pillar+cluster), glossary, full case-study pages (with schema).

## 8. Measurement & off-page — Phase 6 (advisory)
GA4 + Google Search Console + Bing tags (verify domains); Google Business Profile (FL);
directory/citation + PR backlinks; rank tracking for §2 terms.

---

## ⚠️ Critical: production domain
Metadata/sitemap/canonicals use **`https://www.callblade.com`**, but the live deploy is
**`v2.callblade.com`**. Canonicals must point at the **indexable production host**. Assumption
for now: production = `https://www.callblade.com` (v2 = preview/staging). Centralized as
`SITE_URL` in `src/lib/seo.ts` — change in one place if that's wrong.

---

## Execution status
- [x] Phase 1 — keyword map (this doc)
- [x] Phase 2 — titles + meta rewritten (all 11 core pages, consistent Title Case, keyword-led); canonical centralized in `src/lib/seo.ts`
- [x] Phase 3 — structured data live: Organization + ProfessionalService + WebSite (global); Service + FAQPage + BreadcrumbList on every industry/service/solution page; FAQPage + Breadcrumb on How It Works / Technology / Pricing. Toolkit: `src/lib/seo.ts` + `<JsonLd>`.
- [ ] Phase 3b — remaining schema: AggregateRating/Review on Results; Service + FAQPage on the bespoke `/services/outbound` page (it's custom, not templated)
- [ ] Phase 4 — content depth (800–1,500 words) + FAQs on thin pages; H1/alt-text/internal-link audit; Core Web Vitals pass
- [ ] Phase 5 — blog + glossary + case studies
- [ ] Phase 6 — analytics/GSC handoff (verify `NEXT_PUBLIC_SITE_URL` = final canonical domain)

**Also fixed:** removed a `TODO(owner)` that was leaking into the live Technology FAQ.
