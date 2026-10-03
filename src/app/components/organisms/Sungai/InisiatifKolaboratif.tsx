import React from 'react';

export const InisiatifKolaboratif = () => {
  const programs = [
    {
      id: "PROGRAM 01 // KALI GAJAHWONG",
      status: "AKTIF // TAHAP 3 (2024-2025)",
      title: "Bank Sampah & Pengolahan Sirkular Muju Muju",
      desc: "Integrasi sistem pemilahan sampah terkomputerisasi dengan pengolahan pupuk organik komunal. Total pembangunan reduksi risiko mikroplastik hingga 42% di sempadan Kali Gajahwong.",
      tags: ["Lokasi: Sinduadi & Nologaten", "Kemitraan: 1.5 Ton/bulan", "Mitra: KOB Muju Jogja & FT UAJY"]
    },
    {
      id: "PROGRAM 02 // KALI CODE",
      status: "AKTIF // REAL-TIME MONITORING",
      title: "Jaringan Sensor Telemetri Kualitas Air LoRaWAN",
      desc: "Pemasangan 6 titik sensor telemetri otomatis pemantau Dissolved Oxygen (DO), pH, konduktivitas, dan kekeruhan (turbidity) di aliran Kali Code.",
      tags: ["Lokasi: Sinduadi & Nologaten", "Kemitraan: 1.5 Ton/bulan", "Mitra: Protelindo, BPPT, & UGM DTETI"]
    },
    {
      id: "PROGRAM 03 // KALI WINONGO",
      status: "MUSIM TANAM // 4.000 BIBIT",
      title: "Restorasi Bambu Riparian & Bioremediasi Alami",
      desc: "Penanaman kembali 1.200 rumpun bambu apus dan gayam pada sempadan rawan erosi di kawasan hulu Kali Winongo. Diharapkan mampu menahan laju erosi tebing sungai.",
      tags: ["Target Luasan: 3.5 Hektar", "Bibit Terdistribusi: 850 Rumpun", "Mitra: Forum Komunitas Winongo Asri"]
    },
    {
      id: "PROGRAM 04 // TIGA DAS DIY",
      status: "BERKELANJUTAN // EDUKASI",
      title: "Sekolah Sungai & Edukasi Sains Warga",
      desc: "Lokakarya lapangan bulanan bagi pelajar SMA, mahasiswa, dan karang taruna bantara untuk mengenal metode identifikasi makrobentos, penginderaan kualitas air, dan sanitasi komunal mandiri.",
      tags: ["Peserta Aktif: 450 Orang", "Kelas Terlaksana: 18 Kali", "Mitra: DLHK DIY & Dinas Lingkungan Hidup"]
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-[10px] font-mono text-gray-500 tracking-widest block mb-2">[ AKSI LAPANGAN & RISET ]</span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#0f1713]">Inisiatif Kolaboratif yang Sedang Berlangsung</h2>
          </div>
          <p className="text-gray-500 text-sm max-w-md text-left md:text-right">
            Kombinasi sains terapan dan keberlanjutan komunitas warga bantara untuk menciptakan dampak nyata yang terukur pada ketiga aliran sungai.
          </p>
        </div>

        <div className="relative border-l-2 border-gray-200 pl-8 space-y-12">
          {programs.map((prog, idx) => (
            <div key={idx} className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-white border-4 border-teal-600 rounded-full"></div>
              
              <div className="bg-white p-6 md:p-8 rounded-sm border border-gray-100 shadow-sm flex flex-col gap-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <span className="text-[10px] font-mono text-gray-500">{prog.id}</span>
                  <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-2 py-1 rounded-sm">{prog.status}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#0f1713]">{prog.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{prog.desc}</p>
                <div className="flex flex-wrap gap-3 mt-2 border-t border-gray-100 pt-4">
                  {prog.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono text-gray-500 bg-gray-50 px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f1713] border border-gray-300 px-6 py-3 rounded-sm hover:bg-gray-100 transition-colors">
            Lihat Semua Program & Laporan Lapangan <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
};