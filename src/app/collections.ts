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
    name: "Aisyah Abaya",
    category: "Abaya",
    variants: [
      { color: "Black", image: "/gallery/A-black.jpg", price: "Rp 260.000" },
      { color: "Brown", image: "/gallery/A-brown.jpg", price: "Rp 260.000" },
      { color: "Grey", image: "/gallery/A-grey.jpg", price: "Rp 260.000" },
      { color: "Maroon", image: "/gallery/A-maroon.jpg", price: "Rp 260.000" },
    ],
  },
  {
    name: "Wulan Kaftan",
    category: "Kaftan Dress",
    variants: [
      { color: "Maroon", image: "/gallery/kaftan-wulan-maroon.jpg", price: "Rp 185.000" },
      { color: "Rose", image: "/gallery/kaftan-wulan-purple.jpg", price: "Rp 185.000" },
      { color: "White", image: "/gallery/kaftan-wulan-white.jpg", price: "Rp 185.000" },
      { color: "Blue", image: "/gallery/kaftan-wulan-blue.jpg", price: "Rp 185.000" },
    ],
  },
  {
    name: "Kaftan Viscos",
    category: "Kaftan Dress",
    variants: [
      { color: "Black", image: "/gallery/kaftan-viscos-black.jpg", price: "Rp 140.000" },
      { color: "Peach", image: "/gallery/kaftan-viscos-peach.jpg", price: "Rp 140.000" },
      { color: "Pink", image: "/gallery/kaftan-viscos-pink.jpg", price: "Rp 140.000" },
      { color: "Yellow", image: "/gallery/kaftan-viscos-yellow.jpg", price: "Rp 140.000" },
    ],
  },
  {
    name: "Nayla Gamis",
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
    name: "Zahra Tunic Set",
    category: "Tunic Set",
    variants: [
      { color: "Blue", image: "/gallery/D-blue.jpg", price: "Rp 240.000" },
      { color: "Brown", image: "/gallery/D-brown.jpg", price: "Rp 240.000" },
      { color: "Maroon", image: "/gallery/D-maroon.jpg", price: "Rp 240.000" },
      { color: "Purple", image: "/gallery/D-purple.jpg", price: "Rp 240.000" },
    ],
  },
];
