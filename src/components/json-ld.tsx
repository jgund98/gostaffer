/** Renders one schema.org object or an array (as @graph) into a JSON-LD script tag. */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}
