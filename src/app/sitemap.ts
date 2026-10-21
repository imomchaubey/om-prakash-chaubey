import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getEligibleFeaturedProjects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl.replace(/\/$/, "");
  const eligibleProjects = getEligibleFeaturedProjects();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2026-10-21T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...eligibleProjects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date("2026-10-21T00:00:00.000Z"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  return routes;
}
