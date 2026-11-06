import React from 'react';
import { Metadata } from 'next';
import { HeroRoadmap } from '@/app/components/organisms/Roadmap/HeroRoadmap';
import { TimelineRoadmap } from '@/app/components/organisms/Roadmap/TimelineRoadmap';
import { PrinsipPelaksanaan } from '@/app/components/organisms/Roadmap/PrinsipPelaksanaan';
import { CtaRoadmap } from '@/app/components/organisms/Roadmap/CtaRoadmap';
export const metadata: Metadata = {
  title: 'Roadmap Revitalisasi Sungai | Living Lab Sungai Yogyakarta',
  description: 'Peta jalan jangka panjang menuju regenerasi ekologis dan kemandirian masyarakat bantaran sungai Yogyakarta.',
};

export default function RoadmapPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans">
      <HeroRoadmap />
      <TimelineRoadmap />
      <PrinsipPelaksanaan />
      <CtaRoadmap />
    </div>
  );
}