"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { productCollections, type Product } from "./collections";

const links = {
  shopee: "https://shopee.co.id/khzboutique",
  instagram: "https://www.instagram.com/khzboutique.id",
  facebook: "https://facebook.com/khzboutique.id/",
  whatsappNumber: "62895352750251",
  whatsappDisplay: "0895-3527-50251",
};

const campaign = {
  title: "KHZ Boutique Comeback Sale",
  period: "12-26 Mei 2026",
  target: "Promo 10 order pertama",
  description:
    "Promo terbatas untuk koleksi gamis, abaya, tunic set, dan kaftan dress pilihan. Cek warna favoritmu via WhatsApp atau lanjut checkout melalui Shopee.",
};

const navItems = [
  { label: "Beranda", href: "#home" },
  { label: "Tentang", href: "#about" },
  { label: "Produk", href: "#products" },
  { label: "Cara Order", href: "#order-guide" },
  { label: "Kategori", href: "#categories" },
  { label: "Layanan", href: "#testimonials" },
  { label: "Kontak", href: "#contact" },
];

const products = productCollections.flatMap((collection) =>
  collection.variants.map((variant) => ({
    name: collection.name,
    ...variant,
  })),
);

const featuredCollections = productCollections.map((collection) => {
  const prices = Array.from(new Set(collection.variants.map((variant) => variant.price)));

  return {
    name: collection.name,
    hero: collection.variants[0],
    colors: collection.variants.map((variant) => variant.color),
    priceLabel: prices.length === 1 ? prices[0] : prices.join(" - "),
  };
});

const categories = [
  {
    title: "Abaya",
    desc: "Potongan longgar dan anggun untuk acara maupun tampilan harian.",
    image: "/gallery/A-peach.jpg",
    targetProduct: { name: "Aisyah Abaya", color: "Black" },
  },
  {
    title: "Gamis",
    desc: "Pilihan praktis untuk tampilan rapi, feminin, dan sopan.",
    image: "/gallery/C-blue.jpg",
    targetProduct: { name: "Nayla Gamis", color: "Black" },
  },
  {
    title: "Kaftan Dress",
    desc: "Ringan, jatuh cantik, dan mudah dipakai untuk banyak momen.",
    image: "/gallery/kaftan-wulan-maroon.jpg",
    targetProduct: { name: "Wulan Kaftan", color: "Maroon" },
  },
  {
    title: "Tunic Set",
    desc: "Setelan modest yang nyaman untuk aktivitas harian.",
    image: "/gallery/D-maroon.jpg",
    targetProduct: { name: "Zahra Tunic Set", color: "Blue" },
  },
];

const serviceNotes = [
  {
    title: "Foto Produk Jelas",
    text: "Kamu bisa melihat warna dan detail produk sebelum memilih model yang paling cocok.",
  },
  {
    title: "Bantuan Pilih Ukuran",
    text: "Butuh saran ukuran atau warna? Tim KHZ siap membantu melalui WhatsApp.",
  },
  {
    title: "Toko Bisa Dikunjungi",
    text: "Kamu juga bisa datang langsung ke toko KHZ di Pusat Grosir Metro Tanah Abang 2.",
  },
];

const galleryPreview = products.slice(0, 8);

type FeatureIcon = "crown" | "chat" | "truck" | "shield";

const featureItems: { title: string; desc: string; icon: FeatureIcon }[] = [
  { title: "Jahitan Rapi", desc: "Produksi tangan pertama", icon: "crown" },
  { title: "Bantu Pilih", desc: "Konsultasi warna dan ukuran", icon: "chat" },
  { title: "Siap Kirim", desc: "Order via Shopee atau WhatsApp", icon: "truck" },
  { title: "Belanja Aman", desc: "Toko fisik di Tanah Abang", icon: "shield" },
];

const brandHighlights = [
  {
    title: "10+ Tahun Berjalan",
    desc: "KHZ Boutique sudah lama melayani pelanggan busana muslimah dari Tanah Abang.",
  },
  {
    title: "Tangan Pertama",
    desc: "Produk dibuat langsung dari sumber produksi, sehingga harga tetap bersahabat.",
  },
  {
    title: "Gaya Mudah Dipakai",
    desc: "Koleksi dipilih untuk kebutuhan harian, acara keluarga, pengajian, dan momen rapi lainnya.",
  },
];

