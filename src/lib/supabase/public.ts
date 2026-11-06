import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./config";

/**
 * Client tanpa sesi untuk membaca konten publik. Tidak menyentuh cookie,
 * sehingga halaman publik tetap bisa dirender statis.
 */
export function createSupabasePublicClient() {
  const { url, publishableKey } = getSupabaseConfig();

  return createClient(url, publishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
