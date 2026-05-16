import type { Metadata } from "next";
import { getSupabaseInventoryProducts } from "@/lib/inventory";
import { logoutInventory } from "./auth-actions";
import { isInventoryAuthenticated } from "./auth";
import { InventoryList } from "./inventory-list";
import { InventoryLoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gudang KHZ Boutique",
  robots: {
    index: false,
    follow: false,
  },
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

export default async function GudangPage() {
  const isAuthenticated = await isInventoryAuthenticated();

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1ec] px-4 py-10 text-[#2f2521]">
        <section className="w-full max-w-md rounded-2xl border border-[#ead8cf] bg-[#fffaf8] p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7a2f36]">
            Gudang Internal
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight">
            Masuk ke Gudang KHZ
          </h1>
          <p className="mt-3 text-sm leading-7 text-[#695b54]">
            Halaman ini berisi data stok internal. Masukkan PIN gudang untuk
            melihat dan mengelola produk.
          </p>
          <InventoryLoginForm />
        </section>
      </main>
    );
  }

  const products = await getSupabaseInventoryProducts();
  const totalProducts = products.length;
  const totalVariants = products.reduce(
    (total, product) => total + product.variants.length,
    0,
  );
  const totalStock = products.reduce((total, product) => total + product.totalStock, 0);
  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <main className="min-h-screen bg-[#f6f1ec] text-[#2f2521]">
      <section className="border-b border-[#e2d2c8] bg-[#fffaf8]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7a2f36]">
                Gudang Internal
              </p>
              <h1 className="mt-2 font-display text-4xl leading-tight md:text-5xl">
                Stok KHZ Boutique
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#695b54]">
                Data stok utama sekarang dibaca dari Supabase. Foto akan memakai
                link database jika sudah ada, atau foto lokal folder Gudang saat
                preview di komputer ini.
              </p>
            </div>
            <div className="rounded-2xl border border-[#ead8cf] bg-white px-5 py-4 text-sm text-[#695b54]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-[#2f2521]">Status</p>
                  <p>Data dari database, stok bisa diedit dengan PIN admin.</p>
                </div>
                <form action={logoutInventory}>
                  <button
                    type="submit"
                    className="rounded-lg border border-[#d7b5ae] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#6b514b]"
                  >
                    Keluar
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Model", totalProducts],
              ["Varian warna", totalVariants],
              ["Total stok", totalStock],
              ["Kategori", categories.length],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-[#ead8cf] bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a52]">
                  {label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-[#35523f]">
                  {formatNumber(Number(value))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <InventoryList products={products} />
      </section>
    </main>
  );
}
