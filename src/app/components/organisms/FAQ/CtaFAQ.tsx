import React from 'react';
import Link from 'next/link';

export const CtaFAQ = () => {
  return (
    <section className="py-16 bg-[#f8f9fa]">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Arsip Data */}
          <div className="bg-white p-8 border border-gray-200 rounded-sm flex flex-col justify-between h-full shadow-sm">
            <div>
              <span className="text-[10px] font-mono text-gray-500 block mb-4">[ ARSIP DATA TERBUKA ]</span>
              <h3 className="text-xl font-semibold text-[#0f1713] mb-3">Mencari parameter teknis DAS spesifik?</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                Akses bank data hidrologi terbuka, arsip uji kualitas biologis tiga sungai, dan dokumen kebijakan ekologis.
              </p>
            </div>
            <Link 
              href="/pengetahuan/data" 
              className="inline-flex items-center justify-center gap-2 border border-[#0f1713] text-[#0f1713] px-6 py-3 rounded-sm font-semibold text-xs hover:bg-gray-50 transition-colors w-full"
            >
              BUKA REPOSITORI SAINS <span>→</span>
            </Link>
          </div>

          {/* Card 2: Bantuan Operasional */}
          <div className="bg-white p-8 border border-gray-200 rounded-sm flex flex-col justify-between h-full shadow-sm">
            <div>
              <span className="text-[10px] font-mono text-gray-500 block mb-4">[ BANTUAN OPERASIONAL // SEKRETARIAT ]</span>
              <h3 className="text-xl font-semibold text-[#0f1713] mb-3">Punya pertanyaan lain yang belum terjawab?</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                Hubungi Tim Sekretariat kami di:
              </p>
              <a href="mailto:sekretariat@livinglabsungaijogja.ac.id" className="text-sm font-semibold text-teal-700 hover:text-teal-900 underline block mb-8">
                sekretariat@livinglabsungaijogja.ac.id
              </a>
            </div>
            <a 
              href="mailto:sekretariat@livinglabsungaijogja.ac.id" 
              className="inline-flex items-center justify-center gap-2 bg-teal-700 text-white px-6 py-3 rounded-sm font-semibold text-xs hover:bg-teal-800 transition-colors w-full"
            >
              KIRIM EMAIL ✉
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};