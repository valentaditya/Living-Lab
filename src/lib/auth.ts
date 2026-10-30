import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "living-lab-session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;
const DEVELOPMENT_AUTH_SECRET =
  "living-lab-development-secret-change-before-deployment";

function getAuthSecret() {
  const secret =
    process.env.LIVING_LAB_AUTH_SECRET ??
    (process.env.NODE_ENV === "production" ? undefined : DEVELOPMENT_AUTH_SECRET);

  if (!secret || secret.length < 32) {
    throw new Error(
      "LIVING_LAB_AUTH_SECRET must be set to at least 32 characters.",
    );
  }

  return secret;
}

function matchesCredential(value: string, expected: string) {
  const valueHash = createHash("sha256").update(value).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(valueHash, expectedHash);
}

export function verifyCredentials(username: string, password: string) {
  const developmentMode = process.env.NODE_ENV !== "production";
  return (
    matchesCredential(
      username,
      process.env.LIVING_LAB_USERNAME ?? (developmentMode ? "admin" : ""),
    ) &&
    matchesCredential(
      password,
      process.env.LIVING_LAB_PASSWORD ?? (developmentMode ? "admin" : ""),
    )
  );
}

export function createSessionToken(now = Date.now()) {
  const payload = Buffer.from(
    JSON.stringify({
      username: "admin",
      expiresAt: now + SESSION_DURATION_SECONDS * 1000,
    }),
  ).toString("base64url");
  const signature = createHmac("sha256", getAuthSecret())
    .update(payload)
    .digest("base64url");

  return payload + "." + signature;
}

export function isValidSessionToken(token: string | undefined, now = Date.now()) {
  if (!token) return false;

  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra !== undefined) return false;

  const expectedSignature = createHmac("sha256", getAuthSecret())
    .update(payload)
    .digest();
  const actualSignature = Buffer.from(signature, "base64url");

  if (
    actualSignature.length !== expectedSignature.length ||
    !timingSafeEqual(actualSignature, expectedSignature)
  ) {
    return false;
  }

  let session: { username?: unknown; expiresAt?: unknown };
  try {
    session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch {
    return false;
  }

  return (
    session.username === "admin" &&
    typeof session.expiresAt === "number" &&
    session.expiresAt > now
  );
}

export async function hasValidSession() {
  const cookieStore = await cookies();
  return isValidSessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_DURATION_SECONDS,
};
