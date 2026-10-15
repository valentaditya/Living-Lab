import React from 'react';
import { SectionHeader } from '../molecules/SectionHeader';
import { PillarCard } from '../molecules/PilarCard';
import { 
  GraduationCap, 
  Eye, 
  FlaskConical, 
  HandHeart, 
  Ear 
} from 'lucide-react';

const PILLARS_DATA = [
  {
    step: "PILAR 01",
    title: "Belajar (Learn)",
    description: "Kurikulum interdisipliner ekologi sungai, kimia air, dan sistem sosio-ekologis yang dirancang bersama dosen dan mahasiswa UAJY.",
    icon: GraduationCap
  },
  {
    step: "PILAR 02",
    title: "Mendengar (Listen)",
    description: "Rekaman tradisi lisan, kearifan lokal komunitas bantaran sungai, dan kepedulian warga yang dihimpun melalui sarasehan kampung tepi sungai.",
    icon: Ear
  },
  {
    step: "PILAR 03",
    title: "Mengamati (Look)",
    description: "Telemetri kualitas air partisipatif secara berkelanjutan, pemantauan sensor mikro, fotogrametri drone, dan biomonitoring makroinvertebrata.",
    icon: Eye
  },
  {
    step: "PILAR 04",
    title: "Bereksperimen (Lab)",
    description: "Bersama merancang rekayasa hayati (bio-engineering), perangkap sampah sungai, kebun vertikal bantaran, dan percontohan biofiltrasi mikroba.",
    icon: FlaskConical
  },
  {
    step: "PILAR 05",
    title: "Bertindak (Act)",
    description: "Aksi bersih sungai terpadu, penyusunan naskah kebijakan (policy brief) untuk pemerintah daerah, dan restorasi ekologis berbasis warga.",
    icon: HandHeart
  }
];

export const PillarsSection = () => {
  return (
    <section className="py-16 md:py-16 px-8  bg-white text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
 
      <SectionHeader 
        badgeText="SIKLUS KREASI BERSAMA RISET & AKSI"
        title="Pilar Utama Kami"
        description="Mentransformasikan pengelolaan daerah aliran sungai melalui penyelidikan ilmiah berbasis komunitas dan aksi warga yang berkelanjutan."
      />

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
        {PILLARS_DATA.map((pillar) => (
          <PillarCard 
            key={pillar.step}
            step={pillar.step}
            title={pillar.title}
            description={pillar.description}
            icon={pillar.icon}
          />
        ))}
      </div>
    </section>
  );
};