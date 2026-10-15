import React from 'react';
import { Metadata } from 'next';
import { HeroTim } from '@/app/components/organisms/Tim/HeroTim';
import { FilterBar } from '@/app/components/organisms/Tim/FilterBar';
import { TeamGrid } from '@/app/components/organisms/Tim/TeamGrid';
import { ModelKolaborasi } from '@/app/components/organisms/Tim/ModelKolaborasi';
import { CtaTim } from '@/app/components/organisms/Tim/CtaTim';
import { Navbar } from '@/app/components/organisms/Navbar';
import Footer from '@/app/components/organisms/Footer';
export const metadata: Metadata = {
  title: 'Tim Peneliti & Penggerak | Living Lab Sungai Yogyakarta',
  description: 'Sinergi akademisi UAJY dan tokoh penggerak komunitas akar rumput pelindung bantaran sungai Yogyakarta.',
};

export default function TimPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
    <Navbar/>
      <HeroTim />
      <FilterBar />
      <TeamGrid />
      <ModelKolaborasi />
      <CtaTim />
      <Footer/>
    </div>
  );
}