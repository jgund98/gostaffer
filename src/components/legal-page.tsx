import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { h: string; p: string }[];
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lead={`Last updated ${updated}.`} cta={false} />
      <section className="bg-paper py-[var(--section-y)]">
        <Container className="max-w-3xl">
          <div className="flex flex-col gap-10">
            {sections.map((s, i) => (
              <div key={i}>
                <h2 className="font-display text-xl font-semibold text-ink">{s.h}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate">{s.p}</p>
              </div>
            ))}
            <p className="text-xs text-mute">
              This is template legal copy provided for the site build. TODO(owner): replace with
              counsel-reviewed Privacy Policy and Terms before launch.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
