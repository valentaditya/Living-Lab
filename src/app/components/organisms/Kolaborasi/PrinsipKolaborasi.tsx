import React from 'react';

export const PrinsipKolaborasi = () => {
  return (
    <section className="py-24 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Title */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-[10px] font-mono text-gray-500 tracking-widest block mb-2">[ SEKSI 01 // KONSEP ]</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0f1713] leading-[1.1] mb-6">
              PRINSIP<br />CO-CREATION &<br />CO-PRODUCTION
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sains bukan proses eksklusif. Melainkan sebuah kerja intelektual yang membentuk pengetahuan kolaboratif. Proses pemulihan ekosistem sungai bekerja secara bersama untuk pemulihan lahan sungai.
            </p>
          </div>

          {/* Right Column: Quote & Principles */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            {/* Quote */}
            <div className="border-l-4 border-teal-600 pl-6">
              <p className="text-lg md:text-xl italic text-gray-700 leading-relaxed">
                "Pemulihan ekosistem sungai bukan proyek teknokratik satu arah. Keberlanjutan hanya lahir ketika pengetahuan lokal warga bersenyawa secara sejajar dengan sains presisi universitas."
              </p>
            </div>

            {/* Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <span className="text-[10px] font-mono text-teal-700 font-bold block mb-2">01. CO-CREATION (PERUMUSAN BERSAMA)</span>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Warga, akademisi, dan pemerintah duduk setara dalam perumusan pengetahuan. Bukan sekadar menerima hasil riset, melainkan turut serta dalam mengidentifikasi masalah, merumuskan solusi, dan mengambil keputusan bersama.
                </p>
              </div>
              <div>
                <span className="text-[10px] font-mono text-teal-700 font-bold block mb-2">02. CO-PRODUCTION (AKSI BERSAMA)</span>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Implementasi solusi dilakukan secara kolektif. Mulai dari pemasangan sensor, penanaman vegetasi riparian, hingga pengelolaan sampah sirkular, semuanya melibatkan partisipasi aktif warga bantara dan mitra strategis.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};