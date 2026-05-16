import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

export type InventoryVariant = {
  color: string;
  stock: number;
  code: string;
  isActive?: boolean;
};

export type InventoryProduct = {
  slug: string;
  folderName: string;
  name: string;
  category: string;
  code: string;
  price: string;
  specs: InventorySpec[];
  variants: InventoryVariant[];
  imageUrl: string | null;
  totalStock: number;
};

export type InventorySpec = {
  label: string;
  value: string;
};

type SupabaseInventoryVariant = {
  code: string;
  color: string;
  stock: number;
  sort_order: number | null;
  is_active?: boolean;
};

type SupabaseInventoryProduct = {
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  image_url: string | null;
  specs: InventorySpec[] | null;
  is_active: boolean;
  inventory_variants: SupabaseInventoryVariant[] | null;
};

const productCodeOverrides: Record<string, string> = {
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

const colorCodeOverrides: Record<string, string> = {
  abu: "ABU",
  biru: "BRU",
  black: "BLK",
  burgandy: "BRG",
  burgundy: "BRG",
  bw: "BW",
  coklat: "CKL",
  grey: "GRY",
  hijau: "HJU",
  hitam: "HTM",
  htam: "HTM",
  ijo: "IJO",
  krem: "KRM",
  lilac: "LLC",
  maroon: "MRN",
  marun: "MRN",
  merah: "MRH",
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

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function getGudangRoot() {
  return path.join(process.cwd(), "Gudang");
}

function normalizeKey(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function titleCase(value: string) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function inferCategory(folderName: string) {
  const normalized = normalizeKey(folderName);

  if (normalized.startsWith("abaya")) {
    return "Abaya";
  }

  if (normalized.startsWith("kaftan")) {
    return "Kaftan";
  }

  if (normalized.startsWith("set")) {
    return "Set";
  }

  if (normalized.includes("tunic")) {
    return "Tunic Set";
  }

  if (normalized.startsWith("midi")) {
    return "Midi";
  }

  return "Produk";
}

export function createInventoryProductCode(value: string) {
  const normalized = normalizeKey(value);
  const override = productCodeOverrides[normalized];

  if (override) {
    return override;
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

export function createInventoryColorCode(color: string) {
  const normalized = normalizeKey(color);
  const override = colorCodeOverrides[normalized];

  if (override) {
    return override;
  }

  return normalized
    .replace(/[aeiou\s]/g, "")
    .slice(0, 3)
    .padEnd(3, "X")
    .toUpperCase();
}

function formatPrice(raw: string) {
  const match = raw.match(/harga\s*:?\s*(\d+)\s*rb/i);

  if (!match) {
    return "Belum diisi";
  }

  return `Rp ${Number(match[1]) * 1000}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function normalizeSpecLine(line: string): InventorySpec {
  const cleaned = line
    .replace(/\bful\b/gi, "Full")
    .replace(/\bfre\b/gi, "Free")
    .replace(/\btdk\b/gi, "Tidak")
    .replace(/\btranfaran\b/gi, "transparan")
    .replace(/\bpasmina\b/gi, "pashmina")
    .replace(/\bmanÅŸet\b/gi, "manset")
    .trim();
  const colonMatch = cleaned.match(/^([^:]+):\s*(.+)$/);

  if (colonMatch) {
    return {
      label: titleCase(colonMatch[1]),
      value: colonMatch[2],
    };
  }

  const lower = normalizeKey(cleaned);

  if (lower.startsWith("bahan ")) {
    return { label: "Bahan", value: cleaned.replace(/^bahan\s+/i, "") };
  }

  if (lower === "bahan") {
    return { label: "Bahan", value: "Belum diisi" };
  }

  if (/^ld\s+\d+/i.test(cleaned)) {
    return { label: "LD", value: cleaned.replace(/^ld\s+/i, "") };
  }

  if (/^pj\s+\d+/i.test(cleaned)) {
    return { label: "Panjang", value: cleaned.replace(/^pj\s+/i, "") };
  }

  if (lower.includes("furing")) {
    return { label: "Furing", value: cleaned };
  }

  if (lower.includes("hijab") || lower.includes("pashmina")) {
    return { label: "Hijab", value: cleaned };
  }

  if (lower.includes("belt") || lower.includes("ikat pinggang")) {
    return { label: "Belt", value: cleaned };
  }

  if (lower.includes("busui")) {
    return { label: "Busui", value: cleaned };
  }

  if (lower.includes("size")) {
    return { label: "Ukuran", value: cleaned };
  }

  if (lower.includes("sleting")) {
    return { label: "Sleting", value: cleaned };
  }

  if (lower.includes("tangan")) {
    return { label: "Tangan", value: cleaned };
  }

  if (lower.includes("outer")) {
    return { label: "Outer", value: cleaned };
  }

  if (lower.includes("mute") || lower.includes("bordir") || lower.includes("brukat")) {
    return { label: "Detail", value: cleaned };
  }

  return { label: "Catatan", value: cleaned };
}

function mergeSpecs(lines: string[]) {
  const specs = lines.map(normalizeSpecLine);
  const merged: InventorySpec[] = [];

  for (const spec of specs) {
    const existing = merged.find((item) => item.label === spec.label);

    if (existing && existing.value !== spec.value) {
      existing.value = `${existing.value}; ${spec.value}`;
      continue;
    }

    merged.push(spec);
  }

  return merged;
}

function parseStockLine(line: string) {
  const match = line.match(/^([A-Za-zÀ-ÿ\s]+?)\s*[:;]?\s*(\d+)\s*(?:pcs?|pc)?$/i);

  if (!match) {
    return null;
  }

  const color = match[1].trim();
  const stock = Number(match[2]);
  const ignoredLabels = new Set(["ld", "pj", "harga"]);

  if (!color || ignoredLabels.has(normalizeKey(color)) || Number.isNaN(stock)) {
    return null;
  }

  return { color: titleCase(color), stock };
}

function parseDetail(detail: string, productCode: string) {
  const lines = detail
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const price = formatPrice(detail);
  const variants: InventoryVariant[] = [];
  const specLines: string[] = [];
  let stockSectionStarted = false;
  let priceSeen = false;

  for (const line of lines) {
    const normalized = normalizeKey(line);

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
      const colorCode = createInventoryColorCode(stockLine.color);

      variants.push({
        ...stockLine,
        code: `${productCode}-${colorCode}`,
      });
      continue;
    }

    if (!normalized.includes("stok")) {
      specLines.push(line);
    }
  }

  return {
    price,
    specs: mergeSpecs(specLines),
    variants,
  };
}

function getFirstImage(folderPath: string) {
  return readdirSync(folderPath)
    .filter((fileName) => imageExtensions.has(path.extname(fileName).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))[0];
}

function formatRupiah(value: number) {
  return `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function parseRupiah(value: string) {
  const digits = value.replace(/[^\d]/g, "");

  return digits ? Number(digits) : 0;
}

function specsFromText(value: string) {
  return mergeSpecs(
    value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean),
  );
}

function getLocalImageUrlByName(productName: string) {
  const root = getGudangRoot();
  const folderName = productName.toLowerCase();
  const folderPath = path.join(root, folderName);

  if (!folderPath.startsWith(root) || !existsSync(folderPath)) {
    return null;
  }

  const image = getFirstImage(folderPath);

  return image ? `/api/gudang-image/${encodeURIComponent(folderName)}` : null;
}

export function getInventoryProducts(): InventoryProduct[] {
  const root = getGudangRoot();

  if (!existsSync(root)) {
    return [];
  }

  return readdirSync(root)
    .map((folderName) => ({
      folderName,
      folderPath: path.join(root, folderName),
    }))
    .filter(({ folderPath }) => statSync(folderPath).isDirectory())
    .map(({ folderName, folderPath }) => {
      const code = createInventoryProductCode(folderName);
      const detailPath = path.join(folderPath, "detail.txt");
      const detail = existsSync(detailPath) ? readFileSync(detailPath, "utf8") : "";
      const parsed = parseDetail(detail, code);
      const image = getFirstImage(folderPath);
      const slug = encodeURIComponent(folderName);

      return {
        slug,
        folderName,
        name: titleCase(folderName),
        category: inferCategory(folderName),
        code,
        price: parsed.price,
        specs: parsed.specs,
        variants: parsed.variants,
        imageUrl: image ? `/api/gudang-image/${slug}` : null,
        totalStock: parsed.variants.reduce((total, variant) => total + variant.stock, 0),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getInventoryProductBySlug(slug: string) {
  const decodedSlug = decodeURIComponent(slug);

  return getInventoryProducts().find(
    (product) => product.folderName.toLowerCase() === decodedSlug.toLowerCase(),
  );
}

export function getGudangImagePath(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  const root = getGudangRoot();
  const folderPath = path.join(root, decodedSlug);

  if (!folderPath.startsWith(root) || !existsSync(folderPath)) {
    return null;
  }

  const image = getFirstImage(folderPath);

  return image ? path.join(folderPath, image) : null;
}

export async function getSupabaseInventoryProducts(): Promise<InventoryProduct[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return getInventoryProducts();
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/inventory_products?select=id,code,name,category,price,image_url,specs,is_active,inventory_variants(code,color,stock,sort_order,is_active)&is_active=eq.true&inventory_variants.is_active=eq.true&order=name.asc&inventory_variants.order=sort_order.asc`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Gagal membaca data gudang dari Supabase: ${response.status}`);
  }

  const products = (await response.json()) as SupabaseInventoryProduct[];

  return products.map((product) => {
    const variants = (product.inventory_variants ?? [])
      .filter((variant) => variant.is_active !== false)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map((variant) => ({
        code: variant.code,
        color: variant.color,
        stock: variant.stock,
        isActive: variant.is_active,
      }));

    return {
      slug: encodeURIComponent(product.name.toLowerCase()),
      folderName: product.name.toLowerCase(),
      name: product.name,
      category: product.category,
      code: product.code,
      price: product.price > 0 ? formatRupiah(product.price) : "Belum diisi",
      specs: product.specs ?? [],
      variants,
      imageUrl: product.image_url ?? getLocalImageUrlByName(product.name),
      totalStock: variants.reduce((total, variant) => total + variant.stock, 0),
    };
  });
}

async function supabaseAdminFetch(pathname: string, options: RequestInit = {}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase admin key belum tersedia di .env.local.");
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${pathname}`, {
    ...options,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(options.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase error ${response.status}: ${errorText}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function updateInventoryVariantStock({
  variantCode,
  changeType,
  quantity,
  note,
}: {
  variantCode: string;
  changeType: "set" | "add" | "subtract";
  quantity: number;
  note?: string;
}) {
  const variants = (await supabaseAdminFetch(
    `inventory_variants?code=eq.${encodeURIComponent(variantCode)}&select=id,stock`,
  )) as { id: string; stock: number }[];
  const variant = variants[0];

  if (!variant) {
    throw new Error("Varian stok tidak ditemukan.");
  }

  const stockBefore = variant.stock;
  const stockAfter =
    changeType === "set"
      ? quantity
      : changeType === "add"
        ? stockBefore + quantity
        : stockBefore - quantity;

  if (!Number.isInteger(stockAfter) || stockAfter < 0) {
    throw new Error("Stok tidak boleh kurang dari 0.");
  }

  await supabaseAdminFetch(
    `inventory_variants?id=eq.${encodeURIComponent(variant.id)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ stock: stockAfter }),
    },
  );

  await supabaseAdminFetch("inventory_stock_movements", {
    method: "POST",
    body: JSON.stringify([
      {
        variant_id: variant.id,
        change_type: changeType,
        quantity: changeType === "subtract" ? -quantity : stockAfter - stockBefore,
        stock_before: stockBefore,
        stock_after: stockAfter,
        note: note?.trim() || null,
      },
    ]),
  });

  return {
    stockBefore,
    stockAfter,
  };
}

export async function createInventoryProduct({
  name,
  category,
  price,
  specsText,
  color,
  stock,
  imageUrl,
}: {
  name: string;
  category: string;
  price: string;
  specsText: string;
  color: string;
  stock: number;
  imageUrl?: string | null;
}) {
  const productCode = createInventoryProductCode(name);
  const variantCode = `${productCode}-${createInventoryColorCode(color)}`;
  const [product] = (await supabaseAdminFetch("inventory_products", {
    method: "POST",
    body: JSON.stringify([
      {
        code: productCode,
        name: titleCase(name),
        category: category.trim() || inferCategory(name),
        price: parseRupiah(price),
        specs: specsFromText(specsText),
        image_url: imageUrl ?? null,
        is_active: true,
      },
    ]),
  })) as { id: string; code: string }[];

  await supabaseAdminFetch("inventory_variants", {
    method: "POST",
    body: JSON.stringify([
      {
        product_id: product.id,
        code: variantCode,
        color: titleCase(color),
        stock,
        sort_order: 0,
        is_active: true,
      },
    ]),
  });

  return product.code;
}

export async function createInventoryVariant({
  productCode,
  color,
  stock,
}: {
  productCode: string;
  color: string;
  stock: number;
}) {
  const products = (await supabaseAdminFetch(
    `inventory_products?code=eq.${encodeURIComponent(productCode)}&select=id,code`,
  )) as { id: string; code: string }[];
  const product = products[0];

  if (!product) {
    throw new Error("Produk tidak ditemukan.");
  }

  const variants = (await supabaseAdminFetch(
    `inventory_variants?product_id=eq.${encodeURIComponent(product.id)}&select=sort_order`,
  )) as { sort_order: number | null }[];
  const nextSortOrder =
    variants.reduce((max, variant) => Math.max(max, variant.sort_order ?? 0), -1) + 1;
  const variantCode = `${product.code}-${createInventoryColorCode(color)}`;

  await supabaseAdminFetch("inventory_variants", {
    method: "POST",
    body: JSON.stringify([
      {
        product_id: product.id,
        code: variantCode,
        color: titleCase(color),
        stock,
        sort_order: nextSortOrder,
        is_active: true,
      },
    ]),
  });

  return variantCode;
}

export async function deactivateInventoryProduct(productCode: string) {
  await supabaseAdminFetch(
    `inventory_products?code=eq.${encodeURIComponent(productCode)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ is_active: false }),
    },
  );
}

export async function updateInventoryProductPhoto({
  productCode,
  imageUrl,
}: {
  productCode: string;
  imageUrl: string;
}) {
  await supabaseAdminFetch(
    `inventory_products?code=eq.${encodeURIComponent(productCode)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ image_url: imageUrl }),
    },
  );
}

export async function deactivateInventoryVariant(variantCode: string) {
  await supabaseAdminFetch(
    `inventory_variants?code=eq.${encodeURIComponent(variantCode)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ is_active: false }),
    },
  );
}

export async function uploadInventoryPhoto({
  file,
  productCode,
}: {
  file: File;
  productCode: string;
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase admin key belum tersedia di .env.local.");
  }

  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Foto maksimal 2MB.");
  }

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("Format foto harus JPG, PNG, atau WEBP.");
  }

  const extension =
    {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
    }[file.type] ?? "jpg";
  const objectPath = `${productCode.toLowerCase()}/${Date.now()}.${extension}`;
  const response = await fetch(
    `${supabaseUrl}/storage/v1/object/inventory-photos/${objectPath}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serviceRoleKey}`,
        apikey: serviceRoleKey,
        "Content-Type": file.type,
        "x-upsert": "true",
      },
      body: file,
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gagal upload foto: ${response.status} ${errorText}`);
  }

  return `${supabaseUrl}/storage/v1/object/public/inventory-photos/${objectPath}`;
}
