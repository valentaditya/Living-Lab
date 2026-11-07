/**
 * Skema konten yang bisa dikelola dari dashboard. Satu sumber untuk:
 * - form di dashboard (jenis input per field),
 * - validasi di server,
 * - halaman publik yang membaca data dari Supabase.
 *
 * "Koleksi" = daftar item (tim, kisah, jurnal, ...); disimpan di tabel content_entries.
 * "Blok" = satu set isian (kontak, visi); disimpan di tabel site_blocks.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "longtext"
  | "number"
  | "select"
  | "image"
  | "file"
  | "list"
  | "monthYear"
  | "slug";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  /** Panjang maksimum teks (default: 200 untuk text, 2000 textarea, 20000 longtext). */
  max?: number;
  options?: string[];
  placeholder?: string;
  help?: string;
  /** Untuk number. */
  min?: number;
  maxNumber?: number;
  /** Lebar penuh di form dua kolom. */
  wide?: boolean;
  /** Untuk slug: field sumber yang diubah menjadi slug otomatis. */
  from?: string;
}

export interface CollectionDef {
  key: string;
  /** Nama di menu dan judul halaman dashboard. */
  label: string;
  /** Nama satu item, mis. "anggota tim". */
  singular: string;
  description: string;
  /** Field yang tampil sebagai judul baris di daftar dashboard. */
  titleField: string;
  subtitleFields: string[];
  fields: FieldDef[];
  /** Halaman publik yang menampilkan koleksi ini. */
  publicPath: string;
  /** Catatan tambahan di atas daftar, mis. "Item pertama tampil sebagai sorotan". */
  note?: string;
  maxItems?: number;
}

export interface BlockDef {
  key: string;
  label: string;
  description: string;
  fields: FieldDef[];
  publicPath: string;
}

export type ContentItem = { id: string } & Record<string, string | string[] | number | null>;
export type BlockData = Record<string, string>;

const MONTH_HELP = "Ditampilkan sebagai mis. \"Okt 2026\".";

export const STAT_ICONS = ["Folder", "Komunitas", "Sungai", "Data", "Sensor", "Dokumen", "Relawan", "Lokasi"];

