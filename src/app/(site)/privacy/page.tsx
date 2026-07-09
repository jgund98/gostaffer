import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: { index: false },
};

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 2026"
      sections={[
        {
          h: "Overview",
          p: "GoStaffer respects your privacy. This policy explains what information we collect when you use our website and services, how we use it, and the choices you have.",
        },
        {
          h: "Information we collect",
          p: "We collect information you provide directly — such as your name, company, email, and phone number when you request a team or book a call — as well as standard technical data like IP address and browser type for security and analytics.",
        },
        {
          h: "How we use information",
          p: "We use your information to respond to inquiries, deliver and improve our services, and communicate with you about your campaigns. We do not sell your personal information.",
        },
        {
          h: "Data security",
          p: "We apply administrative, technical, and physical safeguards designed to protect your information. Campaign data is handled inside controlled systems with role-based access.",
        },
        {
          h: "Your choices",
          p: "You may request access to, correction of, or deletion of your personal information by contacting us. You can opt out of marketing communications at any time.",
        },
        {
          h: "Contact",
          p: "Questions about this policy can be directed to hello@gostaffer.com.",
        },
      ]}
    />
  );
}
