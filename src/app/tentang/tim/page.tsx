import React from 'react';
import { Metadata } from 'next';
import { HeroTim } from '@/app/components/organisms/Tim/HeroTim';
import { TeamDirectory } from '@/app/components/organisms/Tim/TeamDirectory';
import { getCollection } from '@/lib/site-content';
import { ModelKolaborasi } from '@/app/components/organisms/Tim/ModelKolaborasi';
import { CtaTim } from '@/app/components/organisms/Tim/CtaTim';
export const metadata: Metadata = {
  title: 'Tim Peneliti & Penggerak | Living Lab Sungai Yogyakarta',
  description: 'Sinergi akademisi UAJY dan tokoh penggerak komunitas akar rumput pelindung bantaran sungai Yogyakarta.',
};

export default async function TimPage() {
  const members = await getCollection('team');
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      <HeroTim />
      <TeamDirectory members={members} />
      <ModelKolaborasi />
      <CtaTim />
    </div>
  );
}