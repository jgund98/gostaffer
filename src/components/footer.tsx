import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NAV, CONTACT_EMAIL, HQ_LINE } from "@/lib/site";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/container";

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-frost">
      <Container className="relative py-16 pb-28 lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
          <div className="flex flex-col gap-5">
            <Logo className="h-8 self-start" />
            <p className="max-w-sm text-sm leading-relaxed text-slate">
              An American company with a world-class bilingual calling team in
              Cairo. We kick off in 24 hours and put trained sales and support
              agents on your phones in days — billed by the minute, zero setup fees.
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              <button
                type="button"
                className="inline-flex w-fit items-center gap-1 font-medium text-blade-700 link-underline"
              >
                Book a strategy call <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
              <a href={`mailto:${CONTACT_EMAIL}`} className="w-fit text-slate link-underline">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {NAV.filter((n) => n.children).map((col) => (
              <div key={col.href}>
                <Link
                  href={col.href}
                  className="text-xs font-bold uppercase tracking-[0.16em] text-ink"
                >
                  {col.label}
                </Link>
                <ul className="mt-4 space-y-2.5">
                  {col.children!.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="text-sm text-slate transition-colors hover:text-blade-700"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink">
                Why GoStaffer
              </span>
              <ul className="mt-4 space-y-2.5 text-sm text-slate">
                {[
                  { label: "How It Works", href: "/how-it-works" },
                  { label: "Human vs AI", href: "/solutions/human-vs-ai" },
                  { label: "Technology & AI", href: "/technology" },
                  { label: "Results", href: "/results" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-blue-700">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink">
                Company
              </span>
              <ul className="mt-4 space-y-2.5 text-sm text-slate">
                {[
                  { label: "About", href: "/about" },
                  { label: "Pricing", href: "/pricing" },
                  { label: "Get Started", href: "/contact" },
                  { label: "Portal Login", href: "/portal" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition-colors hover:text-blue-700">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-mute sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} GoStaffer · {HQ_LINE}</p>
          <div className="flex gap-5">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-ink">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
