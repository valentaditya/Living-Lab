import React from 'react';
import Link from 'next/link';

export const CtaBerita = () => {
  return (
    <section className="py-24 bg-[#0a192f] text-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center flex flex-col items-center">
        <span className="text-[10px] font-mono text-teal-400 tracking-widest mb-6 border border-teal-800 bg-teal-900/30 px-4 py-2 rounded-full">
          [ KANAL PARTISIPASI WARGA // REDAKSI BANTARA ]
        </span>
        <h2 className="text-3xl md:text-5xl font-semibold leading-tight mb-6">
          Punya Informasi atau Kegiatan yang Ingin Dipublikasikan?
        </h2>
        <p className="text-gray-400 text-base max-w-2xl mb-10 leading-relaxed">
          Redaksi Living Lab Sungai membuka ruang bagi komunitas bantara, pegiat lingkungan, peneliti mahasiswa, dan warga untuk mengirimkan laporan, agenda aksi bersih sungai, atau temuan spesimen.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="/kolaborasi" 
            className="bg-[#0f6b5c] text-white px-8 py-4 rounded-sm font-semibold text-sm hover:bg-[#0b5448] transition-colors flex items-center justify-center gap-2"
          >
            KIRIM BERITA <span>→</span>
          </Link>
          <Link 
            href="/pengetahuan/modul" 
            className="bg-white text-[#0f172a] px-8 py-4 rounded-sm font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center"
          >
            PANDUAN KIRIM BERITA LAPANGAN
          </Link>
        </div>
      </div>
    </section>
  );
};