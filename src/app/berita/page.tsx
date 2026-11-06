import React from 'react';
import { Metadata } from 'next';
import { HeroBerita } from '@/app/components/organisms/Berita/HeroBerita';
import { BeritaAgendaTabs } from '@/app/components/organisms/Berita/BeritaAgendaTabs';
import { getCMSContent } from '@/lib/cms-content';

// Konten dari Supabase: halaman dirender ulang tiap 60 detik, dan langsung setelah admin menyimpan.
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Berita & Agenda | Living Lab Sungai Yogyakarta',
  description: 'Arsip berkelanjutan sains warga, riset biomonitoring hidrologi, inovasi infrastruktur riparian, dan dinamika sosial-ekologi komunitas bantara DIY.',
};

export default async function BeritaPage() {
  const content = await getCMSContent();

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      <HeroBerita />
      <BeritaAgendaTabs articles={content.articles} agendas={content.agenda} />
    </div>
  );
}