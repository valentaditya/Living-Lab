// components/molecules/FeaturedPublication.tsx
import React from 'react';
import { ArrowDownRight, FileText, Play } from 'lucide-react';
import { PublicationItem } from './PublicationItemRow';

interface FeaturedPublicationProps {
  item: PublicationItem;
  videoSrc?: string;
}

export const FeaturedPublication: React.FC<FeaturedPublicationProps> = ({
  item,
  videoSrc = "/videos/river.mp4"
}) => {
  return (
    <section className="border border-slate-900/10 bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* Main Grid: Split Asimetris */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Kolom Kiri: Metadata & Teks Editorial */}
        <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between space-y-8">
          <div className="space-y-5">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Spesimen Riset Terpilih
            </span>
            <div className="inline-flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded">
              <FileText className="w-3.5 h-3.5" />
              <span>Dokumen Kebijakan & Riset DAS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 leading-[1.18] font-sans">
              {item.title}
            </h2>

            <div className="text-xs text-slate-500 space-y-1 border-l-2 border-emerald-600 pl-3">
              <p className="text-slate-800 font-medium">{item.authors.join(', ')}</p>
              <p>{item.institution}</p>
            </div>

            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed pt-1">
              {item.abstract}
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="text-slate-400">
              {item.type} · {item.date}
              {item.doi && <> · <span className="whitespace-nowrap">DOI: {item.doi}</span></>}
            </span>

            <a
              href={item.downloadUrl}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-slate-900 hover:bg-emerald-800 text-white font-medium rounded-lg transition duration-200"
            >
              <span>Akses Full Paper ({item.fileSize})</span>
              <ArrowDownRight className="w-4 h-4 stroke-[2.2]" />
            </a>
          </div>
        </div>

        {/* Kolom Kanan: Video Frame Teknis */}
        <div className="lg:col-span-5 relative bg-slate-900 min-h-[280px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-900/10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover grayscale-[25%] contrast-110"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-4 left-4 right-4 text-[11px] text-white/90">
            <p className="bg-black/60 backdrop-blur-md p-2.5 rounded-lg border border-white/10 leading-snug">
              Dokumentasi aerofotogrametri dinamika sempadan dan endapan mikroplastik bantaran.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};