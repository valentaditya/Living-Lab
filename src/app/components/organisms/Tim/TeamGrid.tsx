import React from 'react';
import { TeamCard } from './TeamCard';

export const TeamGrid = () => {
  const teamData = [
    {
      badge: "Lab Code",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
      role: "Ketua Tim Riset",
      name: "Dr. Ir. Budi Santoso, M.Eng.",
      title: "Dosen Teknik Lingkungan UAJY • Spesialis Hidrodinamika",
      quote: "Laboratorium sejati bukan berada di dalam ruang tertutup kampus, melainkan di bentaran kali dan obrolan warga.",
      focusLabel: "Fokus Utama",
      focusValue: "Hidrologi Urban & Tata Kelola DAS",
      icon: "💧"
    },
    {
      badge: "Eco-Lab",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
      role: "Koordinator Ekologi",
      name: "Sekar Ayu Prabawati, S.Si., M.Sc.",
      title: "Peneliti Biologi Perairan UAJY • Bioindikator Makrobentos",
      quote: "Setiap mikroorganisme di aliran sungai adalah indikator kejujuran peradaban kota kita.",
      focusLabel: "Fokus Utama",
      focusValue: "Bio-indikator Bentik & Kimia Sungai",
      icon: "🔬"
    },
    {
      badge: "Paguyuban Code",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
      role: "Koordinator Lapangan",
      name: "FX. Bambang Hendro",
      title: "Tokoh Paguyuban Pemerti Kali Code • Relawan Bencana DAS",
      quote: "Sungai bukan tempat membuang masa lalu, melainkan halaman depan masa depan anak cucu kami.",
      focusLabel: "Fokus Utama",
      focusValue: "Aksi Relawan & Edukasi Warga",
      icon: "🤝"
    },
    {
      badge: "Telemetri IoT",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
      role: "Spesialis IoT & Sains Warga",
      name: "Maria Dwi Lestari, S.T.",
      title: "Peneliti Sains Komputasi DIY • Pegiat Open Hardware",
      quote: "Teknologi sensor hanya bermakna jika datanya dipahami dan dijaga bersama oleh warga yang tinggal di tepiannya.",
      focusLabel: "Fokus Utama",
      focusValue: "Telemetri LoRaWAN & Open Hardware",
      icon: "📡"
    },
    {
      badge: "Konservasi Winongo",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      role: "Inisiator Konservasi",
      name: "Danang Wijayanto",
      title: "Inisiator FKWA Winongo Asri • Penggiat Ekoparian",
      quote: "Mungkur kali dadi madhep kali: ketika sungai dihormati, bencana luapan berubah menjadi anugerah kehidupan.",
      focusLabel: "Fokus Utama",
      focusValue: "Ruang Terbuka Hijau & Ekowisata",
      icon: "🌿"
    },
    {
      badge: "Spasial & Kebijakan",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop", // Placeholder, ganti dengan foto asli
      role: "Perencana Tata Ruang",
      name: "Nurul Hidayati, M.P.W.K.",
      title: "Dosen Perencanaan Wilayah Kota UAJY • Analis Spasial",
      quote: "Mengintegrasikan kearifan lokal bantara ke dalam rencana tata ruang kota adalah wujud keadilan spasial.",
      focusLabel: "Fokus Utama",
      focusValue: "Kebijakan Sempadan & Mitigasi Banjir",
      icon: "📐"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member, idx) => (
            <TeamCard key={idx} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};