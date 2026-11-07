"use client";

import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

function normalize(value: string) {
  return value.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/** Cocok jika setiap kata kunci muncul di salah satu teks (tidak peka huruf besar/aksen). */
export function matchesQuery(query: string, ...fields: (string | null | undefined)[]) {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const haystack = normalize(fields.filter(Boolean).join(" "));
  return words.every((word) => haystack.includes(word));
}

/** Memotong daftar per halaman; nomor halaman otomatis dijepit ke rentang yang valid. */
export function paginate<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;
  return {
    pageItems: items.slice(start, start + pageSize),
    page: current,
    totalPages,
    total: items.length,
  };
}

/** Nilai yang baru diperbarui setelah pengguna berhenti mengetik. */
export function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function SearchField({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}) {
  return (
    <div className="relative w-full sm:max-w-sm">
      <Search
        size={16}
        aria-hidden="true"
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#87938a]"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && value) onChange("");
        }}
        placeholder={placeholder}
        aria-label={label}
        className="w-full rounded-xl border border-[#dce4dc] bg-white py-2.5 pl-10 pr-10 text-sm text-[#26392b] outline-none focus:border-[#63816a] focus:ring-4 focus:ring-[#63816a]/10 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Hapus pencarian"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#87938a] transition hover:bg-[#f3f6f3] hover:text-[#315b3d]"
        >
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

/** Nomor halaman yang ditampilkan: awal, akhir, dan sekitar halaman aktif. */
function visiblePages(page: number, totalPages: number): (number | "gap")[] {
  const pages = new Set([1, totalPages, page - 1, page, page + 1]);
  const sorted = [...pages].filter((value) => value >= 1 && value <= totalPages).sort((a, b) => a - b);
  return sorted.flatMap((value, index) =>
    index > 0 && value - sorted[index - 1] > 1 ? (["gap", value] as const) : [value],
  );
}

const pageButtonClass =
  "flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40";

export function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  itemLabel,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  itemLabel: string;
  onPageChange: (page: number) => void;
}) {
  if (total === 0) return null;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);

  return (
    <nav
      aria-label={`Halaman daftar ${itemLabel}`}
      className="mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row"
    >
      <p className="text-xs text-[#718076]">
        Menampilkan <span className="font-semibold text-[#43564a]">{start}–{end}</span> dari{" "}
        <span className="font-semibold text-[#43564a]">{total}</span> {itemLabel}
      </p>
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Halaman sebelumnya"
            className={`${pageButtonClass} border-[#dce4dc] bg-white text-[#526157] hover:bg-[#f5f8f5]`}
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          {visiblePages(page, totalPages).map((value, index) =>
            value === "gap" ? (
              <span key={`gap-${index}`} className="px-1 text-sm text-[#9aa49c]" aria-hidden="true">
                …
              </span>
            ) : (
              <button
                key={value}
                type="button"
                onClick={() => onPageChange(value)}
                aria-current={value === page ? "page" : undefined}
                aria-label={`Halaman ${value}`}
                className={`${pageButtonClass} ${
                  value === page
                    ? "border-brand bg-brand text-white"
                    : "border-[#dce4dc] bg-white text-[#526157] hover:bg-[#f5f8f5]"
                }`}
              >
                {value}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="Halaman berikutnya"
            className={`${pageButtonClass} border-[#dce4dc] bg-white text-[#526157] hover:bg-[#f5f8f5]`}
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </nav>
  );
}

/** Pesan saat pencarian tidak menemukan apa pun, dengan tombol untuk menghapus kata kunci. */
export function NoResults({ query, itemLabel, onClear }: { query: string; itemLabel: string; onClear: () => void }) {
  return (
    <div className="rounded-2xl border border-[#e5ebe4] bg-white p-8 text-center text-sm text-[#87938a]">
      <p>
        Tidak ada {itemLabel} yang cocok dengan <span className="font-medium text-[#43564a]">“{query}”</span>.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-3 rounded-lg border border-[#dce4dc] px-3 py-1.5 text-xs font-medium text-[#385944] transition hover:bg-[#f5f8f5]"
      >
        Hapus pencarian
      </button>
    </div>
  );
}
