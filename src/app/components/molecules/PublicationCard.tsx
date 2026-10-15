import React from 'react';
import { FileText, Download, ArrowUpRight } from 'lucide-react';

export interface PublicationItem {
  id: string;
  type: 'Policy Brief' | 'Jurnal Riset' | 'Artikel Ilmiah';
  title: string;
  authors: string;
  abstract: string;
  date: string;
  doi?: string;
  downloadUrl: string;
}

export const PublicationCard: React.FC<{ item: PublicationItem }> = ({ item }) => (
  <article className="p-6 bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 transition duration-200 hover:shadow-md flex flex-col justify-between">
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
          {item.type}
        </span>
        <span className="text-xs font-mono text-slate-400">{item.date}</span>
      </div>

      <h3 className="text-lg font-semibold text-slate-900 hover:text-emerald-800 transition-colors leading-snug">
        {item.title}
      </h3>
      <p className="mt-1 text-xs text-slate-500 font-medium">Penulis: {item.authors}</p>
      <p className="mt-3 text-sm text-slate-600 line-clamp-3 leading-relaxed">
        {item.abstract}
      </p>
    </div>

    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
      <span className="text-[11px] font-mono text-slate-400">
        {item.doi ? `DOI: ${item.doi}` : 'Publikasi Terbuka'}
      </span>
      <div className="flex items-center gap-3">
        <a
          href={item.downloadUrl}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 py-1.5 px-3 rounded-lg border border-slate-200 hover:border-emerald-300 transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>PDF</span>
        </a>
      </div>
    </div>
  </article>
);