import type { Metadata } from "next";
import { Space_Grotesk, Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_DESC, organizationLd, websiteLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const HOME_TITLE = "GoStaffer — Outbound Call Center & Appointment Setting";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: "%s · GoStaffer",
  },
  description: SITE_DESC,
  applicationName: "GoStaffer",
  keywords: [
    "outbound call center services",
    "call center outsourcing services",
    "appointment setting services",
    "B2B lead generation call center",
    "customer support outsourcing",
    "inbound call answering service",
    "pay per minute call center",
    "offshore BPO services",
    "outsourced call center",
    "American call center company",
  ],
  authors: [{ name: "GoStaffer" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "GoStaffer",
    url: SITE_URL,
    title: HOME_TITLE,
    description: SITE_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE_DESC,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${serif.variable} ${mono.variable} antialiased`}
    >
      <body className="min-h-screen">
        <JsonLd data={[organizationLd(), websiteLd()]} />
        {children}
      </body>
    </html>
  );
}
