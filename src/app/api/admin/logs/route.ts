import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { searchActivityLogs } from "@/lib/activity-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function integerParam(value: string | null, fallback: number, min: number, max: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
}

/** GET /api/admin/logs?q=kata&page=1&pageSize=20 */
export async function GET(request: Request) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const params = new URL(request.url).searchParams;
  try {
    return NextResponse.json(
      await searchActivityLogs(admin.supabase, {
        query: params.get("q") ?? "",
        page: integerParam(params.get("page"), 1, 1, 100000),
        pageSize: integerParam(params.get("pageSize"), 20, 1, 100),
      }),
    );
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Gagal memuat log aktivitas." },
      { status: 500 },
    );
  }
}
