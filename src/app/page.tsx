import { DUMMY_ARTICLES } from "@/data/dummyArticle";
import { HeroVideo } from "./components/organisms/HeroVideo";
import { NewsSection } from "./components/organisms/NewsSection";
import { PillarsSection } from "./components/organisms/PilarSection";
import { StatsSection } from "./components/organisms/StatSection";
import KisahPenjagaSungai from "./components/organisms/KisahPenjagaSungai";
import AgendaSection from "./components/organisms/AgendaSection";
import CtaSection from "./components/organisms/CtaSectiob";


export default function Home() {
  return (
    <main className="relative min-h-screen ">
      <HeroVideo />
      <PillarsSection />
      <StatsSection/>
      <NewsSection articles={DUMMY_ARTICLES}/>
      <KisahPenjagaSungai/>
      <AgendaSection/>
      <CtaSection/>
    </main>
  );
}