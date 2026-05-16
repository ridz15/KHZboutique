import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

export type InventoryVariant = {
  color: string;
  stock: number;
  code: string;
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

function createShortCode(value: string) {
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

function createColorCode(color: string) {
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
      const colorCode = createColorCode(stockLine.color);

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
      const code = createShortCode(folderName);
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
