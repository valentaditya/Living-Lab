// app/kisah-sungai/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { StoryItem, StoryItemRow } from '../components/molecules/StoryItemRow';
import { FeaturedStoryHero } from '../components/organisms/FeatureStoryHero';


const STORIES_MOCK: StoryItem[] = [
  {
    id: 'str-1',
    code: 'STR-2026-01',
    category: 'People of the River',
    title: 'Perempuan Penjaga Titik Air: Ketangguhan Ibu-Ibu Bantaran Winongo Merawat Aliran Kehidupan',
    authorOrFigure: 'Ibu Siti Aminah & Komunitas Perempuan Bantaran',
    location: 'Koridor DAS Winongo, Yogyakarta',
    abstract: 'Bagaimana gerakan kolektif para ibu di tepian sungai mengubah stigma halaman belakang rumah yang kotor menjadi ruang publik hijau dan pusat ekonomi sirkular warga.',
    date: 'Okt 2026',
    readTimeOrMedia: '6 Menit Baca / Video',
    slug: 'perempuan-penjaga-titik-air'
  },
  {
    id: 'str-2',
    code: 'STR-2026-02',
    category: 'Community Stories',
    title: 'Bank Sampah Muja Muju: Dari Timbulan Plastik Menjadi Kolektif Ekonomi Warga',
    authorOrFigure: 'Pengurus Bank Sampah Mandiri',
    location: 'Bantaran Sungai Gajahwong',
    abstract: 'Transformasi pengelolaan sampah mandiri yang tidak hanya membersihkan aliran sungai tetapi juga menggerakkan tabungan pendidikan anak-anak warga sekitar.',
    date: 'Sep 2026',
    readTimeOrMedia: '5 Menit Baca',
    slug: 'bank-sampah-muja-muju'
  },
  {
    id: 'str-3',
    code: 'STR-2026-03',
    category: 'Field Notes',
    title: 'Catatan Lapangan: Mengukur Kualitas Air Bersama Petani Urban Pertanian Organik Tepi Sungai',
    authorOrFigure: 'Tim Riset Lapangan Living Lab UAJY',
    location: 'Gapoktan Sempadan Code',
    abstract: 'Catatan harian peneliti mengenai pemanfaatan air irigasi sempadan dan tantangan adaptasi petani terhadap fluktuasi debit air musim kemarau.',
    date: 'Agu 2026',
    readTimeOrMedia: '8 Menit Baca',
    slug: 'catatan-lapangan-petani-urban'
  },
  {
    id: 'str-4',
    code: 'STR-2026-04',
    category: 'Photo Essay',
    title: 'Esei Foto: Wajah-Wajah di Balik Pelestarian Titik Nol Aliran Sungai Code',
    authorOrFigure: 'Dokumentasi Visual Living Lab',
    location: 'Koridor Code Tengah',
    abstract: 'Kumpulan potret hitam-putih dan berwarna yang merekam dinamika keseharian para penggerak komunitas, anak-anak, dan relawan di bantaran sungai.',
    date: 'Jul 2026',
    readTimeOrMedia: '12 Foto',
    slug: 'esei-foto-titik-nol-code'
  },
  {
    id: 'str-5',
    code: 'STR-2026-05',
    category: 'River Stories',
    title: 'Menelusuri Riwayat Sempadan: Menjaga Keseimbangan Ekologis di Tengah Padatnya Kota',
    authorOrFigure: 'Divisi Kajian & Sejarah DAS',
    location: 'Kawasan Perkotaan Yogyakarta',
    abstract: 'Refleksi historis mengenai perubahan tata guna lahan di sepanjang aliran sungai utama Yogyakarta dan upaya pemulihan fungsi sempadan.',
    date: 'Jun 2026',
    readTimeOrMedia: '7 Menit Baca',
    slug: 'menelusuri-riwayat-sempadan'
  },
  {
    id: 'str-6',
    code: 'STR-2026-06',
    category: 'Mini Documentary',
    title: 'Dokumenter Mini: Suara dari Tepian — Dokumentasi Kehidupan, Harapan, dan Aksi Warga',
    authorOrFigure: 'Tim Media & Sinema Living Lab UAJY',
    location: 'DAS Winongo, Code, & Gajahwong',
    abstract: 'Tayangan visual berdurasi 15 menit yang merangkum suara hati warga bantaran, anak-anak, dan para relawan dalam merawat masa depan sungai.',
    date: 'Mei 2026',
    readTimeOrMedia: '15 Menit Tonton',
    slug: 'dokumenter-mini-suara-dari-tepian'
  }
];

const CATEGORIES = [
  'All',
  'River Stories',
  'Community Stories',
  'People of the River',
  'Field Notes',
  'Photo Essay',
  'Mini Documentary'
];

export default function KisahSungaiPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const featuredStory = STORIES_MOCK[0];

  const filteredStories = useMemo(() => {
    return STORIES_MOCK.filter((item) => {
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
        <header className="border-b border-slate-900/10 pb-8 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-800">
            <span className="font-semibold">Pusat Narasi</span>
            <span className="text-slate-300">/</span>
            <span>Index 06</span>
            <span className="text-slate-300">/</span>
            <span>Kisah & Refleksi Sungai (Stories)</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 font-sans">
                Kisah & Refleksi Sungai
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                Mengeksplorasi ikatan mendalam antara manusia dan sungai melalui narasi human-centered, catatan lapangan, esei foto, serta dokumenter mini kehidupan bantaran.
              </p>
            </div>
            
            <div className="font-mono text-xs text-slate-500 bg-white border border-slate-200 px-3.5 py-2 rounded-lg shrink-0 self-start lg:self-auto shadow-sm">
              FOKUS NARASI: <span className="text-emerald-700 font-semibold">REFLEKTIF & HUMAN-CENTERED</span>
            </div>
          </div>
        </header>

        {/* Featured Organism */}
        <FeaturedStoryHero item={featuredStory} />

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kisah, tokoh, atau topik bantaran..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-900/10 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-900 transition font-sans shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {CATEGORIES.map((cat) => (
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
        <div className="border border-slate-900/10 rounded-xl bg-white overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="px-6 py-3.5 border-b border-slate-900/10 bg-slate-50 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>Menampilkan {filteredStories.length} Narasi & Catatan Lapangan</span>
            <span>FORMAT: ARTIKEL / FOTO / VIDEO</span>
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