import React from 'react';
import Link from 'next/link';

export const CtaVisiMisi = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="bg-[#eef7f6] border border-[#d1ebe7] rounded-lg p-8 md:p-16 text-center flex flex-col items-center">
          <span className="text-[10px] font-mono text-teal-800 tracking-widest mb-6 bg-teal-100/50 px-4 py-1.5 rounded-full">
            UNDANGAN KOLABORASI INTELEKTUAL & KOMUNAL
          </span>
          <h2 className="text-2xl md:text-4xl font-semibold text-[#0f1713] mb-4 leading-tight">
            Menjadi Bagian dari Laboratorium Terbuka Kami
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mb-10 leading-relaxed">
            Apakah Anda seorang peneliti, pegiat lingkungan kampung, maupun pembuat kebijakan? Visi kami hidup karena keterlibatan aktif sumber daya manusia dari hulu yang sama.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/kolaborasi" 
              className="bg-[#0f1713] text-white px-8 py-3.5 rounded-sm font-semibold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              Bergabung dalam Riset <span>→</span>
            </Link>
            <Link 
              href="/tentang/roadmap" 
              className="bg-white text-[#0f1713] border border-gray-300 px-8 py-3.5 rounded-sm font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              Lihat Roadmap 2025-2030
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};