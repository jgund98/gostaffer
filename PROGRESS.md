# CallBlade — Progress

Light, product-forward, multipage flagship for a premium outbound + support BPO. Built to make a successful business owner think "this solves my problem."

## Design (v2 — light / product-forward)
- **Light system**: white + cool-gray depth, electric-blue accent, real layered shadows, glass + blue-glow + dot/line-grid backdrops. Tokens in `globals.css`.
- **No pills**: buttons are rounded-[10px]; eyebrows/badges are squared or plain labels.
- **Two deliberate dark moments**: the live Command Center (a real "product screenshot" floating on light) and the final CTA band — everything else is light.
- **Official logo** wired (`/img/logo.png` + cropped icon `/img/mark.png`). Fonts: Space Grotesk (display) + Inter (body).
- **Custom, not templated**: varied section rhythm — split heroes, sticky two-columns, bento hairline grids, narrative comparison, editorial quote, accented stat band.

## Signature interactions (re-skinned for light)
1. **Cost calculator** — sliders, AI-cost stack bar, live savings count-up. Teaser on Home; full on Human-vs-AI + Pricing.
2. **Live Command Center** — dark product mockup: ticking KPIs, climbing dials, area chart, flipping agent rows, Slack ping. Hero visual + pauses off-screen.
3. **Integration flow** — your tools → CallBlade → phone → one screen, animated packets, "our reps / your team" toggle. Technology page.
4. **Blade-slice** — hero reveal + route-transition wipe (reduced-motion safe).

## Copy
Fully rewritten for non-technical, highly successful owners — benefit-led and plain ("win more customers on the phone without building a call center," "never miss a call," "pay only for the minutes they're talking"). Jargon removed (middleware, orchestration, STT/LLM/TTS, dispositions, KPI, BPO in body copy). Credible specifics kept (pay-per-minute, 24h, Cairo).

## SEO
- Keyword-tuned titles + descriptions + canonical on every page.
- JSON-LD Organization (`layout.tsx`), `sitemap.ts`, `robots.ts` (disallows `/portal`), `opengraph-image.tsx` social card.
- One `<h1>` per page, alt text, semantic landmarks.

## Accessibility / quality
- Contrast pass: darkened muted/slate text for AA; verified no hover state flips to pure dark/light (buttons keep white text on darker-blue hover; cards hover to near-white; dark surfaces use white text). No text sits over photos.
- `prefers-reduced-motion` honored; IntersectionObserver reveals; off-screen pausing.
- **`pnpm build` passes clean — 31 routes prerendered.**

## Still needed / TODO(owner)
- Wire lead-form submit + confirm `CONTACT_EMAIL`; confirm named integrations on Technology (`TODO(owner)` markers).
- Replace template Privacy/Terms with counsel-reviewed copy.
- Connect GitHub + Vercel (see `SETUP.md`) and push for a live preview URL.
- Live in-browser visual + Lighthouse QA (build + server-rendered content verified; interactive screenshot pass pending — machine was locked).
