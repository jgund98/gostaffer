"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Pauses heavy CSS animations (mesh backgrounds, floating orbs, signal rings)
 * whenever their section scrolls off-screen — so the browser only animates
 * what's visible. Purely a performance layer; nothing visual changes on screen.
 */
export function AnimationGate() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const targets = document.querySelectorAll<HTMLElement>(".mesh-animated, [data-anim]");
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          (e.target as HTMLElement).classList.toggle("anim-paused", !e.isIntersecting);
        }
      },
      { rootMargin: "240px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
