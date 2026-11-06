import React from 'react';

export const HeroVisi = () => {
  return (
    <section className="bg-[#f8f9fa] pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        <div className="flex flex-col items-center text-center mb-16">
          <span className="block mb-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
            Visi Kolektif 2030
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.15] tracking-tight max-w-4xl mx-auto mb-8 text-[#0f1713]">
            “Ekosistem kolaborasi dan laboratorium hidup untuk transformasi sosial-ekologis sungai perkotaan.”
          </h1>
          
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Meneguhkan sungai bukan sebagai halaman belakang yang terpinggirkan, melainkan episentrum kebudayaan, ketahanan iklim, dan martabat masyarakat bantara Daerah Istimewa Yogyakarta.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-2">Cakupan Wilayah</span>
            <span className="text-3xl font-bold text-[#0f1713]">3 DAS Utama</span>
            <span className="text-xs text-gray-500 mt-1">Code, Winongo, Gajahwong</span>
          </div>
          <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-2">Pendekatan</span>
            <span className="text-3xl font-bold text-[#0f1713]">Civic Science</span>
            <span className="text-xs text-gray-500 mt-1">Sains Warga & Aksi Kolaboratif</span>
          </div>
          <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-2">Target Manfaat</span>
            <span className="text-3xl font-bold text-[#0f1713]">38 Kalurahan</span>
            <span className="text-xs text-gray-500 mt-1">Komunitas Koridor Sungai</span>
          </div>
        </div>

        <p className="border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
          Transisi paradigma dari eksploitasi ke pemulihan regeneratif
        </p>

      </div>
    </section>
  );
};