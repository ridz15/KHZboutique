"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getInventoryPinHash, inventoryAuthCookie } from "./auth";

export type InventoryLoginState = {
  ok: boolean;
  message: string;
};

export async function loginInventory(
  _previousState: InventoryLoginState,
  formData: FormData,
): Promise<InventoryLoginState> {
  const pin = String(formData.get("pin") ?? "");
  const configuredPin = process.env.INVENTORY_ADMIN_PIN;
  const expectedHash = getInventoryPinHash();

  if (!configuredPin || !expectedHash) {
    return {
      ok: false,
      message: "INVENTORY_ADMIN_PIN belum diisi.",
    };
  }

  if (pin !== configuredPin) {
    return {
      ok: false,
      message: "PIN salah.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(inventoryAuthCookie, expectedHash, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/gudang",
    maxAge: 60 * 60 * 12,
  });

  redirect("/gudang");
}

export async function logoutInventory() {
  const cookieStore = await cookies();
  cookieStore.delete(inventoryAuthCookie);
  redirect("/gudang");
}
