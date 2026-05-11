import type { Metadata } from "next";
import "./globals.css";
import {
  brandName,
  previewImage,
  shopeeUrl,
  siteDescription,
  siteTitle,
  instagramUrl,
  siteUrl,
} from "./brand";
import { brandStructuredData } from "./seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: brandName,
  title: {
    default: siteTitle,
    template: `%s | ${brandName}`,
  },
  description: siteDescription,
  keywords: [
    "KHZ Boutique",
    "KHZ Boutique Tanah Abang",
    "KHZ Boutique Jakarta",
    "abaya muslimah premium",
    "kaftan muslimah premium",
    "gamis muslimah premium",
    "modest wear Muslimah",
    "tunic set muslimah",
    "boutique muslimah Jakarta",
    "fashion muslimah modern Indonesia",
  ],
  authors: [{ name: brandName }],
  creator: brandName,
  publisher: brandName,
  category: "fashion",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: brandName,
    images: [
      {
        url: previewImage,
        width: 1884,
        height: 835,
        alt: "KHZ Boutique koleksi abaya kaftan gamis Muslimah premium",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [previewImage],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "id-ID": siteUrl,
    },
  },
  other: {
    "instagram:profile": instagramUrl,
    "product:retailer_item_id": brandName,
    "marketplace:shopee": shopeeUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(brandStructuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
