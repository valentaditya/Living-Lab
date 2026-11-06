import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { writeActivityLog } from "@/lib/activity-log";
import { createSupabasePublicClient } from "@/lib/supabase/public";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Aturan minimal; sama dengan petunjuk di halaman profil. */
function passwordProblem(password: string) {
  if (password.length < 8) return "Kata sandi baru minimal 8 karakter.";
  if (password.length > 72) return "Kata sandi baru maksimal 72 karakter.";
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return "Kata sandi baru harus berisi huruf dan angka.";
  }
  return null;
}

export async function POST(request: Request) {
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

  const value = (body ?? {}) as Record<string, unknown>;
  const { currentPassword, newPassword, confirmPassword } = value;
  if (
    typeof currentPassword !== "string" ||
    typeof newPassword !== "string" ||
    typeof confirmPassword !== "string" ||
    !currentPassword ||
    !newPassword ||
    !confirmPassword
  ) {
    return NextResponse.json(
      { message: "Isi kata sandi lama, kata sandi baru, dan ulangi kata sandi baru." },
      { status: 400 },
    );
  }

  const problem = passwordProblem(newPassword);
  if (problem) return NextResponse.json({ message: problem, field: "newPassword" }, { status: 400 });
  if (newPassword !== confirmPassword) {
    return NextResponse.json(
      { message: "Ulangi kata sandi baru tidak sama dengan kata sandi baru.", field: "confirmPassword" },
      { status: 400 },
    );
  }
  if (newPassword === currentPassword) {
    return NextResponse.json(
      { message: "Kata sandi baru harus berbeda dari kata sandi lama.", field: "newPassword" },
      { status: 400 },
    );
  }

  const { data: userData } = await admin.supabase.auth.getUser();
  const email = userData.user?.email;
  if (!email) {
    return NextResponse.json({ message: "Email akun tidak ditemukan." }, { status: 400 });
  }

  // Supabase tidak memeriksa kata sandi lama secara bawaan, jadi diverifikasi di sini
  // dengan login sementara (tanpa cookie), lalu sesi sementara itu langsung diakhiri.
  const verifier = createSupabasePublicClient();
  const { error: verifyError } = await verifier.auth.signInWithPassword({
    email,
    password: currentPassword,
  });
  if (verifyError) {
    const wrongPassword = verifyError.code === "invalid_credentials";
    const rateLimited = verifyError.code === "over_request_rate_limit";
    return NextResponse.json(
      {
        message: wrongPassword
          ? "Kata sandi lama salah."
          : rateLimited
            ? "Terlalu banyak percobaan. Tunggu beberapa menit lalu coba lagi."
            : `Gagal memeriksa kata sandi lama: ${verifyError.message}`,
        field: wrongPassword ? "currentPassword" : undefined,
      },
      { status: wrongPassword ? 400 : rateLimited ? 429 : 502 },
    );
  }
  await verifier.auth.signOut({ scope: "local" });

  const { error } = await admin.supabase.auth.updateUser({
    password: newPassword,
    current_password: currentPassword,
  });

  if (error) {
    const message =
      error.code === "same_password"
        ? "Kata sandi baru harus berbeda dari kata sandi lama."
        : error.code === "weak_password"
          ? `Kata sandi terlalu lemah menurut aturan Supabase: ${error.message}`
          : error.code === "reauthentication_needed"
            ? "Demi keamanan, keluar lalu masuk kembali, kemudian ulangi penggantian kata sandi."
            : `Gagal mengubah kata sandi: ${error.message}`;
    return NextResponse.json({ message, field: "newPassword" }, { status: 400 });
  }

  await writeActivityLog(admin.supabase, "Mengubah kata sandi", "Kata sandi akun diperbarui.", admin.email);
  return NextResponse.json({ message: "Kata sandi berhasil diubah." });
}
