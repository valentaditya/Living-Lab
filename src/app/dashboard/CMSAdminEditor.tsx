"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Check, Copy, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { AgendaItem } from "@/types/agenda";
import type { Article } from "@/types/article";
import type { CMSContent, FAQItem } from "@/lib/cms-content";
import type { ActivityLogEntry } from "@/lib/activity-log";
import {
  matchesQuery,
  NoResults,
  paginate,
  Pagination,
  SearchField,
  useDebouncedValue,
} from "./ListControls";
import { EditorSkeleton, LogTableSkeleton, MediaGridSkeleton } from "./Skeletons";
import { StatusBadge } from "../components/atoms/StatusBadge";
import { AgendaPreview, ArticlePreview, FAQPreview, HeroPreview } from "./preview/CMSPreview";
import { DraftNotice, DraftStatus, useFormDraft, useOnline } from "./drafts";
import {
  agendaToDateInput,
  dateInputToAgenda,
  formatTimeRange,
  joinMonthLabel,
  LINK_PATTERN,
  minutesToReadTime,
  MONTHS,
  parseTimeRange,
  readTimeToMinutes,
  splitMonthLabel,
  suggestions,
  TIME_ZONES,
} from "./fieldFormats";

type Section = "homepage" | "news" | "faq" | "media" | "logs";
type MediaFile = { name: string; url: string; size: number; updatedAt?: string };
type MediaType = "all" | "image" | "pdf";
type PagedResponse<T> = { items: T[]; total: number; page: number; pageSize: number; message?: string };

const NEWS_PAGE_SIZE = 10;
const AGENDA_PAGE_SIZE = 10;
const FAQ_PAGE_SIZE = 10;
const MEDIA_PAGE_SIZE = 12;
const LOGS_PAGE_SIZE = 20;

const mediaTypeFilters: { id: MediaType; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "image", label: "Gambar" },
  { id: "pdf", label: "PDF" },
];

const tagColorOptions: { value: AgendaItem["tagColor"]; label: string }[] = [
  { value: "green", label: "Hijau" },
  { value: "orange", label: "Oranye" },
  { value: "blue", label: "Biru" },
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 14 }, (_, index) => String(currentYear + 2 - index));

/** Daftar saran untuk input teks (muncul saat mengetik). */
function Suggestions({ id, values }: { id: string; values: string[] }) {
  return (
    <datalist id={id}>
      {values.map((value) => (
        <option key={value} value={value} />
      ))}
    </datalist>
  );
}

function CharacterCount({ value, max }: { value: string; max: number }) {
  return (
    <span className="mt-1 block text-right text-[11px] font-normal text-[#9aa49c]">
      {value.length}/{max}
    </span>
  );
}

const imageFilePattern = /\.(jpe?g|png|webp|gif)$/i;

function formatDateTime(value?: string) {
  return value
    ? new Date(value).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })
    : "";
}

const newsAgendaTabs = [
  { id: "news", label: "Berita" },
  { id: "agenda", label: "Agenda" },
] as const;

const emptyArticle: Article = {
  id: "",
  category: "",
  image: "",
  date: "",
  readTime: "",
  tag: "",
  title: "",
  summary: "",
  author: "",
  actionText: "Baca Selengkapnya",
  actionHref: "",
};

const emptyAgenda: AgendaItem = {
  id: "",
  month: "",
  day: "",
  tagLabel: "",
  tagColor: "green",
  time: "",
  title: "",
  location: "",
  buttonText: "Informasi",
};

const emptyFAQ: FAQItem = {
  id: "",
  question: "",
  answer: "",
  category: "",
};

const inputClass =
  "mt-1.5 w-full rounded-xl border border-[#dce4dc] bg-white px-3.5 py-2.5 text-sm text-[#26392b] outline-none focus:border-[#63816a] focus:ring-4 focus:ring-[#63816a]/10";
const labelClass = "block text-xs font-medium text-[#526157]";

function PageHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-7">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#63816a]">
        Pengelolaan konten
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#1d3024] sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-6 text-[#718076]">{description}</p>
    </div>
  );
}

function SaveButton({ saving }: { saving: boolean }) {
  const online = useOnline();
  return (
    <button
      type="submit"
      disabled={saving || !online}
      title={online ? undefined : "Koneksi terputus"}
      className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
    >
      {saving ? "Menyimpan..." : "Simpan perubahan"}
    </button>
  );
}

