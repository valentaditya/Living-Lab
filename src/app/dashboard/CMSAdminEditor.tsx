"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import type { AgendaItem } from "@/types/agenda";
import type { Article } from "@/types/article";
import type { CMSContent, FAQItem } from "@/lib/cms-content";
import type { ActivityLogEntry } from "@/lib/activity-log";

type Section = "homepage" | "news" | "faq" | "media" | "logs";
type MediaFile = { name: string; url: string; size: number; updatedAt?: string };

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
  actionHref: "#",
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
  return (
    <button
      type="submit"
      disabled={saving}
      className="rounded-xl bg-[#315b3d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#274b32] disabled:opacity-60"
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
  const [uploading, setUploading] = useState(false);

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

  async function loadMedia() {
    try {
      const response = await fetch("/api/admin/media");
      if (!response.ok) throw new Error("Gagal memuat pustaka media.");
      setMedia((await response.json()) as MediaFile[]);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Gagal memuat pustaka media.",
      );
    }
  }

  async function loadLogs() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/logs");
      if (!response.ok) throw new Error("Gagal memuat log aktivitas.");
      setLogs((await response.json()) as ActivityLogEntry[]);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Gagal memuat log aktivitas.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (section === "logs") {
      void loadLogs();
    } else {
      void loadContent();
      if (section === "media" || section === "news") void loadMedia();
    }
    // Load the selected section once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      await loadMedia();
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload gagal.",
      );
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-[#718076]">Memuat konten...</p>;
  }

  if (error && (section === "logs" || !content)) {
    return (
      <div>
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
        <button
          type="button"
          onClick={() =>
            section === "logs" ? void loadLogs() : void loadContent()
          }
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
    return (
      <>
        <PageHeading
          title="Log Aktivitas"
          description="Riwayat login, logout, perubahan konten, dan unggahan media terbaru."
        />
        {alerts}
        {logs.length === 0 ? (
          <div className="rounded-2xl border border-[#e5ebe4] bg-white p-8 text-center text-sm text-[#87938a]">
            Belum ada aktivitas yang tercatat.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-[#e5ebe4] bg-white">
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
                  <time
                    dateTime={entry.createdAt}
                    className="text-xs text-[#87938a]"
                  >
                    {new Date(entry.createdAt).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </time>
                  <span className="text-sm font-medium text-[#315b3d]">
                    {entry.action}
                  </span>
                  <span className="text-sm leading-5 text-[#68766d]">
                    {entry.detail}
                  </span>
                </article>
              ))}
            </div>
          </div>
        )}
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
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void persist(content);
          }}
          className="space-y-5 rounded-2xl border border-[#e5ebe4] bg-white p-5 sm:p-7"
        >
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
          </label>
          <div className="flex justify-end">
            <SaveButton saving={saving} />
          </div>
        </form>
      </>
    );
  }

  if (section === "faq") {
    const editing = faqDraft.id !== "";
    return (
      <>
        <PageHeading
          title="Pertanyaan & Jawaban"
          description="Tambah, ubah, atau hapus FAQ yang tampil di halaman pertanyaan."
        />
        {alerts}
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const nextFAQ = { ...faqDraft, id: faqDraft.id || crypto.randomUUID() };
            const faqs = editing
              ? content.faqs.map((faq) => (faq.id === nextFAQ.id ? nextFAQ : faq))
              : [...content.faqs, nextFAQ];
            if (await persist({ ...content, faqs })) setFaqDraft(emptyFAQ);
          }}
          className="mb-7 space-y-4 rounded-2xl border border-[#e5ebe4] bg-white p-5 sm:p-7"
        >
          <h2 className="text-base font-semibold text-[#24392a]">
            {editing ? "Ubah pertanyaan" : "Tambah pertanyaan"}
          </h2>
          <label className={labelClass}>
            Pertanyaan
            <input
              required
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
              placeholder="Contoh: Data & Akses"
              className={inputClass}
            />
          </label>
          <div className="flex justify-end gap-2">
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
        <div className="space-y-3">
          {content.faqs.map((faq) => (
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
                  onClick={() => setFaqDraft(faq)}
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
            className="h-[42px] rounded-xl bg-[#315b3d] px-5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {uploading ? "Mengunggah..." : "Unggah file"}
          </button>
        </form>
        {media.length === 0 ? (
          <div className="rounded-2xl border border-[#e5ebe4] bg-white p-8 text-center text-sm text-[#87938a]">
            Belum ada media yang diunggah.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {media.map((file) => (
              <article
                key={file.name}
                className="overflow-hidden rounded-xl border border-[#e5ebe4] bg-white"
              >
                {/\.(jpe?g|png|webp|gif)$/i.test(file.name) ? (
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
                  <p className="truncate text-xs font-medium text-[#526157]">
                    {file.name}
                  </p>
                  <p className="mt-1 text-[10px] text-[#9aa49c]">
                    {(file.size / 1024).toFixed(0)} KB · {file.url}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </>
    );
  }

  const editingArticle = articleDraft.id !== "";
  const editingAgenda = agendaDraft.id !== "";
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
              onClick={() => setActiveContentTab(tab.id)}
              className={`-mb-px border-b-2 px-5 py-3 text-sm font-semibold transition ${
                isActive
                  ? "border-[#315b3d] text-[#315b3d]"
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
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const nextArticle = {
            ...articleDraft,
            id: articleDraft.id || crypto.randomUUID(),
          };
          const articles = editingArticle
            ? content.articles.map((item) =>
                item.id === nextArticle.id ? nextArticle : item,
              )
            : [nextArticle, ...content.articles];
          if (await persist({ ...content, articles })) {
            setArticleDraft(emptyArticle);
          }
        }}
        className="mb-7 space-y-4 rounded-2xl border border-[#e5ebe4] bg-white p-5 sm:p-7"
      >
        <h2 className="text-base font-semibold text-[#24392a]">
          {editingArticle ? "Ubah berita" : "Tambah berita"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Judul
            <input
              required
              value={articleDraft.title}
              onChange={(event) =>
                setArticleDraft({ ...articleDraft, title: event.target.value })
              }
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Gambar (URL media)
            <input
              required
              value={articleDraft.image}
              onChange={(event) =>
                setArticleDraft({ ...articleDraft, image: event.target.value })
              }
              placeholder="/uploads/nama-file.jpg"
              className={inputClass}
            />
          </label>
          {media.some((file) => /\.(jpe?g|png|webp|gif)$/i.test(file.name)) && (
            <label className={labelClass}>
              Atau pilih gambar dari pustaka media
              <select
                value=""
                onChange={(event) => {
                  if (event.target.value) {
                    setArticleDraft({
                      ...articleDraft,
                      image: event.target.value,
                    });
                  }
                }}
                className={inputClass}
              >
                <option value="">Pilih gambar</option>
                {media
                  .filter((file) => /\.(jpe?g|png|webp|gif)$/i.test(file.name))
                  .map((file) => (
                    <option key={file.name} value={file.url}>
                      {file.name}
                    </option>
                  ))}
              </select>
            </label>
          )}
          <label className={labelClass}>
            Kategori
            <input
              required
              value={articleDraft.category}
              onChange={(event) =>
                setArticleDraft({ ...articleDraft, category: event.target.value })
              }
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Tanggal
            <input
              required
              value={articleDraft.date}
              onChange={(event) =>
                setArticleDraft({ ...articleDraft, date: event.target.value })
              }
              placeholder="Okt 2026"
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Tag / wilayah
            <input
              required
              value={articleDraft.tag}
              onChange={(event) =>
                setArticleDraft({ ...articleDraft, tag: event.target.value })
              }
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Penulis
            <input
              required
              value={articleDraft.author}
              onChange={(event) =>
                setArticleDraft({ ...articleDraft, author: event.target.value })
              }
              className={inputClass}
            />
          </label>
        </div>
        <label className={labelClass}>
          Ringkasan
          <textarea
            required
            rows={3}
            value={articleDraft.summary}
            onChange={(event) =>
              setArticleDraft({ ...articleDraft, summary: event.target.value })
            }
            className={inputClass}
          />
        </label>
        <div className="flex justify-end gap-2">
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
      <div className="mb-10 space-y-3">
        {content.articles.map((article) => (
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
                onClick={() => setArticleDraft(article)}
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
      </>
      )}
      {activeContentTab === "agenda" && (
      <>
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
            setAgendaDraft(emptyAgenda);
          }
        }}
        className="space-y-4 rounded-2xl border border-[#e5ebe4] bg-white p-5 sm:p-7"
      >
        <h2 className="text-base font-semibold text-[#24392a]">
          {editingAgenda ? "Ubah agenda" : "Tambah agenda"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            Nama kegiatan
            <input
              required
              value={agendaDraft.title}
              onChange={(event) =>
                setAgendaDraft({ ...agendaDraft, title: event.target.value })
              }
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Lokasi
            <input
              required
              value={agendaDraft.location}
              onChange={(event) =>
                setAgendaDraft({ ...agendaDraft, location: event.target.value })
              }
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Bulan (3 huruf)
            <input
              required
              maxLength={3}
              value={agendaDraft.month}
              onChange={(event) =>
                setAgendaDraft({ ...agendaDraft, month: event.target.value.toUpperCase() })
              }
              placeholder="NOV"
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Tanggal
            <input
              required
              value={agendaDraft.day}
              onChange={(event) =>
                setAgendaDraft({ ...agendaDraft, day: event.target.value })
              }
              placeholder="28"
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Kategori kegiatan
            <input
              required
              value={agendaDraft.tagLabel}
              onChange={(event) =>
                setAgendaDraft({ ...agendaDraft, tagLabel: event.target.value })
              }
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Waktu
            <input
              required
              value={agendaDraft.time}
              onChange={(event) =>
                setAgendaDraft({ ...agendaDraft, time: event.target.value })
              }
              placeholder="09:00 - 13:00 WIB"
              className={inputClass}
            />
          </label>
        </div>
        <div className="flex justify-end gap-2">
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
      <div className="mt-4 space-y-3">
        {content.agenda.map((agenda) => (
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
                onClick={() => setAgendaDraft(agenda)}
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
      </>
      )}
      </div>
    </>
  );
}
