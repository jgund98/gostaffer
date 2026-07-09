import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { CtaBand } from "@/components/cta-band";
import { NAV } from "@/lib/site";

export const metadata: Metadata = {
  title: "Call Center Services by Industry",
  description: "Outbound and support teams trained for home services, insurance, solar, real estate, healthcare and more. Industry-ready agents on your phones in days.",
  alternates: { canonical: "/industries" },
};

export default function Industries() {
  const items = NAV.find((n) => n.href === "/industries")!.children!;
  return (
    <>
      <CollectionPage
        eyebrow="Industries"
        title="Teams that understand"
        highlight="your business"
        lead="Trained for the rules, the tone, and the realities of your industry — kicked off in 24 hours and live in days."
        items={items}
      />
      <CtaBand />
    </>
  );
}
