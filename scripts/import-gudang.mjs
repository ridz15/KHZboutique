import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const gudangRoot = path.join(process.cwd(), "Gudang");

const productCodeOverrides = {
  "abaya aisyah": "KHZ-ABY-AIS",
  "abaya anandya": "KHZ-ABY-AND",
  "abaya jaguar": "KHZ-ABY-JGR",
  "abaya kafta": "KHZ-ABY-KFA",
  "abaya marbella": "KHZ-ABY-MRB",
  "kaftan armany": "KHZ-KFT-ARM",
  "kaftan cradenza": "KHZ-KFT-CRD",
  "kaftan donatelo": "KHZ-KFT-DNT",
  "kaftan jaguar": "KHZ-KFT-JGR",
  "kaftan jetblack": "KHZ-KFT-JTB",
  "kaftan katun bordir": "KHZ-KFT-KBR",
  "kaftan visco": "KHZ-KFT-VSC",
  "kaftan viscose": "KHZ-KFT-CSE",
  "midi binor": "KHZ-MDI-BNR",
  "set rok malay": "KHZ-SET-MLY",
  "tencel tunic set": "KHZ-TNC-TCL",
};

const colorCodeOverrides = {
  abu: "ABU",
  biru: "BRU",
  burgundy: "BRG",
  bw: "BW",
  coklat: "CKL",
  grey: "GRY",
  hijau: "HJU",
  hitam: "HTM",
  ijo: "IJO",
  krem: "KRM",
  lilac: "LLC",
  maroon: "MRN",
  marun: "MRN",
  milo: "MLO",
  navy: "NVY",
  nude: "NDE",
  oren: "ORN",
  pink: "PNK",
  "pink gelap": "PKG",
  "pink rose": "PRS",
  "rose gold": "RGD",
  salem: "SLM",
  ungu: "UNG",
};

function requireEnv() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Isi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di .env.local dulu.",
    );
  }
}

