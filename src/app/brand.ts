import { productCollections } from "./collections";

export const siteUrl = "https://khzboutique.com";
export const brandName = "KHZ Boutique";
export const siteTitle = "KHZ Boutique | Abaya, Kaftan & Gamis Muslimah Premium";
export const siteDescription =
  "Belanja abaya, kaftan, gamis, dan modest wear Muslimah premium dari KHZ Boutique Tanah Abang Jakarta. Desain elegan, bahan nyaman, dan pemesanan mudah via WhatsApp.";
export const previewImage = "/gallery/hero-banner.jpg";
export const whatsappNumber = "+62 895-3527-50251";
export const whatsappUrl = "https://wa.me/62895352750251";
export const instagramUrl = "https://www.instagram.com/khzboutique";
export const shopeeUrl = "https://shopee.co.id/khzboutique";
export const storeAddress = {
  streetAddress: "Metro 2, Lantai Dasar, Blok B No. 216, Tanah Abang",
  addressLocality: "Jakarta Pusat",
  addressRegion: "DKI Jakarta",
  addressCountry: "ID",
};

export const allProducts = productCollections.flatMap((collection) =>
  collection.variants.map((variant) => ({
    name: collection.name,
    ...variant,
  })),
);
