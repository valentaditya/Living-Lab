import React from 'react';
import { TeamCard } from './TeamCard';

export const TeamGrid = () => {
  const teamData = [
    {
      badge: "CODE / / LAB-01",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
      role: "[ KETUA TIM RISET ]",
      name: "Dr. Ir. Budi Santoso, M.Eng.",
      title: "Dosen Teknik Lingkungan UAJY • Spesialis Hidrodinamika",
      quote: "Laboratorium sejati bukan berada di dalam ruang tertutup kampus, melainkan di bentaran kali dan obrolan warga.",
      focusLabel: "FOKUS UTAMA",
      focusValue: "Hidrologi Urban & Tata Kelola DAS",
      pId: "P-ID: 881-UAJY",
      icon: "💧"
    },
    {
      badge: "ECO-LAB / / 02",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
      role: "[ KOORDINATOR EKOLOGI ]",
      name: "Sekar Ayu Prabawati, S.Si., M.Sc.",
      title: "Peneliti Biologi Perairan UAJY • Bioindikator Makrobentos",
      quote: "Setiap mikroorganisme di aliran sungai adalah indikator kejujuran peradaban kota kita.",
      focusLabel: "FOKUS UTAMA",
      focusValue: "Bio-indikator Bentik & Kimia Sungai",
      pId: "P-ID: 882-UAJY",
      icon: "🔬"
    },
    {
      badge: "PAGUYUBAN / / CODE",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
      role: "[ KOORDINATOR LAPANGAN ]",
      name: "FX. Bambang Hendro",
      title: "Tokoh Paguyuban Pemerti Kali Code • Relawan Bencana DAS",
      quote: "Sungai bukan tempat membuang masa lalu, melainkan halaman depan masa depan anak cucu kami.",
      focusLabel: "FOKUS UTAMA",
      focusValue: "Aksi Relawan & Edukasi Warga",
      pId: "P-ID: 981-COMM",
      icon: "🤝"
    },
    {
      badge: "TELEMETRI / / IOT",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
      role: "[ SPESIALIS IOT & SAINS WARGA ]",
      name: "Maria Dwi Lestari, S.T.",
      title: "Peneliti Sains Komputasi DIY • Pegiat Open Hardware",
      quote: "Teknologi sensor hanya bermakna jika datanya dipahami dan dijaga bersama oleh warga yang tinggal di tepiannya.",
      focusLabel: "FOKUS UTAMA",
      focusValue: "Telemetri LoRaWAN & Open Hardware",
      pId: "P-ID: 883-DIY",
      icon: "📡"
    },
    {
      badge: "KONSERVASI / / WINONGO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      role: "[ INISIATOR KONSERVASI ]",
      name: "Danang Wijayanto",
      title: "Inisiator FKWA Winongo Asri • Penggiat Ekoparian",
      quote: "Mungkur kali dadi madhep kali: ketika sungai dihormati, bencana luapan berubah menjadi anugerah kehidupan.",
      focusLabel: "FOKUS UTAMA",
      focusValue: "Ruang Terbuka Hijau & Ekowisata",
      pId: "P-ID: 982-COMM",
      icon: "🌿"
    },
    {
      badge: "SPASIAL / / KEBIJAKAN",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop", // Placeholder, ganti dengan foto asli
      role: "[ PERENCANA TATA RUANG ]",
      name: "Nurul Hidayati, M.P.W.K.",
      title: "Dosen Perencanaan Wilayah Kota UAJY • Analis Spasial",
      quote: "Mengintegrasikan kearifan lokal bantara ke dalam rencana tata ruang kota adalah wujud keadilan spasial.",
      focusLabel: "FOKUS UTAMA",
      focusValue: "Kebijakan Sempadan & Mitigasi Banjir",
      pId: "P-ID: 884-UAJY",
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