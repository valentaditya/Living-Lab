import React from 'react';
import { Metadata } from 'next';
import { HeroVisi } from '@/app/components/organisms/VisiMisi/HeroVisi';
import { StrategiMisi } from '@/app/components/organisms/VisiMisi/StrategiMisi';
import { TargetCapaian } from '@/app/components/organisms/VisiMisi/TargetCapaian';
import { CtaVisiMisi } from '@/app/components/organisms/VisiMisi/CtaVisiMisi';
export const metadata: Metadata = {
  title: 'Visi & Misi | Living Lab Sungai Yogyakarta',
  description: 'Visi kolektif 2030 dan misi strategis Living Lab Sungai Yogyakarta untuk transformasi sosial-ekologis sungai perkotaan.',
};

export default function VisiMisiPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      <HeroVisi />
      <StrategiMisi />
      <TargetCapaian />
      <CtaVisiMisi />
    </div>
  );
}