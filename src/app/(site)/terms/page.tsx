import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  robots: { index: false },
};

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="June 2026"
      sections={[
        {
          h: "Acceptance of terms",
          p: "By accessing or using the GoStaffer website and services, you agree to these Terms of Service. If you do not agree, please do not use the site.",
        },
        {
          h: "Services",
          p: "GoStaffer provides business process outsourcing and related software services. Specific deliverables, pricing, and service levels are governed by the separate agreement executed with each client.",
        },
        {
          h: "Billing",
          p: "Services are billed on a pay-per-minute, credit-first basis unless otherwise agreed. You are responsible for maintaining a sufficient wallet balance for active campaigns.",
        },
        {
          h: "Acceptable use",
          p: "You agree not to use our services for any unlawful purpose or in violation of applicable telemarketing, privacy, or consumer-protection regulations.",
        },
        {
          h: "Limitation of liability",
          p: "To the maximum extent permitted by law, GoStaffer is not liable for indirect, incidental, or consequential damages arising from use of the site or services.",
        },
        {
          h: "Contact",
          p: "Questions about these terms can be directed to hello@gostaffer.com.",
        },
      ]}
    />
  );
}
