/* ============================================================
   Centralized SEO: canonical host + schema.org JSON-LD builders.
   Render output with <JsonLd data={...} /> (components/json-ld.tsx).
   ============================================================ */

// Canonical/OG host. Resolves to the live deploy host, then the production
// domain. Set NEXT_PUBLIC_SITE_URL in Vercel to pin the final canonical domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://gostaffer.com");

export const SITE_NAME = "GoStaffer";

export const SITE_DESC =
  "American company with an elite bilingual team in Alexandria. Outbound sales, appointment setting, lead generation, inbound answering & customer support — on your phones in days, billed by the minute.";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** The GoStaffer entity — Organization + ProfessionalService (no fabricated phone/street). */
export function organizationLd() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: "GoStaffer",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/img/logo.png` },
    image: `${SITE_URL}/opengraph-image`,
    description: SITE_DESC,
    slogan: "Win more customers on the phone — without the call center.",
    email: "hello@gostaffer.com",
    foundingDate: "2015",
    priceRange: "$$",
    knowsLanguage: ["English", "Arabic"],
    areaServed: { "@type": "Country", name: "United States" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "West Palm Beach",
      addressRegion: "FL",
      addressCountry: "US",
    },
    sameAs: [] as string[],
  };
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function serviceLd(input: { name: string; description: string; path: string; serviceType?: string }) {
  return {
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType ?? input.name,
    url: `${SITE_URL}${input.path}`,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United States" },
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function aggregateRatingLd(input: { ratingValue: number; reviewCount: number }) {
  return {
    "@type": "AggregateRating",
    itemReviewed: { "@id": ORG_ID },
    ratingValue: input.ratingValue,
    bestRating: 5,
    reviewCount: input.reviewCount,
  };
}
