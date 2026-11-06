import "server-only";

import { cache } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "./supabase/server";

export interface AdminSession {
  /** Client yang membawa sesi admin; semua tulis data lewat client ini agar RLS berlaku. */
  supabase: SupabaseClient;
  userId: string;
  email: string | null;
}

/** Akun dianggap admin hanya jika terdaftar di tabel admin_users. */
export async function isAdminUser(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("[auth] Gagal memeriksa admin_users:", error.message);
    return false;
  }
  return data !== null;
}

/**
 * Mengembalikan sesi admin yang valid, atau null.
 * Identitas diverifikasi lewat getClaims(), hak admin lewat tabel admin_users.
 * Hasilnya di-cache per request, jadi layout dan halaman tidak memeriksa dua kali.
 */
export const getAdminSession = cache(async (): Promise<AdminSession | null> => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (error || !claims?.sub) return null;
  if (!(await isAdminUser(supabase, claims.sub))) return null;

  return {
    supabase,
    userId: claims.sub,
    email: typeof claims.email === "string" ? claims.email : null,
  };
});

export async function hasValidSession() {
  return (await getAdminSession()) !== null;
}
