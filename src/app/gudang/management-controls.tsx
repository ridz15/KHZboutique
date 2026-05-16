"use client";

import { useActionState, useState } from "react";
import {
  addProduct,
  addVariant,
  changeProductPhoto,
  deactivateProduct,
  deactivateVariant,
  editProduct,
  type StockActionState,
} from "./actions";

const initialState: StockActionState = {
  ok: false,
  message: "",
};

function ActionMessage({ state }: { state: StockActionState }) {
  if (!state.message) return null;

  return (
    <p
      className={`mt-3 rounded-lg px-3 py-2 text-sm ${
        state.ok ? "bg-[#eef6ef] text-[#2f5a3b]" : "bg-[#fff1f1] text-[#8a2c2c]"
      }`}
    >
      {state.message}
    </p>
  );
}

const inputClass =
  "min-h-11 rounded-lg border border-[#ead8cf] px-3 text-sm text-[#2f2521] outline-none focus:border-[#35523f]";

export function AddProductForm({ adminPin }: { adminPin: string }) {
  const [state, formAction, pending] = useActionState(addProduct, initialState);
  const [photoError, setPhotoError] = useState("");

  return (
    <details className="rounded-2xl border border-[#ead8cf] bg-white p-3">
      <summary className="cursor-pointer text-sm font-semibold text-[#6b514b]">
        Tambah produk baru
      </summary>
      <form action={formAction} className="mt-4 grid gap-3">
        <input type="hidden" name="adminPin" value={adminPin} />
        <div className="grid gap-3 md:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold text-[#6b514b]">
            Nama produk
            <input name="name" className={inputClass} placeholder="Kaftan Viscose" />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#6b514b]">
            Kategori
            <select name="category" className={inputClass} defaultValue="Kaftan">
              <option>Abaya</option>
              <option>Kaftan</option>
              <option>Gamis</option>
              <option>Tunic Set</option>
              <option>Set</option>
              <option>Midi</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#6b514b]">
            Harga
            <input name="price" className={inputClass} placeholder="Rp 190.000" />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#6b514b]">
            Warna pertama
            <input name="color" className={inputClass} placeholder="Hitam" />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#6b514b]">
            Stok awal
            <input
              name="stock"
              type="number"
              min="0"
              inputMode="numeric"
              className={inputClass}
              defaultValue="0"
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#6b514b] md:col-span-2">
            Foto produk
            <input
              name="photo"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (!file) {
                  setPhotoError("");
                  return;
                }

                if (file.size > 2 * 1024 * 1024) {
                  setPhotoError("Foto terlalu besar. Maksimal 2MB.");
                  event.target.value = "";
                  return;
                }

                setPhotoError("");
              }}
              className="min-h-11 rounded-lg border border-[#ead8cf] bg-white px-3 py-2 text-sm text-[#2f2521] file:mr-3 file:rounded-lg file:border-0 file:bg-[#35523f] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
            <span className="text-xs font-normal leading-5 text-[#8a756d]">
              Gunakan foto JPG, PNG, atau WEBP maksimal 2MB.
            </span>
            {photoError ? (
              <span className="text-xs font-normal leading-5 text-[#8a2c2c]">
                {photoError}
              </span>
            ) : null}
          </label>
        </div>
        <label className="grid gap-1 text-sm font-semibold text-[#6b514b]">
          Detail bahan dan ukuran
          <textarea
            name="specsText"
            className={`${inputClass} min-h-32 py-3`}
            placeholder={"Bahan ceruty\nLD 120\nPanjang 140\nFull furing"}
          />
        </label>
        <button
          type="submit"
          disabled={pending || !adminPin}
          className="min-h-12 rounded-xl bg-[#35523f] px-5 text-sm font-semibold uppercase tracking-[0.12em] text-white disabled:opacity-55 md:w-fit"
        >
          Tambah Produk
        </button>
        <ActionMessage state={state} />
      </form>
    </details>
  );
}

