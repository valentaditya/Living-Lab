import React from 'react';

export const AgendaHeader: React.FC = () => (
  <header className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 sm:mb-10">
    <div className="max-w-2xl">
      <span className="text-[10px] sm:text-[11px] font-bold text-[#1b7a43] tracking-wider uppercase block mb-2 select-none">
        FORUM &amp; SARASEHAN BERSAMA
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-[#0B1E33] tracking-tight leading-snug">
        Agenda Sarasehan &amp; Lokakarya Mendatang
      </h2>
    </div>
    <div className="md:max-w-xs lg:max-w-sm pt-1 md:pt-6">
      <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed font-medium">
        Terbuka untuk mahasiswa, peneliti, perencana tata ruang daerah, dan paguyuban warga di seluruh Daerah Istimewa Yogyakarta.
      </p>
    </div>
  </header>
);