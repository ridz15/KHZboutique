import type { MetadataRoute } from "next";
import { productCollections } from "./collections";

const siteUrl = "https://khzboutique.com";
const lastModified = new Date("2026-05-19");

const productImages = Array.from(
  new Set(
    productCollections.flatMap((collection) =>
      collection.variants.map((variant) => `${siteUrl}${variant.image}`),
    ),
  ),
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${siteUrl}/gallery/hero-banner.jpg`, ...productImages],
    },
  ];
}
