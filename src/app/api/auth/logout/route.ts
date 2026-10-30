import { NextResponse } from "next/server";
import {
  hasValidSession,
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
} from "@/lib/auth";
import { writeActivityLog } from "@/lib/activity-log";

export async function POST() {
  if (await hasValidSession()) {
    await writeActivityLog("Logout", "Admin keluar dari panel.");
  }

  const response = NextResponse.json({ redirectTo: "/login" });
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    ...sessionCookieOptions,
    maxAge: 0,
  });
  return response;
}
