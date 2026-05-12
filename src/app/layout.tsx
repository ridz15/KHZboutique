import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://khzboutique.com";
const brandName = "KHZ Boutique";
const title = "KHZ Boutique | Gamis, Abaya, Tunic Set & Kaftan Tanah Abang";
const description =
  "KHZ Boutique adalah brand fashion muslimah Indonesia dari Tanah Abang dengan koleksi gamis, abaya, tunic set, dan kaftan dress harga Rp150.000-300.000.";
const previewImage = "/gallery/hero-banner.jpg";
const favicon = "/favicon.ico";
const icon48 = "/icon-48x48.png";
const icon96 = "/icon-96x96.png";
const icon192 = "/icon-192x192.png";
const icon512 = "/icon-512x512.png";
const address = {
  streetAddress: "Metro 2, Lantai Dasar, Blok B No. 216, Tanah Abang",
  addressLocality: "Jakarta Pusat",
  addressRegion: "DKI Jakarta",
  addressCountry: "ID",
};
const products = ["Abaya", "Kaftan", "Gamis", "Tunik Set"];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: brandName,
  title: {
    default: title,
    template: `%s | ${brandName}`,
  },
  description,
  keywords: [
    "KHZ Boutique",
    "gamis muslimah",
    "abaya muslimah",
    "kaftan dress",
    "tunic set muslimah",
    "fashion muslimah Indonesia",
    "busana muslimah Tanah Abang",
    "boutique muslimah Tanah Abang",
    "Tanah Abang Jakarta",
  ],
  authors: [{ name: brandName, url: siteUrl }],
  creator: brandName,
  publisher: brandName,
  category: "fashion",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: favicon },
      { url: icon48, type: "image/png", sizes: "48x48" },
      { url: icon96, type: "image/png", sizes: "96x96" },
      { url: icon192, type: "image/png", sizes: "192x192" },
      { url: icon512, type: "image/png", sizes: "512x512" },
    ],
    shortcut: favicon,
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: brandName,
    images: [
      {
        url: previewImage,
        width: 1884,
        height: 835,
        alt: "KHZ Boutique abaya premium dan modest wear Muslimah elegan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        url: previewImage,
        alt: "KHZ Boutique abaya premium dan modest wear Muslimah elegan",
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const brandStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: brandName,
      alternateName: "KHZ",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${icon512}`,
        width: 512,
        height: 512,
      },
      image: `${siteUrl}${previewImage}`,
      description,
      sameAs: [
        "https://www.instagram.com/khzboutique.id",
        "https://shopee.co.id/khzboutique",
        "https://facebook.com/khzboutique.id/",
      ],
      brand: {
        "@type": "Brand",
        name: brandName,
      },
    },
    {
      "@type": "ClothingStore",
      "@id": `${siteUrl}/#local-business`,
      name: brandName,
      url: siteUrl,
      image: `${siteUrl}${previewImage}`,
      description:
        "Boutique muslimah di Tanah Abang Jakarta untuk gamis, abaya, tunic set, dan kaftan dress produksi tangan pertama.",
      telephone: "+62 895-3527-50251",
      priceRange: "Rp150.000-Rp300.000",
      address: {
        "@type": "PostalAddress",
        ...address,
      },
      areaServed: {
        "@type": "Country",
        name: "Indonesia",
      },
      parentOrganization: {
        "@id": `${siteUrl}/#organization`,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "KHZ Boutique Signature Collection",
        itemListElement: products.map((productName) => ({
          "@type": "OfferCatalog",
          name: productName,
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: brandName,
      description,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "id-ID",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
      ],
    },
  ],
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
