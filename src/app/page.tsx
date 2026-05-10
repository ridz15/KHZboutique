"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Tentang", href: "#about" },
  { label: "Produk", href: "#products" },
  { label: "Kategori", href: "#categories" },
  { label: "Testimoni", href: "#testimonials" },
  { label: "Kontak", href: "#contact" },
];

const products = [
  { name: "Aisyah Abaya", color: "Black", image: "/gallery/A-black.jpg" },
  { name: "Aisyah Abaya", color: "Brown", image: "/gallery/A-brown.jpg" },
  { name: "Aisyah Abaya", color: "Grey", image: "/gallery/A-grey.jpg" },
  { name: "Aisyah Abaya", color: "Maroon", image: "/gallery/A-maroon.jpg" },
  { name: "Aisyah Abaya", color: "Peach", image: "/gallery/A-peach.jpg" },
  { name: "Luna Gamis", color: "Black", image: "/gallery/B-black.jpg" },
  { name: "Luna Gamis", color: "Brown", image: "/gallery/B-brown.jpg" },
  { name: "Luna Gamis", color: "White", image: "/gallery/B-white.jpg" },
  { name: "Nayla Khimar", color: "Black", image: "/gallery/C-black.jpg" },
  { name: "Nayla Khimar", color: "Blue", image: "/gallery/C-blue.jpg" },
  { name: "Nayla Khimar", color: "Brown", image: "/gallery/C-brown.jpg" },
  { name: "Nayla Khimar", color: "Peach", image: "/gallery/C-peach.jpg" },
  { name: "Nayla Khimar", color: "Purple", image: "/gallery/C-purple.jpg" },
  { name: "Zahra Dress", color: "Blue", image: "/gallery/D-blue.jpg" },
  { name: "Zahra Dress", color: "Brown", image: "/gallery/D-brown.jpg" },
  { name: "Zahra Dress", color: "Maroon", image: "/gallery/D-maroon.jpg" },
  { name: "Zahra Dress", color: "Purple", image: "/gallery/D-purple.jpg" },
];

const categories = [
  {
    title: "Abaya",
    desc: "Potongan longgar, jatuh lembut, dan anggun untuk keseharian.",
    image: "/gallery/A-peach.jpg",
  },
  {
    title: "Gamis Syar’i",
    desc: "Siluet feminin dengan detail premium untuk acara spesial.",
    image: "/gallery/B-white.jpg",
  },
  {
    title: "Khimar",
    desc: "Nyaman dikenakan, rapi, dan mudah dipadukan.",
    image: "/gallery/C-peach.jpg",
  },
  {
    title: "Best Seller",
    desc: "Pilihan favorit pelanggan dalam warna-warna timeless.",
    image: "/gallery/D-maroon.jpg",
  },
];

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
  { title: "Premium Quality", desc: "Bahan pilihan terbaik", icon: "crown" },
  { title: "Easy Returns", desc: "Layanan ramah pelanggan", icon: "returns" },
  { title: "Fast Shipping", desc: "Pengiriman cepat", icon: "truck" },
  { title: "Secure Order", desc: "Pesan aman via WhatsApp", icon: "shield" },
];

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
        <div className="section-shell flex gap-5 overflow-x-auto pb-3 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={`mobile-${item.href}`}
              href={item.href}
              className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6b5750] transition hover:text-[#b88984]"
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
              Muslimah Syar’i Modern
            </p>
            <h1 className="font-display max-w-2xl text-5xl leading-[0.95] text-[#3a2b26] sm:text-6xl lg:text-7xl">
              Elegance in{" "}
              <span className="text-[#c99691]">Every Detail</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-9 text-[#6f5b53]">
              KHZ Boutique menghadirkan abaya, gamis, dan khimar syar’i dengan
              sentuhan lembut, anggun, dan premium untuk setiap momen.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#products"
                className="rounded-full bg-[#c99691] px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-xl shadow-[#c99691]/25 transition hover:-translate-y-1 hover:bg-[#ad7a74]"
              >
                Lihat Koleksi
              </Link>
              <Link
                href="#about"
                className="rounded-full border border-[#d7b5ae] bg-white/60 px-8 py-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#6b514b] transition hover:-translate-y-1 hover:bg-white"
              >
                Tentang Brand
              </Link>
            </div>
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 text-center">
              {["Premium Quality", "Timeless Design", "Exclusive Collection"].map(
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
                alt="Kampanye editorial modest fashion KHZ Boutique bernuansa dusty pink"
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
              About The Brand
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display max-w-2xl text-4xl leading-tight text-[#3a2b26] md:text-6xl"
            >
              Lovely, elegant, and timeless untuk Muslimah masa kini.
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
              {["Design Eksklusif", "Bahan Premium", "Jahitan Rapih"].map(
                (item) => (
                  <div key={item} className="luxury-card rounded-3xl p-5">
                    <p className="font-semibold text-[#493832]">{item}</p>
                    <p className="mt-2 text-sm leading-6 text-[#8a756d]">
                      Detail lembut dengan nuansa feminin dan premium.
                    </p>
                  </div>
                ),
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="products" className="bg-white py-24">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Featured Products"
            title="Koleksi pilihan yang anggun dan mudah dipadukan"
            description="Semua produk menggunakan gambar koleksi dari folder Gallery, tanpa hero banner."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {products.slice(0, 8).map((product) => (
              <motion.article
                key={`${product.name}-${product.color}`}
                variants={fadeUp}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="group overflow-hidden rounded-[1.75rem] bg-[#fffaf8] shadow-lg shadow-[#7d5f58]/5 transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#9e6f69]/15"
              >
                <div className="image-shine relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`${product.name} warna ${product.color}`}
                    width={1600}
                    height={1600}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/80 px-4 py-3 text-center opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9e6f69]">
                      Detail via WhatsApp
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
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="categories" className="soft-gradient py-24">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Product Categories"
            title="Pilihan kategori untuk setiap kebutuhan"
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
                <Image
                  src={category.image}
                  alt={category.title}
                  width={1600}
                  height={1600}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f2521]/70 via-[#2f2521]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <h3 className="font-display text-4xl">{category.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/86">
                    {category.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-white py-24">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Testimonials"
            title="Cerita pelanggan tentang KHZ Boutique"
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
                Instagram Preview
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
                Contact Us
              </p>
              <h2 className="font-display text-4xl leading-tight md:text-6xl">
                Siap tampil anggun dengan koleksi KHZ Boutique?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
                Konsultasikan warna, ukuran, dan ketersediaan produk langsung
                melalui WhatsApp. Kami siap membantu memilihkan koleksi terbaik.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="https://wa.me/6281234567890?text=Assalamualaikum%20KHZ%20Boutique%2C%20saya%20ingin%20tanya%20koleksi%20produk."
                  target="_blank"
                  className="rounded-full bg-[#c99691] px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:-translate-y-1 hover:bg-[#ad7a74]"
                >
                  Chat WhatsApp
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
        href="https://wa.me/6281234567890?text=Assalamualaikum%20KHZ%20Boutique%2C%20saya%20ingin%20tanya%20koleksi%20produk."
        target="_blank"
        aria-label="Chat WhatsApp KHZ Boutique"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25d366] text-2xl text-white shadow-2xl shadow-[#25d366]/30 transition hover:-translate-y-1"
      >
        WA
      </Link>
    </main>
  );
}
