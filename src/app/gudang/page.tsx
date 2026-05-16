import type { Metadata } from "next";
import { getInventoryProducts } from "@/lib/inventory";

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

export default function GudangPage() {
  const products = getInventoryProducts();
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
                Preview lokal dari folder Gudang. Data di halaman ini mengikuti
                nama folder, foto utama, detail baju, harga, dan stok warna yang
                ditulis di detail.txt.
              </p>
            </div>
            <div className="rounded-2xl border border-[#ead8cf] bg-white px-5 py-4 text-sm text-[#695b54]">
              <p className="font-semibold text-[#2f2521]">Status</p>
              <p>View-only lokal, belum database online.</p>
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
        {products.length === 0 ? (
          <div className="rounded-2xl border border-[#ead8cf] bg-white p-8 text-center">
            <h2 className="font-display text-3xl">Belum ada data gudang</h2>
            <p className="mt-3 text-sm text-[#695b54]">
              Pastikan folder Gudang ada di root project dan tiap produk punya
              detail.txt.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {products.map((product) => (
              <article
                key={product.code}
                className="overflow-hidden rounded-2xl border border-[#ead8cf] bg-white shadow-sm"
              >
                <div className="grid gap-0 sm:grid-cols-[132px_1fr] md:grid-cols-[150px_1fr]">
                  <div className="flex min-h-36 items-center justify-center bg-[#f7eee9] p-2 sm:min-h-full">
                    {product.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.imageUrl}
                        alt={`Foto ${product.name}`}
                        className="max-h-40 w-full object-contain sm:max-h-52"
                      />
                    ) : (
                      <div className="flex h-full min-h-36 items-center justify-center px-4 text-center text-sm text-[#8a756d]">
                        Foto belum ada
                      </div>
                    )}
                  </div>

                  <div className="flex min-w-0 flex-col p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a2f36]">
                          {product.category}
                        </p>
                        <h2 className="mt-1 font-display text-2xl leading-tight md:text-3xl">
                          {product.name}
                        </h2>
                      </div>
                      <div className="rounded-full bg-[#35523f] px-3 py-1.5 text-xs font-semibold text-white">
                        {product.code}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-[#ead8cf] px-3 py-1 text-xs font-semibold text-[#35523f]">
                        {product.price}
                      </span>
                      <span className="rounded-full border border-[#ead8cf] px-3 py-1 text-xs font-semibold text-[#7a2f36]">
                        Total {formatNumber(product.totalStock)} pcs
                      </span>
                    </div>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {product.variants.map((variant) => (
                        <div
                          key={variant.code}
                          className="grid grid-cols-[1fr_auto] gap-3 rounded-xl bg-[#fffaf8] px-3 py-2 text-sm"
                        >
                          <div className="min-w-0">
                            <p className="font-semibold text-[#2f2521]">
                              {variant.color}
                            </p>
                            <p className="break-all text-xs text-[#8a756d]">
                              {variant.code}
                            </p>
                          </div>
                          <p className="self-center rounded-full bg-white px-3 py-1 font-semibold text-[#35523f]">
                            {formatNumber(variant.stock)} pcs
                          </p>
                        </div>
                      ))}
                    </div>

                    {product.specs.length > 0 ? (
                      <details className="mt-4 rounded-xl border border-[#ead8cf] bg-white px-3 py-3">
                        <summary className="cursor-pointer text-sm font-semibold text-[#6b514b]">
                          Detail bahan dan ukuran
                        </summary>
                        <dl className="mt-3 grid gap-2 text-sm md:grid-cols-2">
                          {product.specs.map((spec) => (
                            <div
                              key={`${spec.label}-${spec.value}`}
                              className="rounded-lg bg-[#fffaf8] px-3 py-2"
                            >
                              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#7a2f36]">
                                {spec.label}
                              </dt>
                              <dd className="mt-1 leading-6 text-[#4f433e]">
                                {spec.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </details>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
