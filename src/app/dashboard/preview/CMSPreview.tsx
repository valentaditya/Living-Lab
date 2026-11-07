"use client";

import type { AgendaItem } from "@/types/agenda";
import type { Article } from "@/types/article";
import type { FAQItem } from "@/lib/cms-content";
import { ArticleCard } from "@/app/components/organisms/ArticleCard";
import { AgendaCard } from "@/app/components/organisms/AgendaCard";
import { FAQSection } from "@/app/components/organisms/FAQ/FAQSection";
import { HeroVideo } from "@/app/components/organisms/HeroVideo";
import { PreviewFrame, PreviewLabel, PreviewPanel, safeImage } from "./PreviewPanel";

const or = (value: string | undefined, fallback: string) => (value && value.trim() ? value : fallback);
const NOTE = "Isian yang masih kosong ditampilkan dengan nama kolomnya.";

export function ArticlePreview({ article }: { article: Article }) {
  const filled: Article = {
    ...article,
    id: article.id || "pratinjau",
    category: or(article.category, "Kategori"),
    image: safeImage(article.image),
    date: or(article.date, "Tanggal"),
    readTime: or(article.readTime, "Waktu baca"),
    tag: or(article.tag, "Tag"),
    title: or(article.title, "Judul berita"),
    summary: or(article.summary, "Ringkasan berita akan tampil di sini."),
    author: or(article.author, "Penulis"),
    actionText: or(article.actionText, "Baca selengkapnya"),
  };
  return (
    <PreviewPanel path="/berita" note={NOTE}>
      <PreviewLabel>Kartu berita</PreviewLabel>
      <PreviewFrame width={400} className="bg-white py-4">
        <div className="px-4">
          <ArticleCard article={filled} />
        </div>
      </PreviewFrame>
    </PreviewPanel>
  );
}

export function AgendaPreview({ item }: { item: AgendaItem }) {
  const filled: AgendaItem = {
    ...item,
    id: item.id || "pratinjau",
    month: or(item.month, "BLN"),
    day: or(item.day, "00"),
    tagLabel: or(item.tagLabel, "Label"),
    time: or(item.time, "Waktu"),
    title: or(item.title, "Judul agenda"),
    location: or(item.location, "Lokasi"),
    buttonText: or(item.buttonText, "Daftar"),
  };
  return (
    <PreviewPanel path="/berita" note={NOTE}>
      <PreviewLabel>Kartu agenda</PreviewLabel>
      <PreviewFrame width={900} className="bg-white p-6">
        <AgendaCard item={filled} />
      </PreviewFrame>
    </PreviewPanel>
  );
}

export function FAQPreview({ faq }: { faq: FAQItem }) {
  const filled: FAQItem = {
    ...faq,
    id: faq.id || "pratinjau",
    question: or(faq.question, "Pertanyaan"),
    answer: or(faq.answer, "Jawaban akan tampil di sini."),
    category: or(faq.category, "Kategori"),
  };
  return (
    <PreviewPanel path="/tentang/faq" note={NOTE}>
      <PreviewLabel>Pertanyaan di halaman FAQ (terbuka)</PreviewLabel>
      <PreviewFrame width={1000}>
        <FAQSection key={filled.id} faqs={[filled]} />
      </PreviewFrame>
    </PreviewPanel>
  );
}

export function HeroPreview({ title, description }: { title: string; description: string }) {
  return (
    <PreviewPanel path="/">
      <PreviewLabel>Bagian pembuka beranda</PreviewLabel>
      <PreviewFrame width={1440} className="bg-black">
        <div className="relative isolate">
          <HeroVideo title={or(title, "Judul utama")} description={or(description, "Deskripsi")} />
        </div>
      </PreviewFrame>
    </PreviewPanel>
  );
}
