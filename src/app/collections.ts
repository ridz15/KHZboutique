export type Product = {
  name: string;
  color: string;
  image: string;
};

// Edit this list to add, remove, or replace product collections.
export const productCollections: { name: string; variants: Omit<Product, "name">[] }[] = [
  {
    name: "Aisyah Abaya",
    variants: [
      { color: "Black", image: "/gallery/A-black.jpg" },
      { color: "Brown", image: "/gallery/A-brown.jpg" },
      { color: "Grey", image: "/gallery/A-grey.jpg" },
      { color: "Maroon", image: "/gallery/A-maroon.jpg" },
    ],
  },
  {
    name: "Wulan Kaftan",
    variants: [
      { color: "Maroon", image: "/gallery/kaftan-wulan-maroon.jpg" },
      { color: "Purple", image: "/gallery/kaftan-wulan-purple.jpg" },
      { color: "White", image: "/gallery/kaftan-wulan-white.jpg" },
      { color: "Blue", image: "/gallery/kaftan-wulan-blue.jpg" },
    ],
  },
  {
    name: "Nayla Khimar",
    variants: [
      { color: "Black", image: "/gallery/C-black.jpg" },
      { color: "Blue", image: "/gallery/C-blue.jpg" },
      { color: "Brown", image: "/gallery/C-brown.jpg" },
      { color: "Peach", image: "/gallery/C-peach.jpg" },
      { color: "Purple", image: "/gallery/C-purple.jpg" },
    ],
  },
  {
    name: "Zahra Dress",
    variants: [
      { color: "Blue", image: "/gallery/D-blue.jpg" },
      { color: "Brown", image: "/gallery/D-brown.jpg" },
      { color: "Maroon", image: "/gallery/D-maroon.jpg" },
      { color: "Purple", image: "/gallery/D-purple.jpg" },
    ],
  },
];
