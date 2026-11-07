"use client";

import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getBlockDef,
  getCollectionDef,
  slugify,
  type BlockData,
  type ContentItem,
  type FieldDef,
} from "@/lib/content-schema";
import { joinMonthLabel, MONTHS, splitMonthLabel } from "../fieldFormats";
import { matchesQuery, NoResults, paginate, Pagination, SearchField } from "../ListControls";
import { FormCardSkeleton, HeadingSkeleton, ListRowsSkeleton, SkeletonRegion } from "../Skeletons";

import { BlockPreview, CollectionPreview } from "./ContentPreview";
import { DraftNotice, DraftStatus, useFormDraft, useOnline } from "../drafts";
const PAGE_SIZE = 10;
const cardClass = "rounded-2xl border border-[#e5ebe4] bg-white p-5 sm:p-7";
const labelClass = "block text-xs font-medium text-[#526157]";
const inputClass =
  "mt-1.5 w-full rounded-xl border border-[#dce4dc] bg-white px-3.5 py-2.5 text-sm text-[#26392b] outline-none focus:border-[#63816a] focus:ring-4 focus:ring-[#63816a]/10";
const primaryButton =
  "rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60";
const smallButton =
  "rounded-lg border border-[#dce4dc] px-2.5 py-1.5 text-xs font-medium text-[#385944] transition hover:bg-[#f5f8f5] disabled:cursor-not-allowed disabled:opacity-40";

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 16 }, (_, index) => String(currentYear + 2 - index));
const LINK = /^(\/(?!\/)|https?:\/\/.+)/;

type MediaFile = { name: string; url: string };
type FieldValue = string | string[] | number | null | undefined;

function Heading({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-7">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#63816a]">Pengelolaan konten</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#1d3024] sm:text-3xl">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-[#718076]">{description}</p>
    </div>
  );
}

