import { SmoothScroll } from "@/components/smooth-scroll";
import { AnimationGate } from "@/components/animation-gate";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LiveRep } from "@/components/live-rep";
import { PromoPopup } from "@/components/promo-popup";

/* Marketing chrome lives here — the /portal app is intentionally outside this
   group, so it never renders the header, footer, or live-rep. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <AnimationGate />
      <Header />
      <main id="content">{children}</main>
      <Footer />
      <LiveRep />
      <PromoPopup />
      <div className="grain" aria-hidden />
    </>
  );
}
