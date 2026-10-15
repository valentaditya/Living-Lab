// app/kisah-sungai/[slug]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { StoryContentHeader } from '@/app/components/molecules/StoryContentHeader';
import { StoryArticleBody } from '@/app/components/organisms/StoryArticalBody';


// Data mock yang sinkron dengan halaman index sebelumnya
const STORIES_DETAILS_MOCK: Record<string, {
  code: string;
  category: string;
  title: string;
  authorOrFigure: string;
  location: string;
  date: string;
  readTimeOrMedia: string;
  abstract: string;
}> = {
  'perempuan-penjaga-titik-air': {
    code: 'STR-2026-01',
    category: 'People of the River',
    title: 'Perempuan Penjaga Titik Air: Ketangguhan Ibu-Ibu Bantaran Winongo Merawat Aliran Kehidupan',
    authorOrFigure: 'Ibu Siti Aminah & Komunitas Perempuan Bantaran',
    location: 'Koridor DAS Winongo, Yogyakarta',
    date: 'Okt 2026',
    readTimeOrMedia: '6 Menit Baca / Video',
    abstract: 'Bagaimana gerakan kolektif para ibu di tepian sungai mengubah stigma halaman belakang rumah yang kotor menjadi ruang publik hijau dan pusat ekonomi sirkular warga.'
  },
  'bank-sampah-muja-muju': {
    code: 'STR-2026-02',
    category: 'Community Stories',
    title: 'Bank Sampah Muja Muju: Dari Timbulan Plastik Menjadi Kolektif Ekonomi Warga',
    authorOrFigure: 'Pengurus Bank Sampah Mandiri',
    location: 'Bantaran Sungai Gajahwong',
    date: 'Sep 2026',
    readTimeOrMedia: '5 Menit Baca',
    abstract: 'Transformasi pengelolaan sampah mandiri yang tidak hanya membersihkan aliran sungai tetapi juga menggerakkan tabungan pendidikan anak-anak warga sekitar.'
  },
  'catatan-lapangan-petani-urban': {
    code: 'STR-2026-03',
    category: 'Field Notes',
    title: 'Catatan Lapangan: Mengukur Kualitas Air Bersama Petani Urban Pertanian Organik Tepi Sungai',
    authorOrFigure: 'Tim Riset Lapangan Living Lab UAJY',
    location: 'Gapoktan Sempadan Code',
    date: 'Agu 2026',
    readTimeOrMedia: '8 Menit Baca',
    abstract: 'Catatan harian peneliti mengenai pemanfaatan air irigasi sempadan dan tantangan adaptasi petani terhadap fluktuasi debit air musim kemarau.'
  }
};

export default function StoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // Fallback ke cerita pertama jika slug tidak ditemukan di mock
  const story = STORIES_DETAILS_MOCK[slug] || STORIES_DETAILS_MOCK['perempuan-penjaga-titik-air'];

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
        {/* Header Detail Cerita */}
        <StoryContentHeader
          code={story.code}
          category={story.category}
          title={story.title}
          authorOrFigure={story.authorOrFigure}
          location={story.location}
          date={story.date}
          readTime={story.readTimeOrMedia}
        />

        <StoryArticleBody abstract={story.abstract} />
      </main>
    </div>
  );
}