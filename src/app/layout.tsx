import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://khzboutique.com"),
  title: {
    default: "KHZ Boutique | Modern Modest Wear",
    template: "%s | KHZ Boutique",
  },
  description:
    "KHZ Boutique menghadirkan abaya, kaftan, dan modest wear premium dengan nuansa lembut, feminin, dan elegan untuk Muslimah modern.",
  keywords: [
    "KHZ Boutique",
    "modest wear",
    "abaya premium",
    "kaftan muslimah",
    "busana muslimah",
    "fashion muslimah modern",
  ],
  authors: [{ name: "KHZ Boutique" }],
  creator: "KHZ Boutique",
  publisher: "KHZ Boutique",
  openGraph: {
    title: "KHZ Boutique | Modern Modest Wear",
    description:
      "Koleksi abaya, kaftan, dan modest wear premium dengan sentuhan lembut, anggun, dan timeless.",
    url: "https://khzboutique.com",
    siteName: "KHZ Boutique",
    images: [
      {
        url: "/gallery/hero-banner.jpg",
        width: 1884,
        height: 835,
        alt: "KHZ Boutique modern modest wear collection",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KHZ Boutique | Modern Modest Wear",
    description:
      "Abaya, kaftan, dan modest wear premium untuk tampilan Muslimah modern yang elegan.",
    images: ["/gallery/hero-banner.jpg"],
  },
  alternates: {
    canonical: "https://khzboutique.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
