import "server-only";

import { after } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "./supabase/server";

export interface ActivityLogEntry {
  id: string;
  action: string;
  detail: string;
  createdAt: string;
  actorEmail?: string | null;
}

interface ActivityLogRow {
  id: string;
  action: string;
  detail: string;
  actor_email: string | null;
  created_at: string;
}

const maximumLogEntries = 100;

async function insertActivityLog(
  supabase: SupabaseClient,
  action: string,
  detail: string,
  actorEmail?: string | null,
) {
  const { error } = await supabase
    .from("activity_logs")
    .insert({ action, detail, actor_email: actorEmail ?? null });

  if (error) {
    console.error("[activity-log] Gagal menulis log:", error.message);
  }
}

/**
 * Mencatat aktivitas admin di latar belakang (setelah respons terkirim),
 * supaya pengguna tidak ikut menunggu. Gagal mencatat hanya ditulis ke log server.
 * Pakai `{ wait: true }` jika sesi akan diakhiri sebelum respons (mis. logout).
 */
export async function writeActivityLog(
  supabase: SupabaseClient,
  action: string,
  detail: string,
  actorEmail?: string | null,
  { wait = false }: { wait?: boolean } = {},
) {
  if (wait) {
    await insertActivityLog(supabase, action, detail, actorEmail);
    return;
  }
  after(() => insertActivityLog(supabase, action, detail, actorEmail));
}

const logColumns = "id, action, detail, actor_email, created_at";

function toEntry(row: ActivityLogRow): ActivityLogEntry {
  return {
    id: row.id,
    action: row.action,
    detail: row.detail,
    actorEmail: row.actor_email,
    createdAt: row.created_at,
  };
}

/** Log terbaru, untuk ringkasan di halaman utama dashboard. */
export async function getActivityLogs(
  supabase?: SupabaseClient,
  limit = maximumLogEntries,
): Promise<ActivityLogEntry[]> {
  const client = supabase ?? (await createSupabaseServerClient());
  const { data, error } = await client
    .from("activity_logs")
    .select(logColumns)
    .order("created_at", { ascending: false })
    .limit(limit)
    .overrideTypes<ActivityLogRow[], { merge: false }>();

  if (error) {
    throw new Error(`Gagal memuat log aktivitas: ${error.message}`);
  }

  return data.map(toEntry);
}

export interface ActivityLogPage {
  items: ActivityLogEntry[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Kata kunci dibersihkan dari karakter khusus filter PostgREST (koma, kurung,
 * wildcard) supaya aman disisipkan ke filter `or`.
 */
function searchWords(query: string) {
  return query
    .replace(/[%_*,()"\\:]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6);
}

/** Pencarian + pagination di database. Setiap kata harus cocok di aksi, detail, atau email. */
export async function searchActivityLogs(
  supabase: SupabaseClient,
  { query, page, pageSize }: { query: string; page: number; pageSize: number },
): Promise<ActivityLogPage> {
  const words = searchWords(query.slice(0, 100));
  const withFilters = <T extends { or: (filter: string) => T }>(request: T) =>
    words.reduce(
      (filtered, word) =>
        filtered.or(`action.ilike.%${word}%,detail.ilike.%${word}%,actor_email.ilike.%${word}%`),
      request,
    );

  const from = (page - 1) * pageSize;
  const { data, error, count } = await withFilters(
    supabase.from("activity_logs").select(logColumns, { count: "exact" }),
  )
    .order("created_at", { ascending: false })
    .range(from, from + pageSize - 1)
    .overrideTypes<ActivityLogRow[], { merge: false }>();

  // Halaman di luar jangkauan (mis. setelah pencarian menyempit): kembalikan total saja.
  if (error?.code === "PGRST103") {
    const { count: total } = await withFilters(
      supabase.from("activity_logs").select("id", { count: "exact", head: true }),
    );
    return { items: [], total: total ?? 0, page, pageSize };
  }
  if (error) {
    throw new Error(`Gagal memuat log aktivitas: ${error.message}`);
  }

  return { items: data.map(toEntry), total: count ?? data.length, page, pageSize };
}
