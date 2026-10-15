// components/organisms/FeaturedStoryHero.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowDownRight, Feather, Play } from 'lucide-react';
import { StoryItem } from '../molecules/StoryItemRow';

interface FeaturedStoryHeroProps {
  item: StoryItem;
}

export const FeaturedStoryHero: React.FC<FeaturedStoryHeroProps> = ({ item }) => {
  return (
    <section className="border border-slate-900/10 bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex flex-wrap items-center justify-between px-6 py-3 border-b border-slate-900/10 bg-slate-50 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-800">Sorotan Kisah Utama</span>
          <span className="text-slate-300">/</span>
          <span>{item.code}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Kategori: {item.category}</span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="hidden sm:inline">Rilis: {item.date}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Kiri */}
        <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between space-y-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded">
              <Feather className="w-3.5 h-3.5" />
              <span>Esei Naratif & Refleksi Warga</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900 leading-[1.18] font-sans">
              {item.title}
            </h2>

            <div className="font-mono text-xs text-slate-500 space-y-1 border-l-2 border-emerald-600 pl-3">
              <p className="text-slate-800 font-medium">{item.authorOrFigure}</p>
              <p>{item.location}</p>
            </div>

            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed pt-1">
              {item.abstract}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <span className="text-slate-400">WAKTU BACA: {item.readTimeOrMedia}</span>
            <Link
              href={`/kisah-sungai/${item.slug}`}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-slate-900 hover:bg-emerald-800 text-white font-medium rounded-lg transition duration-200"
            >
              <span>Baca Esei Lengkap</span>
              <ArrowDownRight className="w-4 h-4 stroke-[2.2]" />
            </Link>
          </div>
        </div>

        {/* Kanan */}
        <div className="lg:col-span-5 relative bg-slate-900 min-h-[300px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-900/10 flex items-center justify-center p-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-3">
            <span className="inline-flex p-3.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2 shadow-inner">
              <Play className="w-6 h-6 ml-0.5" />
            </span>
            <h3 className="text-white font-semibold text-lg">Mini Dokumenter Tersedia</h3>
            <p className="text-xs text-slate-300 font-mono max-w-xs mx-auto leading-relaxed">
              Tonton cuplikan perjalanan warga merawat mata air dan mengelola bank sampah komunal.
            </p>
          </div>

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/80 pointer-events-none">
            <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
              FEATURED STORY // WINONGO
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};