import { randomUUID } from "node:crypto";
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { hasValidSession } from "@/lib/auth";
import { writeActivityLog } from "@/lib/activity-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const uploadDirectory = path.join(process.cwd(), "public", "uploads");
const allowedTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["application/pdf", ".pdf"],
]);
const maximumUploadBytes = 10 * 1024 * 1024;

export async function GET() {
  if (!(await hasValidSession())) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const entries = await readdir(uploadDirectory, { withFileTypes: true });
    const files = await Promise.all(
      entries
        .filter((entry) => entry.isFile())
        .map(async (entry) => {
          const filePath = path.join(uploadDirectory, entry.name);
          const info = await stat(filePath);
          return {
            name: entry.name,
            url: `/uploads/${encodeURIComponent(entry.name)}`,
            size: info.size,
            updatedAt: info.mtime.toISOString(),
          };
        }),
    );
    return NextResponse.json(files.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return NextResponse.json([]);
    }
    throw error;
  }
}

export async function POST(request: Request) {
  if (!(await hasValidSession())) {
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

  await mkdir(uploadDirectory, { recursive: true });
  const fileName = `${randomUUID()}${extension}`;
  await writeFile(path.join(uploadDirectory, fileName), Buffer.from(await file.arrayBuffer()), {
    flag: "wx",
  });
  await writeActivityLog(
    "Mengunggah media",
    `File ${fileName} (${file.type}, ${(file.size / 1024).toFixed(0)} KB).`,
  );

  return NextResponse.json({
    name: fileName,
    url: `/uploads/${fileName}`,
    size: file.size,
  });
}
