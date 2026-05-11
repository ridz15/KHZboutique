"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { productCollections, type Product } from "./collections";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Collection", href: "#products" },
  { label: "Order Guide", href: "#order-guide" },
  { label: "Categories", href: "#categories" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const products = productCollections.flatMap((collection) =>
  collection.variants.map((variant) => ({
    name: collection.name,
    ...variant,
  })),
);

// To change where a category card scrolls, update targetProduct to match
// a product name and color from src/app/collections.ts.
const categories = [
  {
    title: "Abaya",
    desc: "Potongan longgar, jatuh lembut, dan anggun untuk keseharian.",
    image: "/gallery/A-peach.jpg",
    targetProduct: { name: "Aisyah Abaya", color: "Black" },
  },
  {
    title: "Modest Wear",
    desc: "Siluet feminin dengan detail premium untuk acara spesial.",
    image: "/gallery/B-white.jpg",
    targetProduct: { name: "Nayla Khimar", color: "Black" },
  },
  {
    title: "Kaftan",
    desc: "Nyaman dikenakan, rapi, dan mudah dipadukan.",
    image: "/gallery/kaftan-wulan-maroon.jpg",
    targetProduct: { name: "Wulan Kaftan", color: "Maroon" },
  },
  {
    title: "Best Sellers",
    desc: "Pilihan favorit pelanggan dalam warna-warna timeless.",
    image: "/gallery/D-maroon.jpg",
    targetProduct: { name: "Zahra Dress", color: "Maroon" },
  },
];

const collectionDisplayLimit = 8;
const categoryTargetKeys = new Set(
  categories.map((category) => getProductKey(category.targetProduct)),
);
const visibleProducts = products.filter(
  (product, index) =>
    index < collectionDisplayLimit || categoryTargetKeys.has(getProductKey(product)),
);

const testimonials = [
  {
    name: "Nadia A.",
    text: "Bahannya adem dan jatuhnya cantik. Rasanya mewah tapi tetap nyaman untuk aktivitas harian.",
  },
  {
    name: "Hana P.",
    text: "Packaging rapi, warna persis seperti foto, dan modelnya syar’i tanpa terlihat kaku.",
  },
  {
    name: "Salsabila R.",
    text: "Suka banget dengan detail jahitannya. KHZ Boutique terasa premium dan elegan.",
  },
];

const galleryPreview = products.slice(0, 8);

type FeatureIcon = "crown" | "returns" | "truck" | "shield";

const featureItems: { title: string; desc: string; icon: FeatureIcon }[] = [
  { title: "Crafted Quality", desc: "Bahan pilihan terbaik", icon: "crown" },
  { title: "Easy Returns", desc: "Layanan ramah pelanggan", icon: "returns" },
  { title: "Swift Delivery", desc: "Pengiriman cepat", icon: "truck" },
  { title: "Private Order", desc: "Pesan aman via WhatsApp", icon: "shield" },
];

const brandHighlights = [
  {
    title: "Elegant Design",
    desc: "Potongan anggun untuk tampilan feminin modern.",
  },
  {
    title: "Premium Fabric",
    desc: "Bahan lembut pilihan yang nyaman dipakai sepanjang hari.",
  },
  {
    title: "Timeless Comfort",
    desc: "Dirancang untuk tetap sopan, nyaman, dan stylish.",
  },
];

const orderSteps = [
  {
    title: "Pilih Koleksi",
    desc: "Klik produk yang kamu sukai untuk langsung bertanya detail warna, stok, dan rekomendasi styling melalui WhatsApp.",
  },
  {
    title: "Konsultasi Detail",
    desc: "Tim KHZ Boutique akan membantu cek ketersediaan, ukuran, dan pilihan warna agar pesanan terasa lebih personal.",
  },
  {
    title: "Konfirmasi Pesanan",
    desc: "Setelah detail sesuai, lanjutkan konfirmasi order dan pengiriman dengan proses yang rapi, aman, dan nyaman.",
  },
];

const sizeGuideItems = [
  "All size fit to XXL dengan potongan longgar dan anggun.",
  "Lebar dada 135 cm dan panjang 140 cm.",
  "Dilengkapi karet pinggang bagian dalam agar mudah disesuaikan.",
  "Busui friendly dan nyaman dipakai hingga maksimal BB 85 kg.",
];

function getProductWhatsAppHref(product: Product) {
  const message = `Assalamualaikum KHZ Boutique, saya ingin tanya ${product.name} warna ${product.color}.`;

  return `https://wa.me/62895352750251?text=${encodeURIComponent(message)}`;
}

function getProductKey(product: Pick<Product, "name" | "color">) {
  return `${product.name}::${product.color}`;
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getProductAnchor(product: Pick<Product, "name" | "color">) {
  return `collection-${toSlug(product.name)}-${toSlug(product.color)}`;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

function FeatureIconMark({ icon }: { icon: FeatureIcon }) {
  const baseProps = {
    className:
      "mx-auto mb-4 h-8 w-8 text-[#6f4e37] opacity-70 transition duration-300 group-hover:opacity-100",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.35,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (icon === "crown") {
    return (
      <svg {...baseProps}>
        <path d="m3.5 8.5 4.25 3.25L12 5l4.25 6.75L20.5 8.5l-1.5 9H5l-1.5-9Z" />
        <path d="M6 19h12" />
      </svg>
    );
  }

  if (icon === "returns") {
    return (
      <svg {...baseProps}>
        <path d="M6.5 8.5 12 5l5.5 3.5V15L12 18.5 6.5 15V8.5Z" />
        <path d="m6.5 8.5 5.5 3.5 5.5-3.5" />
        <path d="M12 12v6.5" />
        <path d="M8.5 4.5H6a3 3 0 0 0-3 3v1.25" />
        <path d="m5.5 6.75-2.5 2-2.5-2" />
      </svg>
    );
  }

  if (icon === "truck") {
    return (
      <svg {...baseProps}>
        <path d="M3.5 7.5h11v8h-11z" />
        <path d="M14.5 10h3l3 3v2.5h-6" />
        <path d="M6.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
        <path d="M17.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      </svg>
    );
  }

  return (
    <svg {...baseProps}>
      <path d="M12 3.5 19 6v5.25c0 4.2-2.7 7.35-7 9.25-4.3-1.9-7-5.05-7-9.25V6l7-2.5Z" />
      <path d="m8.75 12 2.15 2.15L15.5 9.5" />
    </svg>
  );
}

function WhatsAppLogo() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="h-8 w-8"
      fill="currentColor"
    >
      <path d="M16.02 4C9.4 4 4.02 9.38 4.02 16c0 2.12.56 4.19 1.61 6.02L4 28l6.13-1.6A11.95 11.95 0 0 0 16.02 28c6.62 0 12-5.38 12-12s-5.38-12-12-12Zm0 21.85c-1.86 0-3.68-.52-5.26-1.49l-.38-.23-3.64.95.97-3.55-.25-.4A9.82 9.82 0 1 1 16.02 25.85Zm5.38-7.36c-.29-.15-1.73-.85-1.99-.95-.27-.1-.46-.15-.66.15-.19.29-.76.95-.93 1.14-.17.2-.34.22-.63.08-.29-.15-1.23-.45-2.35-1.44-.87-.77-1.45-1.73-1.62-2.02-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.37-.02-.51-.08-.15-.66-1.59-.9-2.18-.24-.57-.48-.49-.66-.5h-.56c-.19 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43s1.05 2.82 1.19 3.02c.15.19 2.06 3.15 4.99 4.41.7.3 1.24.48 1.67.61.7.22 1.33.19 1.84.12.56-.08 1.73-.71 1.97-1.39.24-.68.24-1.27.17-1.39-.07-.12-.27-.19-.56-.34Z" />
    </svg>
  );
}

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.42em] text-[#b88984]">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl leading-tight text-[#3a2b26] md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#76645d]">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/55 backdrop-blur-2xl">
        <div className="section-shell flex h-20 items-center justify-between">
          <Link href="#home" className="group">
            <span className="block font-display text-3xl tracking-[0.28em] text-[#513b34]">
              KHZ
            </span>
            <span className="block text-center text-[10px] uppercase tracking-[0.45em] text-[#b88984]">
              Boutique
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[0.24em] text-[#6b5750] transition hover:text-[#b88984]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="#contact"
            className="rounded-full bg-[#c99691] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-lg shadow-[#c99691]/25 transition hover:-translate-y-0.5 hover:bg-[#ad7a74]"
          >
            WhatsApp
          </Link>
        </div>
        <div className="section-shell flex gap-4 overflow-x-auto pb-3 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={`mobile-${item.href}`}
              href={item.href}
              className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6b5750] transition hover:text-[#b88984]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <section id="home" className="soft-gradient relative min-h-screen pt-32 lg:pt-20">
        <div className="section-shell grid min-h-[calc(100vh-128px)] items-center gap-12 py-16 lg:min-h-[calc(100vh-80px)] lg:grid-cols-[0.88fr_1.12fr]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.48em] text-[#b88984]">
              Modern Modest Wear
            </p>
            <h1 className="font-display max-w-2xl text-5xl leading-[0.95] text-[#3a2b26] sm:text-6xl lg:text-7xl">
              Elegance in{" "}
              <span className="text-[#c99691]">Every Detail</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-9 text-[#6f5b53]">
              KHZ Boutique menghadirkan abaya, kaftan, dan modest wear dengan
              sentuhan lembut, anggun, dan premium untuk setiap momen.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#products"
                className="rounded-full bg-[#c99691] px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-xl shadow-[#c99691]/25 transition hover:-translate-y-1 hover:bg-[#ad7a74]"
              >
                Explore Collection
              </Link>
              <Link
                href="#about"
                className="rounded-full border border-[#d7b5ae] bg-white/60 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#6b514b] transition hover:-translate-y-1 hover:bg-white"
              >
                Discover the Brand
              </Link>
            </div>
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 text-center">
              {["Refined Quality", "Timeless Design", "Signature Edit"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-[#ead8cf] bg-white/55 p-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6d5a53]"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.12 }}
            className="relative"
          >
            <div className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-[#efd2cd] blur-3xl" />
            <div className="image-shine relative overflow-hidden rounded-[2rem] border border-white/70 shadow-[0_30px_100px_rgba(91,59,51,0.18)]">
              <Image
                src="/gallery/hero-banner.jpg"
                alt="KHZ Boutique hero banner"
                width={1884}
                height={835}
                priority
                className="h-[360px] w-full object-cover object-[84%_center] md:h-[520px]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#ead8cf] bg-white/75 py-6">
        <div className="section-shell grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
          {featureItems.map(({ title, desc, icon }) => (
            <div
              key={title}
              className="group rounded-3xl px-4 py-5 transition duration-300 hover:-translate-y-1"
            >
              <FeatureIconMark icon={icon} />
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#493832]">
                {title}
              </p>
              <p className="mt-2 text-sm text-[#8a756d]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="bg-[#fffaf8] py-24">
        <div className="section-shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -bottom-7 -right-7 h-44 w-44 rounded-full bg-[#efd2cd] blur-3xl" />
            <div className="image-shine relative overflow-hidden rounded-[2rem] border border-white/70 shadow-2xl shadow-[#9e6f69]/10">
              <Image
                src="/gallery/A-peach.jpg"
                alt="KHZ Boutique dusty pink modest fashion editorial campaign"
                width={1600}
                height={1600}
                className="h-[560px] w-full object-cover object-[42%_center]"
              />
            </div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:pl-8"
          >
            <motion.p
              variants={fadeUp}
              className="mb-4 text-xs font-semibold uppercase tracking-[0.42em] text-[#b88984]"
            >
              About Us
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display max-w-2xl text-4xl leading-tight text-[#3a2b26] md:text-6xl"
            >
              Soft elegance for the modern modest wardrobe.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-2xl text-lg leading-9 text-[#76645d]"
            >
              KHZ Boutique dirancang untuk wanita yang ingin tampil anggun,
              sopan, dan tetap modern. Setiap koleksi mengutamakan kenyamanan,
              warna yang tenang, serta potongan syar’i yang mudah dipakai.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 grid gap-4 sm:grid-cols-3">
              {brandHighlights.map((item) => (
                <div key={item.title} className="luxury-card rounded-3xl p-5">
                  <p className="font-semibold text-[#493832]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#8a756d]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="products" className="bg-white py-24">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Signature Collection"
            title="Graceful pieces curated for quiet sophistication"
            description="Produk Kami"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {visibleProducts.map((product) => (
              <motion.article
                id={getProductAnchor(product)}
                key={`${product.name}-${product.color}`}
                variants={fadeUp}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="group scroll-mt-28 overflow-hidden rounded-[1.75rem] bg-[#fffaf8] shadow-lg shadow-[#7d5f58]/5 transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#9e6f69]/15 target:ring-4 target:ring-[#c99691]/35 target:ring-offset-4 target:ring-offset-white target:animate-[soft-highlight_1.8s_ease-out]"
              >
                <Link
                  href={getProductWhatsAppHref(product)}
                  target="_blank"
                  aria-label={`Tanya ${product.name} warna ${product.color} via WhatsApp`}
                  className="block"
                >
                  <div className="image-shine relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={`${product.name} warna ${product.color}`}
                      width={1600}
                      height={1600}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/85 px-4 py-3 text-center opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9e6f69]">
                        Inquire via WhatsApp
                      </span>
                      <span className="mt-1 block font-display text-2xl text-[#3a2b26]">
                        {product.price}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-2xl text-[#3a2b26]">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[#b88984]">
                      {product.color}
                    </p>
                    <p className="mt-4 inline-flex rounded-full border border-[#ead8cf] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6f4e37]">
                      {product.price}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="order-guide" className="bg-[#fffaf8] py-24">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Order Guide"
            title="Simple steps for a graceful order"
            description="Panduan singkat untuk membantu kamu memilih koleksi, memastikan ukuran, dan melanjutkan pemesanan dengan nyaman."
          />
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-4 md:grid-cols-3"
            >
              {orderSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  className="luxury-card rounded-[2rem] p-7"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#c99691]">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 font-display text-3xl text-[#3a2b26]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#76645d]">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="rounded-[2rem] bg-[#3a2b26] p-8 text-white shadow-2xl shadow-[#7d5f58]/10"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#f2c9c2]">
                Size Guide
              </p>
              <h3 className="mt-5 font-display text-4xl leading-tight">
                All size, thoughtfully designed.
              </h3>
              <p className="mt-5 text-sm leading-7 text-white/72">
                Setiap koleksi dibuat dengan ukuran fleksibel dan detail yang
                nyaman untuk menemani aktivitas harian hingga momen spesial.
              </p>
              <ul className="mt-7 space-y-4">
                {sizeGuideItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-white/82">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f2c9c2]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="categories" className="soft-gradient py-24">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Curated Categories"
            title="Refined edits for every graceful occasion"
            description="Dari daily wear sampai acara spesial, setiap kategori dibuat dengan karakter yang lembut dan premium."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <motion.article
                key={category.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="group relative min-h-[420px] overflow-hidden rounded-[2rem]"
              >
                <a
                  href={`#${getProductAnchor(category.targetProduct)}`}
                  aria-label={`Lihat koleksi ${category.title}`}
                  className="block h-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#c99691]/45"
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={1600}
                    height={1600}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2f2521]/70 via-[#2f2521]/10 to-transparent transition duration-500 group-hover:from-[#2f2521]/78" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <span className="mb-3 inline-flex rounded-full border border-white/30 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/85 opacity-0 transition duration-500 group-hover:opacity-100">
                      View Collection
                    </span>
                    <h3 className="font-display text-4xl">{category.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/86">
                      {category.desc}
                    </p>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-white py-24">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Client Notes"
            title="Loved by Our Customers"
            description="Nuansa lembut, nyaman, dan elegan menjadi alasan pelanggan memilih KHZ Boutique."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <motion.figure
                key={testimonial.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="luxury-card rounded-[2rem] p-8"
              >
                <div className="mb-5 text-[#c99691]">★★★★★</div>
                <blockquote className="text-lg leading-8 text-[#66544d]">
                  “{testimonial.text}”
                </blockquote>
                <figcaption className="mt-7 font-semibold text-[#3a2b26]">
                  {testimonial.name}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="instagram" className="bg-[#fffaf8] py-24">
        <div className="section-shell">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.42em] text-[#b88984]">
                Editorial Preview
              </p>
              <h2 className="font-display text-4xl text-[#3a2b26] md:text-5xl">
                Follow the soft elegance
              </h2>
            </div>
            <Link
              href="https://www.instagram.com/khzboutique"
              target="_blank"
              className="w-fit rounded-full border border-[#d7b5ae] px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#7a5b54] transition hover:-translate-y-1 hover:bg-white"
            >
              @khzboutique
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {galleryPreview.map((item) => (
              <motion.div
                key={`ig-${item.image}`}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="group relative aspect-square overflow-hidden rounded-3xl"
              >
                <Image
                  src={item.image}
                  alt={`Instagram preview ${item.name}`}
                  width={1600}
                  height={1600}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#3a2b26]/0 transition group-hover:bg-[#3a2b26]/25" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white py-24">
        <div className="section-shell">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2.5rem] bg-[#3a2b26] px-6 py-16 text-center text-white md:px-16"
          >
            <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#c99691]/35 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#f0d4cc]/20 blur-3xl" />
            <div className="relative mx-auto max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.42em] text-[#f2c9c2]">
                Get in Touch
              </p>
              <h2 className="font-display text-4xl leading-tight md:text-6xl">
                Begin your refined modest wardrobe
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
                Alamat: Metro 2, Lantai dasar, Blok B, No 216, Tanah abang, Jakarta pusat, Indonesia
          
              </p>
              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="https://shopee.co.id/khzboutique"
                  target="_blank"
                  className="rounded-full border border-white/25 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:-translate-y-1 hover:bg-white/10"
                >
                  Shopee
                </Link>
                <Link
                  href="https://wa.me/62895352750251?text=Assalamualaikum%20KHZ%20Boutique%2C%20saya%20ingin%20tanya%20koleksi%20produk."
                  target="_blank"
                  className="rounded-full bg-[#c99691] px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:-translate-y-1 hover:bg-[#ad7a74]"
                >
                  Start a Conversation
                </Link>
                <Link
                  href="https://www.instagram.com/khzboutique"
                  target="_blank"
                  className="rounded-full border border-white/25 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:-translate-y-1 hover:bg-white/10"
                >
                  Instagram
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-[#ead8cf] bg-[#fffaf8] py-10">
        <div className="section-shell flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <p className="font-display text-3xl tracking-[0.28em] text-[#513b34]">
              KHZ
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.38em] text-[#b88984]">
              Boutique
            </p>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#7c6961]">
            Modern modest fashion untuk Muslimah yang menyukai keanggunan,
            kenyamanan, dan detail premium.
          </p>
          <p className="text-sm text-[#9a837a]">© 2026 KHZ Boutique</p>
        </div>
      </footer>

      <Link
        href="https://wa.me/6282112995760?text=Assalamualaikum%20KHZ%20Boutique%2C%20saya%20ingin%20tanya%20koleksi%20produk."
        target="_blank"
        aria-label="Chat WhatsApp KHZ Boutique"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25d366] text-2xl text-white shadow-2xl shadow-[#25d366]/30 transition hover:-translate-y-1"
      >
        <WhatsAppLogo />
      </Link>
    </main>
  );
}