const trustItems = [
  { value: "10+ tahun", label: "Pengalaman brand fashion muslimah" },
  { value: "Tangan pertama", label: "Produksi dan harga lebih terkontrol" },
  { value: "Tanah Abang", label: "Toko fisik di Metro Tanah Abang 2" },
  { value: "Shopee/WA", label: "Checkout mudah dan konsultasi cepat" },
];

const orderSteps = [
  {
    title: "Pilih Model",
    desc: "Mulai dari empat koleksi utama: Aisyah Abaya, Wulan Kaftan, Nayla Gamis, dan Zahra Tunic Set.",
  },
  {
    title: "Cek Detail",
    desc: "Tanya stok warna, ukuran, bahan, dan rekomendasi model melalui WhatsApp KHZ Boutique.",
  },
  {
    title: "Lanjut Order",
    desc: "Checkout lewat Shopee untuk proses marketplace, atau lanjut konfirmasi langsung via WhatsApp.",
  },
];

const sizeGuideItems = [
  "Cek ukuran dan warna sebelum checkout agar pesanan lebih sesuai.",
  "Tanyakan foto detail bahan bila ingin memastikan tekstur dan warna real.",
  "Untuk pembelian lebih dari satu pcs, tanyakan stok warna terlebih dahulu.",
  "Alamat toko tersedia bila ingin melihat koleksi langsung di Tanah Abang.",
];

