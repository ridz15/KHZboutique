import type { MetadataRoute } from "next";

const siteUrl = "https://khzboutique.com";
const lastModified = new Date("2026-05-12");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        `${siteUrl}/gallery/hero-banner.jpg`,
        `${siteUrl}/gallery/A-black.jpg`,
        `${siteUrl}/gallery/kaftan-wulan-maroon.jpg`,
        `${siteUrl}/gallery/C-black.jpg`,
        `${siteUrl}/gallery/D-blue.jpg`,
      ],
    },
  ];
}
