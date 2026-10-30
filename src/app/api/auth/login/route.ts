import { NextResponse } from "next/server";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
  verifyCredentials,
} from "@/lib/auth";
import { writeActivityLog } from "@/lib/activity-log";

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
    !("username" in body) ||
    !("password" in body) ||
    typeof body.username !== "string" ||
    typeof body.password !== "string"
  ) {
    return NextResponse.json(
      { message: "Nama pengguna dan kata sandi wajib diisi." },
      { status: 400 },
    );
  }

  if (!verifyCredentials(body.username, body.password)) {
    return NextResponse.json(
      { message: "Nama pengguna atau kata sandi salah." },
      { status: 401 },
    );
  }

  await writeActivityLog("Login", "Admin berhasil masuk ke panel.");
  const response = NextResponse.json({ redirectTo: "/dashboard" });
  response.cookies.set(
    SESSION_COOKIE_NAME,
    createSessionToken(),
    sessionCookieOptions,
  );
  return response;
}
