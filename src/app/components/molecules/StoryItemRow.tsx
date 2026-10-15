
import React from 'react';
import Link from 'next/link';
import { ArrowDownRight } from 'lucide-react';
import { StoryBadge } from '../atoms/StoryBadge';

export interface StoryItem {
  id: string;
  code: string;
  category: 'River Stories' | 'Community Stories' | 'People of the River' | 'Field Notes' | 'Photo Essay' | 'Mini Documentary';
  title: string;
  authorOrFigure: string;
  location: string;
  abstract: string;
  date: string;
  readTimeOrMedia: string;
  slug: string;
}

export const StoryItemRow: React.FC<{ item: StoryItem }> = ({ item }) => {
  return (
    <article className="group relative p-6 sm:p-7 bg-white hover:bg-slate-50/80 transition-all duration-200 border-b border-slate-200 last:border-b-0">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        
        {/* Left Col */}
        <div className="lg:w-48 shrink-0 flex lg:flex-col items-center lg:items-start justify-between gap-2">
          <StoryBadge text={item.code} variant="code" />
          <StoryBadge text={item.category} variant="category" />
          <span className="text-xs font-mono text-slate-400 mt-auto hidden lg:block pt-2">
            {item.date}
          </span>
        </div>

        {/* Mid Col */}
        <div className="flex-1 space-y-2.5 max-w-3xl">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-900 transition-colors">
            <Link href={`/kisah-sungai/${item.slug}`} className="focus:outline-none">
              <span className="absolute inset-0 lg:left-48 lg:right-44" />
              {item.title}
            </Link>
          </h3>

          <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-600">
            <span className="font-medium text-slate-800">{item.authorOrFigure}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{item.location}</span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
            {item.abstract}
          </p>

          <div className="flex items-center gap-4 pt-1 text-xs font-mono text-slate-400">
            <span>{item.readTimeOrMedia}</span>
            <span className="lg:hidden">{item.date}</span>
          </div>
        </div>

        {/* Right Col */}
        <div className="lg:w-40 shrink-0 flex lg:flex-col items-center lg:items-end justify-between gap-3 relative z-10 pt-2 lg:pt-0">
          <span className="text-xs font-mono text-slate-400">{item.readTimeOrMedia}</span>

          <Link
            href={`/kisah-sungai/${item.slug}`}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors border border-slate-200 hover:border-emerald-600 shadow-sm"
          >
            <span>Baca Kisah</span>
            <ArrowDownRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </article>
  );
};