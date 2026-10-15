import React from 'react';

export const KondisiSosial = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#0f1713]">
              Kondisi Sosial Ekologis
            </h2>
            
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-[10px] font-mono bg-teal-50 text-teal-700 px-2 py-1 border border-teal-100">KORIDOR 3 DAS</span>
              <span className="text-[10px] font-mono bg-gray-50 text-gray-600 px-2 py-1 border border-gray-200">STATUS INDEKS: RILIS 21</span>
              <span className="text-[10px] font-mono bg-gray-50 text-gray-600 px-2 py-1 border border-gray-200">REVIEWS & ANALYTICS</span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Sungai di Daerah Istimewa Yogyakarta bukan sekadar saluran drainase hidrologis alam dari lereng Gunung Merapi menuju Samudra Hindia. Meraka adalah bentang perkampungan kota yang berkelindan erat dengan denyut kehidupan sosial-ekonomi warga, dari pedagang hingga petani.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Melalui pendekatan Living Laboratory, Universitas Atma Jaya Yogyakarta memetakan risiko banjir, kualitas air, hingga dinamika sosial-ekonomi di ketiga sungai utama. Data ini menjadi dasar intervensi berbasis sains warga untuk memastikan sungai tetap menjadi ruang hidup bersama.
            </p>

            <div className="flex gap-8 mt-4">
              <div>
                <span className="block text-3xl font-bold text-[#0f1713]">186 km</span>
                <span className="text-[10px] font-mono text-gray-500">PANJANG SUNGAI TERPANTAU</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-[#0f1713]">78.4%</span>
                <span className="text-[10px] font-mono text-gray-500">CAKUPAN WILAYAH TERPANTAU</span>
              </div>
            </div>
          </div>

          {/* Right Column: Initiative Cards */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="border border-gray-200 p-6 rounded-sm flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-gray-400 block mb-1">INISIATIF TERPADU</span>
                <span className="text-2xl font-bold text-[#0f1713]">12 Program Aktif</span>
                <p className="text-xs text-gray-500 mt-2">Restorasi vegetasi riparian, bank sampah sirkular, dan pemantauan debit sungai.</p>
              </div>
              <span className="text-teal-600 text-xl">🌱</span>
            </div>
            
            <div className="border border-gray-200 p-6 rounded-sm flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-gray-400 block mb-1">KOLABORASI AKAR RUMPUT</span>
                <span className="text-2xl font-bold text-[#0f1713]">28 Komunitas</span>
                <p className="text-xs text-gray-500 mt-2">Forum warga bantaran Kali Code, Winongo Asri, dan Gajahwong.</p>
              </div>
              <span className="text-blue-600 text-xl">👥</span>
            </div>

            <div className="border border-gray-200 p-6 rounded-sm flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-gray-400 block mb-1">TELEMETRI TERPASANG</span>
                <span className="text-2xl font-bold text-[#0f1713]">3 Sungai Dipantau</span>
                <p className="text-xs text-gray-500 mt-2">Sensor kualitas air dan tinggi muka air berbasis IoT.</p>
              </div>
              <span className="text-purple-600 text-xl">📡</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};