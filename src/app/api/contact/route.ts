import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export const runtime = "nodejs";

/* --- config (env-overridable, sensible defaults baked in) --- */
const TEMPLATE_ID = process.env.SENDGRID_LEAD_TEMPLATE_ID || "d-c4c48c934066400b942dc7dd5d486ca4";
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "noreply@gostaffer.com";
const TO_EMAILS = (process.env.LEAD_TO_EMAILS ||
  "jordan.gundlach@gostaffer.com,adam.awany@gostaffer.com,kimberly@gostaffer.com")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_ORIGINS = new Set([
  "https://gostaffer.com",
  "https://www.gostaffer.com",
  "https://v2.gostaffer.com",
]);

// Best-effort in-memory rate limit (per warm serverless instance — not global,
// but enough to blunt bursts from a single source without a KV store).
const RATE = new Map<string, number[]>();
function rateLimited(ip: string, max = 4, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const arr = (RATE.get(ip) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  RATE.set(ip, arr);
  return arr.length > max;
}

const linkCount = (s: string) => (s.match(/https?:\/\/|www\./gi) || []).length;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = str(body.name);
  const company = str(body.company);
  const email = str(body.email);
  const phone = str(body.phone);
  const volume = str(body.volume);
  const message = str(body.message);
  const honeypot = str(body.company_website); // hidden field; bots fill it
  const formTs = Number(str(body.form_ts));   // client mount time (ms)

  // --- spam defenses (layered) ---------------------------------------------
  // Flagged bots get a silent { ok: true } so they think it worked and don't
  // adapt; no email is sent. Genuine validation errors still return 400.
  const isProd = process.env.NODE_ENV === "production";
  const origin = req.headers.get("origin");

  // 1) Cross-origin POST — script bots hitting the API directly.
  if (isProd && origin && !ALLOWED_ORIGINS.has(origin)) {
    console.warn("[contact] blocked: bad origin", origin);
    return NextResponse.json({ ok: false, error: "Forbidden." }, { status: 403 });
  }

  // 2) Honeypot filled.
  if (honeypot) return NextResponse.json({ ok: true });

  // Validate required fields (real users see these).
  if (!name || !company || !email) {
    return NextResponse.json({ ok: false, error: "Please fill in name, company, and work email." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "That email doesn't look right." }, { status: 400 });
  }

  // 3) Submitted implausibly fast (humans take >3s on a 6-field form).
  if (formTs > 0 && Date.now() - formTs < 3000) {
    console.warn("[contact] blocked: too fast");
    return NextResponse.json({ ok: true });
  }

  // 4) Content heuristics — links in name/company, or spammy payloads.
  if (
    /(https?:\/\/|www\.|\[url|\[link|<a\s)/i.test(`${name} ${company}`) ||
    linkCount(message) > 3 ||
    /\b(viagra|cialis|casino|escort|porn|loan offer|bitcoin doubler|seo services)\b/i.test(`${name} ${company} ${message}`)
  ) {
    console.warn("[contact] blocked: spam heuristic");
    return NextResponse.json({ ok: true });
  }

  // 5) Per-IP rate limit (best-effort, per warm instance).
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (isProd && rateLimited(ip)) {
    console.warn("[contact] blocked: rate limit", ip);
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error("[contact] SENDGRID_API_KEY is not set");
    return NextResponse.json({ ok: false, error: "Email is not configured yet." }, { status: 500 });
  }
  sgMail.setApiKey(apiKey);

  const submitted_at = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date()) + " ET";

  try {
    await sgMail.send({
      to: TO_EMAILS,
      from: { email: FROM_EMAIL, name: "GoStaffer Website" },
      replyTo: { email, name: name || undefined },
      templateId: TEMPLATE_ID,
      isMultiple: true, // one message per recipient; keeps addresses private
      dynamicTemplateData: {
        full_name: name,
        company,
        email,
        phone,
        call_volume: volume,
        message,
        submitted_at,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    // Surface SendGrid's detail in logs without leaking it to the client.
    const detail =
      typeof err === "object" && err !== null && "response" in err
        ? (err as { response?: { body?: unknown } }).response?.body
        : err;
    console.error("[contact] SendGrid send failed:", JSON.stringify(detail));
    return NextResponse.json(
      { ok: false, error: "We couldn't send that right now. Please email us directly." },
      { status: 502 }
    );
  }
}
