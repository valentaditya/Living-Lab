import React from 'react';

export const HeroTim = () => {
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="inline-block px-3 py-1 bg-gray-100 border border-gray-200 text-[10px] font-mono tracking-widest text-[#0f1713] w-fit">
              [ STRUKTUR KOLABORATIF / / SOSOK DI BALIK GERAKAN ]
            </span>
            <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-[#0f1713]">
              Tim Peneliti & Penggerak Bantaran
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mt-2">
              Sinergi harmonis antara akademisi Universitas Atma Jaya Yogyakarta (UAJY) dan tokoh penggerak komunitas akar rumput pelindung bantaran sungai Yogyakarta. Merajut metodologi sains laboratorium dengan dedikasi turun langsung ke palung sungai.
            </p>
          </div>

          {/* Right Column: Ratio Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#f8f9fa] border border-gray-200 p-8 rounded-sm flex flex-col gap-4">
              <span className="text-[10px] font-mono text-gray-500 tracking-widest">RASIO KEMITRAAN</span>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[#0f1713]">3 Dosen</span>
                  <span className="text-xs text-gray-500">Akademisi UAJY</span>
                </div>
                <span className="text-2xl text-gray-300">&</span>
                <div className="flex flex-col text-right">
                  <span className="text-3xl font-bold text-[#0f1713]">3 Tokoh</span>
                  <span className="text-xs text-gray-500">Paguyuban Bantara</span>
                </div>
              </div>
              <div className="w-full h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-[#0f1713]"></div>
              </div>
              <p className="text-[10px] text-gray-500 font-mono mt-1">
                Model Quadruple Helix terbalik partisipasi warga Code, Winongo, dan Gajahwong.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};