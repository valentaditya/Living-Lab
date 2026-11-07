// app/kisah-sungai/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { StoryItem, StoryItemRow } from '../components/molecules/StoryItemRow';
import { FeaturedStoryHero } from '../components/organisms/FeatureStoryHero';


const CATEGORIES = [
  'All',
  'River Stories',
  'Community Stories',
  'People of the River',
  'Field Notes',
  'Photo Essay',
  'Mini Documentary'
];

export default function KisahSungaiPage({ items }: { items: StoryItem[] }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const featuredStory = items[0];

  const filteredStories = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.abstract.toLowerCase().includes(search.toLowerCase()) ||
        item.authorOrFigure.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900 antialiased selection:bg-emerald-200 selection:text-emerald-950 font-sans relative">
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <main className="relative z-10 mx-auto px-6 sm:px-8 lg:px-12 pt-28 md:pt-36 pb-24 space-y-12">
        
        {/* Header */}
        <header className="border-b border-slate-900/10 pb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 font-sans">
            Kisah & Refleksi Sungai
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Mengeksplorasi ikatan mendalam antara manusia dan sungai melalui narasi human-centered, catatan lapangan, esei foto, serta dokumenter mini kehidupan bantaran.
          </p>
        </header>

        {/* Featured Organism */}
        {featuredStory && <FeaturedStoryHero item={featuredStory} />}

        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kisah, tokoh, atau topik bantaran..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-900/10 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition font-sans shadow-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 lg:justify-end">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white font-medium shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="border border-slate-900/10 rounded-xl bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="px-6 py-3.5 border-b border-slate-900/10 bg-slate-50 text-xs text-slate-500">
            Menampilkan {filteredStories.length} Narasi & Catatan Lapangan
          </div>

          <div className="divide-y divide-slate-100">
            {filteredStories.map((item) => (
              <StoryItemRow key={item.id} item={item} />
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}