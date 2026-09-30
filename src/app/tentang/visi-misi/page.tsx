import React from 'react';
import { Metadata } from 'next';
import { HeroVisi } from '@/app/components/organisms/VisiMisi/HeroVisi';
import { StrategiMisi } from '@/app/components/organisms/VisiMisi/StrategiMisi';
import { TargetCapaian } from '@/app/components/organisms/VisiMisi/TargetCapaian';
import { CtaVisiMisi } from '@/app/components/organisms/VisiMisi/CtaVisiMisi';
import { Navbar } from '@/app/components/organisms/Navbar';
import Footer from '@/app/components/organisms/Footer';
export const metadata: Metadata = {
  title: 'Visi & Misi | Living Lab Sungai Yogyakarta',
  description: 'Visi kolektif 2030 dan misi strategis Living Lab Sungai Yogyakarta untuk transformasi sosial-ekologis sungai perkotaan.',
};

export default function VisiMisiPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
    <Navbar/>
      <HeroVisi />
      <StrategiMisi />
      <TargetCapaian />
      <CtaVisiMisi />
      <Footer/>
    </div>
  );
}