import React from 'react';

export const HeroFAQ = () => {
  return (
    <section className="pt-32 md:pt-40 pb-8 bg-[#f8f9fa]">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="flex flex-col gap-4">
          <span className="block text-xs font-semibold uppercase tracking-wider text-[#0f1713]">
            Panduan Publik
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#0f1713] tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h1>
          
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mt-2">
            Informasi seputar cara kerja, keterlibatan publik, akses data, dan operasional Living Lab Sungai Yogyakarta.
          </p>
        </div>
      </div>
    </section>
  );
};