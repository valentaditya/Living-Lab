import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { writeActivityLog } from "@/lib/activity-log";
import { getBlockDef, validateBlock } from "@/lib/content-schema";
import { getBlockStrict, saveBlock } from "@/lib/site-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = { params: Promise<{ key: string }> };

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan pada server.";
}

export async function GET(_request: Request, { params }: Context) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const def = getBlockDef((await params).key);
  if (!def) return NextResponse.json({ message: "Jenis konten tidak dikenal." }, { status: 404 });

  try {
    return NextResponse.json(await getBlockStrict(admin.supabase, def.key));
  } catch (error) {
    return NextResponse.json({ message: errorMessage(error) }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Context) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const def = getBlockDef((await params).key);
  if (!def) return NextResponse.json({ message: "Jenis konten tidak dikenal." }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Format data tidak valid." }, { status: 400 });
  }

  const result = validateBlock(def, body);
  if ("error" in result) return NextResponse.json({ message: result.error }, { status: 400 });

  try {
    await saveBlock(admin.supabase, def.key, result.data);
  } catch (error) {
    return NextResponse.json({ message: errorMessage(error) }, { status: 500 });
  }

  await writeActivityLog(admin.supabase, "Memperbarui konten", `${def.label} diperbarui.`, admin.email);
  return NextResponse.json({ message: `${def.label} berhasil disimpan.`, data: result.data });
}
