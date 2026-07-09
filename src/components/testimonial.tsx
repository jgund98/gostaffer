import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { Eyebrow } from "@/components/ui/section";
import { TESTIMONIAL } from "@/lib/site";

export function Testimonial() {
  return (
    <Section tone="paper">
      <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
        <Reveal className="lg:max-w-[14rem]">
          <Eyebrow>Proof</Eyebrow>
          <p className="mt-4 text-sm leading-relaxed text-slate">
            Real results from teams that swapped headcount for precision.
          </p>
        </Reveal>
        <Reveal>
          <figure className="border-l-2 border-blade-500 pl-7 sm:pl-10">
            <blockquote className="text-balance font-display text-2xl font-medium leading-[1.25] text-ink sm:text-[2rem]">
              “{TESTIMONIAL.quote}”
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-blade-tint font-display font-bold text-blade-700">
                {TESTIMONIAL.name.split(" ").map((p) => p[0]).join("")}
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{TESTIMONIAL.name}</span>
                <span className="block text-sm text-mute">{TESTIMONIAL.role}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
