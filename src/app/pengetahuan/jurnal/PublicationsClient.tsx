// pages/PublicationsPage.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { KnowledgePageLayout } from '../../components/template/KnowledgePageLayout';
import { FeaturedPublication } from '../../components/molecules/FeaturePublication';
import { PublicationItemRow, PublicationItem } from '../../components/molecules/PublicationItemRow';
import { Search } from 'lucide-react';

const PublicationsPage = ({ items }: { items: PublicationItem[] }) => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const featured = items[0];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.abstract.toLowerCase().includes(search.toLowerCase()) ||
        item.authors.some((a) => a.toLowerCase().includes(search.toLowerCase()));
      const matchType = selectedType === 'All' || item.type === selectedType;
      return matchSearch && matchType;
    });
  }, [search, selectedType]);

  return (
    <KnowledgePageLayout>
      {/* 1. Header Tipografis Bersih */}
      <header className="border-b border-slate-900/10 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="block mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Pusat Pengetahuan
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
              Jurnal & Publikasi Ilmiah
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Arsip publikasi peer-reviewed, policy briefs, dan laporan sintesis saintifik Living Lab Sungai UAJY bersama komunitas.
            </p>
          </div>
          
          <div className="text-xs font-semibold text-emerald-700 bg-white border border-slate-200 px-3.5 py-2 rounded-lg shrink-0 self-start lg:self-auto">
            Akses terbuka (open access)
          </div>
        </div>
      </header>

      {/* 2. Featured Specimen (Layout Split Bersih) */}
      {featured && <FeaturedPublication item={featured} videoSrc="/videos/river.mp4" />}

      {/* 3. Utility Search & Categorization Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ketik judul, nama peneliti, atau topik..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-900/10 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition font-sans"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 lg:justify-end">
          {['All', 'Policy Brief', 'Jurnal Riset', 'Artikel Ilmiah'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3.5 py-2 rounded-lg text-xs transition-all whitespace-nowrap ${
                selectedType === type
                  ? 'bg-slate-900 text-white font-medium shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Editorial Index Registry */}
      <div className="border border-slate-900/10 rounded-xl bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="px-6 py-3.5 border-b border-slate-900/10 bg-slate-50 text-xs text-slate-500">
          Menampilkan {filteredItems.length} Naskah Terindeks
        </div>

        <div className="divide-y divide-slate-100">
          {filteredItems.map((item) => (
            <PublicationItemRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </KnowledgePageLayout>
  );
};

export default PublicationsPage;