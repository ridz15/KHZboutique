"use client";

import { useActionState, useEffect, useState } from "react";
import { changeStock, type StockActionState } from "./actions";
import { DeactivateVariantButton } from "./management-controls";

const initialState: StockActionState = {
  ok: false,
  message: "",
};

export function StockControls({
  variantCode,
  currentStock,
  color,
  adminPin,
}: {
  variantCode: string;
  currentStock: number;
  color: string;
  adminPin: string;
}) {
  const [note, setNote] = useState("");
  const [setValue, setSetValue] = useState(String(currentStock));
  const [state, formAction, pending] = useActionState(changeStock, initialState);

  useEffect(() => {
    setSetValue(String(currentStock));
  }, [currentStock]);

  return (
    <details className="group">
      <summary className="flex min-h-10 w-fit min-w-24 cursor-pointer list-none items-center justify-center rounded-lg border border-[#d7b5ae] bg-white px-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#6b514b] transition hover:border-[#c99691] hover:bg-[#fffaf8]">
        Edit
      </summary>
      <div className="mt-3 rounded-xl border border-[#ead8cf] bg-white p-3 md:p-4">
        <p className="mb-3 text-sm font-semibold text-[#2f2521]">
          Ubah stok {color}
        </p>
        {!adminPin ? (
          <p className="mb-3 rounded-lg bg-[#fff1f1] px-3 py-2 text-sm text-[#8a2c2c]">
            Isi PIN admin di bagian atas halaman dulu.
          </p>
        ) : null}
        <div className="grid gap-3">
        <label className="grid gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7a5a52]">
          Catatan
          <input
            type="text"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="min-h-10 rounded-lg border border-[#ead8cf] px-3 text-sm normal-case tracking-normal text-[#2f2521] outline-none focus:border-[#35523f]"
            placeholder="Opsional"
          />
        </label>
        </div>

        <div className="mt-3 grid gap-2 md:grid-cols-[4.5rem_4.5rem_minmax(12rem,1fr)]">
        {[
          ["subtract", "1", "-1"],
          ["add", "1", "+1"],
        ].map(([changeType, quantity, label]) => (
          <form key={`${changeType}-${quantity}`} action={formAction}>
            <input type="hidden" name="adminPin" value={adminPin} />
            <input type="hidden" name="note" value={note} />
            <input type="hidden" name="variantCode" value={variantCode} />
            <input type="hidden" name="changeType" value={changeType} />
            <input type="hidden" name="quantity" value={quantity} />
            <button
              type="submit"
              disabled={pending}
              className="min-h-11 w-full rounded-lg border border-[#d7b5ae] bg-[#fffaf8] px-3 text-sm font-semibold text-[#6b514b] transition hover:border-[#c99691] disabled:opacity-55"
            >
              {label}
            </button>
          </form>
        ))}

        <form action={formAction} className="grid min-w-0 grid-cols-[minmax(0,1fr)_4.5rem] gap-2">
          <input type="hidden" name="adminPin" value={adminPin} />
          <input type="hidden" name="note" value={note} />
          <input type="hidden" name="variantCode" value={variantCode} />
          <input type="hidden" name="changeType" value="set" />
          <input type="hidden" name="quantity" value={setValue} />
          <input
            type="number"
            min="0"
            inputMode="numeric"
            value={setValue}
            onChange={(event) => setSetValue(event.target.value)}
            className="min-h-11 min-w-0 rounded-lg border border-[#ead8cf] px-3 text-sm text-[#2f2521] outline-none focus:border-[#35523f]"
            aria-label="Set stok"
          />
          <button
            type="submit"
            disabled={pending}
            className="min-h-11 rounded-lg bg-[#35523f] px-3 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#263d2e] disabled:opacity-55"
          >
            Set
          </button>
        </form>
      </div>

        {state.message ? (
          <p
            className={`mt-3 rounded-lg px-3 py-2 text-sm ${
              state.ok
                ? "bg-[#eef6ef] text-[#2f5a3b]"
                : "bg-[#fff1f1] text-[#8a2c2c]"
            }`}
          >
            {state.message}
          </p>
        ) : null}
        <DeactivateVariantButton adminPin={adminPin} variantCode={variantCode} />
      </div>
    </details>
  );
}
