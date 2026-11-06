import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";
import { AGENDA_DATA } from "@/data/dummyAnggota";
import { DUMMY_ARTICLES } from "@/data/dummyArticle";
import type { AgendaItem } from "@/types/agenda";
import type { Article } from "@/types/article";
import { createSupabasePublicClient } from "./supabase/public";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SiteSettings {
  heroTitle: string;
  heroDescription: string;
}

export interface CMSContent {
  settings: SiteSettings;
  articles: Article[];
  agenda: AgendaItem[];
  faqs: FAQItem[];
}

const defaultContent: CMSContent = {
  settings: {
    heroTitle: "Memulihkan Sungai, Memberdayakan Masyarakat.",
    heroDescription:
      "Riset berbasis sains dan aksi warga kolaboratif untuk masa depan ekosistem sungai yang berkelanjutan.",
  },
  articles: DUMMY_ARTICLES,
  agenda: AGENDA_DATA,
  faqs: [
    {
      id: "faq-1",
      question: "Apa itu Living Lab Sungai Yogyakarta?",
      answer:
        "Living Lab Sungai Yogyakarta adalah inisiatif riset kolaboratif terapan yang menempatkan koridor sungai (Kali Code, Winongo, Gajahwong) sebagai laboratorium hidup di mana akademisi, warga bantaran, pemerintah, dan industri bekerja sama secara egaliter untuk menyelesaikan persoalan sosial-ekologis secara nyata.",
      category: "Landasan Operasional",
    },
    {
      id: "faq-2",
      question: "Siapa saja yang bisa terlibat dalam inisiatif ini?",
      answer:
        "Inisiatif ini terbuka untuk siapa saja yang memiliki kepedulian terhadap sungai, mulai dari akademisi, mahasiswa, komunitas warga, LSM, sektor swasta, hingga instansi pemerintah.",
      category: "Keterlibatan & Warga",
    },
    {
      id: "faq-3",
      question: "Bagaimana cara masyarakat atau peneliti berkontribusi data?",
      answer:
        "Anda dapat berkontribusi dengan mengikuti pelatihan sains warga (citizen science) yang kami adakan secara berkala, atau mengirimkan data hasil pemantauan mandiri melalui portal data terbuka kami.",
      category: "Data & Akses",
    },
    {
      id: "faq-4",
      question: "Apakah data kualitas air dan riset dapat diakses secara publik?",
      answer:
        "Ya, seluruh data telemetri dan hasil riset kami dipublikasikan secara terbuka melalui repositori data kami. Kami percaya bahwa data terbuka adalah kunci untuk advokasi kebijakan yang berbasis bukti.",
      category: "Data & Akses",
    },
    {
      id: "faq-5",
      question: "Bagaimana prosedur menjadi mitra resmi atau sponsor riset?",
      answer:
        "Silakan menghubungi tim sekretariat kami melalui email untuk mendapatkan dokumen panduan kemitraan. Kami akan menjadwalkan sesi diskusi awal untuk menyelaraskan tujuan dan ruang lingkup kolaborasi.",
      category: "Kelembagaan",
    },
  ],
};

interface SettingsRow {
  hero_title: string;
  hero_description: string;
}

interface ArticleRow {
  id: string;
  category: string;
  image: string;
  date_label: string;
  read_time: string;
  tag: string;
  title: string;
  summary: string;
  author: string;
  action_text: string;
  action_href: string | null;
}

interface AgendaRow {
  id: string;
  month: string;
  day: string;
  tag_label: string;
  tag_color: AgendaItem["tagColor"];
  time_label: string;
  title: string;
  location: string;
  button_text: string;
}

interface FAQRow {
  id: string;
  question: string;
  answer: string;
  category: string;
}

async function readContent(supabase: SupabaseClient): Promise<CMSContent> {
  const [settings, articles, agenda, faqs] = await Promise.all([
    supabase
      .from("site_settings")
      .select("hero_title, hero_description")
      .eq("id", 1)
      .maybeSingle()
      .overrideTypes<SettingsRow, { merge: false }>(),
    supabase
      .from("articles")
      .select("id, category, image, date_label, read_time, tag, title, summary, author, action_text, action_href")
      .order("sort_order")
      .overrideTypes<ArticleRow[], { merge: false }>(),
    supabase
      .from("agenda_items")
      .select("id, month, day, tag_label, tag_color, time_label, title, location, button_text")
      .order("sort_order")
      .overrideTypes<AgendaRow[], { merge: false }>(),
    supabase
      .from("faqs")
      .select("id, question, answer, category")
      .order("sort_order")
      .overrideTypes<FAQRow[], { merge: false }>(),
  ]);

  const error = settings.error ?? articles.error ?? agenda.error ?? faqs.error;
  if (error) {
    throw new Error(`Gagal membaca konten dari Supabase: ${error.message}`);
  }

  return {
    settings: settings.data
      ? {
          heroTitle: settings.data.hero_title,
          heroDescription: settings.data.hero_description,
        }
      : defaultContent.settings,
    articles: (articles.data ?? []).map((row) => ({
      id: row.id,
      category: row.category,
      image: row.image,
      date: row.date_label,
      readTime: row.read_time,
      tag: row.tag,
      title: row.title,
      summary: row.summary,
      author: row.author,
      actionText: row.action_text,
      ...(row.action_href ? { actionHref: row.action_href } : {}),
    })),
    agenda: (agenda.data ?? []).map((row) => ({
      id: row.id,
      month: row.month,
      day: row.day,
      tagLabel: row.tag_label,
      tagColor: row.tag_color,
      time: row.time_label,
      title: row.title,
      location: row.location,
      buttonText: row.button_text,
    })),
    faqs: (faqs.data ?? []).map((row) => ({
      id: row.id,
      question: row.question,
      answer: row.answer,
      category: row.category,
    })),
  };
}

/**
 * Untuk halaman publik. Kalau Supabase tidak bisa dibaca (misalnya tabel belum
 * dibuat), situs tetap tampil memakai konten bawaan.
 */
export async function getCMSContent(): Promise<CMSContent> {
  try {
    return await readContent(createSupabasePublicClient());
  } catch (error) {
    console.error("[cms] Memakai konten bawaan:", error instanceof Error ? error.message : error);
    return defaultContent;
  }
}

/**
 * Untuk panel admin. Error dilempar, bukan diganti konten bawaan, supaya editor
 * tidak pernah menimpa data asli di Supabase dengan konten bawaan.
 */
export async function getCMSContentStrict(supabase?: SupabaseClient): Promise<CMSContent> {
  return readContent(supabase ?? createSupabasePublicClient());
}

/** Menyimpan seluruh konten dalam satu transaksi (fungsi SQL save_cms_content). */
export async function saveCMSContent(supabase: SupabaseClient, content: CMSContent) {
  const { error } = await supabase.rpc("save_cms_content", { content });
  if (error) {
    throw new Error(`Gagal menyimpan konten ke Supabase: ${error.message}`);
  }
}
