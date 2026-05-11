import { type Product, productCollections } from "./collections";
import {
  allProducts,
  brandName,
  instagramUrl,
  previewImage,
  shopeeUrl,
  siteDescription,
  siteTitle,
  siteUrl,
  storeAddress,
  whatsappNumber,
  whatsappUrl,
} from "./brand";

function priceToNumber(price: string) {
  return price.replace(/[^0-9]/g, "");
}

function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

function getProductSlug(product: Pick<Product, "name" | "color">) {
  return `${product.name}-${product.color}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const brandStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ClothingStore"],
      "@id": `${siteUrl}/#organization`,
      name: brandName,
      alternateName: "KHZ",
      url: siteUrl,
      logo: absoluteUrl("/icon.png"),
      image: absoluteUrl(previewImage),
      description: siteDescription,
      telephone: whatsappNumber,
      address: {
        "@type": "PostalAddress",
        ...storeAddress,
      },
      areaServed: {
        "@type": "Country",
        name: "Indonesia",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: whatsappNumber,
        contactType: "customer service",
        areaServed: "ID",
        availableLanguage: ["id", "en"],
      },
      sameAs: [instagramUrl, shopeeUrl],
      brand: {
        "@type": "Brand",
        name: brandName,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Koleksi KHZ Boutique",
        itemListElement: productCollections.map((collection) => ({
          "@type": "OfferCatalog",
          name: collection.name,
          itemListElement: collection.variants.map((variant) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: `${collection.name} warna ${variant.color}`,
              category: "Modest Wear Muslimah",
            },
            priceCurrency: "IDR",
            price: priceToNumber(variant.price),
            availability: "https://schema.org/InStock",
          })),
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: brandName,
      description: siteDescription,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "id-ID",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: siteTitle,
      description: siteDescription,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#organization`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: absoluteUrl(previewImage),
      },
      breadcrumb: {
        "@id": `${siteUrl}/#breadcrumb`,
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
          name: "Beranda",
          item: siteUrl,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#products`,
      name: "Koleksi Abaya, Kaftan, Gamis, dan Tunic Set KHZ Boutique",
      itemListElement: allProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          "@id": `${siteUrl}/#${getProductSlug(product)}`,
          name: `${product.name} warna ${product.color}`,
          description: `${product.name} warna ${product.color} dari KHZ Boutique, koleksi modest wear Muslimah premium yang nyaman dan elegan.`,
          image: absoluteUrl(product.image),
          brand: {
            "@type": "Brand",
            name: brandName,
          },
          category: "Modest Wear Muslimah",
          offers: {
            "@type": "Offer",
            url: `${whatsappUrl}?text=${encodeURIComponent(
              `Assalamualaikum KHZ Boutique, saya ingin tanya ${product.name} warna ${product.color}.`,
            )}`,
            priceCurrency: "IDR",
            price: priceToNumber(product.price),
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
          },
        },
      })),
    },
  ],
};
