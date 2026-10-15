// components/molecules/FeaturedModule.tsx
import React from 'react';
import { ArrowDownRight, BookOpen, Check } from 'lucide-react';
import { ModuleItem } from './ModulItemRow';



interface FeaturedModuleProps {
  item: ModuleItem;
}

export const FeaturedModule: React.FC<FeaturedModuleProps> = ({ item }) => {
  return (
    <section className="border border-slate-900/10 bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-3 border-b border-slate-900/10 bg-slate-50 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-slate-800">Modul Unggulan</span>
          <span className="text-slate-300">/</span>
          <span>{item.code}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Kategori: {item.category}</span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="hidden sm:inline">Rilis: {item.date}</span>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Kiri: Informasi Modul */}
        <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between space-y-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Panduan Belajar & Praktik Lapangan</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 leading-[1.18] font-sans">
              {item.title}
            </h2>

            <div className="font-mono text-xs text-slate-500 space-y-1 border-l-2 border-emerald-600 pl-3">
              <p className="text-slate-800 font-medium">Sasaran: {item.audience}</p>
              <p>Penyusun: {item.authors.join(', ')}</p>
            </div>

            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed pt-1">
              {item.description}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <span className="text-slate-400">TEBAL: {item.pages}</span>

            <a
              href={item.downloadUrl}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-slate-900 hover:bg-emerald-800 text-white font-medium rounded-lg transition duration-200"
            >
              <span>Unduh Modul PDF ({item.fileSize})</span>
              <ArrowDownRight className="w-4 h-4 stroke-[2.2]" />
            </a>
          </div>
        </div>

        {/* Kanan: Ringkasan Isi Materi */}
        <div className="lg:col-span-5 bg-slate-50/70 p-7 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-900/10">
          <div className="space-y-1 mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-800 font-semibold">
              Cakupan Materi
            </span>
            <h3 className="text-base font-semibold text-slate-900">
              Apa Saja yang Dipelajari?
            </h3>
          </div>

          <div className="space-y-3 my-auto">
            {item.highlights.map((point, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-slate-200/80 flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-700" />
                </div>
                <span className="text-sm text-slate-700 font-medium leading-snug">
                  {point}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 mt-6 pt-4 border-t border-slate-200/60 leading-relaxed">
            Dapat dicetak langsung untuk kegiatan sekolah sungai, penyuluhan warga, maupun praktikum mandiri.
          </p>
        </div>
      </div>
    </section>
  );
};