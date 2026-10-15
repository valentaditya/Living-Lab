
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Feather } from 'lucide-react';
import { StoryBadge } from '../atoms/StoryBadge';

interface StoryContentHeaderProps {
  code: string;
  category: string;
  title: string;
  authorOrFigure: string;
  location: string;
  date: string;
  readTime: string;
}

export const StoryContentHeader: React.FC<StoryContentHeaderProps> = ({
  code,
  category,
  title,
  authorOrFigure,
  location,
  date,
  readTime,
}) => {
  return (
    <header className="border-b border-slate-900/10 pb-10 space-y-6">
      {/* Tombol Kembali & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <Link
          href="/kisah-sungai"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-800 transition w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Indeks Kisah</span>
        </Link>

        <div className="flex items-center gap-2 text-slate-500">
          <span className="font-semibold text-emerald-800">{code}</span>
          <span className="text-slate-300">/</span>
          <span>{category}</span>
          <span className="text-slate-300">/</span>
          <span>{date}</span>
        </div>
      </div>

      {/* Judul Utama */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded">
          <Feather className="w-3.5 h-3.5" />
          <span>Esei & Refleksi Warga Bantaran</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.18] font-sans">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-sm text-slate-600 font-mono">
          <div>
            <span className="text-slate-400">Tokoh / Penulis: </span>
            <span className="text-slate-900 font-semibold">{authorOrFigure}</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div>
            <span className="text-slate-400">Lokasi: </span>
            <span className="text-slate-900 font-semibold">{location}</span>
          </div>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <div>
            <span className="text-slate-400">Durasi: </span>
            <span className="text-slate-900 font-semibold">{readTime}</span>
          </div>
        </div>
      </div>
    </header>
  );
};