export const COLLECTIONS: CollectionDef[] = [
  {
    key: "team",
    label: "Tim Kami",
    singular: "anggota tim",
    description: "Akademisi dan tokoh komunitas yang tampil di halaman Tim Kami.",
    titleField: "name",
    subtitleFields: ["role", "group"],
    publicPath: "/tentang/tim",
    fields: [
      { key: "name", label: "Nama lengkap", type: "text", required: true, max: 120, wide: true },
      { key: "role", label: "Peran di tim", type: "text", required: true, max: 80, placeholder: "Koordinator Lapangan" },
      { key: "group", label: "Kelompok", type: "select", required: true, options: ["Akademisi UAJY", "Akar Rumput", "Mitra"], help: "Dipakai untuk filter di halaman Tim." },
      { key: "badge", label: "Label foto", type: "text", required: true, max: 40, placeholder: "Lab Code" },
      { key: "icon", label: "Ikon (emoji)", type: "text", max: 4, placeholder: "💧" },
      { key: "title", label: "Jabatan & afiliasi", type: "text", required: true, max: 160, wide: true, placeholder: "Dosen Teknik Lingkungan UAJY • Spesialis Hidrologi" },
      { key: "image", label: "Foto", type: "image", required: true, wide: true },
      { key: "quote", label: "Kutipan", type: "textarea", required: true, max: 300, wide: true },
      { key: "focusValue", label: "Fokus utama", type: "text", required: true, max: 120, wide: true },
    ],
  },
  {
    key: "stories",
    label: "Kisah Sungai",
    singular: "kisah",
    description: "Cerita warga, catatan lapangan, esai foto, dan dokumenter.",
    titleField: "title",
    subtitleFields: ["category", "date"],
    publicPath: "/kisah-sungai",
    note: "Kisah paling atas tampil sebagai sorotan di halaman Kisah Sungai.",
    fields: [
      { key: "title", label: "Judul", type: "text", required: true, max: 200, wide: true },
      { key: "slug", label: "Alamat (slug)", type: "slug", required: true, from: "title", max: 120, wide: true, help: "Bagian akhir URL: /kisah-sungai/slug. Terisi otomatis dari judul." },
      { key: "category", label: "Kategori", type: "select", required: true, options: ["People of the River", "Community Stories", "Field Notes", "Photo Essay", "River Stories", "Mini Documentary"] },
      { key: "date", label: "Bulan terbit", type: "monthYear", required: true, help: MONTH_HELP },
      { key: "authorOrFigure", label: "Penulis atau tokoh", type: "text", required: true, max: 160 },
      { key: "location", label: "Lokasi", type: "text", required: true, max: 120 },
      { key: "readTimeOrMedia", label: "Durasi / format", type: "text", required: true, max: 40, placeholder: "6 Menit Baca / 12 Foto / 15 Menit Tonton" },
      { key: "abstract", label: "Ringkasan", type: "textarea", required: true, max: 500, wide: true },
      { key: "body", label: "Isi cerita", type: "longtext", max: 20000, wide: true, help: "Pisahkan paragraf dengan baris kosong. Awali baris dengan ## untuk subjudul." },
    ],
  },
  {
    key: "publications",
    label: "Jurnal & Publikasi",
    singular: "publikasi",
    description: "Jurnal, policy brief, dan artikel ilmiah di Pusat Pengetahuan.",
    titleField: "title",
    subtitleFields: ["type", "date"],
    publicPath: "/pengetahuan/jurnal",
    note: "Publikasi paling atas tampil sebagai sorotan.",
    fields: [
      { key: "title", label: "Judul", type: "text", required: true, max: 250, wide: true },
      { key: "type", label: "Jenis", type: "select", required: true, options: ["Jurnal Riset", "Policy Brief", "Artikel Ilmiah"] },
      { key: "date", label: "Bulan terbit", type: "monthYear", required: true, help: MONTH_HELP },
      { key: "authors", label: "Penulis", type: "list", required: true, help: "Satu nama per baris.", wide: true },
      { key: "institution", label: "Institusi", type: "text", required: true, max: 160, wide: true },
      { key: "abstract", label: "Abstrak", type: "textarea", required: true, max: 1500, wide: true },
      { key: "doi", label: "DOI", type: "text", max: 120, placeholder: "10.1234/abcd.2026" },
      { key: "fileSize", label: "Ukuran file", type: "text", max: 20, placeholder: "2.4 MB" },
      { key: "downloadUrl", label: "File / tautan unduhan", type: "file", wide: true },
    ],
  },
  {
    key: "datasets",
    label: "Data Kualitas Air",
    singular: "dataset",
    description: "Dataset uji laboratorium, pemantauan lapangan, dan peta.",
    titleField: "title",
    subtitleFields: ["category", "date"],
    publicPath: "/pengetahuan/data",
    note: "Dataset paling atas tampil sebagai sorotan.",
    fields: [
      { key: "title", label: "Judul", type: "text", required: true, max: 250, wide: true },
      { key: "category", label: "Kategori", type: "select", required: true, options: ["Uji Laboratorium", "Pemantauan Lapangan", "Peta & Spasial"] },
      { key: "date", label: "Periode / bulan", type: "monthYear", required: true, help: MONTH_HELP },
      { key: "location", label: "Lokasi", type: "text", required: true, max: 160 },
      { key: "institution", label: "Institusi", type: "text", required: true, max: 160 },
      { key: "description", label: "Deskripsi", type: "textarea", required: true, max: 1000, wide: true },
      { key: "format", label: "Format", type: "select", required: true, options: ["Excel (XLSX)", "CSV / Excel", "GeoJSON / Peta"] },
      { key: "fileSize", label: "Ukuran file", type: "text", max: 20, placeholder: "2.4 MB" },
      { key: "downloadUrl", label: "File / tautan unduhan", type: "file", wide: true },
    ],
  },
  {
    key: "modules",
    label: "Modul Edukasi",
    singular: "modul",
    description: "Panduan praktik, buku saku, dan infografis.",
    titleField: "title",
    subtitleFields: ["category", "date"],
    publicPath: "/pengetahuan/modul",
    note: "Modul paling atas tampil sebagai sorotan.",
    fields: [
      { key: "title", label: "Judul", type: "text", required: true, max: 250, wide: true },
      { key: "category", label: "Kategori", type: "select", required: true, options: ["Panduan Praktik", "Buku Saku", "Infografis"] },
      { key: "date", label: "Bulan terbit", type: "monthYear", required: true, help: MONTH_HELP },
      { key: "authors", label: "Penyusun", type: "list", required: true, help: "Satu nama per baris.", wide: true },
      { key: "audience", label: "Sasaran pembaca", type: "text", required: true, max: 160, wide: true },
      { key: "description", label: "Deskripsi", type: "textarea", required: true, max: 1000, wide: true },
      { key: "highlights", label: "Poin cakupan", type: "list", help: "Satu poin per baris.", wide: true },
      { key: "pages", label: "Jumlah halaman", type: "text", max: 30, placeholder: "36 Halaman" },
      { key: "fileSize", label: "Ukuran file", type: "text", max: 20, placeholder: "4.1 MB" },
      { key: "downloadUrl", label: "File / tautan unduhan", type: "file", wide: true },
    ],
  },
  {
    key: "roadmap",
    label: "Roadmap",
    singular: "fase",
    description: "Fase pelaksanaan di halaman Roadmap, urut dari yang paling awal.",
    titleField: "phaseTag",
    subtitleFields: ["year", "status"],
    publicPath: "/tentang/roadmap",
    fields: [
      { key: "phaseTag", label: "Nama fase", type: "text", required: true, max: 80, placeholder: "Fase 1: Inisiasi & Baseline", wide: true },
      { key: "year", label: "Tahun", type: "text", required: true, max: 12, placeholder: "2024" },
      { key: "status", label: "Status", type: "select", required: true, options: ["Fase Selesai", "Sedang Berjalan", "Rencana Mendatang", "Visi Masa Depan"] },
      { key: "dateRange", label: "Rentang waktu", type: "text", required: true, max: 60, placeholder: "Q1 2024 — Q4 2024", wide: true },
      { key: "title", label: "Judul", type: "text", required: true, max: 200, wide: true },
      { key: "desc", label: "Deskripsi", type: "textarea", required: true, max: 1500, wide: true },
      { key: "tags", label: "Label", type: "list", help: "Satu label per baris.", wide: true },
      { key: "outputName", label: "Output kunci", type: "text", max: 160, wide: true },
      { key: "outputDesc", label: "Deskripsi output", type: "textarea", max: 600, wide: true },
      { key: "outputFooter", label: "Catatan output", type: "text", max: 120, wide: true },
      { key: "progressLabel", label: "Label progres (opsional)", type: "text", max: 120, placeholder: "Target instalasi sensor (24 unit)", wide: true },
      { key: "progressValue", label: "Teks progres", type: "text", max: 60, placeholder: "16 / 24 terpasang" },
      { key: "progressPercent", label: "Progres (%)", type: "number", min: 0, maxNumber: 100 },
    ],
  },
  {
    key: "missions",
    label: "Misi",
    singular: "misi",
    description: "Daftar misi strategis di halaman Visi & Misi. Nomor mengikuti urutan.",
    titleField: "title",
    subtitleFields: [],
    publicPath: "/tentang/visi-misi",
    maxItems: 12,
    fields: [
      { key: "title", label: "Judul misi", type: "text", required: true, max: 160, wide: true },
      { key: "desc", label: "Deskripsi", type: "textarea", required: true, max: 1200, wide: true },
      { key: "tags", label: "Label", type: "list", help: "Satu label per baris.", wide: true },
    ],
  },
  {
    key: "targets",
    label: "Target Capaian",
    singular: "target",
    description: "Angka target di halaman Visi & Misi.",
    titleField: "label",
    subtitleFields: ["value"],
    publicPath: "/tentang/visi-misi",
    maxItems: 8,
    fields: [
      { key: "value", label: "Angka", type: "text", required: true, max: 20, placeholder: "1.200+" },
      { key: "label", label: "Label", type: "text", required: true, max: 60, placeholder: "Relawan Sains Warga" },
      { key: "desc", label: "Keterangan singkat", type: "text", required: true, max: 60, placeholder: "Warga Terlatih" },
      { key: "sub", label: "Penjelasan", type: "textarea", required: true, max: 300, wide: true },
    ],
  },
  {
    key: "partners",
    label: "Mitra & Komunitas",
    singular: "mitra",
    description: "Lembaga mitra dan jejaring komunitas di halaman Kolaborasi.",
    titleField: "name",
    subtitleFields: ["kind"],
    publicPath: "/kolaborasi",
    fields: [
      { key: "name", label: "Nama", type: "text", required: true, max: 120, wide: true },
      { key: "kind", label: "Jenis", type: "select", required: true, options: ["Lembaga", "Komunitas"], help: "Lembaga tampil sebagai kotak logo; komunitas sebagai daftar nama." },
      { key: "logo", label: "Logo (opsional)", type: "image", wide: true, help: "Tanpa logo, nama lembaga yang ditampilkan." },
    ],
  },
  {
    key: "stats",
    label: "Statistik Beranda",
    singular: "statistik",
    description: "Kartu angka di bawah video beranda.",
    titleField: "title",
    subtitleFields: ["value"],
    publicPath: "/",
    maxItems: 8,
    fields: [
      { key: "value", label: "Angka", type: "text", required: true, max: 12, placeholder: "45+", help: "Angka dihitung naik dari 0; akhiran seperti + tetap tampil." },
      { key: "title", label: "Label", type: "text", required: true, max: 60 },
      { key: "icon", label: "Ikon", type: "select", required: true, options: STAT_ICONS },
      { key: "description", label: "Keterangan (muncul saat kursor diarahkan)", type: "textarea", max: 200, wide: true },
    ],
  },
];

