import { HeroVideo } from "./components/organisms/HeroVideo";
import { NewsSection } from "./components/organisms/NewsSection";
import { PillarsSection } from "./components/organisms/PilarSection";
import { StatsSection } from "./components/organisms/StatSection";
import KisahPenjagaSungai from "./components/organisms/KisahPenjagaSungai";
import AgendaSection from "./components/organisms/AgendaSection";
import CtaSection from "./components/organisms/CtaSectiob";
import { getCMSContent } from "@/lib/cms-content";

// Konten dari Supabase dibaca di setiap kunjungan, jadi perubahan dari dashboard
// langsung tampil (tanpa cache halaman di server maupun di browser).
export const dynamic = "force-dynamic";


export default async function Home() {
  const content = await getCMSContent();

  return (
    <main className="relative min-h-screen ">
      <HeroVideo
        title={content.settings.heroTitle}
        description={content.settings.heroDescription}
      />
      <PillarsSection />
      <StatsSection/>
      <NewsSection articles={content.articles}/>
      <KisahPenjagaSungai/>
      <AgendaSection agendas={content.agenda}/>
      <CtaSection/>
    </main>
  );
}