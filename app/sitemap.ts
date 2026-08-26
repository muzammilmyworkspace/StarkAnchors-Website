import type { MetadataRoute } from "next";
import { logs } from "@/data/logs";
import { site } from "@/data/site";

/**
 * Sitemap.
 *
 * `lastModified` for the logs comes from the entry's own date rather
 * than from build time — telling a crawler that every article changed
 * the moment you deployed is both untrue and counterproductive.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/pricing`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/engineering-logs`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/diagnostic`, changeFrequency: "yearly", priority: 0.9 },
  ];

  const logRoutes: MetadataRoute.Sitemap = logs.map((entry) => ({
    url: `${site.url}/engineering-logs/${entry.slug}`,
    lastModified: new Date(`${entry.date}T00:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...logRoutes];
}
