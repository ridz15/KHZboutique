import { readFile } from "node:fs/promises";
import path from "node:path";
import { getGudangImagePath } from "@/lib/inventory";

const contentTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const imagePath = getGudangImagePath(slug);

  if (!imagePath) {
    return new Response("Image not found", { status: 404 });
  }

  const image = await readFile(imagePath);
  const contentType = contentTypes[path.extname(imagePath).toLowerCase()] ?? "image/jpeg";

  return new Response(image, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": contentType,
    },
  });
}