export const BLOCKS: BlockDef[] = [
  {
    key: "contact",
    label: "Kontak & Sekretariat",
    description: "Dipakai di footer semua halaman dan di halaman Kolaborasi.",
    publicPath: "/kolaborasi",
    fields: [
      { key: "email", label: "Email sekretariat", type: "text", required: true, max: 120, placeholder: "sekretariat@livinglabsungai.ac.id" },
      { key: "phone", label: "Telepon", type: "text", required: true, max: 40, placeholder: "+62 (274) 487711" },
      { key: "hours", label: "Jam layanan", type: "text", max: 60, placeholder: "08:30 - 16:00 WIB" },
      { key: "address", label: "Alamat", type: "textarea", required: true, max: 400, wide: true },
    ],
  },
  {
    key: "vision",
    label: "Visi",
    description: "Pernyataan visi dan tiga angka ringkas di bagian atas halaman Visi & Misi.",
    publicPath: "/tentang/visi-misi",
    fields: [
      { key: "label", label: "Label kecil", type: "text", required: true, max: 60, placeholder: "Visi Kolektif 2030" },
      { key: "statement", label: "Pernyataan visi", type: "textarea", required: true, max: 300, wide: true },
      { key: "description", label: "Penjelasan", type: "textarea", required: true, max: 600, wide: true },
      { key: "metric1Label", label: "Angka 1: label", type: "text", max: 40 },
      { key: "metric1Value", label: "Angka 1: nilai", type: "text", max: 40 },
      { key: "metric1Note", label: "Angka 1: keterangan", type: "text", max: 80, wide: true },
      { key: "metric2Label", label: "Angka 2: label", type: "text", max: 40 },
      { key: "metric2Value", label: "Angka 2: nilai", type: "text", max: 40 },
      { key: "metric2Note", label: "Angka 2: keterangan", type: "text", max: 80, wide: true },
      { key: "metric3Label", label: "Angka 3: label", type: "text", max: 40 },
      { key: "metric3Value", label: "Angka 3: nilai", type: "text", max: 40 },
      { key: "metric3Note", label: "Angka 3: keterangan", type: "text", max: 80, wide: true },
      { key: "footnote", label: "Catatan penutup", type: "text", max: 160, wide: true },
    ],
  },
];

