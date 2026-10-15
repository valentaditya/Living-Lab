import React from 'react';
import { Metadata } from 'next';
import { HeroBerita } from '@/app/components/organisms/Berita/HeroBerita';
import { SubNavBerita } from '@/app/components/organisms/Berita/SubNavBerita';
import { BeritaTerkini } from '@/app/components/organisms/Berita/BeritaTerkini';
import { AgendaKegiatan } from '@/app/components/organisms/Berita/AgendaKegiatan';
import { SiaranPersMedia } from '@/app/components/organisms/Berita/SiaranPersMedia';
import { LaporanAktivitas } from '@/app/components/organisms/Berita/LaporanAktivitas';
import { CtaBerita } from '@/app/components/organisms/Berita/CtaBerita';
import { Navbar } from '../components/organisms/Navbar';

export const metadata: Metadata = {
  title: 'Berita & Agenda | Living Lab Sungai Yogyakarta',
  description: 'Arsip berkelanjutan sains warga, riset biomonitoring hidrologi, inovasi infrastruktur riparian, dan dinamika sosial-ekologi komunitas bantara DIY.',
};

export default function BeritaPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
     <Navbar />
      <HeroBerita />
      <SubNavBerita />
      <BeritaTerkini />
      <AgendaKegiatan />
      <SiaranPersMedia />
      <LaporanAktivitas />
      <CtaBerita />
    </div>
  );
}