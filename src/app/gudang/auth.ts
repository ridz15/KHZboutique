import { createHash } from "node:crypto";
import { cookies } from "next/headers";

export const inventoryAuthCookie = "khz_inventory_auth";

export function getInventoryPinHash() {
  const pin = process.env.INVENTORY_ADMIN_PIN;

  if (!pin) {
    return null;
  }

  return createHash("sha256").update(`khz-inventory:${pin}`).digest("hex");
}

export async function isInventoryAuthenticated() {
  const expectedHash = getInventoryPinHash();

  if (!expectedHash) {
    return false;
  }

  const cookieStore = await cookies();
  const savedHash = cookieStore.get(inventoryAuthCookie)?.value;

  return savedHash === expectedHash;
}
