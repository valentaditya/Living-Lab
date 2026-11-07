import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { writeActivityLog } from "@/lib/activity-log";
import { getCollectionDef, validateItems } from "@/lib/content-schema";
import { getCollectionStrict, saveCollection } from "@/lib/site-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = { params: Promise<{ key: string }> };

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan pada server.";
}

export async function GET(_request: Request, { params }: Context) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const def = getCollectionDef((await params).key);
  if (!def) return NextResponse.json({ message: "Jenis konten tidak dikenal." }, { status: 404 });

  try {
    return NextResponse.json(await getCollectionStrict(admin.supabase, def.key));
  } catch (error) {
    return NextResponse.json({ message: errorMessage(error) }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Context) {
  const admin = await getAdminSession();
  if (!admin) return NextResponse.json({ message: "Unauthorized." }, { status: 401 });

  const def = getCollectionDef((await params).key);
  if (!def) return NextResponse.json({ message: "Jenis konten tidak dikenal." }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Format data tidak valid." }, { status: 400 });
  }

  const result = validateItems(def, body);
  if ("error" in result) return NextResponse.json({ message: result.error }, { status: 400 });

  try {
    await saveCollection(admin.supabase, def.key, result.items);
  } catch (error) {
    return NextResponse.json({ message: errorMessage(error) }, { status: 500 });
  }

  await writeActivityLog(
    admin.supabase,
    "Memperbarui konten",
    `${def.label}: ${result.items.length} ${def.singular} tersimpan.`,
    admin.email,
  );
  return NextResponse.json({ message: `${def.label} berhasil disimpan.`, items: result.items });
}
