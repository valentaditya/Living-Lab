import "server-only";

import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { AGENDA_DATA } from "@/data/dummyAnggota";
import { DUMMY_ARTICLES } from "@/data/dummyArticle";
import type { AgendaItem } from "@/types/agenda";
import type { Article } from "@/types/article";

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

const storageDirectory = path.join(process.cwd(), ".livinglab");
const contentPath = path.join(storageDirectory, "content.json");

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

function isCMSContent(value: unknown): value is CMSContent {
  if (!value || typeof value !== "object") return false;
  const content = value as Partial<CMSContent>;
  return (
    !!content.settings &&
    typeof content.settings.heroTitle === "string" &&
    typeof content.settings.heroDescription === "string" &&
    Array.isArray(content.articles) &&
    Array.isArray(content.agenda) &&
    Array.isArray(content.faqs)
  );
}

export async function getCMSContent(): Promise<CMSContent> {
  try {
    const stored = JSON.parse(await readFile(contentPath, "utf8")) as unknown;
    if (!isCMSContent(stored)) {
      throw new Error("Stored Living Lab content has an invalid shape.");
    }
    return stored;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return defaultContent;
    }
    throw error;
  }
}

export async function saveCMSContent(content: CMSContent) {
  await mkdir(storageDirectory, { recursive: true });
  const temporaryPath = path.join(storageDirectory, `content-${randomUUID()}.tmp`);
  await writeFile(temporaryPath, JSON.stringify(content, null, 2), "utf8");
  await rename(temporaryPath, contentPath);
}
