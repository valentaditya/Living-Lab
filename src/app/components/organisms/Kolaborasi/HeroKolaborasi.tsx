import React from 'react';
import Image from 'next/image';

export const HeroKolaborasi = () => {
  return (
    <section className="relative w-full pt-32 pb-16 bg-[#f8f9fa] overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 text-[10px] font-mono text-teal-800 bg-teal-50 border border-teal-100 px-3 py-1 w-fit">
              [ PLATFORM TERBUKA // RESTORASI SOSIAL-EKOLOGI ]
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold text-[#0f1713] tracking-tight leading-[1.05]">
              KOLABORASI
            </h1>
            <p className="text-gray-700 text-lg lg:text-xl font-medium max-w-xl leading-relaxed">
              Membangun Ekosistem Sungai melalui Co-Creation dan Co-Production.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
              Living Lab Sungai Yogyakarta menghubungkan institusi riset akademis, warga bantara, praktisi, dan pemerintah untuk bersama-sama belajar, berinovasi, dan bertindak untuk keberlanjutan sungai di Yogyakarta.
            </p>
            
            <div className="flex flex-wrap gap-8 mt-6 border-t border-gray-200 pt-6">
              <div>
                <span className="block text-3xl font-bold text-[#0f1713]">28+</span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Komunitas Bantara</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-[#0f1713]">03</span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Pilar Prioritas DIY</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-[#0f1713]">100%</span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Data Terbuka Riset</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative h-[400px] lg:h-[500px] w-full rounded-sm overflow-hidden bg-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop"
              alt="Kolaborasi Pemetaan Partisipatif Sempadan Sungai"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-[10px] font-mono text-teal-400 mb-2">[ KEGIATAN LAPANGAN ] // 04 JULI 2025</span>
              <h3 className="text-white text-base font-semibold mb-2">Kegiatan Pemetaan Partisipatif Sempadan Sungai</h3>
              <p className="text-gray-300 text-xs">Rembuk komunitas bersama tim struktur sempadan dan warga bantaran untuk kolaborasi komunitas bantara Kali Code, Winongo, dan Gajahwong Yogyakarta.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};