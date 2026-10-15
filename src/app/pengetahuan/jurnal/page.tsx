// pages/PublicationsPage.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { KnowledgePageLayout } from '../../components/template/KnowledgePageLayout';
import { FeaturedPublication } from '../../components/molecules/FeaturePublication';
import { PublicationItemRow, PublicationItem } from '../../components/molecules/PublicationItemRow';
import { Search } from 'lucide-react';

const PUBLICATIONS_MOCK: PublicationItem[] = [
  {
    id: 'pub-1',
    code: 'PB-2026-09',
    type: 'Policy Brief',
    title: 'Strategi Pengendalian Beban Pencemaran Mikroplastik dan Limbah Domestik DAS',
    authors: ['Tim Peneliti Living-Lab', 'Aliansi Warga Bantaran', 'PSL UAJY'],
    institution: 'Universitas Atma Jaya Yogyakarta',
    abstract: 'Analisis rekomendasi kebijakan untuk pemerintah daerah mengenai integrasi regulasi sempadan sungai, penegakan baku mutu air, dan insentif pemilahan sampah organik rumah tangga.',
    date: 'Sep 2026',
    doi: '10.1016/policy.2026.09',
    fileSize: '4.2 MB',
    downloadUrl: '#'
  },
  {
    id: 'pub-2',
    code: 'JR-2026-07',
    type: 'Jurnal Riset',
    title: 'Biomonitoring Bentos Makroinvertebrata Sebagai Bioindikator Kualitas Air Sungai',
    authors: ['Dr. Hendra W.', 'Siti Nur A.', 'Lab Terpadu Teknik Sipil'],
    institution: 'Jurnal Pengelolaan Sumberdaya Alam',
    abstract: 'Studi komparasi antara indeks biotik famili makroinvertebrata dengan parameter kimiawi (BOD, COD, DO) di 14 titik sampling hulu hingga hilir sungai.',
    date: 'Jul 2026',
    doi: '10.1016/j.aquat.2026.04',
    fileSize: '8.1 MB',
    downloadUrl: '#'
  },
  {
    id: 'pub-3',
    code: 'ART-2026-05',
    type: 'Artikel Ilmiah',
    title: 'Model Partisipatif: Transformasi Sensor Kualitas Air IoT oleh Komunitas Tepi Sungai',
    authors: ['Hardiek Tatendra', 'Grup Riset Sistem Tertanam', 'Forum Kali'],
    institution: 'Prosiding Konferensi Rekayasa Komputasi & Lingkungan',
    abstract: 'Evaluasi akurasi dan ketahanan sensor open-source telemetri kualitas air berbasis mikrokontroler murah yang dipelihara secara kolektif oleh warga bantaran.',
    date: 'Mei 2026',
    fileSize: '2.8 MB',
    downloadUrl: '#'
  }
];

const PublicationsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const featured = PUBLICATIONS_MOCK[0];

  const filteredItems = useMemo(() => {
    return PUBLICATIONS_MOCK.filter((item) => {
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
      <header className="border-b border-slate-900/10 pb-8 space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-800">
          <span className="font-semibold">Pusat Pengetahuan</span>
          <span className="text-slate-300">/</span>
          <span>Index 01</span>
          <span className="text-slate-300">/</span>
          <span>Naskah & Publikasi</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
              Jurnal & Publikasi Ilmiah
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Arsip publikasi peer-reviewed, policy briefs, dan laporan sintesis saintifik Living Lab Sungai UAJY bersama komunitas.
            </p>
          </div>
          
          <div className="font-mono text-xs text-slate-500 bg-white border border-slate-200 px-3.5 py-2 rounded-lg shrink-0 self-start lg:self-auto">
            STATUS ARSIP: <span className="text-emerald-700 font-semibold">TERBUKA (OPEN ACCESS)</span>
          </div>
        </div>
      </header>

      {/* 2. Featured Specimen (Layout Split Bersih) */}
      <FeaturedPublication item={featured} videoSrc="/videos/river.mp4" />

      {/* 3. Utility Search & Categorization Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ketik judul, nama peneliti, atau topik..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-900/10 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition font-sans"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Policy Brief', 'Jurnal Riset', 'Artikel Ilmiah'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
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
        <div className="px-6 py-3.5 border-b border-slate-900/10 bg-slate-50 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>Menampilkan {filteredItems.length} Naskah Terindeks</span>
          <span>FORMAT TERSEDIA: PDF / DOI</span>
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