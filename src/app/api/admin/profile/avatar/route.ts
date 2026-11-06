import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { writeActivityLog } from "@/lib/activity-log";
import {
  avatarTypes,
  maximumAvatarBytes,
  removeAvatar,
  replaceAvatar,
} from "@/lib/admin-profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan pada server.";
}

export async function POST(request: Request) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ message: "Pilih foto untuk diunggah." }, { status: 400 });
  }
  if (!avatarTypes.has(file.type)) {
    return NextResponse.json({ message: "Format foto harus JPG, PNG, atau WebP." }, { status: 400 });
  }
  if (file.size > maximumAvatarBytes) {
    return NextResponse.json({ message: "Ukuran foto maksimal 2 MB." }, { status: 400 });
  }

  try {
    const avatarUrl = await replaceAvatar(admin, file);
    await writeActivityLog(admin.supabase, "Mengganti foto profil", "Foto profil diperbarui.", admin.email);
    return NextResponse.json({ message: "Foto profil diperbarui.", avatarUrl });
  } catch (error) {
    return NextResponse.json({ message: errorMessage(error) }, { status: 500 });
  }
}

export async function DELETE() {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    await removeAvatar(admin);
    await writeActivityLog(admin.supabase, "Menghapus foto profil", "Foto profil dihapus.", admin.email);
    return NextResponse.json({ message: "Foto profil dihapus.", avatarUrl: null });
  } catch (error) {
    return NextResponse.json({ message: errorMessage(error) }, { status: 500 });
  }
}
