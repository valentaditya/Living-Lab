
import React from 'react';
import { BookOpen, ArrowDownRight, CheckCircle2, Layers } from 'lucide-react';
import { ModuleItem } from './ModulItemRow';


interface FeaturedLearningModuleProps {
  item: ModuleItem;
  previewImage?: string;
}

export const FeaturedLearningModule: React.FC<FeaturedLearningModuleProps> = ({
  item,
  previewImage = '/images/field-guide-preview.jpg'
}) => {
  return (
    <section className="border border-slate-900/10 bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* Top Ledger Strip */}
      <div className="flex flex-wrap items-center justify-between px-6 py-3 border-b border-slate-900/10 bg-slate-50 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-slate-800">Kurikulum Lapangan Utama</span>
          <span className="text-slate-300">/</span>
          <span>{item.code}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Sasaran: {item.audience}</span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="hidden sm:inline">Durasi: {item.duration}</span>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Kiri: Detail Kurikulum */}
        <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between space-y-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{item.category} • Edisi Terbuka</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 leading-[1.18]">
              {item.title}
            </h2>

            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              {item.description}
            </p>

            {/* Cakupan Materi / Silabus */}
            <div className="pt-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 block mb-3">
                Kompetensi & Cakupan Praktikum:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.keyTopics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium leading-snug">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3 text-slate-500">
              <span>TINGKAT: {item.level.toUpperCase()}</span>
              <span>•</span>
              <span>{item.pageCount} HALAMAN</span>
            </div>

            <a
              href={item.downloadUrl}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-slate-900 hover:bg-emerald-800 text-white font-medium rounded-lg transition duration-200"
            >
              <span>Unduh Paket Modul ({item.fileSize})</span>
              <ArrowDownRight className="w-4 h-4 stroke-[2.2]" />
            </a>
          </div>
        </div>

        {/* Kanan: Kartu Visual Spesimen / Infografis */}
        <div className="lg:col-span-5 relative bg-slate-900 min-h-[300px] lg:min-h-full p-7 flex flex-col justify-between overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-900/10 text-white">
          {/* Background Technical Grid */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />

          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-emerald-300">
            <span className="bg-emerald-950/80 border border-emerald-700/50 px-2.5 py-1 rounded">
              KIT PRAKTIKUM WARGA
            </span>
            <span className="text-slate-400">LEMBAR KERJA + INFOGRAFIS</span>
          </div>

          {/* Ilustrasi Struktur Modul */}
          <div className="relative z-10 my-8 space-y-3">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
              <span className="font-mono text-[10px] text-emerald-400 uppercase">Tahap 01 // Observasi Fisik</span>
              <p className="text-sm font-medium text-white">Pemetaan Karakteristik Substrat & Sempadan</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1 ml-4">
              <span className="font-mono text-[10px] text-emerald-400 uppercase">Tahap 02 // Sampling Biota</span>
              <p className="text-sm font-medium text-white">Identifikasi Makroinvertebrata (Metode Kick-Net)</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1 ml-8">
              <span className="font-mono text-[10px] text-emerald-400 uppercase">Tahap 03 // Sintesis Skor</span>
              <p className="text-sm font-medium text-white">Perhitungan Indeks Biotik & Pelaporan Komunitas</p>
            </div>
          </div>

          <div className="relative z-10 text-[11px] font-mono text-slate-300 bg-black/40 p-3 rounded-lg border border-white/10">
            Dilengkapi kunci determinasi visual tahan air (waterproof print-ready) untuk penggunaan langsung di tepi sungai.
          </div>
        </div>
      </div>
    </section>
  );
};