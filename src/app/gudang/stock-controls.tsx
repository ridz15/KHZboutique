"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  changeProductStocks,
  changeStock,
  type StockActionState,
} from "./actions";
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
  onOptimisticStockChange,
}: {
  variantCode: string;
  currentStock: number;
  color: string;
  adminPin: string;
  onOptimisticStockChange: (variantCode: string, stock: number) => void;
}) {
  const [note, setNote] = useState("");
  const [setValue, setSetValue] = useState(String(currentStock));
  const [state, formAction, pending] = useActionState(changeStock, initialState);
  const rollbackStockRef = useRef<number | null>(null);

  useEffect(() => {
    setSetValue(String(currentStock));
  }, [currentStock]);

  useEffect(() => {
    if (!state.message || state.variantCode !== variantCode) {
      return;
    }

    if (state.ok && typeof state.stockAfter === "number") {
      onOptimisticStockChange(variantCode, state.stockAfter);
      rollbackStockRef.current = null;
      return;
    }

    if (!state.ok && rollbackStockRef.current !== null) {
      onOptimisticStockChange(variantCode, rollbackStockRef.current);
      rollbackStockRef.current = null;
    }
  }, [onOptimisticStockChange, state, variantCode]);

  function previewStock(changeType: string, quantity: number) {
    if (!adminPin || pending || !Number.isInteger(quantity) || quantity < 0) {
      return;
    }

    const nextStock =
      changeType === "set"
        ? quantity
        : changeType === "add"
          ? currentStock + quantity
          : currentStock - quantity;

    if (!Number.isInteger(nextStock) || nextStock < 0) {
      return;
    }

    rollbackStockRef.current = currentStock;
    onOptimisticStockChange(variantCode, nextStock);
  }

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
              onClick={() => previewStock(changeType, Number(quantity))}
              disabled={pending}
              className="min-h-11 w-full rounded-lg border border-[#d7b5ae] bg-[#fffaf8] px-3 text-sm font-semibold text-[#6b514b] transition hover:border-[#c99691] disabled:opacity-55"
            >
              {pending ? "..." : label}
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
            onClick={() => previewStock("set", Number(setValue))}
            disabled={pending}
            className="min-h-11 rounded-lg bg-[#35523f] px-3 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#263d2e] disabled:opacity-55"
          >
            {pending ? "..." : "Set"}
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

export function ProductBulkStockControls({
  productCode,
  variants,
  adminPin,
  onOptimisticStockChange,
}: {
  productCode: string;
  variants: { code: string; color: string; stock: number }[];
  adminPin: string;
  onOptimisticStockChange: (variantCode: string, stock: number) => void;
}) {
  const [quantity, setQuantity] = useState("1");
  const [note, setNote] = useState("");
  const [state, formAction, pending] = useActionState(
    changeProductStocks,
    initialState,
  );
  const rollbackStocksRef = useRef<{ variantCode: string; stock: number }[] | null>(
    null,
  );

  useEffect(() => {
    if (!state.message) {
      return;
    }

    if (state.ok && state.stockUpdates) {
      state.stockUpdates.forEach((update) =>
        onOptimisticStockChange(update.variantCode, update.stockAfter),
      );
      rollbackStocksRef.current = null;
      return;
    }

    if (!state.ok && rollbackStocksRef.current) {
      rollbackStocksRef.current.forEach((variant) =>
        onOptimisticStockChange(variant.variantCode, variant.stock),
      );
      rollbackStocksRef.current = null;
    }
  }, [onOptimisticStockChange, state]);

  function previewAll(changeType: "add" | "subtract") {
    const parsedQuantity = Number(quantity);

    if (
      !adminPin ||
      pending ||
      !Number.isInteger(parsedQuantity) ||
      parsedQuantity <= 0
    ) {
      return;
    }

    const nextStocks = variants.map((variant) => ({
      variantCode: variant.code,
      stock:
        changeType === "add"
          ? variant.stock + parsedQuantity
          : variant.stock - parsedQuantity,
    }));

    if (nextStocks.some((variant) => variant.stock < 0)) {
      return;
    }

    rollbackStocksRef.current = variants.map((variant) => ({
      variantCode: variant.code,
      stock: variant.stock,
    }));
    nextStocks.forEach((variant) =>
      onOptimisticStockChange(variant.variantCode, variant.stock),
    );
  }

  return (
    <details className="mt-4 rounded-xl border border-[#ead8cf] bg-white px-3 py-3">
      <summary className="cursor-pointer text-sm font-semibold text-[#6b514b]">
        Ubah stok semua warna
      </summary>
      <div className="mt-3 grid gap-3">
        {!adminPin ? (
          <p className="rounded-lg bg-[#fff1f1] px-3 py-2 text-sm text-[#8a2c2c]">
            Isi PIN admin di bagian atas halaman dulu.
          </p>
        ) : null}
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
        <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_6rem_6rem]">
          <input
            type="number"
            min="1"
            inputMode="numeric"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            className="min-h-11 min-w-0 rounded-lg border border-[#ead8cf] px-3 text-sm text-[#2f2521] outline-none focus:border-[#35523f]"
            aria-label="Jumlah stok semua warna"
          />
          {(["subtract", "add"] as const).map((changeType) => (
            <form key={changeType} action={formAction}>
              <input type="hidden" name="adminPin" value={adminPin} />
              <input type="hidden" name="note" value={note} />
              <input type="hidden" name="productCode" value={productCode} />
              <input type="hidden" name="changeType" value={changeType} />
              <input type="hidden" name="quantity" value={quantity} />
              <button
                type="submit"
                onClick={() => previewAll(changeType)}
                disabled={pending || variants.length === 0}
                className={`min-h-11 w-full rounded-lg px-3 text-sm font-semibold transition disabled:opacity-55 ${
                  changeType === "add"
                    ? "bg-[#35523f] text-white hover:bg-[#263d2e]"
                    : "border border-[#d7b5ae] bg-[#fffaf8] text-[#6b514b] hover:border-[#c99691]"
                }`}
              >
                {pending ? "..." : changeType === "add" ? "+ Semua" : "- Semua"}
              </button>
            </form>
          ))}
        </div>

        {state.message ? (
          <p
            className={`rounded-lg px-3 py-2 text-sm ${
              state.ok
                ? "bg-[#eef6ef] text-[#2f5a3b]"
                : "bg-[#fff1f1] text-[#8a2c2c]"
            }`}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </details>
  );
}
