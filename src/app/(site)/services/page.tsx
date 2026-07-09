import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { CtaBand } from "@/components/cta-band";
import { NAV } from "@/lib/site";

export const metadata: Metadata = {
  title: "Call Center Services — Outbound, Inbound & Support",
  description: "Outbound sales, appointment setting, lead generation, inbound answering and customer support — trained agents on your phones in days, billed by the minute.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  const items = NAV.find((n) => n.href === "/services")!.children!;
  return (
    <>
      <CollectionPage
        eyebrow="Services"
        title="A trained team for"
        highlight="every kind of call"
        lead="Outbound calls, inbound calls, customer support, and technical help — friendly, professional agents, kicked off in 24 hours and live in days."
        items={items}
      />
      <CtaBand />
    </>
  );
}
