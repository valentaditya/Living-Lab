import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "./config";

/**
 * Client Supabase yang membawa sesi login dari cookie.
 * Dipakai di Route Handler dan Server Component panel admin.
 */
export async function createSupabaseServerClient() {
  const { url, publishableKey } = getSupabaseConfig();
  const cookieStore = await cookies();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Component tidak boleh menulis cookie. Aman diabaikan karena
          // src/proxy.ts sudah memperbarui sesi sebelum halaman dirender.
        }
      },
    },
  });
}