export function getCollectionDef(key: string) {
  return COLLECTIONS.find((collection) => collection.key === key);
}

export function getBlockDef(key: string) {
  return BLOCKS.find((block) => block.key === key);
}

/** "Bank Sampah: Kisah Warga" → "bank-sampah-kisah-warga" */
export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120)
    .replace(/-+$/, "");
}

const LINK = /^(\/(?!\/)|https?:\/\/)/;
const defaultMax: Partial<Record<FieldType, number>> = { text: 200, textarea: 2000, longtext: 20000 };

/** Validasi + normalisasi nilai satu field. Mengembalikan pesan error atau nilai bersih. */
function cleanField(field: FieldDef, raw: unknown): { error: string } | { value: string | string[] | number | null } {
  const label = field.label;
  if (field.type === "list") {
    const list = (Array.isArray(raw) ? raw : typeof raw === "string" ? raw.split("\n") : [])
      .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
      .filter(Boolean)
      .slice(0, 30);
    if (field.required && list.length === 0) return { error: `${label} wajib diisi.` };
    if (list.some((entry) => entry.length > 200)) return { error: `Setiap baris ${label} maksimal 200 karakter.` };
    return { value: list };
  }
  if (field.type === "number") {
    if (raw === "" || raw === null || raw === undefined) {
      return field.required ? { error: `${label} wajib diisi.` } : { value: null };
    }
    const number = Number(raw);
    if (!Number.isFinite(number)) return { error: `${label} harus berupa angka.` };
    if (field.min !== undefined && number < field.min) return { error: `${label} minimal ${field.min}.` };
    if (field.maxNumber !== undefined && number > field.maxNumber) return { error: `${label} maksimal ${field.maxNumber}.` };
    return { value: number };
  }
  const text = typeof raw === "string" ? raw.trim() : raw === null || raw === undefined ? "" : String(raw);
  if (!text) return field.required ? { error: `${label} wajib diisi.` } : { value: "" };
  const max = field.max ?? defaultMax[field.type] ?? 200;
  if (text.length > max) return { error: `${label} maksimal ${max} karakter.` };
  if (field.type === "select" && field.options && !field.options.includes(text)) {
    return { error: `${label} tidak valid.` };
  }
  if ((field.type === "image" || field.type === "file") && !LINK.test(text) && text !== "#") {
    return { error: `${label} harus berupa tautan yang diawali / atau https://.` };
  }
  if (field.type === "slug") {
    const slug = slugify(text);
    if (!slug) return { error: `${label} tidak valid.` };
    return { value: slug };
  }
  return { value: text };
}

