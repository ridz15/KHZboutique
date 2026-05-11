import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://khzboutique.com";
const brandName = "KHZ Boutique";
const title = "KHZ Boutique | Abaya, Kaftan & Modest Wear Muslimah";
const description =
  "KHZ Boutique menghadirkan abaya, kaftan, gamis, dan modest wear Muslimah dengan desain elegan, bahan nyaman, dan nuansa premium yang timeless.";
const previewImage = "/gallery/hero-banner.jpg";

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
    "KHZ Boutique Indonesia",
    "abaya muslimah",
    "kaftan muslimah",
    "gamis premium",
    "modest wear Muslimah",
    "boutique muslimah",
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
    title,
    description,
    url: siteUrl,
    siteName: brandName,
    images: [
      {
        url: previewImage,
        width: 1884,
        height: 835,
        alt: "KHZ Boutique premium modest wear Muslimah collection",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [previewImage],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const brandStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ClothingStore"],
      "@id": `${siteUrl}/#organization`,
      name: brandName,
      alternateName: "KHZ",
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      image: `${siteUrl}${previewImage}`,
      description,
      telephone: "+62 895-3527-50251",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Metro 2, Lantai Dasar, Blok B No. 216, Tanah Abang",
        addressLocality: "Jakarta Pusat",
        addressRegion: "DKI Jakarta",
        addressCountry: "ID",
      },
      areaServed: {
        "@type": "Country",
        name: "Indonesia",
      },
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
