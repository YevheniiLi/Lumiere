import type { MetadataRoute } from "next";
import { destinations } from "@/data/destinations";

const base = "https://lumiere-travel.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${base}/destinations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${base}/plan`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((destination) => ({
    url: `${base}/destinations/${destination.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...destinationRoutes];
}
