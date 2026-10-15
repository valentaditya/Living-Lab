// components/molecules/DatasetItemRow.tsx
import React from 'react';
import { Download } from 'lucide-react';

export interface DatasetItem {
  id: string;
  code: string;
  category: 'Uji Laboratorium' | 'Pemantauan Lapangan' | 'Peta & Spasial';
  title: string;
  location: string;
  institution: string;
  description: string;
  date: string;
  format: 'CSV / Excel' | 'Excel (XLSX)' | 'GeoJSON / Peta';
  fileSize: string;
  downloadUrl: string;
}

export const DatasetItemRow: React.FC<{ item: DatasetItem }> = ({ item }) => {
  return (
    <article className="group relative p-6 sm:p-7 bg-white hover:bg-slate-50/80 transition-all duration-200 border-b border-slate-200 last:border-b-0">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        
        {/* Left Col: Code & Category */}
        <div className="lg:w-48 shrink-0 flex lg:flex-col items-center lg:items-start justify-between gap-2">
          <span className="font-mono text-xs font-semibold text-emerald-800 tracking-wider">
            {item.code}
          </span>
          <span className="inline-block text-[11px] font-medium uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
            {item.category}
          </span>
          <span className="text-xs font-mono text-slate-400 mt-auto hidden lg:block">
            {item.date}
          </span>
        </div>

        {/* Mid Col: Main Content */}
        <div className="flex-1 space-y-2.5 max-w-3xl">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-900 transition-colors">
            <a href={item.downloadUrl} className="focus:outline-none">
              <span className="absolute inset-0 lg:left-48 lg:right-44" />
              {item.title}
            </a>
          </h3>

          <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-600">
            <span className="font-medium text-slate-800">{item.location}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{item.institution}</span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center gap-4 pt-1 text-xs font-mono text-slate-400">
            <span>Format: {item.format}</span>
            <span className="lg:hidden">{item.date}</span>
          </div>
        </div>

        {/* Right Col: Action & Meta */}
        <div className="lg:w-40 shrink-0 flex lg:flex-col items-center lg:items-end justify-between gap-3 relative z-10 pt-2 lg:pt-0">
          <span className="text-xs font-mono text-slate-400">{item.fileSize}</span>

          <a
            href={item.downloadUrl}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors border border-slate-200 hover:border-emerald-600"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Data</span>
          </a>
        </div>

      </div>
    </article>
  );
};