export function ProductPhotoForm({
  adminPin,
  productCode,
}: {
  adminPin: string;
  productCode: string;
}) {
  const [state, formAction, pending] = useActionState(
    changeProductPhoto,
    initialState,
  );
  const [photoError, setPhotoError] = useState("");

  return (
    <details className="mt-4 rounded-xl border border-[#ead8cf] bg-white px-3 py-3">
      <summary className="cursor-pointer text-sm font-semibold text-[#6b514b]">
        Upload/ganti foto
      </summary>
      <form action={formAction} className="mt-3 grid gap-3">
        <input type="hidden" name="adminPin" value={adminPin} />
        <input type="hidden" name="productCode" value={productCode} />
        <label className="grid gap-1 text-sm font-semibold text-[#6b514b]">
          Foto produk
          <input
            name="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (!file) {
                setPhotoError("");
                return;
              }

              if (file.size > 2 * 1024 * 1024) {
                setPhotoError("Foto terlalu besar. Maksimal 2MB.");
                event.target.value = "";
                return;
              }

              setPhotoError("");
            }}
            className="min-h-11 rounded-lg border border-[#ead8cf] bg-white px-3 py-2 text-sm text-[#2f2521] file:mr-3 file:rounded-lg file:border-0 file:bg-[#35523f] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
          <span className="text-xs font-normal leading-5 text-[#8a756d]">
            JPG, PNG, atau WEBP maksimal 2MB.
          </span>
          {photoError ? (
            <span className="text-xs font-normal leading-5 text-[#8a2c2c]">
              {photoError}
            </span>
          ) : null}
        </label>
        <button
          type="submit"
          disabled={pending || !adminPin || Boolean(photoError)}
          className="min-h-11 rounded-lg bg-[#35523f] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-55 md:w-fit"
        >
          Simpan Foto
        </button>
        <ActionMessage state={state} />
      </form>
    </details>
  );
}