function getWhatsAppHref(message: string) {
  return `https://wa.me/${links.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function getProductWhatsAppHref(product: Product | { name: string; color?: string }) {
  const colorText = product.color ? ` warna ${product.color}` : "";
  const message = `Assalamualaikum KHZ Boutique, saya ingin tanya ${product.name}${colorText}.`;

  return getWhatsAppHref(message);
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

function getProductSeoCategory(productName: string) {
  if (productName.includes("Abaya")) {
    return "abaya muslimah";
  }

  if (productName.includes("Kaftan")) {
    return "kaftan dress muslimah";
  }

  if (productName.includes("Gamis")) {
    return "gamis muslimah";
  }

  return "tunic set muslimah";
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function FeatureIconMark({ icon }: { icon: FeatureIcon }) {
  const baseProps = {
    className:
      "mx-auto mb-4 h-8 w-8 text-[#35523f] opacity-75 transition duration-300 group-hover:opacity-100",
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

  if (icon === "chat") {
    return (
      <svg {...baseProps}>
        <path d="M5.5 6.5h9a3 3 0 0 1 3 3v3.25a3 3 0 0 1-3 3H10l-4.5 3v-3a3 3 0 0 1-3-3V9.5a3 3 0 0 1 3-3Z" />
        <path d="M8 10.25h6" />
        <path d="M8 13h4" />
        <path d="M18.5 10.5a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3v2.25l-3.35-2.25H12.5" />
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
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#7a2f36]">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl leading-tight text-[#2f2521] md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#695b54]">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#ead8cf] bg-white/80 backdrop-blur-2xl">
        <div className="section-shell flex h-20 items-center justify-between">
          <Link href="#home" className="group" aria-label="KHZ Boutique home">
            <span className="block font-display text-3xl tracking-[0.28em] text-[#513b34]">
              KHZ
            </span>
            <span className="block text-center text-[10px] uppercase tracking-[0.42em] text-[#7a2f36]">
              Boutique
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[0.2em] text-[#5f514b] transition hover:text-[#7a2f36]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href={getWhatsAppHref("Assalamualaikum KHZ Boutique, saya ingin tanya koleksi produk.")}
            target="_blank"
            className="rounded-full bg-[#35523f] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#35523f]/20 transition hover:-translate-y-0.5 hover:bg-[#263d2e]"
          >
            WhatsApp
          </Link>
        </div>
        <div className="section-shell flex gap-4 overflow-x-auto pb-3 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={`mobile-${item.href}`}
              href={item.href}
              className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5f514b] transition hover:text-[#7a2f36]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <section id="home" className="soft-gradient relative pt-32 lg:pt-20">
        <div className="section-shell grid min-h-[calc(100vh-128px)] items-center gap-12 py-14 lg:min-h-[calc(100vh-80px)] lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.34em] text-[#7a2f36]">
              Brand fashion muslimah Indonesia
            </p>
            <h1 className="font-display max-w-2xl text-5xl leading-[1] text-[#2f2521] sm:text-6xl lg:text-7xl">
              Busana muslimah tangan pertama dari Tanah Abang.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-9 text-[#5f514b]">
              KHZ Boutique menghadirkan gamis, abaya, tunic set, dan kaftan
              dress dengan harga bersahabat Rp150.000-300.000 untuk harian,
              pengajian, dan acara keluarga.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href={links.shopee}
                target="_blank"
                className="rounded-full bg-[#35523f] px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-xl shadow-[#35523f]/20 transition hover:-translate-y-1 hover:bg-[#263d2e]"
              >
                Belanja di Shopee
              </Link>
              <Link
                href={getWhatsAppHref("Assalamualaikum KHZ Boutique, saya ingin cek stok koleksi terbaru.")}
                target="_blank"
                className="rounded-full border border-[#c99691] bg-white/75 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#6b514b] transition hover:-translate-y-1 hover:bg-white"
              >
                Chat WhatsApp
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-center">
              {["10+ tahun", "Tangan pertama", "Rp150-300 ribuan"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#ead8cf] bg-white/65 p-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5f514b]"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.12 }}
            className="relative"
          >
            <div className="image-shine relative overflow-hidden rounded-[1.5rem] border border-white/70 shadow-[0_30px_100px_rgba(47,37,33,0.16)]">
              <Image
                src="/gallery/hero-banner.jpg"
                alt="KHZ Boutique gamis abaya tunic set dan kaftan dress Muslimah"
                width={1884}
                height={835}
                priority
                className="h-[360px] w-full object-cover object-[84%_center] md:h-[520px]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#ead8cf] bg-white py-7">
        <div className="section-shell grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.value} className="px-4 py-4">
              <p className="font-display text-3xl text-[#2f2521]">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-[#695b54]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fffaf8] py-16">
        <div className="section-shell">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid overflow-hidden rounded-[1.5rem] bg-[#2f2521] text-white shadow-2xl shadow-[#7d5f58]/10 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="p-8 md:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#f2c9c2]">
                {campaign.period}
              </p>
              <h2 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
                {campaign.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/76">
                {campaign.description}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={links.shopee}
                  target="_blank"
                  className="rounded-full bg-white px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#2f2521] transition hover:-translate-y-1 hover:bg-[#f7eee9]"
                >
                  Checkout Shopee
                </Link>
                <Link
                  href={getWhatsAppHref("Assalamualaikum KHZ Boutique, saya ingin ikut Comeback Sale dan cek stok produk.")}
                  target="_blank"
                  className="rounded-full border border-white/35 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-1 hover:bg-white/10"
                >
                  Tanya Stok
                </Link>
              </div>
            </div>
            <div className="relative min-h-[320px] bg-[#35523f]">
              <Image
                src="/gallery/C-black.jpg"
                alt="Produk pilihan KHZ Boutique untuk promo 14 hari"
                width={1600}
                height={1600}
                className="absolute inset-0 h-full w-full object-cover opacity-72"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2f2521]/82 via-[#2f2521]/22 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a2f36]">
                  {campaign.target}
                </span>
                <p className="mt-4 max-w-sm text-lg leading-7 text-white">
                  Pilih model favorit, cek warna yang tersedia, lalu lanjut order
                  sebelum pilihan warna habis.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#ead8cf] bg-white/85 py-6">
        <div className="section-shell grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
          {featureItems.map(({ title, desc, icon }) => (
            <div
              key={title}
              className="group rounded-2xl px-4 py-5 transition duration-300 hover:-translate-y-1"
            >
              <FeatureIconMark icon={icon} />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#493832]">
                {title}
              </p>
              <p className="mt-2 text-sm text-[#75665f]">{desc}</p>
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
            <div className="image-shine relative overflow-hidden rounded-[1.5rem] border border-white/70 shadow-2xl shadow-[#9e6f69]/10">
              <Image
                src="/gallery/A-peach.jpg"
                alt="Aisyah Abaya KHZ Boutique koleksi abaya Muslimah"
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
              className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#7a2f36]"
            >
              Tentang KHZ
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display max-w-2xl text-4xl leading-tight text-[#2f2521] md:text-6xl"
            >
              Busana muslimah nyaman untuk tampil rapi tanpa terlihat berlebihan.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-2xl text-lg leading-9 text-[#695b54]"
            >
              KHZ Boutique adalah brand fashion muslimah asal Indonesia dengan
              pengalaman lebih dari 10 tahun. Dari toko fisik di Pusat Grosir
              Metro Tanah Abang 2, kamu bisa memilih koleksi KHZ melalui website,
              Instagram, Facebook, Shopee, dan WhatsApp resmi.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 grid gap-4 sm:grid-cols-3">
              {brandHighlights.map((item) => (
                <div key={item.title} className="luxury-card rounded-2xl p-5">
                  <p className="font-semibold text-[#493832]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#75665f]">
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
            eyebrow="Koleksi Pilihan"
            title="Empat model favorit untuk harian dan acara keluarga"
            description="Pilih model yang kamu suka, cek warna yang tersedia, lalu lanjut order melalui Shopee atau WhatsApp resmi KHZ."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {featuredCollections.map((collection) => (
              <motion.article
                id={getProductAnchor({ name: collection.name, color: collection.hero.color })}
                key={collection.name}
                variants={fadeUp}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="group scroll-mt-28 overflow-hidden rounded-[1.25rem] bg-[#fffaf8] shadow-lg shadow-[#7d5f58]/5 transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#9e6f69]/15 target:ring-4 target:ring-[#c99691]/35 target:ring-offset-4 target:ring-offset-white target:animate-[soft-highlight_1.8s_ease-out]"
              >
                <div className="image-shine relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={collection.hero.image}
                    alt={`${collection.name} koleksi ${getProductSeoCategory(collection.name)} KHZ Boutique`}
                    width={1600}
                    height={1600}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7a2f36] backdrop-blur-md">
                    Promo terbatas
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-3xl text-[#2f2521]">
                    {collection.name}
                  </h3>
                  <p className="mt-3 inline-flex rounded-full border border-[#ead8cf] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#35523f]">
                    {collection.priceLabel}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {collection.colors.map((color) => (
                      <span
                        key={`${collection.name}-${color}`}
                        className="rounded-full border border-[#ead8cf] bg-white px-3 py-1 text-xs text-[#695b54]"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 grid gap-3">
                    <Link
                      href={getProductWhatsAppHref({ name: collection.name })}
                      target="_blank"
                      className="rounded-full bg-[#35523f] px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:-translate-y-1 hover:bg-[#263d2e]"
                    >
                      Tanya Stok
                    </Link>
                    <Link
                      href={links.shopee}
                      target="_blank"
                      className="rounded-full border border-[#d7b5ae] bg-white px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#6b514b] transition hover:-translate-y-1"
                    >
                      Beli di Shopee
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="order-guide" className="bg-[#fffaf8] py-24">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Cara Order"
            title="Pilih produk, cek stok, lalu lanjut checkout"
            description="Kamu bisa bertanya dulu lewat WhatsApp untuk memastikan warna dan ukuran, atau langsung checkout melalui Shopee."
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
                  className="luxury-card rounded-2xl p-7"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7a2f36]">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 font-display text-3xl text-[#2f2521]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#695b54]">
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
              className="rounded-[1.25rem] bg-[#2f2521] p-8 text-white shadow-2xl shadow-[#7d5f58]/10"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2c9c2]">
                Catatan Sebelum Order
              </p>
              <h3 className="mt-5 font-display text-4xl leading-tight">
                Detail kecil yang membuat belanja lebih nyaman.
              </h3>
              <p className="mt-5 text-sm leading-7 text-white/72">
                Selama promo berlangsung, tim KHZ siap membantu mencocokkan
                model, warna, dan stok yang tersedia.
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
            eyebrow="Kategori"
            title="Pilihan model untuk kebutuhan muslimah modern"
            description="Pilih kategori sesuai kebutuhanmu, dari busana harian yang nyaman sampai tampilan rapi untuk acara."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <motion.article
                key={category.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="group relative min-h-[420px] overflow-hidden rounded-[1.25rem]"
              >
                <a
                  href={`#${getProductAnchor(category.targetProduct)}`}
                  aria-label={`Lihat koleksi ${category.title}`}
                  className="block h-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#c99691]/45"
                >
                  <Image
                    src={category.image}
                    alt={`Koleksi ${category.title} KHZ Boutique untuk fashion Muslimah`}
                    width={1600}
                    height={1600}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2f2521]/74 via-[#2f2521]/12 to-transparent transition duration-500 group-hover:from-[#2f2521]/82" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <span className="mb-3 inline-flex rounded-full border border-white/30 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/85 opacity-0 transition duration-500 group-hover:opacity-100">
                      Lihat Produk
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
            eyebrow="Layanan KHZ"
            title="Belanja lebih yakin dengan detail yang jelas"
            description="Lihat pilihan produk, cek detail warna, lalu hubungi KHZ melalui channel resmi sebelum menyelesaikan pesanan."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {serviceNotes.map((note) => (
              <motion.figure
                key={note.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="luxury-card rounded-2xl p-8"
              >
                <div className="mb-5 h-10 w-10 rounded-full bg-[#35523f] text-center text-xl leading-10 text-white">
                  {note.title.charAt(0)}
                </div>
                <blockquote className="text-lg leading-8 text-[#5f514b]">
                  {note.text}
                </blockquote>
                <figcaption className="mt-7 font-semibold text-[#2f2521]">
                  {note.title}
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
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#7a2f36]">
                Instagram Preview
              </p>
              <h2 className="font-display text-4xl text-[#2f2521] md:text-5xl">
                Ikuti update koleksi KHZ
              </h2>
            </div>
            <Link
              href={links.instagram}
              target="_blank"
              className="w-fit rounded-full border border-[#d7b5ae] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#6b514b] transition hover:-translate-y-1 hover:bg-white"
            >
              @khzboutique.id
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
                className="group relative aspect-square overflow-hidden rounded-2xl"
              >
                <Image
                  src={item.image}
                  alt={`${item.name} warna ${item.color} koleksi KHZ Boutique`}
                  width={1600}
                  height={1600}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#2f2521]/0 transition group-hover:bg-[#2f2521]/25" />
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
            className="relative overflow-hidden rounded-[1.5rem] bg-[#2f2521] px-6 py-16 text-center text-white md:px-16"
          >
            <div className="relative mx-auto max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#f2c9c2]">
                Kontak Resmi
              </p>
              <h2 className="font-display text-4xl leading-tight md:text-6xl">
                Siap bantu pilih koleksi KHZ yang paling cocok.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
                Pusat Grosir Metro Tanah Abang 2, Lantai Dasar, Blok B No. 216,
                Jakarta Pusat. WhatsApp: {links.whatsappDisplay}.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-nowrap">
                <Link
                  href={links.shopee}
                  target="_blank"
                  className="w-full max-w-[17rem] rounded-full border border-white/25 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-1 hover:bg-white/10 sm:w-auto sm:max-w-none"
                >
                  Shopee
                </Link>
                <Link
                  href={getWhatsAppHref("Assalamualaikum KHZ Boutique, saya ingin tanya koleksi produk.")}
                  target="_blank"
                  className="w-full max-w-[17rem] rounded-full bg-[#c99691] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-1 hover:bg-[#ad7a74] sm:w-auto sm:max-w-none"
                >
                  WhatsApp
                </Link>
                <Link
                  href={links.instagram}
                  target="_blank"
                  className="w-full max-w-[17rem] rounded-full border border-white/25 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-1 hover:bg-white/10 sm:w-auto sm:max-w-none"
                >
                  Instagram
                </Link>
                <Link
                  href={links.facebook}
                  target="_blank"
                  className="w-full max-w-[17rem] rounded-full border border-white/25 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-1 hover:bg-white/10 sm:w-auto sm:max-w-none"
                >
                  Facebook
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
            <p className="mt-2 text-xs uppercase tracking-[0.34em] text-[#7a2f36]">
              Boutique
            </p>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#695b54]">
            Brand fashion muslimah Indonesia untuk gamis, abaya, tunic set, dan
            kaftan dress dari Tanah Abang. Belanja via Shopee atau konsultasi
            melalui WhatsApp resmi KHZ Boutique.
          </p>
          <p className="text-sm text-[#8a756d]">2026 KHZ Boutique</p>
        </div>
      </footer>

      <Link
        href={getWhatsAppHref("Assalamualaikum KHZ Boutique, saya ingin tanya koleksi produk.")}
        target="_blank"
        aria-label="Chat WhatsApp KHZ Boutique"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25d366] text-2xl text-white shadow-2xl shadow-[#25d366]/30 transition hover:-translate-y-1"
      >
        <WhatsAppLogo />
      </Link>
    </main>
  );
}
