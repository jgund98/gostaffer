import type { Metadata } from "next";
import { PortalShell } from "@/components/portal/shell";

export const metadata: Metadata = {
  title: "Portal",
  robots: { index: false },
};

export default function PortalAppLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>;
}
