import "server-only";

import { randomUUID } from "node:crypto";
import { cache } from "react";
import type { AdminSession } from "./auth";

export interface AdminProfile {
  userId: string;
  email: string;
  fullName: string;
  phone: string;
  position: string;
  avatarUrl: string | null;
  createdAt: string | null;
  lastSignInAt: string | null;
}

/** Data ringkas untuk header dan sidebar dashboard. */
export interface AdminAccountSummary {
  name: string;
  email: string;
  position: string;
  avatarUrl: string | null;
}

interface ProfileRow {
  full_name: string | null;
  phone: string | null;
  position: string | null;
  avatar_path: string | null;
}

const avatarBucket = "avatars";
export const maximumAvatarBytes = 2 * 1024 * 1024;
export const avatarTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
]);

function avatarUrlFor(admin: AdminSession, path: string | null) {
  return path
    ? admin.supabase.storage.from(avatarBucket).getPublicUrl(path).data.publicUrl
    : null;
}

async function readProfileRow(admin: AdminSession) {
  const { data, error } = await admin.supabase
    .from("admin_profiles")
    .select("full_name, phone, position, avatar_path")
    .eq("user_id", admin.userId)
    .maybeSingle()
    .overrideTypes<ProfileRow, { merge: false }>();

  if (error) {
    throw new Error(
      error.code === "PGRST205"
        ? "Tabel profil belum ada. Jalankan migrasi supabase/migrations/20261107000000_admin_profiles.sql di SQL Editor Supabase."
        : `Gagal memuat profil: ${error.message}`,
    );
  }
  return data;
}

/** Profil lengkap admin yang sedang login (di-cache per request). */
export const getAdminProfile = cache(async (admin: AdminSession): Promise<AdminProfile> => {
  const [{ data: userData }, row] = await Promise.all([
    admin.supabase.auth.getUser(),
    readProfileRow(admin),
  ]);
  const user = userData.user;

  return {
    userId: admin.userId,
    email: user?.email ?? admin.email ?? "",
    fullName: row?.full_name ?? "",
    phone: row?.phone ?? "",
    position: row?.position ?? "",
    avatarUrl: avatarUrlFor(admin, row?.avatar_path ?? null),
    createdAt: user?.created_at ?? null,
    lastSignInAt: user?.last_sign_in_at ?? null,
  };
});

/** Tidak pernah melempar error: kalau profil belum bisa dibaca, pakai nama dari email. */
export async function getAccountSummary(admin: AdminSession): Promise<AdminAccountSummary> {
  const email = admin.email ?? "";
  const fallbackName = email.split("@")[0] || "Admin";

  try {
    const profile = await getAdminProfile(admin);
    return {
      name: profile.fullName || fallbackName,
      email: profile.email || email,
      position: profile.position || "Pengelola situs",
      avatarUrl: profile.avatarUrl,
    };
  } catch {
    return { name: fallbackName, email, position: "Pengelola situs", avatarUrl: null };
  }
}

export interface ProfileFields {
  fullName: string;
  phone: string;
  position: string;
}

/** Normalisasi dan validasi isian profil. Mengembalikan pesan error atau data bersih. */
export function validateProfileFields(input: unknown): { error: string } | { fields: ProfileFields } {
  if (!input || typeof input !== "object") return { error: "Format data tidak valid." };
  const value = input as Record<string, unknown>;
  if (
    typeof value.fullName !== "string" ||
    typeof value.phone !== "string" ||
    typeof value.position !== "string"
  ) {
    return { error: "Format data tidak valid." };
  }

  const fullName = value.fullName.trim().replace(/\s+/g, " ");
  const phone = value.phone.trim().replace(/\s+/g, " ");
  const position = value.position.trim().replace(/\s+/g, " ");

  if (fullName.length < 2 || fullName.length > 120) {
    return { error: "Nama lengkap wajib diisi (2–120 karakter)." };
  }
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    if (!/^\+?[0-9][0-9 ()-]{6,22}$/.test(phone) || digits.length < 8 || digits.length > 15) {
      return { error: "Nomor telepon tidak valid. Contoh: 0812-3456-7890 atau +62 812 3456 7890." };
    }
  }
  if (position.length > 120) {
    return { error: "Jabatan maksimal 120 karakter." };
  }

  return { fields: { fullName, phone, position } };
}

export async function saveProfileFields(admin: AdminSession, fields: ProfileFields) {
  const { error } = await admin.supabase.from("admin_profiles").upsert(
    {
      user_id: admin.userId,
      full_name: fields.fullName,
      phone: fields.phone || null,
      position: fields.position || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) throw new Error(`Gagal menyimpan profil: ${error.message}`);
}

/** Mengunggah foto baru, menyimpan path-nya, lalu menghapus foto lama. */
export async function replaceAvatar(admin: AdminSession, file: File) {
  const extension = avatarTypes.get(file.type);
  if (!extension) throw new Error("Format foto harus JPG, PNG, atau WebP.");

  const previous = await readProfileRow(admin);
  const path = `${admin.userId}/${randomUUID()}${extension}`;
  const storage = admin.supabase.storage.from(avatarBucket);

  const { error: uploadError } = await storage.upload(path, await file.arrayBuffer(), {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) throw new Error(`Gagal mengunggah foto: ${uploadError.message}`);

  const { error: saveError } = await admin.supabase.from("admin_profiles").upsert(
    { user_id: admin.userId, avatar_path: path, updated_at: new Date().toISOString() },
    { onConflict: "user_id" },
  );
  if (saveError) {
    await storage.remove([path]);
    throw new Error(`Gagal menyimpan foto profil: ${saveError.message}`);
  }

  if (previous?.avatar_path) await storage.remove([previous.avatar_path]);
  return avatarUrlFor(admin, path);
}

export async function removeAvatar(admin: AdminSession) {
  const previous = await readProfileRow(admin);
  if (!previous?.avatar_path) return;

  const { error } = await admin.supabase
    .from("admin_profiles")
    .update({ avatar_path: null, updated_at: new Date().toISOString() })
    .eq("user_id", admin.userId);
  if (error) throw new Error(`Gagal menghapus foto profil: ${error.message}`);

  await admin.supabase.storage.from(avatarBucket).remove([previous.avatar_path]);
}
