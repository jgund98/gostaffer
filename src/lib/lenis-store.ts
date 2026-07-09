import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  lenis = l;
}

/** Freeze/unfreeze Lenis — used to lock background scroll behind the mobile menu. */
export function lockScroll(lock: boolean) {
  if (!lenis) return;
  if (lock) lenis.stop();
  else lenis.start();
}

/** Jump (or smooth-scroll) to the very top, using Lenis when available. */
export function scrollToTop(immediate = false) {
  if (lenis) {
    lenis.scrollTo(0, { immediate, force: true });
    return;
  }
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
  }
}
