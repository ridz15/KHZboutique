"use client";

import { useEffect, useMemo, useState } from "react";
import type { InventoryProduct } from "@/lib/inventory";
import {
  AddProductForm,
  AddVariantForm,
  DeactivateProductButton,
  EditProductForm,
  ProductPhotoForm,
} from "./management-controls";
import { StockControls } from "./stock-controls";

function formatNumber(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

function productMatchesSearch(product: InventoryProduct, query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  const searchableText = [
    product.name,
    product.category,
    product.code,
    product.price,
    ...product.variants.flatMap((variant) => [
      variant.color,
      variant.code,
      String(variant.stock),
    ]),
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
}

function specsToText(product: InventoryProduct) {
  return product.specs
    .map((spec) =>
      spec.label === "Catatan"
        ? spec.value
        : `${spec.label} ${spec.value}`,
    )
    .join("\n");
}

function visibleVariantChips(product: InventoryProduct) {
  const visible = product.variants.slice(0, 4);
  const hiddenCount = Math.max(product.variants.length - visible.length, 0);

  return { visible, hiddenCount };
}

export function InventoryList({ products }: { products: InventoryProduct[] }) {
  const [query, setQuery] = useState("");
  const [adminPin, setAdminPin] = useState("");
  const filteredProducts = useMemo(
    () => products.filter((product) => productMatchesSearch(product, query)),
    [products, query],
  );

  useEffect(() => {
    const savedPin = window.localStorage.getItem("khz_inventory_pin");

    if (savedPin) {
      setAdminPin(savedPin);
    }
  }, []);

  function handlePinChange(value: string) {
    setAdminPin(value);
    window.localStorage.setItem("khz_inventory_pin", value);
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-[#ead8cf] bg-white p-8 text-center">
        <h2 className="font-display text-3xl">Belum ada data gudang</h2>
        <p className="mt-3 text-sm text-[#695b54]">
          Pastikan folder Gudang ada di root project dan tiap produk punya detail.txt.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      <div className="sticky top-0 z-20 rounded-2xl border border-[#ead8cf] bg-[#fffaf8]/95 p-3 shadow-sm backdrop-blur-md md:static md:p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_15rem_auto] lg:items-end">
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a52]">
              Cari stok
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari model, warna, kode, kategori..."
              className="min-h-12 rounded-xl border border-[#d7b5ae] bg-white px-4 text-base text-[#2f2521] outline-none transition placeholder:text-[#9b8a83] focus:border-[#35523f] focus:ring-4 focus:ring-[#35523f]/10"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5a52]">
              PIN Admin
            </span>
            <input
              type="password"
              value={adminPin}
              onChange={(event) => handlePinChange(event.target.value)}
              placeholder="Isi sekali"
              className="min-h-12 rounded-xl border border-[#d7b5ae] bg-white px-4 text-base text-[#2f2521] outline-none transition placeholder:text-[#9b8a83] focus:border-[#35523f] focus:ring-4 focus:ring-[#35523f]/10"
            />
          </label>
          <div className="flex items-center justify-between gap-3 lg:pb-1">
            <p className="text-sm font-semibold text-[#695b54]">
              {formatNumber(filteredProducts.length)} dari {formatNumber(products.length)} model
            </p>
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="min-h-12 rounded-xl border border-[#d7b5ae] bg-white px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b514b]"
              >
                Bersihkan
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <AddProductForm adminPin={adminPin} />
      <div className="rounded-2xl border border-[#ead8cf] bg-white px-4 py-3 text-sm leading-6 text-[#695b54]">
        Produk atau warna yang dinonaktifkan tidak terhapus. Datanya tetap bisa
        ditemukan di Supabase Table Editor dengan filter <strong>is_active = false</strong>.
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-[#ead8cf] bg-white p-8 text-center">
          <h2 className="font-display text-3xl">Produk tidak ditemukan</h2>
          <p className="mt-3 text-sm text-[#695b54]">
            Coba cari dengan nama model, warna, kategori, atau kode produk lain.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {filteredProducts.map((product) => (
            <details
              key={product.code}
              className="group overflow-hidden rounded-2xl border border-[#ead8cf] bg-white shadow-sm"
            >
              <summary className="grid cursor-pointer list-none gap-3 p-3 sm:grid-cols-[5.5rem_1fr_auto] sm:items-center">
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#f7eee9] p-1">
                  {product.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.imageUrl}
                      alt={`Foto ${product.name}`}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="px-2 text-center text-xs text-[#8a756d]">
                      No foto
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a2f36]">
                      {product.category}
                    </p>
                    <span className="rounded-full bg-[#35523f] px-2.5 py-1 text-[0.65rem] font-semibold text-white">
                      {product.code}
                    </span>
                  </div>
                  <h2 className="mt-1 font-display text-2xl leading-tight text-[#2f2521]">
                    {product.name}
                  </h2>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full border border-[#ead8cf] px-3 py-1 text-xs font-semibold text-[#35523f]">
                      {product.price}
                    </span>
                    <span className="rounded-full border border-[#ead8cf] px-3 py-1 text-xs font-semibold text-[#7a2f36]">
                      Total {formatNumber(product.totalStock)} pcs
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {visibleVariantChips(product).visible.map((variant) => (
                      <span
                        key={variant.code}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          variant.stock === 0
                            ? "bg-[#fff1f1] text-[#8a2c2c]"
                            : "bg-[#fffaf8] text-[#6b514b]"
                        }`}
                      >
                        {variant.color} {formatNumber(variant.stock)}
                      </span>
                    ))}
                    {visibleVariantChips(product).hiddenCount > 0 ? (
                      <span className="rounded-full bg-[#f7eee9] px-2.5 py-1 text-xs font-semibold text-[#8a756d]">
                        +{visibleVariantChips(product).hiddenCount} warna
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a756d]">
                    Detail
                  </span>
                  <span className="rounded-full border border-[#d7b5ae] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b514b] group-open:bg-[#35523f] group-open:text-white">
                    Buka
                  </span>
                </div>
              </summary>

              <div className="border-t border-[#ead8cf] bg-white p-4">
                  <div className="mt-4 overflow-hidden rounded-xl border border-[#ead8cf]">
                    {product.variants.map((variant) => (
                      <div
                        key={variant.code}
                        className="border-b border-[#ead8cf] bg-[#fffaf8] px-3 py-3 text-sm last:border-b-0"
                      >
                        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_5.5rem] md:items-center">
                          <div className="min-w-0">
                            <p className="font-semibold text-[#2f2521]">
                              {variant.color}
                            </p>
                            <p className="break-all text-xs text-[#8a756d]">
                              {variant.code}
                            </p>
                          </div>
                          <p className="w-fit rounded-full bg-white px-3 py-1 font-semibold text-[#35523f] md:justify-self-end">
                            {formatNumber(variant.stock)} pcs
                          </p>
                        </div>
                        <div className="mt-3 max-w-xl">
                          <StockControls
                            variantCode={variant.code}
                            currentStock={variant.stock}
                            color={variant.color}
                            adminPin={adminPin}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <AddVariantForm
                    adminPin={adminPin}
                    productCode={product.code}
                  />

                  <ProductPhotoForm
                    adminPin={adminPin}
                    productCode={product.code}
                  />

                  <EditProductForm
                    adminPin={adminPin}
                    productCode={product.code}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    specsText={specsToText(product)}
                  />

                  {product.specs.length > 0 ? (
                    <details className="mt-4 rounded-xl border border-[#ead8cf] bg-white px-3 py-3">
                      <summary className="cursor-pointer text-sm font-semibold text-[#6b514b]">
                        Detail bahan dan ukuran
                      </summary>
                      <dl className="mt-3 grid gap-2 text-sm md:grid-cols-2">
                        {product.specs.map((spec) => (
                          <div
                            key={`${product.code}-${spec.label}-${spec.value}`}
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

                  <DeactivateProductButton
                    adminPin={adminPin}
                    productCode={product.code}
                  />
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
