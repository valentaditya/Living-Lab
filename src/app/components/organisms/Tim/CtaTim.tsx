import React from 'react';
import Link from 'next/link';

export const CtaTim = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center flex flex-col items-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-[10px] font-mono text-teal-800 tracking-widest mb-8">
          <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
          PINTU TERBUKA MAHASISWA & RELAWAN LOKAL
        </span>
        
        <h2 className="text-3xl md:text-5xl font-semibold text-[#0f1713] leading-[1.15] mb-6">
          Ingin Turun ke Palung Kali Bersama Tim Kami?
        </h2>
        
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
          Kami senantiasa membuka asisten riset, tugas akhir mahasiswa, magang kurikuler, dan program sukarelawan pemantau debit berkala.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="/kolaborasi" 
            className="bg-[#0f6b5c] text-white px-8 py-4 rounded-sm font-semibold text-sm hover:bg-[#0b5448] transition-colors flex items-center justify-center gap-2"
          >
            Daftar Menjadi Sukarelawan / Peneliti Mitra
          </Link>
          <Link 
            href="/pengetahuan/modul" 
            className="bg-white text-[#0f1713] border border-gray-300 px-8 py-4 rounded-sm font-semibold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            Pelajari Protokol Riset Lapangan
          </Link>
        </div>
      </div>
    </section>
  );
};