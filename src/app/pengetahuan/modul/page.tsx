// pages/EducationModulesPage.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { KnowledgePageLayout } from '../../components/template/KnowledgePageLayout';

import { Search } from 'lucide-react';
import { ModuleItem, ModuleItemRow } from '@/app/components/molecules/ModulItemRow';
import { FeaturedModule } from '@/app/components/molecules/FeatureModul';

const MODULES_MOCK: ModuleItem[] = [
  {
    id: 'mod-1',
    code: 'MOD-2026-08',
    category: 'Panduan Praktik',
    title: 'Panduan Menilai Kesehatan Sungai Melalui Pengamatan Biota Air (Biomonitoring)',
    authors: ['Tim Edukasi Living-Lab', 'Komunitas Sekolah Sungai'],
    audience: 'Warga, Pelajar & Relawan',
    description: 'Buku panduan praktis mengenali jenis serangga dan biota dasar sungai sebagai indikator alami kebersihan air tanpa menggunakan alat kimia yang rumit.',
    highlights: [
      'Cara mengambil sampel biota di tepian sungai secara aman',
      'Lembar bergambar pengenalan biota air bersih vs tercemar',
      'Langkah menyimpulkan status kesehatan sungai bersama warga'
    ],
    date: 'Agu 2026',
    pages: '36 Halaman',
    fileSize: '5.2 MB',
    downloadUrl: '#'
  },
  {
    id: 'mod-2',
    code: 'MOD-2026-06',
    category: 'Buku Saku',
    title: 'Buku Saku Pengelolaan Sampah Rumah Tangga & Limbah Cair di Kawasan Bantaran',
    authors: ['PSL UAJY', 'Aliansi Warga Bantaran'],
    audience: 'Keluarga & Pengurus RT/RW',
    description: 'Langkah sederhana memilah sampah organik rumah tangga dan membuat saringan air limbah cucian sederhana agar tidak mencemari aliran sungai.',
    highlights: [
      'Pembuatan kompos rumahan dari sisa dapur',
      'Desain bak saring air cucian dengan tanaman lokal',
      'Panduan kerja bakti pembersihan sempadan sungai'
    ],
    date: 'Jun 2026',
    pages: '24 Halaman',
    fileSize: '3.8 MB',
    downloadUrl: '#'
  },
  {
    id: 'mod-3',
    code: 'INF-2026-04',
    category: 'Infografis',
    title: 'Poster Edukasi: Mengenal Ekosistem Sungai Yogyakarta & Cara Menjaganya',
    authors: ['Tim Desain Komunikasi & Lingkungan UAJY'],
    audience: 'Sekolah & Ruang Publik Warga',
    description: 'Rangkaian poster visual ukuran cetak A3 yang menjelaskan fungsi sempadan sungai, bahaya sampah plastik, serta peran vegetasi tepi sungai.',
    highlights: [
      'Ilustrasi rantai makanan ekosistem sungai',
      'Dampak mikroplastik bagi kesehatan lingkungan',
      'Daftar tanaman lokal penahan erosi tebing sungai'
    ],
    date: 'Apr 2026',
    pages: '6 Poster',
    fileSize: '7.4 MB',
    downloadUrl: '#'
  }
];

const EducationModulesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const featured = MODULES_MOCK[0];

  const filteredItems = useMemo(() => {
    return MODULES_MOCK.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.authors.some((a) => a.toLowerCase().includes(search.toLowerCase()));
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [search, selectedCategory]);

  return (
    <KnowledgePageLayout>
      {/* 1. Header */}
      <header className="border-b border-slate-900/10 pb-8 space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-800">
          <span className="font-semibold">Pusat Pengetahuan</span>
          <span className="text-slate-300">/</span>
          <span>Index 03</span>
          <span className="text-slate-300">/</span>
          <span>Modul Edukasi</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
              Modul Edukasi & Materi Belajar
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Kumpulan buku saku, panduan praktik lapangan, dan poster infografis yang disusun untuk kegiatan belajar warga, sekolah, dan komunitas sungai.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-500 bg-white border border-slate-200 px-3.5 py-2 rounded-lg shrink-0 self-start lg:self-auto">
            LISENSI MATERI: <span className="text-emerald-700 font-semibold">BEBAS UNDUH & CETAK</span>
          </div>
        </div>
      </header>

      {/* 2. Featured Module */}
      <FeaturedModule item={featured} />

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ketik judul modul, topik, atau sasaran pembaca..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-900/10 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition font-sans"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Panduan Praktik', 'Buku Saku', 'Infografis'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
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

      {/* 4. Module List */}
      <div className="border border-slate-900/10 rounded-xl bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="px-6 py-3.5 border-b border-slate-900/10 bg-slate-50 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>Menampilkan {filteredItems.length} Modul Pembelajaran</span>
          <span>FORMAT TERSEDIA: PDF SIAP CETAK</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredItems.map((item) => (
            <ModuleItemRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </KnowledgePageLayout>
  );
};

export default EducationModulesPage;