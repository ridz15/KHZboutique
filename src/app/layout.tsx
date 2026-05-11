import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://khzboutique.com";
const brandName = "KHZ Boutique";
const title = "KHZ Boutique | Abaya Premium, Kaftan & Modest Wear Muslimah";
const description =
  "KHZ Boutique menghadirkan abaya premium, kaftan muslimah, gamis premium, dan tunik set muslimah dengan nuansa soft luxury yang elegan dan timeless.";
const previewImage = "/gallery/hero-banner.jpg";
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
    "abaya premium",
    "kaftan muslimah",
    "gamis premium",
    "tunik set muslimah",
    "modest wear Muslimah",
    "fashion Muslimah modern",
    "boutique muslimah",
    "Tanah Abang Jakarta",
  ],
  authors: [{ name: brandName, url: siteUrl }],
  creator: brandName,
  publisher: brandName,
  category: "fashion",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
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
      logo: `${siteUrl}/icon.png`,
      image: `${siteUrl}${previewImage}`,
      description,
      sameAs: [
        "https://www.instagram.com/khzboutique",
        "https://shopee.co.id/khzboutique",
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
        "Boutique muslimah di Tanah Abang Jakarta untuk abaya premium, kaftan muslimah, gamis premium, dan tunik set muslimah bernuansa elegan.",
      telephone: "+62 895-3527-50251",
      priceRange: "Rp185.000-Rp260.000",
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
