import React from 'react';

export const TimelineRoadmap = () => {
  const phases = [
    {
      year: "2023",
      status: "FASE SELESAI",
      statusColor: "bg-green-50 text-green-700 border-green-200",
      phaseTag: "FASE 1 // INISIASI & BASELINE",
      dateRange: "Q1 2023 — Q4 2023",
      title: "Fondasi Konsortium Pentahelix & Audit Awal Kualitas Tiga Sungai",
      desc: "Pembentukan konsortium pentahelix awal yang mempertemukan akademisi UAJY, komunitas Paguyuban Kali/ngga, pemerintah Kota Yogyakarta, dan kelompok swadaya. Menetapkan modul sains warga terapan, telemetri hidrologi, dan pemetaan spasial partisipatif.",
      tags: ["Fokus Utama: Pemetaan Spasial 15 Pos", "Uji Makrobentos", "Konsolidasi Tokoh Bantara"],
      outputTitle: "OUTPUT KUNCI",
      outputName: "Modul Standardisasi & Piagam Kolaborasi",
      outputDesc: "Dokumen resmi kesepakatan 12 komunitas bantaran dan naskah metodologi sampling air baku terstandardisasi.",
      outputFooter: "15 Pos Terverifikasi | 100% Selesai"
    },
    {
      year: "2024",
      status: "SEDANG BERJALAN",
      statusColor: "bg-teal-50 text-teal-700 border-teal-200",
      phaseTag: "FASE 2 // LAB UJI-COBA & IOT (AKTIF)",
      dateRange: "Q1 2024 — Q4 2024",
      title: "Penerapan Sensor Nirkabel Komunal & Inkubasi Sains Bantara",
      desc: "Deploy pilot sensor IoT kualitas air nirkabel berbasis LoRaWAN, perakitan purwarupa sistem pengolahan limbah cair domestik (IPAL) skala komunal di Terban (Code) dan Suryowijayan (Winongo), serta pengenalan kurikulum sains warga bagi generasi muda sekolah bantara.",
      tags: ["Implementasi Lapangan", "Gateway LoRaWAN Mergi-Code", "Bio-Filter Bambu Komunal"],
      outputTitle: "OUTPUT KUNCI",
      outputName: "Inkubasi Teknologi & Jaringan Telemetri LoRaWAN",
      outputDesc: "Sensor telemetri real-time dengan update berkala tiap 15 menit ke dashboard pemantau publik.",
      outputFooter: "Status Jaringan: ONLINE (16 Nodes) | Protokol: LoRaWAN AS923-1",
      progress: { label: "Target Instalasi Node Sensor (24 Unit)", value: "16 / 24 Terpasang (66.7%)", percentage: "66.7%" }
    },
    {
      year: "2025",
      status: "RENCANA MENDATANG",
      statusColor: "bg-gray-50 text-gray-600 border-gray-200",
      phaseTag: "FASE 3 // INTEGRASI & SCALE-UP",
      dateRange: "Q1 2025 — Q4 2025",
      title: "Portal Keterbukaan Data Terpadu & Koridor Ekowisata Bantara",
      desc: "Peluncuran portal keterbukaan data terpadu se-DIY untuk akses publik, akademisi, dan pembuat kebijakan. Penguatan koridor ekowisata bantaran sungai mandiri berbasis kelola warga, serta standardisasi replikasi metodologi living lab untuk DAS regional di luar lingkup Yogyakarta.",
      tags: ["Target Utama: Open API Kualitas Air", "3 Rute Ekowisata Edukasi", "Policy Brief Pemda DIY"],
      outputTitle: "OUTPUT KUNCI",
      outputName: "Portal Terbuka & Replikasi Wilayah DAS",
      outputDesc: "Infrastruktur repositori data terbuka terintegrasi dan buku panduan replikasi living lab skala wilayah DAS.",
      outputFooter: "Replikasi Wilayah: Sungai, Progo, & Opak"
    },
    {
      year: "2026+",
      status: "VISI MASA DEPAN",
      statusColor: "bg-gray-50 text-gray-600 border-gray-200",
      phaseTag: "FASE 4 // REGENERASI MANDIRI",
      dateRange: "Jangka Panjang 2026 — 2030",
      title: "Kemandirian Komunitas Bantara & Standar Mutu Air Kelas II",
      desc: "Tercapainya kemandirian tata kelola komunitas bantara tanpa ketergantungan intervensi eksternal penuh. Peningkatan mutu air konsisten ke standar Kelas II Nasional (rekreasi air & budidaya tawar), serta terbangunnya ketahanan iklim mikro perkotaan Yogyakarta menghadapi risiko banjir lahar dan curah ekstrem.",
      tags: ["Sasaran Strategis: BOD < 3 mg/L", "Dana Abadi Konservasi Warga", "Zero Direct Waste Inflow"],
      outputTitle: "OUTPUT KUNCI",
      outputName: "Kemandirian Paguyuban & Mutu Air Berkelanjutan",
      outputDesc: "Lembaga otonom bantara tersertifikasi, ekosistem sungai hidup, dan ketahanan ekologis lestari lintas generasi.",
      outputFooter: "Target Baku Mutu: KELAS II PP 22/2021"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="relative border-l-2 border-gray-200 pl-8 md:pl-16 space-y-16">
          
          {phases.map((phase, idx) => (
            <div key={idx} className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] md:-left-[73px] top-0 w-5 h-5 bg-white border-4 border-gray-300 rounded-full z-10"></div>
              
              <div className="flex flex-col md:flex-row gap-8 items-start">
                
                {/* Year Column */}
                <div className="md:w-32 flex-shrink-0 pt-2">
                  <span className="block text-4xl md:text-5xl font-bold text-gray-300 leading-none">{phase.year}</span>
                  <span className={`inline-block mt-2 text-[9px] font-mono px-2 py-1 border rounded-sm ${phase.statusColor}`}>
                    {phase.status}
                  </span>
                </div>

                {/* Card Column */}
                <div className="flex-grow bg-white border border-gray-200 rounded-sm shadow-sm w-full">
                  <div className="p-6 md:p-8">
                    
                    {/* Card Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                      <span className="text-[10px] font-mono text-gray-500">{phase.phaseTag}</span>
                      <span className="text-[10px] font-mono text-gray-400">{phase.dateRange}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold text-[#0f1713] mb-4">{phase.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">{phase.desc}</p>

                    {/* Progress Bar (Khusus Fase 2) */}
                    {phase.progress && (
                      <div className="mb-6 bg-gray-50 p-4 border border-gray-100 rounded-sm">
                        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mb-2">
                          <span>{phase.progress.label}</span>
                          <span className="font-bold text-teal-700">{phase.progress.value}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: phase.progress.percentage }}></div>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {phase.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[9px] font-mono bg-gray-100 text-gray-500 px-2 py-1 uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Output Box */}
                    <div className="bg-gray-50 border border-gray-100 p-5 rounded-sm flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="flex-grow">
                        <span className="text-[10px] font-mono text-gray-400 block mb-1">{phase.outputTitle}</span>
                        <span className="block text-sm font-bold text-[#0f1713] mb-2">{phase.outputName}</span>
                        <p className="text-xs text-gray-500 leading-relaxed max-w-xl">{phase.outputDesc}</p>
                      </div>
                      <div className="text-[10px] font-mono text-gray-400 text-left md:text-right w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0">
                        {phase.outputFooter}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};