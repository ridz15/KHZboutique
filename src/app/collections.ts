export type Product = {
  name: string;
  color: string;
  image: string;
  price: string;
};

// Edit this list to add, remove, or replace product collections.
export const productCollections: { name: string; variants: Omit<Product, "name">[] }[] = [
  {
    name: "Aisyah Abaya",
    variants: [
      { color: "Black", image: "/gallery/A-black.jpg", price: "Rp 260.000" },
      { color: "Brown", image: "/gallery/A-brown.jpg", price: "Rp 260.000" },
      { color: "Grey", image: "/gallery/A-grey.jpg", price: "Rp 260.000" },
      { color: "Maroon", image: "/gallery/A-maroon.jpg", price: "Rp 260.000" },
    ],
  },
  {
    name: "Wulan Kaftan",
    variants: [
      { color: "Maroon", image: "/gallery/kaftan-wulan-maroon.jpg", price: "Rp 185.000" },
      { color: "Purple", image: "/gallery/kaftan-wulan-purple.jpg", price: "Rp 185.000" },
      { color: "White", image: "/gallery/kaftan-wulan-white.jpg", price: "Rp 185.000" },
      { color: "Blue", image: "/gallery/kaftan-wulan-blue.jpg", price: "Rp 185.000" },
    ],
  },
  {
    name: "Nayla Khimar",
    variants: [
      { color: "Black", image: "/gallery/C-black.jpg", price: "Rp 199.000" },
      { color: "Blue", image: "/gallery/C-blue.jpg", price: "Rp 199.000" },
      { color: "Brown", image: "/gallery/C-brown.jpg", price: "Rp 199.000" },
      { color: "Peach", image: "/gallery/C-peach.jpg", price: "Rp 199.000" },
      { color: "Purple", image: "/gallery/C-purple.jpg", price: "Rp 199.000" },
    ],
  },
  {
    name: "Zahra Dress",
    variants: [
      { color: "Blue", image: "/gallery/D-blue.jpg", price: "Rp 199.000" },
      { color: "Brown", image: "/gallery/D-brown.jpg", price: "Rp 199.000" },
      { color: "Maroon", image: "/gallery/D-maroon.jpg", price: "Rp 199.000" },
      { color: "Purple", image: "/gallery/D-purple.jpg", price: "Rp 199.000" },
    ],
  },
];
