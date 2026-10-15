import React from 'react';
import { Metadata } from 'next';
import { HeroSungai } from '@/app/components/organisms/Sungai/HeroSungai';
import { KondisiSosial } from '@/app/components/organisms/Sungai/KondisiSosial';
import { ProfilSungai } from '@/app/components/organisms/Sungai/ProfilSungai';
import { Biodiversitas } from '@/app/components/organisms/Sungai/Biodiversitas';
import { SainsWarga } from '@/app/components/organisms/Sungai/SainsWarga';
import { InisiatifKolaboratif } from '@/app/components/organisms/Sungai/InisiatifKolaboratif';
import { CtaSungai } from '@/app/components/organisms/Sungai/CtaSungai';
import { Navbar } from '../components/organisms/Navbar';
export const metadata: Metadata = {
  title: 'Sungai | Living Lab Sungai Yogyakarta',
  description: 'Menelusuri Ekosistem, Denyut Kehidupan dan Ketahanan Sosial-Ekologi Koridor Sungai Yogyakarta.',
};

export default function SungaiPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
        <Navbar/>
      <HeroSungai />
      <KondisiSosial />
      <ProfilSungai />
      <Biodiversitas />
      <SainsWarga />
      <InisiatifKolaboratif />
      <CtaSungai />
    </div>
  );
}