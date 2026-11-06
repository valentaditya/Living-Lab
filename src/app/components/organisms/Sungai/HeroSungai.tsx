import React from 'react';
import Image from 'next/image';

export const HeroSungai = () => {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[80vh] pt-24 pb-16 flex items-center justify-center overflow-hidden bg-[#0f1713]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600&auto=format&fit=crop"
          alt="Pemandangan Sungai di Yogyakarta"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1713]/80 via-[#0f1713]/60 to-[#0f1713]/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center">
        <span className="block mb-4 text-xs font-semibold uppercase tracking-wider text-white/80">
          Observatorium Sosial-Ekologis DAS
        </span>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter mb-4">
          SUNGAI
        </h1>
        
        <p className="text-gray-300 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          Menelusuri Ekosistem, Denyut Kehidupan dan Ketahanan Sosial-Ekologi Koridor Sungai Yogyakarta
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] md:text-xs text-teal-400 tracking-widest">
          <span>KALI CODE</span>
          <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
          <span>KALI WINONGO</span>
          <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
          <span>KALI GAJAHWONG</span>
        </div>
      </div>
    </section>
  );
};