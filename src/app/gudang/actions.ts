"use server";

import { revalidatePath } from "next/cache";
import {
  createInventoryProduct,
  createInventoryProductCode,
  createInventoryVariant,
  deactivateInventoryProduct,
  deactivateInventoryVariant,
  updateInventoryProductDetails,
  updateInventoryProductPhoto,
  updateInventoryVariantStock,
  uploadInventoryPhoto,
} from "@/lib/inventory";

export type StockActionState = {
  ok: boolean;
  message: string;
};

function validateAdminPin(adminPin: string): StockActionState | null {
  const configuredPin = process.env.INVENTORY_ADMIN_PIN;

  if (!configuredPin) {
    return {
      ok: false,
      message: "INVENTORY_ADMIN_PIN belum diisi di .env.local.",
    };
  }

  if (adminPin !== configuredPin) {
    return {
      ok: false,
      message: "PIN admin salah.",
    };
  }

  return null;
}

export async function changeStock(
  _previousState: StockActionState,
  formData: FormData,
): Promise<StockActionState> {
  const adminPin = String(formData.get("adminPin") ?? "");
  const variantCode = String(formData.get("variantCode") ?? "");
  const changeType = String(formData.get("changeType") ?? "");
  const quantity = Number(formData.get("quantity") ?? 0);
  const note = String(formData.get("note") ?? "");
  const pinError = validateAdminPin(adminPin);

  if (pinError) return pinError;

  if (!variantCode || !["set", "add", "subtract"].includes(changeType)) {
    return {
      ok: false,
      message: "Data perubahan stok tidak lengkap.",
    };
  }

  if (!Number.isInteger(quantity) || quantity < 0) {
    return {
      ok: false,
      message: "Jumlah stok harus angka bulat 0 atau lebih.",
    };
  }

  if (changeType !== "set" && quantity === 0) {
    return {
      ok: false,
      message: "Jumlah tambah/kurang harus lebih dari 0.",
    };
  }

  try {
    const result = await updateInventoryVariantStock({
      variantCode,
      changeType: changeType as "set" | "add" | "subtract",
      quantity,
      note,
    });

    revalidatePath("/gudang");

    return {
      ok: true,
      message: `Stok berhasil diubah: ${result.stockBefore} -> ${result.stockAfter}.`,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Gagal mengubah stok.",
    };
  }
}

export async function addProduct(
  _previousState: StockActionState,
  formData: FormData,
): Promise<StockActionState> {
  const pinError = validateAdminPin(String(formData.get("adminPin") ?? ""));

  if (pinError) return pinError;

  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const price = String(formData.get("price") ?? "").trim();
  const specsText = String(formData.get("specsText") ?? "");
  const color = String(formData.get("color") ?? "").trim();
  const stock = Number(formData.get("stock") ?? 0);
  const photo = formData.get("photo");

  if (!name || !category || !price || !color) {
    return { ok: false, message: "Nama, kategori, harga, dan warna wajib diisi." };
  }

  if (!Number.isInteger(stock) || stock < 0) {
    return { ok: false, message: "Stok awal harus angka bulat 0 atau lebih." };
  }

  try {
    const productCode = createInventoryProductCode(name);
    const imageUrl =
      photo instanceof File && photo.size > 0
        ? await uploadInventoryPhoto({ file: photo, productCode })
        : null;
    const code = await createInventoryProduct({
      name,
      category,
      price,
      specsText,
      color,
      stock,
      imageUrl,
    });

    revalidatePath("/gudang");

    return { ok: true, message: `Produk berhasil ditambahkan: ${code}.` };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Gagal menambahkan produk.",
    };
  }
}

export async function addVariant(
  _previousState: StockActionState,
  formData: FormData,
): Promise<StockActionState> {
  const pinError = validateAdminPin(String(formData.get("adminPin") ?? ""));

  if (pinError) return pinError;

  const productCode = String(formData.get("productCode") ?? "").trim();
  const color = String(formData.get("color") ?? "").trim();
  const stock = Number(formData.get("stock") ?? 0);

  if (!productCode || !color) {
    return { ok: false, message: "Produk dan warna wajib diisi." };
  }

  if (!Number.isInteger(stock) || stock < 0) {
    return { ok: false, message: "Stok awal harus angka bulat 0 atau lebih." };
  }

  try {
    const code = await createInventoryVariant({ productCode, color, stock });

    revalidatePath("/gudang");

    return { ok: true, message: `Varian berhasil ditambahkan: ${code}.` };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Gagal menambahkan varian.",
    };
  }
}

export async function deactivateProduct(
  _previousState: StockActionState,
  formData: FormData,
): Promise<StockActionState> {
  const pinError = validateAdminPin(String(formData.get("adminPin") ?? ""));

  if (pinError) return pinError;

  const productCode = String(formData.get("productCode") ?? "").trim();

  if (!productCode) {
    return { ok: false, message: "Kode produk tidak ditemukan." };
  }

  try {
    await deactivateInventoryProduct(productCode);
    revalidatePath("/gudang");

    return { ok: true, message: `Produk ${productCode} dinonaktifkan.` };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Gagal menonaktifkan produk.",
    };
  }
}

export async function deactivateVariant(
  _previousState: StockActionState,
  formData: FormData,
): Promise<StockActionState> {
  const pinError = validateAdminPin(String(formData.get("adminPin") ?? ""));

  if (pinError) return pinError;

  const variantCode = String(formData.get("variantCode") ?? "").trim();

  if (!variantCode) {
    return { ok: false, message: "Kode varian tidak ditemukan." };
  }

  try {
    await deactivateInventoryVariant(variantCode);
    revalidatePath("/gudang");

    return { ok: true, message: `Varian ${variantCode} dinonaktifkan.` };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Gagal menonaktifkan varian.",
    };
  }
}

export async function changeProductPhoto(
  _previousState: StockActionState,
  formData: FormData,
): Promise<StockActionState> {
  const pinError = validateAdminPin(String(formData.get("adminPin") ?? ""));

  if (pinError) return pinError;

  const productCode = String(formData.get("productCode") ?? "").trim();
  const photo = formData.get("photo");

  if (!productCode) {
    return { ok: false, message: "Kode produk tidak ditemukan." };
  }

  if (!(photo instanceof File) || photo.size === 0) {
    return { ok: false, message: "Pilih foto produk dulu." };
  }

  try {
    const imageUrl = await uploadInventoryPhoto({ file: photo, productCode });
    await updateInventoryProductPhoto({ productCode, imageUrl });
    revalidatePath("/gudang");

    return { ok: true, message: "Foto produk berhasil diperbarui." };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Gagal memperbarui foto produk.",
    };
  }
}

export async function editProduct(
  _previousState: StockActionState,
  formData: FormData,
): Promise<StockActionState> {
  const pinError = validateAdminPin(String(formData.get("adminPin") ?? ""));

  if (pinError) return pinError;

  const productCode = String(formData.get("productCode") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const price = String(formData.get("price") ?? "").trim();
  const specsText = String(formData.get("specsText") ?? "");

  if (!productCode || !name || !category || !price) {
    return {
      ok: false,
      message: "Nama, kategori, dan harga wajib diisi.",
    };
  }

  try {
    await updateInventoryProductDetails({
      productCode,
      name,
      category,
      price,
      specsText,
    });

    revalidatePath("/gudang");

    return { ok: true, message: "Detail produk berhasil diperbarui." };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Gagal memperbarui detail produk.",
    };
  }
}
