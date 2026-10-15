import React from 'react';
import Link from 'next/link';

export const CtaRoadmap = () => {
  return (
    <section className="py-24 bg-[#0a192f] text-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          
          {/* Left Content */}
          <div className="flex flex-col gap-4 max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-2 text-[10px] font-mono text-teal-400 tracking-widest mb-2 justify-center lg:justify-start">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              KOLABORASI & PERCEPATAN ROADMAP
            </span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Ingin Mengambil Bagian dalam Percepatan Fase 2 & 3?
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Kami membuka pintu keterlibatan bagi lembaga riset, penyedia perangkat IoT hidrologis, pengembang kebijakan publik, maupun komunitas lokal yang ingin mengadopsi modul living lab di wilayah bantaran masing-masing.
            </p>
          </div>

          {/* Right Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto flex-shrink-0">
            <Link 
              href="/kolaborasi" 
              className="bg-teal-600 text-white px-8 py-4 rounded-sm font-semibold text-sm hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 text-center"
            >
              AJUKAN INISIATIF KOLABORASI <span>→</span>
            </Link>
            <Link 
              href="/kolaborasi" 
              className="bg-transparent border border-gray-600 text-white px-8 py-4 rounded-sm font-semibold text-sm hover:bg-gray-800 transition-colors flex items-center justify-center text-center"
            >
              LIHAT MITRA TERDAFTAR
            </Link>
          </div>

        </div>

        {/* Bottom Metadata */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-gray-500 gap-4">
          <span>VERSI MATRIKS ROADMAP: V2.4.1-2024.REV</span>
          <span>PENINJAUAN TERAKHIR: OKTOBER 2024 OLEH TIM AHLI DAS YOGYAKARTA</span>
        </div>
      </div>
    </section>
  );
};