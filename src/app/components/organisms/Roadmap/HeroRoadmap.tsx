import React from 'react';

export const HeroRoadmap = () => {
  return (
    <section className="bg-gray-50 pt-32 pb-16 border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col gap-6 max-w-4xl">
          <span className="text-[10px] font-mono text-teal-800 tracking-widest bg-teal-50 border border-teal-100 px-3 py-1 w-fit">
            [ TAHAPAN STRATEGIS // PERJALANAN INISIASI HINGGA KEMANDIRIAN ]
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f1713] tracking-tight leading-[1.1]">
            Roadmap Revitalisasi Sungai
          </h1>
          
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl">
            Peta jalan jangka panjang menuju regenerasi ekologis dan kemandirian masyarakat bantaran sungai Yogyakarta. Menyinerjikan sains warga terapan, telemetri hidrologi berpresisi tinggi, dan ketahanan sosial-ekologis Daerah Aliran Sungai (DAS).
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-200">
            <div>
              <span className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Rentang Waktu</span>
              <span className="block text-sm font-bold text-[#0f1713]">2023 — 2028+</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Target Wilayah</span>
              <span className="block text-sm font-bold text-[#0f1713]">Code, Winongo, Gajahwong</span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Status Implementasi</span>
              <span className="block text-sm font-bold text-teal-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span> Fase 2 Berjalan
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-mono text-gray-400 uppercase mb-1">Komunitas Terlibat</span>
              <span className="block text-sm font-bold text-[#0f1713]">28 Pos & Paguyuban</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};