export function EditProductForm({
  adminPin,
  productCode,
  name,
  category,
  price,
  specsText,
}: {
  adminPin: string;
  productCode: string;
  name: string;
  category: string;
  price: string;
  specsText: string;
}) {
  const [state, formAction, pending] = useActionState(editProduct, initialState);

  return (
    <details className="mt-4 rounded-xl border border-[#ead8cf] bg-white px-3 py-3">
      <summary className="cursor-pointer text-sm font-semibold text-[#6b514b]">
        Edit detail produk
      </summary>
      <form action={formAction} className="mt-4 grid gap-3">
        <input type="hidden" name="adminPin" value={adminPin} />
        <input type="hidden" name="productCode" value={productCode} />
        <div className="grid gap-3 md:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold text-[#6b514b]">
            Nama produk
            <input
              name="name"
              className={inputClass}
              defaultValue={name}
            />
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#6b514b]">
            Kategori
            <select name="category" className={inputClass} defaultValue={category}>
              <option>Abaya</option>
              <option>Kaftan</option>
              <option>Gamis</option>
              <option>Tunic Set</option>
              <option>Set</option>
              <option>Midi</option>
              <option>Produk</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm font-semibold text-[#6b514b]">
            Harga
            <input
              name="price"
              className={inputClass}
              defaultValue={price}
            />
          </label>
        </div>
        <label className="grid gap-1 text-sm font-semibold text-[#6b514b]">
          Detail bahan dan ukuran
          <textarea
            name="specsText"
            className={`${inputClass} min-h-32 py-3`}
            defaultValue={specsText}
          />
        </label>
        <button
          type="submit"
          disabled={pending || !adminPin}
          className="min-h-11 rounded-lg bg-[#35523f] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-55 md:w-fit"
        >
          Simpan Detail
        </button>
        <ActionMessage state={state} />
      </form>
    </details>
  );
}

export function AddVariantForm({
  adminPin,
  productCode,
}: {
  adminPin: string;
  productCode: string;
}) {
  const [state, formAction, pending] = useActionState(addVariant, initialState);

  return (
    <details className="mt-4 rounded-xl border border-[#ead8cf] bg-white px-3 py-3">
      <summary className="cursor-pointer text-sm font-semibold text-[#6b514b]">
        Tambah warna
      </summary>
      <form action={formAction} className="mt-3 grid gap-2 md:grid-cols-[1fr_8rem_auto]">
        <input type="hidden" name="adminPin" value={adminPin} />
        <input type="hidden" name="productCode" value={productCode} />
        <input name="color" className={inputClass} placeholder="Warna baru" />
        <input
          name="stock"
          type="number"
          min="0"
          inputMode="numeric"
          className={inputClass}
          defaultValue="0"
        />
        <button
          type="submit"
          disabled={pending || !adminPin}
          className="min-h-11 rounded-lg bg-[#35523f] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-55"
        >
          Tambah
        </button>
        <div className="md:col-span-3">
          <ActionMessage state={state} />
        </div>
      </form>
    </details>
  );
}

export function DeactivateProductButton({
  adminPin,
  productCode,
}: {
  adminPin: string;
  productCode: string;
}) {
  const [state, formAction, pending] = useActionState(deactivateProduct, initialState);
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="mt-4 rounded-xl border border-[#ead8cf] bg-[#fffaf8] p-3">
      {!confirming ? (
        <button
          type="button"
          disabled={!adminPin}
          onClick={() => setConfirming(true)}
          className="min-h-10 rounded-lg border border-[#d7b5ae] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#8a2c2c] disabled:opacity-55"
        >
          Nonaktifkan produk
        </button>
      ) : (
        <div className="grid gap-3">
          <p className="text-sm leading-6 text-[#6b514b]">
            Yakin nonaktifkan produk ini? Produk akan disembunyikan dari gudang
            aktif, tapi datanya tetap ada di Supabase.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="min-h-10 rounded-lg border border-[#d7b5ae] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#6b514b]"
            >
              Batal
            </button>
            <form action={formAction}>
              <input type="hidden" name="adminPin" value={adminPin} />
              <input type="hidden" name="productCode" value={productCode} />
              <button
                type="submit"
                disabled={pending || !adminPin}
                className="min-h-10 rounded-lg bg-[#8a2c2c] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-55"
              >
                Ya, nonaktifkan
              </button>
            </form>
          </div>
        </div>
      )}
      <ActionMessage state={state} />
    </div>
  );
}

export function DeactivateVariantButton({
  adminPin,
  variantCode,
}: {
  adminPin: string;
  variantCode: string;
}) {
  const [state, formAction, pending] = useActionState(deactivateVariant, initialState);
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="mt-3">
      {!confirming ? (
        <button
          type="button"
          disabled={!adminPin}
          onClick={() => setConfirming(true)}
          className="min-h-10 rounded-lg border border-[#d7b5ae] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#8a2c2c] disabled:opacity-55"
        >
          Nonaktifkan warna
        </button>
      ) : (
        <div className="rounded-lg bg-[#fff1f1] p-3">
          <p className="text-sm leading-6 text-[#8a2c2c]">
            Yakin nonaktifkan warna ini?
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="min-h-10 rounded-lg border border-[#d7b5ae] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#6b514b]"
            >
              Batal
            </button>
            <form action={formAction}>
              <input type="hidden" name="adminPin" value={adminPin} />
              <input type="hidden" name="variantCode" value={variantCode} />
              <button
                type="submit"
                disabled={pending || !adminPin}
                className="min-h-10 rounded-lg bg-[#8a2c2c] px-4 text-xs font-semibold uppercase tracking-[0.1em] text-white disabled:opacity-55"
              >
                Ya, nonaktifkan
              </button>
            </form>
          </div>
        </div>
      )}
      <ActionMessage state={state} />
    </div>
  );
}
