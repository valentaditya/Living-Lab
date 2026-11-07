import { HeroVideo } from "./components/organisms/HeroVideo";
import { NewsSection } from "./components/organisms/NewsSection";
// PillarsSection dipakai section "Pilar Utama Kami" yang sedang dinonaktifkan di bawah.
import { PillarsSection } from "./components/organisms/PilarSection"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { StatsSection } from "./components/organisms/StatSection";
import KisahPenjagaSungai from "./components/organisms/KisahPenjagaSungai";
import AgendaSection from "./components/organisms/AgendaSection";
import CtaSection from "./components/organisms/CtaSectiob";
import { getCMSContent } from "@/lib/cms-content";
import { getCollection } from "@/lib/site-content";

// Konten dari Supabase dibaca di setiap kunjungan, jadi perubahan dari dashboard
// langsung tampil (tanpa cache halaman di server maupun di browser).
export const dynamic = "force-dynamic";


export default async function Home() {
  const [content, stats] = await Promise.all([getCMSContent(), getCollection("stats")]);

  return (
    <main className="relative min-h-screen ">
      <HeroVideo
        title={content.settings.heroTitle}
        description={content.settings.heroDescription}
      />
      {/* Kartu statistik menumpang di batas bawah video hero */}
      <StatsSection stats={stats} />
      {/* Section "Pilar Utama Kami" dinonaktifkan sementara; hapus komentar untuk mengaktifkan lagi.
      <PillarsSection />
      */}
      <NewsSection articles={content.articles}/>
      <KisahPenjagaSungai/>
      <AgendaSection agendas={content.agenda}/>
      <CtaSection/>
    </main>
  );
}