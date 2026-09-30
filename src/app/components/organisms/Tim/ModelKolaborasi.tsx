import React from 'react';

export const ModelKolaborasi = () => {
  return (
    <section className="py-20 lg:py-24 bg-[#f0f4ff] border-t border-b border-blue-100">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-[10px] font-mono text-blue-800 tracking-widest">[ MODEL KOLABORASI LAPANGAN ]</span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#0f1713] leading-tight">
              Bukan Sekadar Tim di Atas Kertas
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Setiap dua pekan, para akademisi meninggalkan meja kampus untuk bergabung dalam patroli susur sungai bersama pemerti kampung. Kami menguji hipotesis ilmiah langsung dengan pengalaman indrawi warga bantara.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-[#f0f4ff]">BS</div>
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-[#f0f4ff]">SA</div>
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px] font-bold border-2 border-[#f0f4ff]">MH</div>
              </div>
              <span className="text-xs text-gray-500 font-medium">Keluarga Besar Bantara DIY</span>
            </div>
          </div>

          {/* Right Column: Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-blue-50">
              <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-sm flex items-center justify-center mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-[#0f1713] mb-2">Sains Warga Inklusif</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Warga dilatih menggunakan tes kit kitosan & meteran turbidity sederhana, mendemokratisasi produksi data sungai.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-sm shadow-sm border border-blue-50">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-sm flex items-center justify-center mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-[#0f1713] mb-2">Advokasi Berbasis Bukti</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Naskah kebijakan publik di tingkat Pemprov DIY diperkuel oleh verifikasi ilmiah lintas departemen UAJY.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};