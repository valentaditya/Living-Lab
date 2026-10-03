import AboutHero from "@/app/components/organisms/AboutHero";
import RiverLabSection from "@/app/components/organisms/RiverLabSection";
import MethodologySection from "@/app/components/organisms/MethodologySection";
import AboutCTA from "@/app/components/organisms/AboutCTA";
import { Navbar } from "@/app/components/organisms/Navbar";
import Footer from "@/app/components/organisms/Footer";
export const metadata = {
  title: "Tentang Kami | Living Lab Sungai Yogyakarta",
  description: "Platform kolaboratif yang mempertemukan masyarakat, akademisi, pemerintahan, industri, dan komunitas untuk bersama-sama belajar dan bertindak.",
};

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />
      <main className="pt-20"> {/* pt-20 untuk memberi ruang navbar sticky */}
        <AboutHero />
        <RiverLabSection />
        <MethodologySection />
        <AboutCTA />
      </main>
    </div>
  );
}
