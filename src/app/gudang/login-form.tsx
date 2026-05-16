"use client";

import { useActionState } from "react";
import { loginInventory, type InventoryLoginState } from "./auth-actions";

const initialState: InventoryLoginState = {
  ok: false,
  message: "",
};

export function InventoryLoginForm() {
  const [state, formAction, pending] = useActionState(loginInventory, initialState);

  return (
    <form action={formAction} className="mt-6 grid gap-4">
      <label className="grid gap-2 text-sm font-semibold text-[#6b514b]">
        PIN Gudang
        <input
          name="pin"
          type="password"
          autoFocus
          className="min-h-12 rounded-xl border border-[#d7b5ae] bg-white px-4 text-base text-[#2f2521] outline-none transition focus:border-[#35523f] focus:ring-4 focus:ring-[#35523f]/10"
          placeholder="Masukkan PIN"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="min-h-12 rounded-xl bg-[#35523f] px-5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#263d2e] disabled:opacity-55"
      >
        Masuk Gudang
      </button>
      {state.message ? (
        <p className="rounded-lg bg-[#fff1f1] px-3 py-2 text-sm text-[#8a2c2c]">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
