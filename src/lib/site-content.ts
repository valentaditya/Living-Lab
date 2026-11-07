import "server-only";

import { cache } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { DEFAULT_BLOCKS, DEFAULT_COLLECTIONS } from "@/data/content-defaults";
import type { BlockData, ContentItem } from "./content-schema";
import { createSupabasePublicClient } from "./supabase/public";

interface EntryRow {
  id: string;
  data: Record<string, ContentItem[string]>;
}

async function readCollection(supabase: SupabaseClient, key: string): Promise<ContentItem[]> {
  const { data, error } = await supabase
    .from("content_entries")
    .select("id, data")
    .eq("collection", key)
    .order("sort_order")
    .overrideTypes<EntryRow[], { merge: false }>();
  if (error) throw new Error(`Gagal membaca ${key} dari Supabase: ${error.message}`);
  return data.map((row) => ({ ...row.data, id: row.id }));
}

async function readBlock(supabase: SupabaseClient, key: string): Promise<BlockData | null> {
  const { data, error } = await supabase
    .from("site_blocks")
    .select("data")
    .eq("key", key)
    .maybeSingle()
    .overrideTypes<{ data: BlockData }, { merge: false }>();
  if (error) throw new Error(`Gagal membaca ${key} dari Supabase: ${error.message}`);
  return data?.data ?? null;
}

/**
 * Untuk halaman publik. Jika Supabase belum bisa dibaca (mis. migrasi belum
 * dijalankan), situs tetap tampil dengan data bawaan.
 */
export const getCollection = cache(async (key: string): Promise<ContentItem[]> => {
  try {
    return await readCollection(createSupabasePublicClient(), key);
  } catch (error) {
    console.error("[content] Memakai data bawaan:", error instanceof Error ? error.message : error);
    return DEFAULT_COLLECTIONS[key] ?? [];
  }
});

export const getBlock = cache(async (key: string): Promise<BlockData> => {
  const defaults = DEFAULT_BLOCKS[key] ?? {};
  try {
    return { ...defaults, ...((await readBlock(createSupabasePublicClient(), key)) ?? {}) };
  } catch (error) {
    console.error("[content] Memakai data bawaan:", error instanceof Error ? error.message : error);
    return defaults;
  }
});

/** Untuk dashboard: error dilempar agar editor tidak menimpa data asli dengan data bawaan. */
export function getCollectionStrict(supabase: SupabaseClient, key: string) {
  return readCollection(supabase, key);
}

export async function getBlockStrict(supabase: SupabaseClient, key: string) {
  return { ...(DEFAULT_BLOCKS[key] ?? {}), ...((await readBlock(supabase, key)) ?? {}) };
}

export async function saveCollection(supabase: SupabaseClient, key: string, items: ContentItem[]) {
  const { error } = await supabase.rpc("save_collection", { p_collection: key, p_items: items });
  if (error) throw new Error(`Gagal menyimpan ke Supabase: ${error.message}`);
}

export async function saveBlock(supabase: SupabaseClient, key: string, data: BlockData) {
  const { error } = await supabase
    .from("site_blocks")
    .upsert({ key, data, updated_at: new Date().toISOString() }, { onConflict: "key" });
  if (error) throw new Error(`Gagal menyimpan ke Supabase: ${error.message}`);
}
