import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/auth";
import { writeActivityLog } from "@/lib/activity-log";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Permintaan login tidak valid." },
      { status: 400 },
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("email" in body) ||
    !("password" in body) ||
    typeof body.email !== "string" ||
    typeof body.password !== "string" ||
    body.email.trim().length === 0 ||
    body.password.length === 0
  ) {
    return NextResponse.json(
      { message: "Email dan kata sandi wajib diisi." },
      { status: 400 },
    );
  }

  const email = body.email.trim().toLowerCase();

  let supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  try {
    supabase = await createSupabaseServerClient();
  } catch (error) {
    console.error("[login]", error);
    return NextResponse.json(
      { message: "Server belum terhubung ke Supabase. Hubungi pengelola situs." },
      { status: 500 },
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: body.password,
  });

  if (error || !data.user) {
    const message =
      error?.code === "email_not_confirmed"
        ? "Email belum dikonfirmasi. Konfirmasi lewat email atau minta pengelola mengaktifkan akun."
        : "Email atau kata sandi salah.";
    return NextResponse.json({ message }, { status: 401 });
  }

  if (!(await isAdminUser(supabase, data.user.id))) {
    await supabase.auth.signOut({ scope: "local" });
    return NextResponse.json(
      { message: "Akun ini belum terdaftar sebagai admin Living Lab." },
      { status: 403 },
    );
  }

  await writeActivityLog(supabase, "Login", `${email} masuk ke panel admin.`, email);
  return NextResponse.json({ redirectTo: "/dashboard" });
}
