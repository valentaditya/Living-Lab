import React from 'react';
import Image from 'next/image';

export const LaporanAktivitas = () => {
  const reports = [
    {
      title: "Laporan Kepalasejahteraan Kolaboratif: Code Mengadopsi Sesi Konservasi Masyarakat 2024-2025",
      date: "DOKUMEN RISET // LAPORAN SEMESTER II",
      desc: "Analisis kuantitatif partisipatif tentang adopsi teknologi ramah lingkungan di 12 bantaran sungai.",
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop",
      size: "84.2 MB // PDF"
    },
    {
      title: "Katalog Bio-Indikator Riparian: Panduan Identifikasi Makrobentos Tiga Sungai Yogyakarta",
      date: "TAKSONOMI LAPANGAN // AKSI EKSPEDISI 24",
      desc: "Panduan visual untuk peneliti muda dan relawan dalam mengenali spesies air sebagai indikator kualitas air.",
      img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600&auto=format&fit=crop",
      size: "54.8 MB // PDF"
    },
    {
      title: "Audit Ekologi Restorasi Bambu dan Ketahanan Tanggul Alami Kali Winongo (2022-2024)",
      date: "MONITORING EKOLOGI // DOKUMEN TAHUNAN",
      desc: "Studi pengukuran tingkat keberhasilan penanaman bambu dalam mencegah erosi tebing sungai.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      size: "112.4 MB // PDF"
    }
  ];

  return (
    <section className="py-20 bg-[#f4f5f3] border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-[10px] font-mono text-gray-500 tracking-widest block mb-2">[ SEKSI 03 // REPOSITORI SAINS & ARSIP ]</span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#0f1713]">Laporan Aktivitas & Dokumen Lapangan</h2>
          </div>
          <p className="text-gray-500 text-sm max-w-md text-left md:text-right">
            Dokumentasi berkala pelaksanaan program restorasi, logbook kegiatan, dan analisis data hidrologi yang dipublikasikan secara terbuka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reports.map((report, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full bg-gray-100">
                <Image src={report.img} alt={report.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-[10px] font-mono text-gray-400 block mb-2">{report.date}</span>
                <h3 className="text-base font-semibold text-[#0f1713] leading-tight mb-3">{report.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-6 flex-grow">{report.desc}</p>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center mt-auto">
                  <span className="text-[10px] font-mono text-gray-400">{report.size}</span>
                  <a href="#" className="text-xs font-semibold text-teal-700 hover:text-teal-900">Baca Laporan →</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f1713] border border-gray-300 px-8 py-3 rounded-sm hover:bg-gray-100 transition-colors">
            BUKA SELURUH REPOSITORI LAPORAN TERBUKA (LAPOR) <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
};