import React from 'react';
import Image from 'next/image';

export const BeritaTerkini = () => {
  const listBerita = [
    { date: "05 FEB 2025", title: "Ekspedisi Riparian 2025: Penemuan 1.200 Rumpun Bambu Apus Penahan Erosi Tebing Kali Winongo", tag: "RESTORASI TEBING" },
    { date: "29 JAN 2025", title: "Integrasi Sistem Kompos Organik Bank Sampah Muju Muju Turunkan 42% Beban Residu Sempadan", tag: "SIKLAR EKONOMI" },
    { date: "22 JAN 2025", title: "Kajian Pola Sedimentasi Pasca Lahar Merapi: Analisis Konsentrasi Pasir Lahar di Code Hilir", tag: "RISET HIDROLOGI" },
    { date: "12 JAN 2025", title: "Peringatan Dini Banjir Berbasis WhatsApp Bot Terbukti Efektif di 8 RW Rawan Genangan Bantara", tag: "TEKNOLOGI WARGA" },
    { date: "04 JAN 2025", title: "Laporan Kualitas Air Triwulanan IV 2024 Diterbitkan Resmi untuk Pemangku Kepentingan dan Publik", tag: "DOKUMEN RESMI" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-[10px] font-mono text-gray-500 tracking-widest block mb-2">[ SEKSI 01 // WARTA UTAMA ]</span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#0f1713]">Berita Terkini Koridor Sungai</h2>
          </div>
          <p className="text-gray-500 text-sm max-w-md text-left md:text-right">
            Liputan mendalam tentang pengujian kualitas air hujan, inovasi sensor terapan, dan kolaborasi warga di Kali Code, Kali Winongo, dan Kali Gajahwong.
          </p>
        </div>

        {/* Main News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left: Large Article */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative w-full h-[350px] bg-gray-100 rounded-sm overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop"
                alt="Pemasangan Sensor IoT"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500">
                <span className="text-teal-700 font-bold">19 FEBRUARI 2025</span>
                <span>•</span>
                <span>KORIDOR KALI WINONGO</span>
                <span>•</span>
                <span>TELEMETRI & IOT</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#0f1713] hover:text-teal-700 cursor-pointer transition-colors">
                Pemasangan 16 Titik Sensor LoRaWAN Swadaya: Mengawal Kualitas Air Kali Winongo Secara Real-Time
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Kolaborasi meluas antara Tim Riset Informatika UAJY, Forum Komunitas Winongo Asri (FKWA), meluncurkan jaringan pemantauan sensor sungai. Data dissolved oxygen (DO) dan turbiditas kini dapat diakses langsung oleh masyarakat bantaran untuk mitigasi dini limbah cair rumah tangga.
              </p>
              <div className="flex justify-between items-center mt-2 border-t border-gray-100 pt-4">
                <span className="text-xs text-gray-500 font-medium">Oleh: Tim Telemetri Living Lab UAJY</span>
                <a href="#" className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1">
                  Baca Selengkapnya <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Stacked Articles */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-sm p-4 flex gap-4 hover:shadow-md transition-shadow">
              <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Ekosistem" fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 block mb-1">14 FEBRUARI 2025 // RISET MIKROPLASTIK</span>
                  <h4 className="font-semibold text-sm text-[#0f1713] leading-tight mb-2">Penemuan Spesimen Mikroplastik pada Filtrasi Air Baku di Instalasi Pengolahan Air Minum</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">Purwarupa filter berbasis mikroorganisme lokal menunjukkan efektivitas 89% dalam mengurangi partikel.</p>
                </div>
                <a href="#" className="text-[10px] font-mono text-teal-700 hover:text-teal-900">Baca Rilis →</a>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-sm p-4 flex gap-4 hover:shadow-md transition-shadow">
              <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-sm overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=200&auto=format&fit=crop" alt="Sekolah Sungai" fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 block mb-1">09 FEBRUARI 2025 // PENDIDIKAN LINGKUNGAN</span>
                  <h4 className="font-semibold text-sm text-[#0f1713] leading-tight mb-2">Sekolah Sungai Angkatan XII: 45 Kader Pemuda Dilatih Uji Nitrat dan Deteksi Mikroplastik</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">Program mentoring selama 3 bulan untuk mencetak relawan bantara yang memahami uji kualitas air.</p>
                </div>
                <a href="#" className="text-[10px] font-mono text-teal-700 hover:text-teal-900">Baca Rilis →</a>
              </div>
            </div>
          </div>
        </div>

        {/* News List Table */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-mono text-gray-500">ARIP BERITA SELANJUTNYA // MINGGUAN TERBARU</span>
          </div>
          <div className="flex flex-col divide-y divide-gray-100">
            {listBerita.map((berita, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-5 items-center hover:bg-gray-50 transition-colors px-2">
                <span className="md:col-span-1 text-[10px] font-mono text-gray-400">{berita.date}</span>
                <h4 className="md:col-span-9 text-sm font-medium text-[#0f1713]">{berita.title}</h4>
                <div className="md:col-span-2 flex justify-end">
                  <span className="text-[9px] font-mono text-teal-700 bg-teal-50 px-2 py-1 border border-teal-100">{berita.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};