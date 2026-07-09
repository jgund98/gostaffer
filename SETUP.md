# CallBlade — Setup & Deploy

Flagship rebuild of callblade.com. **Next.js 16 (App Router) · TypeScript · Tailwind 4 · Framer Motion · Lenis · GSAP.**

## Local development

```bash
pnpm install          # build scripts for sharp are pre-approved in pnpm-workspace.yaml
pnpm dev --port 3800  # http://localhost:3800
pnpm build            # production build (must pass before every push)
pnpm start            # serve the production build
```

> **pnpm note:** native build scripts (`sharp`, `@tailwindcss/oxide`, `unrs-resolver`)
> are allow-listed in `pnpm-workspace.yaml` so installs run non-interactively.

## Connect a repo (GitHub)

```bash
git init
git add -A
git commit -m "feat: CallBlade flagship site rebuild"
git branch -M main
git remote add origin https://github.com/<you>/callblade.git
git push -u origin main
```

## Deploy (Vercel)

1. Import the GitHub repo at https://vercel.com/new.
2. Framework preset: **Next.js** (auto-detected). No build settings needed.
3. Deploy. Every push to `main` → production; every PR → a preview URL.
4. Point `callblade.com` at the Vercel project under **Settings → Domains**.

CLI alternative:

```bash
pnpm dlx vercel        # first run links/creates the project
pnpm dlx vercel --prod # promote to production
```

## Environment / integrations to wire at launch

Everything ships working as a static marketing site. These are the stubs to connect:

| What | Where | Action |
|------|-------|--------|
| Lead form submit | `src/components/lead-form.tsx` | POST to your CRM/email endpoint (currently a simulated success). |
| Portal login | `src/components/portal-login.tsx` | Opens `PORTAL_URL`; real auth lives in the Portal app. Do **not** add auth here. |
| Contact email | `src/lib/site.ts` → `CONTACT_EMAIL` | Confirm the real address (placeholder `hello@callblade.com`). |
| Calendar | `src/lib/site.ts` → `CALENDAR_URL` | Already set to the provided Google Calendar link. |
| Named integrations | `src/app/technology/page.tsx`, `src/lib/pages-content.ts` | Replace `TODO(owner)` once specific tools/integrations are confirmed. |
| Legal copy | `src/app/privacy`, `src/app/terms` | Replace template copy with counsel-reviewed versions. |

## Assets

Real media pulled into `/public`:
- `public/media/hero.mp4` — home hero background (reused from current site).
- `public/img/logo.png` — original logo (the SVG `Mark` in `src/components/logo.tsx` is used in-app; PNG kept as fallback/reference).
- `public/img/outbound-hero.png` — Outbound page hero image.

> The AI-stock images on `lh3.googleusercontent.com` from the old site were **not** hot-linked. Add upgraded, dark+blue-graded art into `/public/img` and reference where useful (team/about/ops sections currently use brand graphics, not stock).
