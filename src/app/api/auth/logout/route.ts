import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { writeActivityLog } from "@/lib/activity-log";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST() {
  const admin = await getAdminSession();

  if (admin) {
    await writeActivityLog(
      admin.supabase,
      "Logout",
      `${admin.email ?? "Admin"} keluar dari panel admin.`,
      admin.email,
      // Ditunggu: setelah signOut, client tidak lagi membawa sesi untuk menulis log.
      { wait: true },
    );
  }

  // Hanya mengakhiri sesi di perangkat ini, bukan di semua perangkat.
  const supabase = admin?.supabase ?? (await createSupabaseServerClient());
  await supabase.auth.signOut({ scope: "local" });

  return NextResponse.json({ redirectTo: "/login" });
}
