import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KHZ Boutique | Muslimah Syar'i Modern",
  description:
    "Landing page elegan untuk brand busana Muslimah syar'i dengan koleksi abaya, gamis, dan khimar premium.",
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
