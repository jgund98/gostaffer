"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { NAV } from "@/lib/site";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { scrollToTop, lockScroll } from "@/lib/lenis-store";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActive(null);
  }, [pathname]);

  useEffect(() => {
    // Freeze Lenis (it otherwise hijacks the menu's touch scroll → glitchy) and
    // lock the background.
    document.documentElement.style.overflow = open ? "hidden" : "";
    lockScroll(open);
    return () => {
      document.documentElement.style.overflow = "";
      lockScroll(false);
    };
  }, [open]);

  // Every (site) page now opens with a dark hero, so the header is transparent
  // with light text at the top of any of them — until the user scrolls.
  const overHero = !scrolled && !open;

  const navIdle = overHero ? "text-white/75 hover:text-white" : "text-slate hover:text-ink";
  const navActive = overHero ? "text-white" : "text-ink";
  const pillBg = overHero ? "bg-white/10" : "bg-ink/[0.055]";

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        overHero
          ? "bg-transparent"
          : "bg-paper/95 shadow-[var(--shadow-sm)] backdrop-blur-xl"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Link
          href="/"
          aria-label="GoStaffer home"
          className="group flex shrink-0 items-center gap-2.5"
          onClick={() => {
            if (pathname === "/") scrollToTop();
          }}
        >
          <Logo white={overHero} className="h-10 transition-transform duration-300 group-hover:scale-[1.04] sm:h-11" />
        </Link>

        <nav
          className="hidden items-center gap-0.5 lg:flex"
          onMouseLeave={() => {
            setActive(null);
            setHovered(null);
          }}
        >
          {NAV.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            if (!item.children) {
              return (
                <div key={item.href} className="relative" onMouseEnter={() => setHovered(item.label)}>
                  {hovered === item.label && (
                    <motion.span
                      layoutId="nav-pill"
                      className={cn("absolute inset-0 -z-10 rounded-lg", pillBg)}
                      transition={{ type: "spring", stiffness: 480, damping: 38 }}
                    />
                  )}
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-3.5 py-2 text-sm font-medium transition-colors",
                      isActive ? navActive : navIdle
                    )}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            }
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => {
                  setActive(item.label);
                  setHovered(item.label);
                }}
              >
                {hovered === item.label && (
                  <motion.span
                    layoutId="nav-pill"
                    className={cn("absolute inset-0 -z-10 rounded-lg", pillBg)}
                    transition={{ type: "spring", stiffness: 480, damping: 38 }}
                  />
                )}
                <button
                  className={cn(
                    "flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors",
                    active === item.label || isActive ? navActive : navIdle
                  )}
                >
                  {item.label}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", active === item.label && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {active === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-0 top-full pt-3"
                    >
                      <div className="card w-72 rounded-2xl p-2">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="group flex flex-col gap-0.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-bone"
                          >
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                              {c.label}
                              <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-blue-600 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                            </span>
                            {c.desc && <span className="text-xs text-mute">{c.desc}</span>}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <Link
            href="/portal"
            className={cn("px-3.5 py-2 text-sm font-medium transition-colors", navIdle)}
          >
            Portal Login
          </Link>
          <Button href="/contact" size="sm">
            Get Started
          </Button>
        </div>

        <button
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-lg border lg:hidden",
            overHero ? "border-white/30 text-white" : "border-line-2 text-ink"
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>
    </header>

      {/* Mobile menu — rendered OUTSIDE <header> so the header's backdrop-filter
          doesn't become its containing block (which collapsed it to the bar). */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto overscroll-contain bg-paper lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {NAV.map((item) => (
                <MobileItem key={item.href} item={item} />
              ))}
              <div className="my-4 hairline" />
              <Link href="/portal" className="px-1 py-3 text-base font-medium text-slate">
                Portal Login
              </Link>
              <Button href="/contact" size="lg" className="mt-2 w-full">
                Get Started
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileItem({ item }: { item: (typeof NAV)[number] }) {
  const [exp, setExp] = useState(false);
  if (!item.children) {
    return (
      <Link href={item.href} className="px-1 py-3 text-lg font-semibold text-ink">
        {item.label}
      </Link>
    );
  }
  return (
    <div className="border-b border-line pb-1">
      <button
        onClick={() => setExp((v) => !v)}
        className="flex w-full items-center justify-between px-1 py-3 text-lg font-semibold text-ink"
      >
        {item.label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", exp && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {exp && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-0.5 pb-2 pl-3">
              {item.children.map((c) => (
                <Link key={c.href} href={c.href} className="py-2 text-base text-slate">
                  {c.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
