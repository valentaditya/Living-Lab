import React from 'react';
import Image from 'next/image';

export const HeroBerita = () => {
  return (
    <section className="relative w-full pt-32 pb-16 bg-[#0a192f] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="inline-block text-[10px] font-mono text-teal-400 tracking-widest border border-teal-800/50 bg-teal-900/30 px-3 py-1 w-fit">
              [ JURNAL, KABAR & BERITA PUBLIK ]
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              Kabar Lapangan & Agenda
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed max-w-lg">
              Arsip berkelanjutan sains warga, riset biomonitoring hidrologi, inovasi infrastruktur riparian, dan dinamika sosial-ekologi komunitas bantara di Daerah Istimewa Yogyakarta.
            </p>
            
            <div className="flex items-center gap-8 mt-4 border-t border-gray-700 pt-6">
              <div>
                <span className="block text-3xl font-bold text-white">148</span>
                <span className="text-[10px] font-mono text-gray-400">TOTAL ARTIKEL & DOKUMENTASI LAPANGAN TERARSIP</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-white">40</span>
                <span className="text-[10px] font-mono text-gray-400">LIPUTAN MEDIA NASIONAL & LOKAL</span>
              </div>
            </div>

            <div className="flex gap-4 mt-2">
              <button className="bg-transparent border border-gray-600 text-white px-6 py-3 rounded-sm text-xs font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2">
                📡 Langganan Buletin Mingguan
              </button>
              <button className="bg-white text-[#0a192f] px-6 py-3 rounded-sm text-xs font-semibold hover:bg-gray-100 transition-colors">
                + Kirim Rilis / Kegiatan
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative h-[400px] lg:h-[500px] w-full rounded-sm overflow-hidden bg-gray-800">
            <Image
              src="/pictures/kolaborasi.png" 
              alt="Tangan memegang bibit tanaman dengan latar belakang warga berdiskusi di bantaran sungai"
              fill
              priority 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-[10px] font-mono text-teal-400 mb-2">DOKUMENTASI // LAPANGAN PELATIHAN 2024</span>
              <h3 className="text-white text-lg font-semibold">Kolaborasi Pemetaan Partisipatif Sempadan Sungai</h3>
              <p className="text-gray-300 text-xs mt-2">Tim gabungan UAJY, komunitas bantara, dan relawan melakukan pemetaan risiko erosi di hulu Kali Progo.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};