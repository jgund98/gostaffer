import { Mark } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden bg-paper px-5 text-center">
      <div className="dot-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(50%_50%_at_50%_50%,black,transparent)]" />
      <div className="absolute left-1/2 top-1/2 h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blade-400/15 blur-[100px]" />
      <Mark className="relative h-14 w-14" />
      <h1 className="relative mt-6 font-display text-6xl font-bold text-ink">404</h1>
      <p className="relative mt-3 max-w-sm text-slate">
        That page got cut. Let&apos;s get you back to something sharp.
      </p>
      <div className="relative mt-8 flex gap-3">
        <Button href="/">Back home</Button>
        <Button href="/contact" variant="secondary">Get started</Button>
      </div>
    </section>
  );
}
