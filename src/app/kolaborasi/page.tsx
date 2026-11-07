import React from 'react';
import { Metadata } from 'next';
import { HeroKolaborasi } from '@/app/components/organisms/Kolaborasi/HeroKolaborasi';
import { PrinsipKolaborasi } from '@/app/components/organisms/Kolaborasi/PrinsipKolaborasi';
import { JejaringMitra } from '@/app/components/organisms/Kolaborasi/JejaringMitra';
import { PeluangKontribusi } from '@/app/components/organisms/Kolaborasi/PeluangKontribusi';
import { FormKontak } from '@/app/components/organisms/Kolaborasi/FormKontak';
import { getBlock, getCollection } from '@/lib/site-content';
export const metadata: Metadata = {
  title: 'Kolaborasi | Living Lab Sungai Yogyakarta',
  description: 'Membangun Ekosistem Sungai melalui Co-Creation dan Co-Production. Platform terbuka untuk restorasi sosial-ekologi.',
};

export default async function KolaborasiPage() {
  const [partners, contact] = await Promise.all([getCollection('partners'), getBlock('contact')]);
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      <HeroKolaborasi />
      <PrinsipKolaborasi />
      <JejaringMitra items={partners} />
      <PeluangKontribusi />
      <FormKontak contact={contact} />
    </div>
  );
}