function Alerts({ notice, error }: { notice: string; error: string }) {
  return (
    <>
      {notice && <p role="status" className="mb-5 rounded-xl bg-[#eaf4e9] px-4 py-3 text-sm text-[#315b3d]">{notice}</p>}
      {error && <p role="alert" className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
    </>
  );
}

function asText(value: FieldValue) {
  if (Array.isArray(value)) return value.join("\n");
  return value === null || value === undefined ? "" : String(value);
}

/** Satu input form sesuai tipe field. */
function FieldInput({
  field,
  value,
  onChange,
  media,
}: {
  field: FieldDef;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
  media: MediaFile[];
}) {
  const text = asText(value);
  const common = { required: field.required, className: inputClass };
  const help = field.help && <span className="mt-1 block font-normal text-[#9aa49c]">{field.help}</span>;

  if (field.type === "select") {
    return (
      <label className={labelClass}>
        {field.label}
        <select {...common} value={text} onChange={(event) => onChange(event.target.value)}>
          <option value="">Pilih</option>
          {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        {help}
      </label>
    );
  }

  if (field.type === "monthYear") {
    const parts = splitMonthLabel(text);
    return (
      <div className={labelClass}>
        {field.label}
        <div className="grid grid-cols-[minmax(0,1fr)_110px] gap-2">
          <select
            {...common}
            aria-label={`${field.label}: bulan`}
            value={parts.month}
            onChange={(event) => onChange(joinMonthLabel(event.target.value, parts.year || String(currentYear)))}
          >
            <option value="">Bulan</option>
            {MONTHS.map((month) => <option key={month} value={month}>{month}</option>)}
          </select>
          <select
            {...common}
            aria-label={`${field.label}: tahun`}
            value={parts.year}
            onChange={(event) => onChange(joinMonthLabel(parts.month || MONTHS[new Date().getMonth()], event.target.value))}
          >
            <option value="">Tahun</option>
            {yearOptions.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>
        {help}
      </div>
    );
  }

  if (field.type === "textarea" || field.type === "longtext" || field.type === "list") {
    const rows = field.type === "longtext" ? 12 : field.type === "list" ? 4 : 3;
    return (
      <label className={labelClass}>
        {field.label}
        <textarea
          {...common}
          rows={rows}
          maxLength={field.type === "list" ? undefined : field.max}
          value={text}
          onChange={(event) =>
            onChange(field.type === "list" ? event.target.value.split("\n") : event.target.value)
          }
          placeholder={field.placeholder}
        />
        {field.max && field.type !== "list" && (
          <span className="mt-1 block text-right text-[11px] font-normal text-[#9aa49c]">{text.length}/{field.max}</span>
        )}
        {help}
      </label>
    );
  }

  if (field.type === "image" || field.type === "file") {
    const options = field.type === "image" ? media.filter((file) => /\.(jpe?g|png|webp|gif)$/i.test(file.name)) : media;
    return (
      <div className={labelClass}>
        {field.label}
        <div className={`grid gap-3 ${field.type === "image" ? "sm:grid-cols-[minmax(0,1fr)_120px]" : ""}`}>
          <div>
            <input
              {...common}
              value={text}
              onChange={(event) => onChange(event.target.value)}
              pattern="(/(?!/).*|https?://.+)"
              title="Awali dengan / untuk file di situs, atau https:// untuk tautan luar"
              placeholder={field.type === "image" ? "https://… atau pilih dari pustaka media" : "https://… atau pilih file dari pustaka media"}
            />
            {options.length > 0 && (
              <select
                className={inputClass}
                value=""
                aria-label={`${field.label}: pilih dari pustaka media`}
                onChange={(event) => event.target.value && onChange(event.target.value)}
              >
                <option value="">Pilih dari pustaka media</option>
                {options.map((file) => <option key={file.name} value={file.url}>{file.name}</option>)}
              </select>
            )}
          </div>
          {field.type === "image" && (
            <div className="relative mt-1.5 h-24 overflow-hidden rounded-xl border border-[#dce4dc] bg-[#f3f5f2]">
              {LINK.test(text) ? (
                <img src={text} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full items-center justify-center text-[11px] text-[#9aa49c]">Pratinjau</span>
              )}
            </div>
          )}
        </div>
        {help}
      </div>
    );
  }

  return (
    <label className={labelClass}>
      {field.label}
      <input
        {...common}
        type={field.type === "number" ? "number" : "text"}
        min={field.min}
        max={field.maxNumber}
        maxLength={field.type === "number" ? undefined : field.max}
        value={text}
        onChange={(event) => onChange(field.type === "slug" ? event.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-") : event.target.value)}
        placeholder={field.placeholder}
      />
      {help}
    </label>
  );
}

function useMediaOptions(needed: boolean) {
  const [media, setMedia] = useState<MediaFile[]>([]);
  useEffect(() => {
    if (!needed) return;
    fetch("/api/admin/media?pageSize=200")
      .then((response) => (response.ok ? response.json() : { items: [] }))
      .then((result: { items?: MediaFile[] }) => setMedia(result.items ?? []))
      .catch(() => setMedia([]));
  }, [needed]);
  return media;
}

function EditorSkeleton({ label }: { label: string }) {
  return (
    <SkeletonRegion label={`Memuat ${label}`}>
      <HeadingSkeleton />
      <FormCardSkeleton fields={4} />
      <ListRowsSkeleton rows={4} />
    </SkeletonRegion>
  );
}

const newId = () => crypto.randomUUID().slice(0, 18);

function LoadFailed({ title, description, message, onRetry }: { title: string; description: string; message: string; onRetry: () => void }) {
  const missingTable = /content_entries|site_blocks|schema cache/.test(message);
  return (
    <>
      <Heading title={title} description={description} />
      <div role="alert" className="rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-700">
        <p className="font-medium">Data belum bisa dimuat, jadi editor dikunci agar data asli tidak tertimpa.</p>
        <p className="mt-1">{message}</p>
        {missingTable && (
          <p className="mt-2">
            Jalankan migrasi <code className="rounded bg-white px-1">supabase/migrations/20261108000000_site_content.sql</code> di SQL Editor Supabase.
          </p>
        )}
        <button type="button" onClick={onRetry} className="mt-4 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50">
          Coba lagi
        </button>
      </div>
    </>
  );
}

/** Editor daftar item (tim, kisah, publikasi, ...). Setiap aksi langsung disimpan ke Supabase. */
export function CollectionEditor({ collectionKey }: { collectionKey: string }) {
  const def = getCollectionDef(collectionKey)!;
  const emptyDraft = useMemo<ContentItem>(
    () => ({ id: "", ...Object.fromEntries(def.fields.map((field) => [field.key, field.type === "list" ? [] : ""])) }),
    [def],
  );
  const [items, setItems] = useState<ContentItem[] | null>(null);
  const [loadError, setLoadError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [draft, setDraft] = useState<ContentItem>(emptyDraft);
  const [slugTouched, setSlugTouched] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const media = useMediaOptions(def.fields.some((field) => field.type === "image" || field.type === "file"));
  const slugField = def.fields.find((field) => field.type === "slug");

  useEffect(() => {
    fetch(`/api/admin/collections/${def.key}`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message ?? `Gagal memuat ${def.label}.`);
        setLoadError("");
        setItems(result as ContentItem[]);
      })
      .catch((failure: unknown) => {
        // Jangan izinkan menyimpan dari daftar kosong: itu akan menimpa data asli.
        setLoadError(failure instanceof Error ? failure.message : `Gagal memuat ${def.label}.`);
        setItems([]);
      });
  }, [def, reloadKey]);

  async function persist(next: ContentItem[], successMessage: string) {
    setSaving(true);
    setNotice("");
    setError("");
    try {
      const response = await fetch(`/api/admin/collections/${def.key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? "Gagal menyimpan.");
      setItems(result.items as ContentItem[]);
      setNotice(successMessage);
      return true;
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Gagal menyimpan.");
      return false;
    } finally {
      setSaving(false);
    }
  }

  const online = useOnline();
  const formDraft = useFormDraft<ContentItem>(
    items === null || loadError ? null : `collection:${def.key}:${draft.id || "new"}`,
    draft,
    (restored) => {
      setDraft(restored);
      setSlugTouched(
        Boolean(slugField?.from) && asText(restored[slugField!.key]) !== slugify(asText(restored[slugField!.from!])),
      );
    },
  );

  if (items === null) return <EditorSkeleton label={def.label} />;
  if (loadError) {
    return <LoadFailed title={def.label} description={def.description} message={loadError} onRetry={() => { setItems(null); setReloadKey((key) => key + 1); }} />;
  }

  const editing = draft.id !== "";
  const searchKeys = [def.titleField, ...def.subtitleFields];
  const filtered = items.filter((item) => matchesQuery(query, ...searchKeys.map((key) => asText(item[key]))));
  const list = paginate(filtered, page, PAGE_SIZE);
  const canReorder = !query;

  function setField(field: FieldDef, value: FieldValue) {
    setDraft((current) => {
      const next = { ...current, [field.key]: value as ContentItem[string] };
      if (slugField && field.key === slugField.from && !slugTouched) {
        next[slugField.key] = slugify(asText(value));
      }
      return next;
    });
    if (field.type === "slug") setSlugTouched(true);
  }

  function move(index: number, offset: number) {
    const next = [...items!];
    const [moved] = next.splice(index, 1);
    next.splice(index + offset, 0, moved);
    void persist(next, "Urutan disimpan.");
  }

  return (
    <>
      <Heading title={def.label} description={def.description} />
      <Alerts notice={notice} error={error} />

      <div className="mb-7 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,44%)]">
      <form
        ref={formRef}
        onSubmit={async (event) => {
          event.preventDefault();
          const item = { ...draft, id: draft.id || newId() };
          const next = editing ? items.map((entry) => (entry.id === item.id ? item : entry)) : [...items, item];
          if (await persist(next, editing ? "Perubahan disimpan." : `${def.singular[0].toUpperCase()}${def.singular.slice(1)} ditambahkan.`)) {
            formDraft.markSaved();
            setDraft(emptyDraft);
            setSlugTouched(false);
          }
        }}
        className={`${cardClass} scroll-mt-24 space-y-5`}
      >
        <h2 className="text-base font-semibold text-[#24392a]">
          {editing ? `Ubah ${def.singular}` : `Tambah ${def.singular}`}
        </h2>
        <DraftNotice draft={formDraft} />
        <div className="grid gap-4 sm:grid-cols-2">
          {def.fields.map((field) => (
            <div key={field.key} className={field.wide ? "sm:col-span-2" : ""}>
              <FieldInput field={field} value={draft[field.key]} onChange={(value) => setField(field, value)} media={media} />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <DraftStatus draft={formDraft} />
          {editing && (
            <button
              type="button"
              onClick={() => {
                setDraft(emptyDraft);
                setSlugTouched(false);
              }}
              className="rounded-xl border border-[#dce4dc] px-4 py-2.5 text-sm text-[#526157]"
            >
              Batal
            </button>
          )}
          <button type="submit" disabled={saving || !online} className={primaryButton}>
            {saving ? "Menyimpan..." : editing ? "Simpan perubahan" : (
              <span className="inline-flex items-center gap-1.5"><Plus size={16} aria-hidden="true" /> Tambah</span>
            )}
          </button>
        </div>
      </form>
      <CollectionPreview def={def} draft={draft} />
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#24392a]">Daftar {def.singular}</h2>
          {def.note && <p className="mt-0.5 text-xs text-[#87938a]">{def.note}</p>}
        </div>
        <SearchField
          value={query}
          onChange={(value) => {
            setQuery(value);
            setPage(1);
          }}
          placeholder={`Cari ${def.singular}`}
          label={`Cari ${def.singular}`}
        />
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-[#e5ebe4] bg-white p-8 text-center text-sm text-[#87938a]">
          Belum ada {def.singular}. Tambahkan lewat form di atas.
        </div>
      ) : list.total === 0 ? (
        <NoResults query={query} itemLabel={def.singular} onClear={() => setQuery("")} />
      ) : (
        <div className="space-y-3">
          {list.pageItems.map((item) => {
            const index = items.indexOf(item);
            const subtitle = def.subtitleFields.map((key) => asText(item[key])).filter(Boolean).join(" · ");
            return (
              <article
                key={item.id}
                className="flex flex-col gap-3 rounded-xl border border-[#e5ebe4] bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 w-6 shrink-0 text-right text-xs tabular-nums text-[#9aa49c]">{index + 1}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#293b2e]">{asText(item[def.titleField]) || "(tanpa judul)"}</p>
                    {subtitle && <p className="mt-1 text-xs text-[#87938a]">{subtitle}</p>}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:shrink-0">
                  <button type="button" className={smallButton} disabled={!canReorder || saving || index === 0} onClick={() => move(index, -1)} aria-label="Naikkan urutan" title={canReorder ? "Naikkan" : "Hapus pencarian untuk mengatur urutan"}>
                    <ArrowUp size={14} aria-hidden="true" />
                  </button>
                  <button type="button" className={smallButton} disabled={!canReorder || saving || index === items.length - 1} onClick={() => move(index, 1)} aria-label="Turunkan urutan" title={canReorder ? "Turunkan" : "Hapus pencarian untuk mengatur urutan"}>
                    <ArrowDown size={14} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={smallButton}
                    onClick={() => {
                      setDraft({ ...emptyDraft, ...item });
                      setSlugTouched(true);
                      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    Ubah
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    className="rounded-lg border border-red-100 px-2.5 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-40"
                    onClick={() => {
                      const name = asText(item[def.titleField]);
                      if (window.confirm(`Hapus ${def.singular} "${name}"? Tindakan ini tidak bisa dibatalkan.`)) {
                        void persist(items.filter((entry) => entry.id !== item.id), `${def.singular[0].toUpperCase()}${def.singular.slice(1)} dihapus.`);
                      }
                    }}
                  >
                    Hapus
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
      <Pagination
        page={list.page}
        totalPages={list.totalPages}
        total={list.total}
        pageSize={PAGE_SIZE}
        itemLabel={def.singular}
        onPageChange={setPage}
      />
    </>
  );
}

/** Editor satu set isian (kontak, visi). */
export function BlockEditor({ blockKey }: { blockKey: string }) {
  const def = getBlockDef(blockKey)!;
  const [data, setData] = useState<BlockData | null>(null);
  const [loadError, setLoadError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const media = useMediaOptions(def.fields.some((field) => field.type === "image" || field.type === "file"));

  useEffect(() => {
    fetch(`/api/admin/blocks/${def.key}`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message ?? `Gagal memuat ${def.label}.`);
        setLoadError("");
        setData(result as BlockData);
      })
      .catch((failure: unknown) => {
        setLoadError(failure instanceof Error ? failure.message : `Gagal memuat ${def.label}.`);
        setData({});
      });
  }, [def, reloadKey]);

  const online = useOnline();
  const formDraft = useFormDraft<BlockData>(data === null || loadError ? null : `block:${def.key}`, data ?? {}, setData);

  if (data === null) return <EditorSkeleton label={def.label} />;
  if (loadError) {
    return <LoadFailed title={def.label} description={def.description} message={loadError} onRetry={() => { setData(null); setReloadKey((key) => key + 1); }} />;
  }

  return (
    <>
      <Heading title={def.label} description={def.description} />
      <Alerts notice={notice} error={error} />
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,48%)]">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setSaving(true);
          setNotice("");
          setError("");
          try {
            const response = await fetch(`/api/admin/blocks/${def.key}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message ?? "Gagal menyimpan.");
            setData(result.data as BlockData);
            formDraft.markSaved();
            setNotice(result.message ?? "Tersimpan.");
          } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : "Gagal menyimpan.");
          } finally {
            setSaving(false);
          }
        }}
        className={`${cardClass} space-y-5`}
      >
        <DraftNotice draft={formDraft} />
        <div className="grid gap-4 sm:grid-cols-2">
          {def.fields.map((field) => (
            <div key={field.key} className={field.wide ? "sm:col-span-2" : ""}>
              <FieldInput
                field={field}
                value={data[field.key]}
                onChange={(value) => setData({ ...data, [field.key]: asText(value) })}
                media={media}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <DraftStatus draft={formDraft} />
          <button type="submit" disabled={saving || !online} className={primaryButton}>
            {saving ? "Menyimpan..." : "Simpan perubahan"}
          </button>
        </div>
      </form>
      <BlockPreview def={def} data={data} />
      </div>
    </>
  );
}
