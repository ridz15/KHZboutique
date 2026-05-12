import type { MetadataRoute } from "next";

const siteUrl = "https://khzboutique.com";
const brandName = "KHZ Boutique";
const description =
  "Abaya premium, kaftan muslimah, gamis premium, dan modest wear Muslimah elegan dari Tanah Abang Jakarta.";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brandName,
    short_name: "KHZ",
    description,
    start_url: siteUrl,
    scope: siteUrl,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#c1123a",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
