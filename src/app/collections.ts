export type Product = {
  name: string;
  category: string;
  color: string;
  image: string;
  price: string;
};

// Edit this list to add, remove, or replace product collections.
export const productCollections: {
  name: string;
  category: string;
  variants: Omit<Product, "name" | "category">[];
}[] = [
  {
    name: "Abaya Aisyah",
    category: "Abaya",
    variants: [
      { color: "Black", image: "/gallery/A-black.jpg", price: "Rp 260.000" },
      { color: "Brown", image: "/gallery/A-brown.jpg", price: "Rp 260.000" },
      { color: "Grey", image: "/gallery/A-grey.jpg", price: "Rp 260.000" },
      { color: "Maroon", image: "/gallery/A-maroon.jpg", price: "Rp 260.000" },
    ],
  },
  {
    name: "Kaftan Wulan",
    category: "Kaftan",
    variants: [
      { color: "Maroon", image: "/gallery/kaftan-wulan-maroon.jpg", price: "Rp 185.000" },
      { color: "Rose", image: "/gallery/kaftan-wulan-purple.jpg", price: "Rp 185.000" },
      { color: "Broken White", image: "/gallery/kaftan-wulan-white.jpg", price: "Rp 185.000" },
      { color: "White", image: "/gallery/kaftan-wulan-white-bright.jpg", price: "Rp 185.000" },
      { color: "Blue", image: "/gallery/kaftan-wulan-blue.jpg", price: "Rp 185.000" },
    ],
  },
  {
    name: "Kaftan Viscos",
    category: "Kaftan",
    variants: [
      { color: "Black", image: "/gallery/kaftan-viscos-black.jpg", price: "Rp 140.000" },
      { color: "Peach", image: "/gallery/kaftan-viscos-peach.jpg", price: "Rp 140.000" },
      { color: "Pink", image: "/gallery/kaftan-viscos-pink.jpg", price: "Rp 140.000" },
      { color: "Yellow", image: "/gallery/kaftan-viscos-yellow.jpg", price: "Rp 140.000" },
    ],
  },
  {
    name: "Gamis Nayla",
    category: "Gamis",
    variants: [
      { color: "Black", image: "/gallery/C-black.jpg", price: "Rp 190.000" },
      { color: "Blue", image: "/gallery/C-blue.jpg", price: "Rp 190.000" },
      { color: "Brown", image: "/gallery/C-brown.jpg", price: "Rp 190.000" },
      { color: "Peach", image: "/gallery/C-peach.jpg", price: "Rp 190.000" },
      { color: "Purple", image: "/gallery/C-purple.jpg", price: "Rp 190.000" },
    ],
  },
  {
    name: "Tunic Set Zahra",
    category: "Tunic Set",
    variants: [
      { color: "Blue", image: "/gallery/D-blue.jpg", price: "Rp 240.000" },
      { color: "Brown", image: "/gallery/D-brown.jpg", price: "Rp 240.000" },
      { color: "Maroon", image: "/gallery/D-maroon.jpg", price: "Rp 240.000" },
      { color: "Purple", image: "/gallery/D-purple.jpg", price: "Rp 240.000" },
    ],
  },
  {
    name: "Abaya Kafta",
    category: "Abaya",
    variants: [
      { color: "Black", image: "/gallery/abaya-kafta-hitam.jpg", price: "Rp 240.000" },
      { color: "Grey", image: "/gallery/abaya-kafta-abu.jpg", price: "Rp 240.000" },
      { color: "Dusty Rose", image: "/gallery/abaya-kafta-pink-gelap.jpg", price: "Rp 240.000" },
    ],
  },
  {
    name: "Abaya Anindya",
    category: "Abaya",
    variants: [
      { color: "Black", image: "/gallery/abaya-anindya-black.jpg", price: "Rp 240.000" },
      { color: "Salmon", image: "/gallery/abaya-anindya-salmon.jpg", price: "Rp 240.000" },
      { color: "Burgundy", image: "/gallery/abaya-anindya-burgundy.jpg", price: "Rp 240.000" },
    ],
  },
  {
    name: "Kaftan Donatelo",
    category: "Kaftan",
    variants: [
      { color: "Black", image: "/gallery/kaftan-donatelo-hitam.jpg", price: "Rp 165.000" },
      { color: "Maroon", image: "/gallery/kaftan-donatelo-marun.jpg", price: "Rp 165.000" },
      { color: "Navy", image: "/gallery/kaftan-donatelo-navy.jpg", price: "Rp 165.000" },
    ],
  },
  {
    name: "Gamis Katun Bordir",
    category: "Gamis",
    variants: [
      { color: "Black", image: "/gallery/gamis-katun-bordir-hitam.jpg", price: "Rp 200.000" },
      { color: "Pink", image: "/gallery/gamis-katun-bordir-pink.jpg", price: "Rp 200.000" },
      { color: "Brown", image: "/gallery/gamis-katun-bordir-coklat.jpg", price: "Rp 200.000" },
      { color: "Burgundy", image: "/gallery/gamis-katun-bordir-burgundy.jpg", price: "Rp 200.000" },
      { color: "Blue", image: "/gallery/gamis-katun-bordir-biru.jpg", price: "Rp 200.000" },
    ],
  },
  {
    name: "Tunic Set Tencel",
    category: "Tunic Set",
    variants: [
      { color: "Brown", image: "/gallery/tunic-set-tencel-brown.jpg", price: "Rp 190.000" },
      { color: "Black", image: "/gallery/tunic-set-tencel-black.jpg", price: "Rp 190.000" },
      { color: "Cream", image: "/gallery/tunic-set-tencel-cream.jpg", price: "Rp 190.000" },
    ],
  },
];
