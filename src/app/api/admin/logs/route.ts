import { NextResponse } from "next/server";
import { hasValidSession } from "@/lib/auth";
import { getActivityLogs } from "@/lib/activity-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await hasValidSession())) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json(await getActivityLogs());
}
