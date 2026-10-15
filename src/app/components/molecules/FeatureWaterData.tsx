// components/molecules/FeaturedWaterData.tsx
import React from 'react';
import { ArrowDownRight, Droplets } from 'lucide-react';
import { DatasetItem } from './DataSetItemRow';


interface FeaturedWaterDataProps {
  item: DatasetItem;
}

const SUMMARY_METRICS = [
  { label: 'Derajat Keasaman (pH)', value: '7.2', note: 'Normal (6–9)' },
  { label: 'Oksigen Terlarut (DO)', value: '6.4 mg/L', note: 'Baik (> 4 mg/L)' },
  { label: 'Kebutuhan Oksigen (BOD)', value: '2.8 mg/L', note: 'Baku Mutu Kelas II' },
  { label: 'Suhu Air Rata-rata', value: '26.5 °C', note: 'Kondisi Stabil' },
];

export const FeaturedWaterData: React.FC<FeaturedWaterDataProps> = ({ item }) => {
  return (
    <section className="border border-slate-900/10 bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-3 border-b border-slate-900/10 bg-slate-50 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-slate-800">Dataset Utama</span>
          <span className="text-slate-300">/</span>
          <span>{item.code}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Kategori: {item.category}</span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="hidden sm:inline">Periode: {item.date}</span>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Kiri: Informasi Dataset */}
        <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between space-y-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded">
              <Droplets className="w-3.5 h-3.5" />
              <span>Pemantauan Kualitas Air Sungai</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 leading-[1.18] font-sans">
              {item.title}
            </h2>

            <div className="font-mono text-xs text-slate-500 space-y-1 border-l-2 border-emerald-600 pl-3">
              <p className="text-slate-800 font-medium">{item.location}</p>
              <p>{item.institution}</p>
            </div>

            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed pt-1">
              {item.description}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <span className="text-slate-400">FORMAT: {item.format}</span>

            <a
              href={item.downloadUrl}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-slate-900 hover:bg-emerald-800 text-white font-medium rounded-lg transition duration-200"
            >
              <span>Unduh Data Lengkap ({item.fileSize})</span>
              <ArrowDownRight className="w-4 h-4 stroke-[2.2]" />
            </a>
          </div>
        </div>

        {/* Kanan: Ringkasan Parameter Bersih */}
        <div className="lg:col-span-5 bg-slate-50/70 p-7 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-900/10">
          <div className="space-y-1 mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-800 font-semibold">
              Ringkasan Lapangan
            </span>
            <h3 className="text-base font-semibold text-slate-900">
              Rata-rata Parameter Air Saat Ini
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto">
            {SUMMARY_METRICS.map((m) => (
              <div
                key={m.label}
                className="bg-white p-4 rounded-lg border border-slate-200/80 space-y-1"
              >
                <span className="text-xs text-slate-500 block">{m.label}</span>
                <span className="text-xl font-semibold text-slate-900 font-mono block">
                  {m.value}
                </span>
                <span className="text-[11px] font-mono text-emerald-700 block pt-1">
                  {m.note}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 mt-6 pt-4 border-t border-slate-200/60 leading-relaxed">
            Diambil dari pengujian rutin bulanan bersama komunitas warga dan laboratorium kampus.
          </p>
        </div>
      </div>
    </section>
  );
};