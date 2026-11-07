"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { History, WifiOff, X } from "lucide-react";

/**
 * Draf form dashboard yang disimpan di browser (localStorage), supaya isian
 * tidak hilang saat pindah menu, refresh, tutup tab, atau koneksi putus.
 * Draf hanya ada di perangkat & browser ini, dan dihapus setelah berhasil disimpan.
 */

const PREFIX = "livinglab:draft:";
const SAVE_DELAY = 500;

type StoredDraft<T> = { savedAt: number; value: T };

function readDraft<T>(key: string): StoredDraft<T> | null {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as StoredDraft<T>) : null;
  } catch {
    return null;
  }
}

function writeDraft<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify({ savedAt: Date.now(), value }));
    return true;
  } catch {
    return false; // penyimpanan penuh / diblokir: form tetap jalan tanpa draf
  }
}

function removeDraft(key: string) {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    /* abaikan */
  }
}

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

/**
 * @param key   identitas draf, mis. "news:new" atau "collection:team:abc". null = nonaktif (data belum dimuat).
 * @param value isi form saat ini.
 * @param apply mengisi form dengan nilai tertentu (dipakai untuk memulihkan / membuang draf).
 *
 * Nilai form saat `key` berubah dianggap kondisi awal. Kalau ada draf tersimpan
 * untuk key itu, draf langsung dipulihkan otomatis, jadi pengguna bebas pindah
 * menu dan isiannya tetap ada saat kembali.
 */
export function useFormDraft<T>(key: string | null, value: T, apply: (value: T) => void) {
  const [restoredAt, setRestoredAt] = useState<number | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [, rerender] = useState(0);
  const baseline = useRef<{ key: string | null; value: T }>({ key: null, value });
  const resetOnNextRender = useRef(false);
  const justRestored = useRef(false);
  const unwritten = useRef<{ key: string; value: T } | null>(null);
  const applyRef = useRef(apply);
  useEffect(() => {
    applyRef.current = apply;
  });

  // Key baru (form dibuka / item lain diubah): nilai sekarang = kondisi awal.
  if (baseline.current.key !== key) {
    baseline.current = { key, value };
    resetOnNextRender.current = false;
  }
  const dirty = key !== null && !resetOnNextRender.current && !same(value, baseline.current.value);

  /** Tulis perubahan yang masih menunggu jeda autosave. */
  function flush() {
    const next = unwritten.current;
    unwritten.current = null;
    if (next && writeDraft(next.key, next.value)) setSavedAt(Date.now());
  }
  const flushRef = useRef(flush);
  useEffect(() => {
    flushRef.current = flush;
  });

  // Form/item berganti: pulihkan draf otomatis bila ada. Saat pindah menu,
  // refresh, atau tutup tab: tulis dulu perubahan terakhir yang belum sempat tersimpan.
  useEffect(() => {
    setSavedAt(null);
    setRestoredAt(null);
    if (key === null) return;
    const stored = readDraft<T>(key);
    if (stored && !same(stored.value, baseline.current.value)) {
      justRestored.current = true;
      applyRef.current(stored.value);
      setRestoredAt(stored.savedAt);
      setSavedAt(stored.savedAt);
    }
    const onPageHide = () => flushRef.current();
    window.addEventListener("pagehide", onPageHide);
    return () => {
      window.removeEventListener("pagehide", onPageHide);
      flushRef.current();
    };
  }, [key]);

  // Setelah berhasil disimpan ke server: isi sekarang menjadi kondisi awal yang baru.
  useEffect(() => {
    if (!resetOnNextRender.current || key === null) return;
    resetOnNextRender.current = false;
    baseline.current = { key, value };
    removeDraft(key);
    setSavedAt(null);
    rerender((n) => n + 1);
  });

  // Simpan otomatis (dengan jeda) setiap ada perubahan.
  useEffect(() => {
    if (key === null || resetOnNextRender.current) return;
    if (!same(value, baseline.current.value)) {
      justRestored.current = false;
      unwritten.current = { key, value };
      const timer = window.setTimeout(() => flushRef.current(), SAVE_DELAY);
      return () => window.clearTimeout(timer);
    }
    if (justRestored.current) return; // draf sedang dipulihkan pada render berikutnya
    unwritten.current = null;
    removeDraft(key); // isian kembali seperti semula
    setSavedAt(null);
    setRestoredAt(null);
  }, [key, value]);

  return {
    dirty,
    savedAt,
    restoredAt,
    /** Buang draf: kembalikan isian ke data terakhir yang tersimpan di server. */
    discard() {
      unwritten.current = null;
      if (key !== null) removeDraft(key);
      setRestoredAt(null);
      setSavedAt(null);
      applyRef.current(baseline.current.value);
    },
    dismissNotice() {
      setRestoredAt(null);
    },
    /** Panggil setelah data berhasil disimpan ke server. */
    markSaved() {
      resetOnNextRender.current = true;
      unwritten.current = null;
      if (key !== null) removeDraft(key);
      setRestoredAt(null);
      setSavedAt(null);
      rerender((n) => n + 1);
    },
  };
}

const timeFormat = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

/** Pemberitahuan bahwa isian dipulihkan dari draf, dengan opsi membuangnya. */
export function DraftNotice({
  draft,
}: {
  draft: { restoredAt: number | null; discard: () => void; dismissNotice: () => void };
}) {
  if (!draft.restoredAt) return null;
  return (
    <div
      role="status"
      className="mb-4 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between"
    >
      <span className="inline-flex items-start gap-2">
        <History size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
        Isian terakhir Anda ({timeFormat.format(draft.restoredAt)}) dipulihkan dan belum disimpan ke website.
      </span>
      <span className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={draft.discard}
          className="rounded-lg border border-amber-300 px-3 py-1.5 text-xs font-medium hover:bg-amber-100"
        >
          Buang draf
        </button>
        <button
          type="button"
          onClick={draft.dismissNotice}
          aria-label="Tutup pemberitahuan"
          className="rounded-lg px-2 py-1.5 text-amber-700 hover:bg-amber-100"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </span>
    </div>
  );
}

/** Teks kecil di samping tombol simpan: status draf lokal. */
export function DraftStatus({ draft }: { draft: { dirty: boolean; savedAt: number | null } }) {
  if (!draft.dirty) return null;
  return (
    <span className="mr-auto self-center text-xs text-[#87938a]" aria-live="polite">
      {draft.savedAt ? `Draf tersimpan di perangkat ini · ${timeFormat.format(draft.savedAt)}` : "Belum disimpan"}
    </span>
  );
}

// ---- Status koneksi
function subscribeOnline(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export function useOnline() {
  return useSyncExternalStore(subscribeOnline, () => navigator.onLine, () => true);
}

/** Banner saat koneksi putus (dipasang sekali di layout dashboard). */
export function OfflineBanner() {
  const online = useOnline();
  if (online) return null;
  return (
    <div role="alert" className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
      <WifiOff size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
      <span>
        Koneksi internet terputus. Isian Anda tetap tersimpan sebagai draf di perangkat ini; tombol simpan aktif lagi
        setelah koneksi kembali.
      </span>
    </div>
  );
}