function loadLocalEnv() {
  const envPath = path.join(process.cwd(), ".env.local");

  if (!existsSync(envPath)) {
    return;
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^["']|["']$/g, "");

    process.env[key] ||= value;
  }
}

function normalizeKey(value) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function titleCase(value) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function inferCategory(folderName) {
  const normalized = normalizeKey(folderName);

  if (normalized.startsWith("abaya")) return "Abaya";
  if (normalized.startsWith("kaftan")) return "Kaftan";
  if (normalized.startsWith("set")) return "Set";
  if (normalized.includes("tunic")) return "Tunic Set";
  if (normalized.startsWith("midi")) return "Midi";

  return "Produk";
}

function createShortCode(value) {
  const normalized = normalizeKey(value);

  if (productCodeOverrides[normalized]) {
    return productCodeOverrides[normalized];
  }

  const [type = "produk", ...nameParts] = normalized.split(" ");
  const typeCode =
    {
      abaya: "ABY",
      kaftan: "KFT",
      midi: "MDI",
      set: "SET",
      tencel: "TNC",
      tunic: "TNC",
    }[type] ?? type.slice(0, 3).toUpperCase();
  const descriptor = nameParts.join(" ") || type;
  const descriptorCode = descriptor
    .replace(/[aeiou\s]/g, "")
    .slice(0, 3)
    .padEnd(3, "X")
    .toUpperCase();

  return `KHZ-${typeCode}-${descriptorCode}`;
}

function createColorCode(color) {
  const normalized = normalizeKey(color);

  if (colorCodeOverrides[normalized]) {
    return colorCodeOverrides[normalized];
  }

  return normalized
    .replace(/[aeiou\s]/g, "")
    .slice(0, 3)
    .padEnd(3, "X")
    .toUpperCase();
}

function parsePrice(raw) {
  const match = raw.match(/harga\s*:?\s*(\d+)\s*rb/i);

  return match ? Number(match[1]) * 1000 : 0;
}

function parseStockLine(line) {
  const match = line.match(/^([A-Za-zÀ-ÿ\s]+?)\s*[:;]?\s*(\d+)\s*(?:pcs?|pc)?$/i);

  if (!match) {
    return null;
  }

  const color = match[1].trim();
  const stock = Number(match[2]);
  const ignoredLabels = new Set(["ld", "panjang", "harga"]);

  if (!color || ignoredLabels.has(normalizeKey(color)) || Number.isNaN(stock)) {
    return null;
  }

  return { color: titleCase(color), stock };
}

function parseSpecs(lines) {
  return lines.map((line) => {
    const colonMatch = line.match(/^([^:]+):\s*(.+)$/);

    if (colonMatch) {
      return { label: titleCase(colonMatch[1]), value: colonMatch[2] };
    }

    const lower = normalizeKey(line);

    if (lower.startsWith("bahan ")) return { label: "Bahan", value: line.replace(/^bahan\s+/i, "") };
    if (lower === "bahan") return { label: "Bahan", value: "Belum diisi" };
    if (/^ld\s+\d+/i.test(line)) return { label: "LD", value: line.replace(/^ld\s+/i, "") };
    if (/^panjang\s+\d+/i.test(line)) return { label: "Panjang", value: line.replace(/^panjang\s+/i, "") };
    if (lower.includes("furing")) return { label: "Furing", value: line };
    if (lower.includes("hijab") || lower.includes("pashmina")) return { label: "Hijab", value: line };
    if (lower.includes("belt") || lower.includes("ikat pinggang")) return { label: "Belt", value: line };
    if (lower.includes("busui")) return { label: "Busui", value: line };
    if (lower.includes("size")) return { label: "Ukuran", value: line };
    if (lower.includes("sleting")) return { label: "Sleting", value: line };
    if (lower.includes("tangan")) return { label: "Tangan", value: line };
    if (lower.includes("outer")) return { label: "Outer", value: line };
    if (lower.includes("mute") || lower.includes("bordir") || lower.includes("brukat")) {
      return { label: "Detail", value: line };
    }

    return { label: "Catatan", value: line };
  });
}

function parseDetail(detail, productCode) {
  const lines = detail
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const variants = [];
  const specLines = [];
  let stockSectionStarted = false;
  let priceSeen = false;

  for (const line of lines) {
    if (/^harga\b/i.test(line)) {
      priceSeen = true;
      continue;
    }

    if (/^(stok|warna|stok ready)\b/i.test(line)) {
      stockSectionStarted = true;
      continue;
    }

    const stockLine = priceSeen || stockSectionStarted ? parseStockLine(line) : null;

    if (stockLine) {
      variants.push({
        ...stockLine,
        code: `${productCode}-${createColorCode(stockLine.color)}`,
      });
      continue;
    }

    specLines.push(line);
  }

  return {
    price: parsePrice(detail),
    specs: parseSpecs(specLines),
    variants,
  };
}

function readProducts() {
  if (!existsSync(gudangRoot)) {
    throw new Error("Folder Gudang tidak ditemukan.");
  }

  return readdirSync(gudangRoot)
    .map((folderName) => ({
      folderName,
      folderPath: path.join(gudangRoot, folderName),
    }))
    .filter(({ folderPath }) => statSync(folderPath).isDirectory())
    .map(({ folderName, folderPath }) => {
      const code = createShortCode(folderName);
      const detailPath = path.join(folderPath, "detail.txt");
      const detail = existsSync(detailPath) ? readFileSync(detailPath, "utf8") : "";
      const parsed = parseDetail(detail, code);

      return {
        code,
        name: titleCase(folderName),
        category: inferCategory(folderName),
        price: parsed.price,
        image_url: null,
        specs: parsed.specs,
        is_active: true,
        variants: parsed.variants,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

async function supabaseFetch(pathname, options = {}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${pathname}`, {
    ...options,
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${options.method ?? "GET"} ${pathname} failed: ${response.status} ${errorText}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function upsertProduct(product) {
  const [savedProduct] = await supabaseFetch("inventory_products?on_conflict=code", {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify([
      {
        code: product.code,
        name: product.name,
        category: product.category,
        price: product.price,
        image_url: product.image_url,
        specs: product.specs,
        is_active: product.is_active,
      },
    ]),
  });

  return savedProduct;
}

async function getExistingVariant(code) {
  const variants = await supabaseFetch(
    `inventory_variants?code=eq.${encodeURIComponent(code)}&select=id,stock`,
    { method: "GET" },
  );

  return variants[0] ?? null;
}

async function upsertVariant(productId, variant, sortOrder) {
  const existing = await getExistingVariant(variant.code);
  const [savedVariant] = await supabaseFetch("inventory_variants?on_conflict=code", {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify([
      {
        product_id: productId,
        code: variant.code,
        color: variant.color,
        stock: variant.stock,
        sort_order: sortOrder,
      },
    ]),
  });

  if (!existing) {
    return savedVariant;
  }

  if (existing.stock !== variant.stock) {
    await supabaseFetch("inventory_stock_movements", {
      method: "POST",
      body: JSON.stringify([
        {
          variant_id: savedVariant.id,
          change_type: "set",
          quantity: variant.stock - existing.stock,
          stock_before: existing.stock,
          stock_after: variant.stock,
          note: "Import ulang dari folder Gudang",
        },
      ]),
    });
  }

  return savedVariant;
}

async function main() {
  loadLocalEnv();
  requireEnv();

  const products = readProducts();
  let variantCount = 0;

  for (const product of products) {
    const savedProduct = await upsertProduct(product);

    for (const [index, variant] of product.variants.entries()) {
      await upsertVariant(savedProduct.id, variant, index);
      variantCount += 1;
    }

    console.log(`Imported ${product.code} ${product.name} (${product.variants.length} warna)`);
  }

  console.log(`Done. Imported ${products.length} products and ${variantCount} variants.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
