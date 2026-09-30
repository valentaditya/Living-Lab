import React from 'react';

export const HeroVisi = () => {
  return (
    <section className="bg-[#f8f9fa] pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between w-full text-[10px] font-mono text-gray-500 mb-8 uppercase tracking-widest gap-2">
            <span>[ DOKUMEN STRATEGIS // PARADIGMA JANGKA PANJANG ]</span>
            <span>KODE ARSIP: VIS-MIS-DY-2025/30</span>
          </div>
          
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-mono text-gray-600 mb-6">
            <span className="w-2 h-2 bg-[#0f1713] rounded-full"></span>
            VISI KOLEKTIF 2030
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
            <span className="text-[10px] font-mono text-gray-400 mb-2">CAKUPAN WILAYAH</span>
            <span className="text-3xl font-bold text-[#0f1713]">3 DAS Utama</span>
            <span className="text-xs text-gray-500 mt-1">Code, Winongo, Gajahwong</span>
          </div>
          <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <span className="text-[10px] font-mono text-gray-400 mb-2">PENDEKATAN</span>
            <span className="text-3xl font-bold text-[#0f1713]">Civic Science</span>
            <span className="text-xs text-gray-500 mt-1">Sains Warga & Aksi Kolaboratif</span>
          </div>
          <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <span className="text-[10px] font-mono text-gray-400 mb-2">TARGET MANFAAT</span>
            <span className="text-3xl font-bold text-[#0f1713]">38 Kalurahan</span>
            <span className="text-xs text-gray-500 mt-1">Komunitas Koridor Sungai</span>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-gray-500 border-t border-gray-200 pt-6 gap-4">
          <div className="flex gap-4">
            <span>LAT: -7.7428° S</span>
            <span>LONG: 110.2219° E</span>
            <span>ELEV: 114 MDPL</span>
          </div>
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full hidden md:block"></span>
            <span>CATATAN LAPANGAN: TRANSISI PARADIGMA DARI EKSPLOITASI KE PEMULIHAN REGENERATIF</span>
          </div>
        </div>

      </div>
    </section>
  );
};