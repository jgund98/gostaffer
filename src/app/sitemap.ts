import type { MetadataRoute } from "next";
import { serviceSlugs, solutionSlugs, industrySlugs } from "@/lib/pages-content";

const SITE = "https://www.gostaffer.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/services",
    "/services/outbound",
    "/solutions",
    "/solutions/human-vs-ai",
    "/industries",
    "/how-it-works",
    "/results",
    "/technology",
    "/pricing",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const dynamic = [
    ...serviceSlugs.map((s) => `/services/${s}`),
    ...solutionSlugs.map((s) => `/solutions/${s}`),
    ...industrySlugs.map((s) => `/industries/${s}`),
  ];

  return [...staticPaths, ...dynamic].map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