export function CMSAdminEditor({
  section,
  initialTab = "news",
}: {
  section: Section;
  initialTab?: "news" | "agenda";
}) {
  const [content, setContent] = useState<CMSContent | null>(null);
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [logs, setLogs] = useState<ActivityLogEntry[]>([]);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articleDraft, setArticleDraft] = useState<Article>(emptyArticle);
  const [agendaDraft, setAgendaDraft] = useState<AgendaItem>(emptyAgenda);
  const [activeContentTab, setActiveContentTab] = useState<"news" | "agenda">(
    initialTab,
  );
  const [faqDraft, setFaqDraft] = useState<FAQItem>(emptyFAQ);
  // Pindah Berita <-> Agenda lewat menu samping (URL ?tab= berubah, komponen tidak dimuat ulang).
  const urlTab = useSearchParams().get("tab") === "agenda" ? "agenda" : "news";
  const [lastUrlTab, setLastUrlTab] = useState(urlTab);
  if (section === "news" && urlTab !== lastUrlTab) {
    setLastUrlTab(urlTab);
    setActiveContentTab(urlTab);
  }
  const [uploading, setUploading] = useState(false);

  // Pencarian & halaman untuk daftar yang difilter di browser (konten sudah dimuat utuh).
  const [newsQuery, setNewsQuery] = useState("");
  const [newsPage, setNewsPage] = useState(1);
  const [agendaQuery, setAgendaQuery] = useState("");
  const [agendaPage, setAgendaPage] = useState(1);
  const [faqQuery, setFaqQuery] = useState("");
  const [faqPage, setFaqPage] = useState(1);

  // Pustaka media & log: dicari dan dipotong per halaman di server.
  const [mediaQuery, setMediaQuery] = useState("");
  const [mediaType, setMediaType] = useState<MediaType>("all");
  const [mediaPage, setMediaPage] = useState(1);
  const [mediaTotal, setMediaTotal] = useState(0);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaReloadKey, setMediaReloadKey] = useState(0);
  const [copiedUrl, setCopiedUrl] = useState("");
  const [imageOptions, setImageOptions] = useState<MediaFile[]>([]);
  const [logsQuery, setLogsQuery] = useState("");
  const [logsPage, setLogsPage] = useState(1);
  const [logsTotal, setLogsTotal] = useState(0);
  const [logsLoading, setLogsLoading] = useState(false);
  const debouncedMediaQuery = useDebouncedValue(mediaQuery);
  const debouncedLogsQuery = useDebouncedValue(logsQuery);
  const mediaRequest = useRef(0);
  const logsRequest = useRef(0);

  const articleFormRef = useRef<HTMLFormElement>(null);
  const agendaFormRef = useRef<HTMLFormElement>(null);
  const faqFormRef = useRef<HTMLFormElement>(null);
  const scrollToForm = (form: HTMLFormElement | null) =>
    form?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Draf lokal tiap form, supaya isian tidak hilang saat refresh / pindah menu / offline.
  const ready = content !== null && !loading;
  const homepageDraft = useFormDraft(
    ready && section === "homepage" ? "homepage" : null,
    content?.settings ?? null,
    (settings) => settings && setContent((current) => current && { ...current, settings }),
  );
  const faqFormDraft = useFormDraft(ready && section === "faq" ? `faq:${faqDraft.id || "new"}` : null, faqDraft, setFaqDraft);
  const articleFormDraft = useFormDraft(
    ready && section === "news" ? `news:${articleDraft.id || "new"}` : null,
    articleDraft,
    setArticleDraft,
  );
  const agendaFormDraft = useFormDraft(
    ready && section === "news" ? `agenda:${agendaDraft.id || "new"}` : null,
    agendaDraft,
    setAgendaDraft,
  );

  async function loadContent() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/content");
      if (!response.ok) throw new Error("Gagal memuat konten.");
      setContent((await response.json()) as CMSContent);
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Gagal memuat konten.",
      );
    } finally {
      setLoading(false);
    }
  }

  /** Gambar terbaru untuk pilihan gambar di form berita. */
  async function loadImageOptions() {
    try {
      const response = await fetch("/api/admin/media?type=image&pageSize=200");
      const result = (await response.json()) as PagedResponse<MediaFile>;
      if (!response.ok) throw new Error(result.message ?? "Gagal memuat pustaka media.");
      setImageOptions(result.items);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Gagal memuat pustaka media.",
      );
    }
  }

  useEffect(() => {
    if (section !== "logs") {
      void loadContent();
      if (section === "news") void loadImageOptions();
    }
    // Load the selected section once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pustaka media: muat ulang saat kata kunci, jenis file, atau halaman berubah.
  useEffect(() => {
    if (section !== "media") return;
    const requestId = ++mediaRequest.current;
    setMediaLoading(true);
    const params = new URLSearchParams({
      q: debouncedMediaQuery,
      type: mediaType,
      page: String(mediaPage),
      pageSize: String(MEDIA_PAGE_SIZE),
    });
    fetch(`/api/admin/media?${params}`)
      .then(async (response) => {
        const result = (await response.json()) as PagedResponse<MediaFile>;
        if (!response.ok) throw new Error(result.message ?? "Gagal memuat pustaka media.");
        return result;
      })
      .then((result) => {
        if (requestId !== mediaRequest.current) return;
        setMedia(result.items);
        setMediaTotal(result.total);
        const lastPage = Math.max(1, Math.ceil(result.total / MEDIA_PAGE_SIZE));
        if (mediaPage > lastPage) setMediaPage(lastPage);
      })
      .catch((loadError: unknown) => {
        if (requestId !== mediaRequest.current) return;
        setError(loadError instanceof Error ? loadError.message : "Gagal memuat pustaka media.");
      })
      .finally(() => {
        if (requestId === mediaRequest.current) setMediaLoading(false);
      });
  }, [section, debouncedMediaQuery, mediaType, mediaPage, mediaReloadKey]);

  // Log aktivitas: pencarian dan halaman dikerjakan di database.
  useEffect(() => {
    if (section !== "logs") return;
    const requestId = ++logsRequest.current;
    setLogsLoading(true);
    const params = new URLSearchParams({
      q: debouncedLogsQuery,
      page: String(logsPage),
      pageSize: String(LOGS_PAGE_SIZE),
    });
    fetch(`/api/admin/logs?${params}`)
      .then(async (response) => {
        const result = (await response.json()) as PagedResponse<ActivityLogEntry>;
        if (!response.ok) throw new Error(result.message ?? "Gagal memuat log aktivitas.");
        return result;
      })
      .then((result) => {
        if (requestId !== logsRequest.current) return;
        setError("");
        setLogs(result.items);
        setLogsTotal(result.total);
        const lastPage = Math.max(1, Math.ceil(result.total / LOGS_PAGE_SIZE));
        if (logsPage > lastPage) setLogsPage(lastPage);
      })
      .catch((loadError: unknown) => {
        if (requestId !== logsRequest.current) return;
        setError(loadError instanceof Error ? loadError.message : "Gagal memuat log aktivitas.");
      })
      .finally(() => {
        if (requestId !== logsRequest.current) return;
        setLogsLoading(false);
        setLoading(false);
      });
  }, [section, debouncedLogsQuery, logsPage]);

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl((current) => (current === url ? "" : current)), 2000);
    } catch {
      setError("URL tidak bisa disalin otomatis. Salin dari tautan Buka.");
    }
  }

  async function persist(nextContent: CMSContent) {
    setSaving(true);
    setNotice("");
    setError("");
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextContent),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Gagal menyimpan.");
      setContent(nextContent);
      setNotice(result.message ?? "Perubahan tersimpan.");
      return true;
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : "Gagal menyimpan.",
      );
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function uploadFile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const file = (new FormData(form).get("file") as File | null) ?? null;
    if (!file || file.size === 0) {
      setError("Pilih file terlebih dahulu.");
      return;
    }

    setUploading(true);
    setError("");
    setNotice("");
    try {
      const data = new FormData();
      data.set("file", file);
      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: data,
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Upload gagal.");
      form.reset();
      setNotice("File berhasil diunggah.");
      setMediaQuery("");
      setMediaType("all");
      setMediaPage(1);
      setMediaReloadKey((key) => key + 1);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload gagal.",
      );
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return <EditorSkeleton section={section} newsTab={activeContentTab} />;
  }

  if (error && section !== "logs" && !content) {
    return (
      <div>
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
        <button
          type="button"
          onClick={() => void loadContent()}
          className="mt-4 rounded-xl border border-[#dce4dc] bg-white px-4 py-2 text-sm font-medium text-[#385944]"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  if (section !== "logs" && !content) {
    return <p role="alert" className="text-sm text-red-700">Konten tidak tersedia.</p>;
  }

  const alerts = (
    <>
      {notice && (
        <p role="status" className="mb-5 rounded-xl bg-[#eaf4e9] px-4 py-3 text-sm text-[#315b3d]">
          {notice}
        </p>
      )}
      {error && (
        <p role="alert" className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </>
  );

  if (section === "logs") {
    const logsTotalPages = Math.max(1, Math.ceil(logsTotal / LOGS_PAGE_SIZE));
    return (
      <>
        <PageHeading
          title="Log Aktivitas"
          description="Riwayat login, logout, perubahan konten, dan unggahan media."
        />
        {alerts}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchField
            value={logsQuery}
            onChange={(value) => {
              setLogsQuery(value);
              setLogsPage(1);
            }}
            placeholder="Cari aktivitas, detail, atau email"
            label="Cari log aktivitas"
          />
          {logsLoading && logs.length > 0 && <span className="text-xs text-[#87938a]">Memuat...</span>}
        </div>
        {logsLoading && logs.length === 0 ? (
          <LogTableSkeleton />
        ) : logs.length === 0 ? (
          debouncedLogsQuery ? (
            <NoResults
              query={debouncedLogsQuery}
              itemLabel="aktivitas"
              onClear={() => {
                setLogsQuery("");
                setLogsPage(1);
              }}
            />
          ) : (
            <div className="rounded-2xl border border-[#e5ebe4] bg-white p-8 text-center text-sm text-[#87938a]">
              Belum ada aktivitas yang tercatat.
            </div>
          )
        ) : (
          <div
            aria-busy={logsLoading}
            className={`overflow-hidden rounded-2xl border border-[#e5ebe4] bg-white transition-opacity ${
              logsLoading ? "opacity-60" : ""
            }`}
          >
            <div className="hidden grid-cols-[minmax(160px,0.8fr)_minmax(180px,0.8fr)_minmax(0,2fr)] gap-4 border-b border-[#edf0ec] bg-[#f8faf7] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#87938a] sm:grid">
              <span>Waktu</span>
              <span>Aktivitas</span>
              <span>Detail</span>
            </div>
            <div className="divide-y divide-[#edf0ec]">
              {logs.map((entry) => (
                <article
                  key={entry.id}
                  className="grid gap-2 px-5 py-4 sm:grid-cols-[minmax(160px,0.8fr)_minmax(180px,0.8fr)_minmax(0,2fr)] sm:items-center sm:gap-4"
                >
                  <time dateTime={entry.createdAt} className="text-xs text-[#87938a]">
                    {formatDateTime(entry.createdAt)}
                  </time>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-[#315b3d]">{entry.action}</span>
                    {entry.actorEmail && (
                      <span className="block truncate text-xs text-[#87938a]">{entry.actorEmail}</span>
                    )}
                  </span>
                  <span className="text-sm leading-5 text-[#68766d]">{entry.detail}</span>
                </article>
              ))}
            </div>
          </div>
        )}
        <Pagination
          page={Math.min(logsPage, logsTotalPages)}
          totalPages={logsTotalPages}
          total={logsTotal}
          pageSize={LOGS_PAGE_SIZE}
          itemLabel="aktivitas"
          onPageChange={setLogsPage}
        />
      </>
    );
  }

  if (!content) {
    return null;
  }

  if (section === "homepage") {
    return (
      <>
        <PageHeading
          title="Konten Beranda"
          description="Ubah judul dan deskripsi utama yang tampil pada bagian pembuka situs."
        />
        {alerts}
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,44%)]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void persist(content).then((saved) => saved && homepageDraft.markSaved());
          }}
          className="space-y-5 rounded-2xl border border-[#e5ebe4] bg-white p-5 sm:p-7"
        >
          <DraftNotice draft={homepageDraft} />
          <label className={labelClass}>
            Judul utama
            <textarea
              required
              maxLength={180}
              rows={2}
              value={content.settings.heroTitle}
              onChange={(event) =>
                setContent({
                  ...content,
                  settings: { ...content.settings, heroTitle: event.target.value },
                })
              }
              className={inputClass}
            />
            <CharacterCount value={content.settings.heroTitle} max={180} />
          </label>
          <label className={labelClass}>
            Deskripsi
            <textarea
              required
              maxLength={500}
              rows={4}
              value={content.settings.heroDescription}
              onChange={(event) =>
                setContent({
                  ...content,
                  settings: {
                    ...content.settings,
                    heroDescription: event.target.value,
                  },
                })
              }
              className={inputClass}
            />
            <CharacterCount value={content.settings.heroDescription} max={500} />
          </label>
          <div className="flex flex-wrap justify-end gap-2">
            <DraftStatus draft={homepageDraft} />
            <SaveButton saving={saving} />
          </div>
        </form>
        <HeroPreview title={content.settings.heroTitle} description={content.settings.heroDescription} />
        </div>
      </>
    );
  }

  if (section === "faq") {
    const editing = faqDraft.id !== "";
    const faqList = paginate(
      content.faqs.filter((faq) => matchesQuery(faqQuery, faq.question, faq.answer, faq.category)),
      faqPage,
      FAQ_PAGE_SIZE,
    );
    return (
      <>
        <PageHeading
          title="Pertanyaan & Jawaban"
          description="Tambah, ubah, atau hapus FAQ yang tampil di halaman pertanyaan."
        />
        {alerts}
        <div className="mb-7 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,44%)]">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const nextFAQ = { ...faqDraft, id: faqDraft.id || crypto.randomUUID() };
            const faqs = editing
              ? content.faqs.map((faq) => (faq.id === nextFAQ.id ? nextFAQ : faq))
              : [...content.faqs, nextFAQ];
            if (await persist({ ...content, faqs })) {
              faqFormDraft.markSaved();
              setFaqDraft(emptyFAQ);
            }
          }}
          ref={faqFormRef}
          className="scroll-mt-24 space-y-4 rounded-2xl border border-[#e5ebe4] bg-white p-5 sm:p-7"
        >
          <h2 className="text-base font-semibold text-[#24392a]">
            {editing ? "Ubah pertanyaan" : "Tambah pertanyaan"}
          </h2>
          <DraftNotice draft={faqFormDraft} />
          <label className={labelClass}>
            Pertanyaan
            <input
              required
              maxLength={300}
              value={faqDraft.question}
              onChange={(event) =>
                setFaqDraft({ ...faqDraft, question: event.target.value })
              }
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Jawaban
            <textarea
              required
              rows={4}
              value={faqDraft.answer}
              onChange={(event) =>
                setFaqDraft({ ...faqDraft, answer: event.target.value })
              }
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Kategori
            <input
              required
              value={faqDraft.category}
              onChange={(event) =>
                setFaqDraft({ ...faqDraft, category: event.target.value })
              }
              list="faq-categories"
              autoComplete="off"
              placeholder="Pilih atau ketik kategori, mis. Data & Akses"
              className={inputClass}
            />
            <Suggestions id="faq-categories" values={suggestions(content.faqs.map((faq) => faq.category))} />
          </label>
          <div className="flex flex-wrap justify-end gap-2">
            <DraftStatus draft={faqFormDraft} />
            {editing && (
              <button
                type="button"
                onClick={() => setFaqDraft(emptyFAQ)}
                className="rounded-xl border border-[#dce4dc] px-4 py-2.5 text-sm text-[#526157]"
              >
                Batal
              </button>
            )}
            <SaveButton saving={saving} />
          </div>
        </form>
        <FAQPreview faq={faqDraft} />
        </div>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold text-[#24392a]">Daftar pertanyaan</h2>
          <SearchField
            value={faqQuery}
            onChange={(value) => {
              setFaqQuery(value);
              setFaqPage(1);
            }}
            placeholder="Cari pertanyaan, jawaban, atau kategori"
            label="Cari FAQ"
          />
        </div>
        {content.faqs.length === 0 ? (
          <div className="rounded-2xl border border-[#e5ebe4] bg-white p-8 text-center text-sm text-[#87938a]">
            Belum ada pertanyaan.
          </div>
        ) : faqList.total === 0 ? (
          <NoResults
            query={faqQuery}
            itemLabel="pertanyaan"
            onClear={() => {
              setFaqQuery("");
              setFaqPage(1);
            }}
          />
        ) : (
        <div className="space-y-3">
          {faqList.pageItems.map((faq) => (
            <article
              key={faq.id}
              className="flex flex-col gap-3 rounded-xl border border-[#e5ebe4] bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-medium text-[#293b2e]">{faq.question}</p>
                <p className="mt-1 text-xs text-[#87938a]">{faq.category}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFaqDraft(faq);
                    scrollToForm(faqFormRef.current);
                  }}
                  className="rounded-lg border border-[#dce4dc] px-3 py-1.5 text-xs font-medium text-[#385944]"
                >
                  Ubah
                </button>
                <button
                  type="button"
                  onClick={() =>
                    void persist({
                      ...content,
                      faqs: content.faqs.filter((item) => item.id !== faq.id),
                    })
                  }
                  className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-700"
                >
                  Hapus
                </button>
              </div>
            </article>
          ))}
        </div>
        )}
        <Pagination
          page={faqList.page}
          totalPages={faqList.totalPages}
          total={faqList.total}
          pageSize={FAQ_PAGE_SIZE}
          itemLabel={faqQuery ? "pertanyaan yang cocok" : "pertanyaan"}
          onPageChange={setFaqPage}
        />
      </>
    );
  }

  if (section === "media") {
    return (
      <>
        <PageHeading
          title="Pustaka Media"
          description="Unggah gambar atau PDF untuk digunakan pada konten situs. Maksimal ukuran file 10 MB."
        />
        {alerts}
        <form
          onSubmit={uploadFile}
          className="mb-7 flex flex-col gap-4 rounded-2xl border border-dashed border-[#b8c9b8] bg-white p-5 sm:flex-row sm:items-end sm:p-7"
        >
          <label className={`${labelClass} flex-1`}>
            Pilih gambar atau PDF
            <input
              required
              name="file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
              className={`${inputClass} file:mr-3 file:rounded-lg file:border-0 file:bg-[#edf3ec] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-[#385944]`}
            />
          </label>
          <button
            type="submit"
            disabled={uploading}
            className="h-[42px] rounded-xl bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
          >
            {uploading ? "Mengunggah..." : "Unggah file"}
          </button>
        </form>
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <SearchField
              value={mediaQuery}
              onChange={(value) => {
                setMediaQuery(value);
                setMediaPage(1);
              }}
              placeholder="Cari nama file"
              label="Cari media"
            />
            <div role="group" aria-label="Jenis file" className="flex gap-1 rounded-xl border border-[#dce4dc] bg-white p-1">
              {mediaTypeFilters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={mediaType === filter.id}
                  onClick={() => {
                    setMediaType(filter.id);
                    setMediaPage(1);
                  }}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    mediaType === filter.id
                      ? "bg-brand text-white"
                      : "text-[#526157] hover:bg-[#f5f8f5]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          {mediaLoading && media.length > 0 && <span className="text-xs text-[#87938a]">Memuat...</span>}
        </div>
        {mediaLoading && media.length === 0 ? (
          <MediaGridSkeleton />
        ) : media.length === 0 ? (
          debouncedMediaQuery || mediaType !== "all" ? (
            <NoResults
              query={debouncedMediaQuery || mediaTypeFilters.find((filter) => filter.id === mediaType)?.label || ""}
              itemLabel="file"
              onClear={() => {
                setMediaQuery("");
                setMediaType("all");
                setMediaPage(1);
              }}
            />
          ) : (
            <div className="rounded-2xl border border-[#e5ebe4] bg-white p-8 text-center text-sm text-[#87938a]">
              Belum ada media yang diunggah.
            </div>
          )
        ) : (
          <div
            aria-busy={mediaLoading}
            className={`grid gap-4 transition-opacity sm:grid-cols-2 xl:grid-cols-3 ${mediaLoading ? "opacity-60" : ""}`}
          >
            {media.map((file) => (
              <article
                key={file.name}
                className="overflow-hidden rounded-xl border border-[#e5ebe4] bg-white"
              >
                {imageFilePattern.test(file.name) ? (
                  <div className="relative h-40 bg-[#f3f5f2]">
                    <Image
                      src={file.url}
                      alt={file.name}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-40 items-center justify-center bg-[#f3f5f2] text-sm font-medium text-[#63816a]">
                    Dokumen PDF
                  </div>
                )}
                <div className="p-3">
                  <p className="truncate text-xs font-medium text-[#526157]" title={file.name}>
                    {file.name}
                  </p>
                  <p className="mt-1 text-[11px] text-[#9aa49c]">
                    {(file.size / 1024).toFixed(0)} KB
                    {file.updatedAt ? ` · ${formatDateTime(file.updatedAt)}` : ""}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => void copyUrl(file.url)}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#dce4dc] px-2.5 py-1.5 text-xs font-medium text-[#385944] transition hover:bg-[#f5f8f5]"
                    >
                      {copiedUrl === file.url ? (
                        <>
                          <Check size={13} aria-hidden="true" /> Tersalin
                        </>
                      ) : (
                        <>
                          <Copy size={13} aria-hidden="true" /> Salin URL
                        </>
                      )}
                    </button>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#dce4dc] px-2.5 py-1.5 text-xs font-medium text-[#385944] transition hover:bg-[#f5f8f5]"
                    >
                      <ExternalLink size={13} aria-hidden="true" /> Buka
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        <Pagination
          page={Math.min(mediaPage, Math.max(1, Math.ceil(mediaTotal / MEDIA_PAGE_SIZE)))}
          totalPages={Math.max(1, Math.ceil(mediaTotal / MEDIA_PAGE_SIZE))}
          total={mediaTotal}
          pageSize={MEDIA_PAGE_SIZE}
          itemLabel="file"
          onPageChange={setMediaPage}
        />
      </>
    );
  }

  const editingArticle = articleDraft.id !== "";
  const editingAgenda = agendaDraft.id !== "";
  const articleMonth = splitMonthLabel(articleDraft.date);
  const agendaTime = parseTimeRange(agendaDraft.time);
  const newsList = paginate(
    content.articles.filter((article) =>
      matchesQuery(
        newsQuery,
        article.title,
        article.category,
        article.tag,
        article.author,
        article.summary,
        article.date,
      ),
    ),
    newsPage,
    NEWS_PAGE_SIZE,
  );
  const agendaList = paginate(
    content.agenda.filter((agenda) =>
      matchesQuery(
        agendaQuery,
        agenda.title,
        agenda.location,
        agenda.tagLabel,
        agenda.time,
        `${agenda.day} ${agenda.month}`,
      ),
    ),
    agendaPage,
    AGENDA_PAGE_SIZE,
  );
  return (
    <>
      <PageHeading
        title="Berita & Agenda"
        description="Kelola kartu berita dan daftar agenda yang tampil di beranda."
      />
      {alerts}
      <div
        role="tablist"
        aria-label="Pilih jenis konten"
        className="mb-7 flex gap-2 border-b border-[#dfe7dd]"
      >
        {newsAgendaTabs.map((tab) => {
          const isActive = activeContentTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`admin-content-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`admin-content-panel-${tab.id}`}
              onClick={() => {
                setActiveContentTab(tab.id);
                // Simpan tab di URL supaya menu samping ikut menandai Berita / Agenda.
                const url = new URL(window.location.href);
                if (tab.id === "agenda") url.searchParams.set("tab", "agenda");
                else url.searchParams.delete("tab");
                window.history.replaceState(null, "", url);
              }}
              className={`-mb-px border-b-2 px-5 py-3 text-sm font-semibold transition ${
                isActive
                  ? "border-brand text-brand"
                  : "border-transparent text-[#78857b] hover:border-[#b8c9b8] hover:text-[#385944]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        id={`admin-content-panel-${activeContentTab}`}
        role="tabpanel"
        aria-labelledby={`admin-content-tab-${activeContentTab}`}
        tabIndex={0}
      >
      {activeContentTab === "news" && (
      <>
      <div className="mb-7 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,44%)]">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const { actionHref, ...article } = articleDraft;
          const nextArticle: Article = {
            ...article,
            ...(actionHref?.trim() ? { actionHref: actionHref.trim() } : {}),
            id: articleDraft.id || crypto.randomUUID(),
          };
          const articles = editingArticle
            ? content.articles.map((item) =>
                item.id === nextArticle.id ? nextArticle : item,
              )
            : [nextArticle, ...content.articles];
          if (await persist({ ...content, articles })) {
            articleFormDraft.markSaved();
            setArticleDraft(emptyArticle);
          }
        }}
        ref={articleFormRef}
        className="scroll-mt-24 space-y-4 rounded-2xl border border-[#e5ebe4] bg-white p-5 sm:p-7"
      >
        <h2 className="text-base font-semibold text-[#24392a]">
          {editingArticle ? "Ubah berita" : "Tambah berita"}
        </h2>
        <DraftNotice draft={articleFormDraft} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={`${labelClass} sm:col-span-2`}>
            Judul
            <input
              required
              maxLength={200}
              value={articleDraft.title}
              onChange={(event) =>
                setArticleDraft({ ...articleDraft, title: event.target.value })
              }
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Kategori
            <input
              required
              list="article-categories"
              autoComplete="off"
              value={articleDraft.category}
              onChange={(event) =>
                setArticleDraft({ ...articleDraft, category: event.target.value })
              }
              placeholder="Pilih atau ketik, mis. Riset Lapangan"
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Tag / wilayah
            <input
              required
              list="article-tags"
              autoComplete="off"
              value={articleDraft.tag}
              onChange={(event) =>
                setArticleDraft({ ...articleDraft, tag: event.target.value })
              }
              placeholder="mis. DAS Winongo"
              className={inputClass}
            />
          </label>
          <div className={labelClass}>
            Bulan terbit
            <div className="grid grid-cols-[minmax(0,1fr)_110px] gap-2">
              <select
                required
                aria-label="Bulan terbit"
                value={articleMonth.month}
                onChange={(event) =>
                  setArticleDraft({
                    ...articleDraft,
                    date: joinMonthLabel(event.target.value, articleMonth.year || String(currentYear)),
                  })
                }
                className={inputClass}
              >
                <option value="">Pilih bulan</option>
                {MONTHS.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                required
                aria-label="Tahun terbit"
                value={articleMonth.year}
                onChange={(event) =>
                  setArticleDraft({
                    ...articleDraft,
                    date: joinMonthLabel(articleMonth.month || MONTHS[new Date().getMonth()], event.target.value),
                  })
                }
                className={inputClass}
              >
                <option value="">Tahun</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <label className={labelClass}>
            Waktu baca (menit)
            <input
              required
              type="number"
              min={1}
              max={180}
              inputMode="numeric"
              value={readTimeToMinutes(articleDraft.readTime)}
              onChange={(event) =>
                setArticleDraft({ ...articleDraft, readTime: minutesToReadTime(event.target.value) })
              }
              placeholder="5"
              className={inputClass}
            />
          </label>
          <label className={`${labelClass} sm:col-span-2`}>
            Penulis
            <input
              required
              list="article-authors"
              autoComplete="off"
              value={articleDraft.author}
              onChange={(event) =>
                setArticleDraft({ ...articleDraft, author: event.target.value })
              }
              placeholder="Nama penulis atau tim"
              className={inputClass}
            />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_160px]">
          <div className="space-y-4">
            <label className={labelClass}>
              Gambar (URL)
              <input
                required
                value={articleDraft.image}
                onChange={(event) =>
                  setArticleDraft({ ...articleDraft, image: event.target.value })
                }
                pattern={LINK_PATTERN}
                title="Awali dengan / untuk file di situs, atau https:// untuk gambar dari luar"
                placeholder="https://… atau /pictures/nama-file.jpg"
                className={inputClass}
              />
            </label>
            {imageOptions.length > 0 && (
              <label className={labelClass}>
                Atau pilih dari pustaka media
                <select
                  value=""
                  onChange={(event) => {
                    if (event.target.value) {
                      setArticleDraft({ ...articleDraft, image: event.target.value });
                    }
                  }}
                  className={inputClass}
                >
                  <option value="">Pilih gambar</option>
                  {imageOptions.map((file) => (
                    <option key={file.name} value={file.url}>
                      {file.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
          <div className={labelClass}>
            Pratinjau
            <div className="relative mt-1.5 h-28 overflow-hidden rounded-xl border border-[#dce4dc] bg-[#f3f5f2]">
              {/^(\/(?!\/)|https?:\/\/.+)/.test(articleDraft.image) ? (
                <img src={articleDraft.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full items-center justify-center text-[11px] text-[#9aa49c]">
                  Belum ada gambar
                </span>
              )}
            </div>
          </div>
        </div>
        <label className={labelClass}>
          Ringkasan
          <textarea
            required
            rows={3}
            maxLength={500}
            value={articleDraft.summary}
            onChange={(event) =>
              setArticleDraft({ ...articleDraft, summary: event.target.value })
            }
            className={inputClass}
          />
          <CharacterCount value={articleDraft.summary} max={500} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Teks tombol
            <input
              required
              list="article-action-texts"
              autoComplete="off"
              maxLength={40}
              value={articleDraft.actionText}
              onChange={(event) =>
                setArticleDraft({ ...articleDraft, actionText: event.target.value })
              }
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Tautan artikel (opsional)
            <input
              value={articleDraft.actionHref ?? ""}
              onChange={(event) =>
                setArticleDraft({ ...articleDraft, actionHref: event.target.value })
              }
              pattern={LINK_PATTERN}
              title="Awali dengan / untuk halaman di situs, atau https:// untuk tautan luar"
              placeholder="/berita/judul-artikel"
              className={inputClass}
            />
          </label>
        </div>
        <Suggestions id="article-categories" values={suggestions(content.articles.map((item) => item.category))} />
        <Suggestions id="article-tags" values={suggestions(content.articles.map((item) => item.tag))} />
        <Suggestions id="article-authors" values={suggestions(content.articles.map((item) => item.author))} />
        <Suggestions
          id="article-action-texts"
          values={suggestions(content.articles.map((item) => item.actionText), ["Baca Selengkapnya", "Baca Artikel", "Baca Abstrak"])}
        />
        <div className="flex flex-wrap justify-end gap-2">
          <DraftStatus draft={articleFormDraft} />
          {editingArticle && (
            <button
              type="button"
              onClick={() => setArticleDraft(emptyArticle)}
              className="rounded-xl border border-[#dce4dc] px-4 py-2.5 text-sm text-[#526157]"
            >
              Batal
            </button>
          )}
          <SaveButton saving={saving} />
        </div>
      </form>
      <ArticlePreview article={articleDraft} />
      </div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-[#24392a]">Daftar berita</h2>
        <SearchField
          value={newsQuery}
          onChange={(value) => {
            setNewsQuery(value);
            setNewsPage(1);
          }}
          placeholder="Cari judul, kategori, penulis, atau tag"
          label="Cari berita"
        />
      </div>
      {content.articles.length === 0 ? (
        <div className="rounded-2xl border border-[#e5ebe4] bg-white p-8 text-center text-sm text-[#87938a]">
          Belum ada berita.
        </div>
      ) : newsList.total === 0 ? (
        <NoResults
          query={newsQuery}
          itemLabel="berita"
          onClear={() => {
            setNewsQuery("");
            setNewsPage(1);
          }}
        />
      ) : (
      <div className="space-y-3">
        {newsList.pageItems.map((article) => (
          <article
            key={article.id}
            className="flex flex-col gap-3 rounded-xl border border-[#e5ebe4] bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium text-[#293b2e]">{article.title}</p>
              <p className="mt-1 text-xs text-[#87938a]">
                {article.category} · {article.date}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setArticleDraft(article);
                  scrollToForm(articleFormRef.current);
                }}
                className="rounded-lg border border-[#dce4dc] px-3 py-1.5 text-xs font-medium text-[#385944]"
              >
                Ubah
              </button>
              <button
                type="button"
                onClick={() =>
                  void persist({
                    ...content,
                    articles: content.articles.filter((item) => item.id !== article.id),
                  })
                }
                className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-700"
              >
                Hapus
              </button>
            </div>
          </article>
        ))}
      </div>
      )}
      <Pagination
        page={newsList.page}
        totalPages={newsList.totalPages}
        total={newsList.total}
        pageSize={NEWS_PAGE_SIZE}
        itemLabel={newsQuery ? "berita yang cocok" : "berita"}
        onPageChange={setNewsPage}
      />
      </>
      )}
      {activeContentTab === "agenda" && (
      <>
      <div className="mb-7 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,44%)]">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const nextAgenda = { ...agendaDraft, id: agendaDraft.id || crypto.randomUUID() };
          const agenda = editingAgenda
            ? content.agenda.map((item) =>
                item.id === nextAgenda.id ? nextAgenda : item,
              )
            : [...content.agenda, nextAgenda];
          if (await persist({ ...content, agenda })) {
            agendaFormDraft.markSaved();
            setAgendaDraft(emptyAgenda);
          }
        }}
        ref={agendaFormRef}
        className="scroll-mt-24 space-y-4 rounded-2xl border border-[#e5ebe4] bg-white p-5 sm:p-7"
      >
        <h2 className="text-base font-semibold text-[#24392a]">
          {editingAgenda ? "Ubah agenda" : "Tambah agenda"}
        </h2>
        <DraftNotice draft={agendaFormDraft} />
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={`${labelClass} sm:col-span-2`}>
            Nama kegiatan
            <input
              required
              maxLength={200}
              value={agendaDraft.title}
              onChange={(event) =>
                setAgendaDraft({ ...agendaDraft, title: event.target.value })
              }
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Tanggal
            <input
              required
              type="date"
              value={agendaToDateInput(agendaDraft.month, agendaDraft.day)}
              onChange={(event) =>
                setAgendaDraft({ ...agendaDraft, ...dateInputToAgenda(event.target.value) })
              }
              className={inputClass}
            />
          </label>
          <fieldset className="min-w-0">
            <legend className={labelClass}>Jam</legend>
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_82px] items-center gap-2">
              <input
                required
                type="time"
                aria-label="Jam mulai"
                value={agendaTime.start}
                onChange={(event) =>
                  setAgendaDraft({
                    ...agendaDraft,
                    time: formatTimeRange(event.target.value, agendaTime.end, agendaTime.zone),
                  })
                }
                className={inputClass}
              />
              <span className="mt-1.5 text-sm text-[#87938a]" aria-hidden="true">–</span>
              <input
                type="time"
                aria-label="Jam selesai (opsional)"
                min={agendaTime.start || undefined}
                value={agendaTime.end}
                onChange={(event) =>
                  setAgendaDraft({
                    ...agendaDraft,
                    time: formatTimeRange(agendaTime.start, event.target.value, agendaTime.zone),
                  })
                }
                className={inputClass}
              />
              <select
                aria-label="Zona waktu"
                value={agendaTime.zone}
                onChange={(event) =>
                  setAgendaDraft({
                    ...agendaDraft,
                    time: formatTimeRange(agendaTime.start, agendaTime.end, event.target.value),
                  })
                }
                className={inputClass}
              >
                {TIME_ZONES.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <label className={`${labelClass} sm:col-span-2`}>
            Lokasi
            <input
              required
              list="agenda-locations"
              autoComplete="off"
              value={agendaDraft.location}
              onChange={(event) =>
                setAgendaDraft({ ...agendaDraft, location: event.target.value })
              }
              placeholder="Gedung, kampus, atau tautan acara daring"
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Kategori kegiatan
            <input
              required
              list="agenda-categories"
              autoComplete="off"
              value={agendaDraft.tagLabel}
              onChange={(event) =>
                setAgendaDraft({ ...agendaDraft, tagLabel: event.target.value })
              }
              placeholder="mis. Forum Publik"
              className={inputClass}
            />
          </label>
          <div className={labelClass}>
            Warna label
            <div className="flex items-center gap-3">
              <select
                aria-label="Warna label"
                value={agendaDraft.tagColor}
                onChange={(event) =>
                  setAgendaDraft({
                    ...agendaDraft,
                    tagColor: event.target.value as AgendaItem["tagColor"],
                  })
                }
                className={inputClass}
              >
                {tagColorOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="mt-1.5 shrink-0">
                <StatusBadge label={agendaDraft.tagLabel || "Contoh"} color={agendaDraft.tagColor} />
              </span>
            </div>
          </div>
          <label className={labelClass}>
            Teks tombol
            <input
              required
              list="agenda-buttons"
              autoComplete="off"
              maxLength={40}
              value={agendaDraft.buttonText}
              onChange={(event) =>
                setAgendaDraft({ ...agendaDraft, buttonText: event.target.value })
              }
              className={inputClass}
            />
          </label>
        </div>
        <Suggestions id="agenda-locations" values={suggestions(content.agenda.map((item) => item.location))} />
        <Suggestions id="agenda-categories" values={suggestions(content.agenda.map((item) => item.tagLabel))} />
        <Suggestions
          id="agenda-buttons"
          values={suggestions(content.agenda.map((item) => item.buttonText), ["Daftar Gratis", "Ajukan Kehadiran", "Informasi"])}
        />
        <div className="flex flex-wrap justify-end gap-2">
          <DraftStatus draft={agendaFormDraft} />
          {editingAgenda && (
            <button
              type="button"
              onClick={() => setAgendaDraft(emptyAgenda)}
              className="rounded-xl border border-[#dce4dc] px-4 py-2.5 text-sm text-[#526157]"
            >
              Batal
            </button>
          )}
          <SaveButton saving={saving} />
        </div>
      </form>
      <AgendaPreview item={agendaDraft} />
      </div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-[#24392a]">Daftar agenda</h2>
        <SearchField
          value={agendaQuery}
          onChange={(value) => {
            setAgendaQuery(value);
            setAgendaPage(1);
          }}
          placeholder="Cari kegiatan, lokasi, atau kategori"
          label="Cari agenda"
        />
      </div>
      {content.agenda.length === 0 ? (
        <div className="rounded-2xl border border-[#e5ebe4] bg-white p-8 text-center text-sm text-[#87938a]">
          Belum ada agenda.
        </div>
      ) : agendaList.total === 0 ? (
        <NoResults
          query={agendaQuery}
          itemLabel="agenda"
          onClear={() => {
            setAgendaQuery("");
            setAgendaPage(1);
          }}
        />
      ) : (
      <div className="space-y-3">
        {agendaList.pageItems.map((agenda) => (
          <article
            key={agenda.id}
            className="flex flex-col gap-3 rounded-xl border border-[#e5ebe4] bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-medium text-[#293b2e]">{agenda.title}</p>
              <p className="mt-1 text-xs text-[#87938a]">
                {agenda.month} {agenda.day} · {agenda.location}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setAgendaDraft(agenda);
                  scrollToForm(agendaFormRef.current);
                }}
                className="rounded-lg border border-[#dce4dc] px-3 py-1.5 text-xs font-medium text-[#385944]"
              >
                Ubah
              </button>
              <button
                type="button"
                onClick={() =>
                  void persist({
                    ...content,
                    agenda: content.agenda.filter((item) => item.id !== agenda.id),
                  })
                }
                className="rounded-lg border border-red-100 px-3 py-1.5 text-xs font-medium text-red-700"
              >
                Hapus
              </button>
            </div>
          </article>
        ))}
      </div>
      )}
      <Pagination
        page={agendaList.page}
        totalPages={agendaList.totalPages}
        total={agendaList.total}
        pageSize={AGENDA_PAGE_SIZE}
        itemLabel={agendaQuery ? "agenda yang cocok" : "agenda"}
        onPageChange={setAgendaPage}
      />
      </>
      )}
      </div>
    </>
  );
}