export function validateItems(def: CollectionDef, input: unknown): { error: string } | { items: ContentItem[] } {
  if (!Array.isArray(input)) return { error: "Format data tidak valid." };
  const limit = def.maxItems ?? 500;
  if (input.length > limit) return { error: `Maksimal ${limit} ${def.singular}.` };

  const items: ContentItem[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const [index, raw] of input.entries()) {
    if (!raw || typeof raw !== "object") return { error: "Format data tidak valid." };
    const record = raw as Record<string, unknown>;
    const id = typeof record.id === "string" && /^[\w-]{1,64}$/.test(record.id) ? record.id : "";
    if (!id || ids.has(id)) return { error: `ID ${def.singular} ke-${index + 1} tidak valid.` };
    ids.add(id);

    const item: ContentItem = { id };
    for (const field of def.fields) {
      const result = cleanField(field, record[field.key]);
      if ("error" in result) return { error: `${def.singular[0].toUpperCase()}${def.singular.slice(1)} ke-${index + 1}: ${result.error}` };
      item[field.key] = result.value;
      if (field.type === "slug") {
        if (slugs.has(result.value as string)) return { error: `Alamat "${result.value}" dipakai lebih dari sekali.` };
        slugs.add(result.value as string);
      }
    }
    items.push(item);
  }
  return { items };
}

export function validateBlock(def: BlockDef, input: unknown): { error: string } | { data: BlockData } {
  if (!input || typeof input !== "object") return { error: "Format data tidak valid." };
  const record = input as Record<string, unknown>;
  const data: BlockData = {};
  for (const field of def.fields) {
    const result = cleanField(field, record[field.key]);
    if ("error" in result) return { error: result.error };
    data[field.key] = Array.isArray(result.value) ? result.value.join("\n") : String(result.value ?? "");
  }
  return { data };
}

/** Ambil nilai teks/daftar/angka dari item dengan aman (untuk halaman publik). */
export const itemText = (item: ContentItem, key: string) => {
  const value = item[key];
  return Array.isArray(value) ? value.join(", ") : value === null || value === undefined ? "" : String(value);
};
export const itemList = (item: ContentItem, key: string) => {
  const value = item[key];
  return Array.isArray(value) ? value.filter(Boolean) : typeof value === "string" && value ? value.split("\n").filter(Boolean) : [];
};
export const itemNumber = (item: ContentItem, key: string) => {
  const value = Number(item[key]);
  return item[key] === null || item[key] === "" || !Number.isFinite(value) ? null : value;
};
