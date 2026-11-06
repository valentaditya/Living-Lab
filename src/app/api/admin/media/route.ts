import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { writeActivityLog } from "@/lib/activity-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Bucket Supabase Storage (publik untuk dibaca, upload khusus admin). */
const mediaBucket = "media";
const allowedTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["application/pdf", ".pdf"],
]);
const maximumUploadBytes = 10 * 1024 * 1024;
const listBatchSize = 1000;
const imagePattern = /\.(jpe?g|png|webp|gif)$/i;

function integerParam(value: string | null, fallback: number, min: number, max: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
}

function normalize(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/** Nama file aman untuk Storage yang tetap memuat nama asli, agar bisa dicari. */
function storageFileName(originalName: string, extension: string) {
  const slug = normalize(originalName.replace(/\.[^.]+$/, ""))
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "");
  return `${slug || "file"}-${randomUUID().slice(0, 8)}${extension}`;
}

/**
 * GET /api/admin/media?q=kata&type=all|image|pdf&page=1&pageSize=12
 * Storage hanya bisa mencari awalan nama, jadi daftar diambil utuh lalu
 * dicari dan dipotong per halaman di server.
 */
export async function GET(request: Request) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const params = new URL(request.url).searchParams;
  const words = normalize(params.get("q") ?? "").trim().split(/\s+/).filter(Boolean).slice(0, 6);
  const type = params.get("type");
  const page = integerParam(params.get("page"), 1, 1, 100000);
  const pageSize = integerParam(params.get("pageSize"), 12, 1, 200);

  const storage = admin.supabase.storage.from(mediaBucket);
  const objects = [];
  for (let offset = 0; ; offset += listBatchSize) {
    const { data, error } = await storage.list("", {
      limit: listBatchSize,
      offset,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (error) {
      return NextResponse.json(
        { message: `Gagal memuat pustaka media: ${error.message}` },
        { status: 500 },
      );
    }
    objects.push(...data);
    if (data.length < listBatchSize) break;
  }

  const files = objects
    // Entri tanpa id adalah folder; .emptyFolderPlaceholder dibuat otomatis oleh Supabase.
    .filter((item) => item.id && !item.name.startsWith("."))
    .filter((item) =>
      type === "image" ? imagePattern.test(item.name) : type === "pdf" ? /\.pdf$/i.test(item.name) : true,
    )
    .filter((item) => {
      const name = normalize(item.name).replace(/[-_]+/g, " ");
      return words.every((word) => name.includes(word));
    })
    .map((item) => ({
      name: item.name,
      url: storage.getPublicUrl(item.name).data.publicUrl,
      size: Number(item.metadata?.size ?? 0),
      updatedAt: item.updated_at ?? item.created_at ?? undefined,
    }));

  const start = (page - 1) * pageSize;
  return NextResponse.json({
    items: files.slice(start, start + pageSize),
    total: files.length,
    page,
    pageSize,
  });
}

export async function POST(request: Request) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Pilih file untuk diunggah." }, { status: 400 });
  }
  if (file.size === 0 || file.size > maximumUploadBytes) {
    return NextResponse.json({ message: "Ukuran file maksimal 10 MB." }, { status: 400 });
  }

  const extension = allowedTypes.get(file.type);
  if (!extension) {
    return NextResponse.json(
      { message: "Format yang didukung: JPG, PNG, WebP, GIF, atau PDF." },
      { status: 400 },
    );
  }

  const fileName = storageFileName(file.name, extension);
  const storage = admin.supabase.storage.from(mediaBucket);
  const { error } = await storage.upload(fileName, await file.arrayBuffer(), {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    return NextResponse.json(
      { message: `Upload ke Supabase gagal: ${error.message}` },
      { status: 500 },
    );
  }

  await writeActivityLog(
    admin.supabase,
    "Mengunggah media",
    `File ${fileName} (${file.type}, ${(file.size / 1024).toFixed(0)} KB).`,
    admin.email,
  );

  return NextResponse.json({
    name: fileName,
    url: storage.getPublicUrl(fileName).data.publicUrl,
    size: file.size,
  });
}
