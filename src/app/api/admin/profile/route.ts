import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { writeActivityLog } from "@/lib/activity-log";
import {
  getAdminProfile,
  saveProfileFields,
  validateProfileFields,
} from "@/lib/admin-profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan pada server.";
}

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    return NextResponse.json(await getAdminProfile(admin));
  } catch (error) {
    return NextResponse.json({ message: errorMessage(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Format data tidak valid." }, { status: 400 });
  }

  const result = validateProfileFields(body);
  if ("error" in result) {
    return NextResponse.json({ message: result.error }, { status: 400 });
  }

  try {
    const before = await getAdminProfile(admin);
    await saveProfileFields(admin, result.fields);

    const changed = [
      before.fullName !== result.fields.fullName ? "nama" : null,
      before.phone !== result.fields.phone ? "nomor telepon" : null,
      before.position !== result.fields.position ? "jabatan" : null,
    ].filter((field): field is string => field !== null);

    if (changed.length > 0) {
      await writeActivityLog(
        admin.supabase,
        "Memperbarui profil",
        `Data yang diubah: ${changed.join(", ")}.`,
        admin.email,
      );
    }

    return NextResponse.json({ message: "Profil berhasil disimpan.", fields: result.fields });
  } catch (error) {
    return NextResponse.json({ message: errorMessage(error) }, { status: 500 });
  }
}
