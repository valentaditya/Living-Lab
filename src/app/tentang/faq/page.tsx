import React from 'react';
import { Metadata } from 'next';
import { HeroFAQ } from '@/app/components/organisms/FAQ/HeroFAQ';
import { FAQSection } from '@/app/components/organisms/FAQ/FAQSection';
import { CtaFAQ } from '@/app/components/organisms/FAQ/CtaFAQ';
import { getCMSContent } from '@/lib/cms-content';

export const metadata: Metadata = {
  title: 'Pertanyaan yang Sering Diajukan | Living Lab Sungai Yogyakarta',
  description: 'Informasi seputar cara kerja, keterlibatan publik, akses data, dan operasional Living Lab Sungai Yogyakarta.',
};

export default async function FAQPage() {
  const content = await getCMSContent();

  return (
    <div className="bg-[#f8f9fa] min-h-screen text-gray-900 font-sans">
      <HeroFAQ />
      <FAQSection faqs={content.faqs} />
      <CtaFAQ />
    </div>
  );
}