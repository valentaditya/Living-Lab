// pages/WaterQualityDataPage.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { KnowledgePageLayout } from '../../components/template/KnowledgePageLayout';

import { Search } from 'lucide-react';
import { DatasetItem, DatasetItemRow } from '@/app/components/molecules/DataSetItemRow';
import { FeaturedWaterData } from '@/app/components/molecules/FeatureWaterData';

const WaterQualityDataPage = ({ items }: { items: DatasetItem[] }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const featured = items[0];

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [search, selectedCategory]);

  return (
    <KnowledgePageLayout>
      {/* 1. Header */}
      <header className="border-b border-slate-900/10 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span className="block mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Pusat Pengetahuan
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
              Data Kualitas Air
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Arsip terbuka hasil pengujian kualitas air sungai, catatan pemantauan warga, dan data spasial lingkungan untuk penelitian maupun publik.
            </p>
          </div>

          <div className="text-xs font-semibold text-emerald-700 bg-white border border-slate-200 px-3.5 py-2 rounded-lg shrink-0 self-start lg:self-auto">
            Terbuka untuk publik
          </div>
        </div>
      </header>

      {/* 2. Featured Data Card */}
      {featured && <FeaturedWaterData item={featured} />}

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari data parameter, lokasi, atau topik..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-900/10 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition font-sans"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 lg:justify-end">
          {['All', 'Uji Laboratorium', 'Pemantauan Lapangan', 'Peta & Spasial'].map((cat) => (
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

      {/* 4. Data List */}
      <div className="border border-slate-900/10 rounded-xl bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="px-6 py-3.5 border-b border-slate-900/10 bg-slate-50 text-xs text-slate-500">
          Menampilkan {filteredItems.length} Kumpulan Data
        </div>

        <div className="divide-y divide-slate-100">
          {filteredItems.map((item) => (
            <DatasetItemRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </KnowledgePageLayout>
  );
};

export default WaterQualityDataPage;