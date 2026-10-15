import React from 'react';
import Image from 'next/image';

export const ProfilSungai = () => {
  const sungaiData = [
    {
      id: "DAS CODE / 01",
      title: "Kali Code",
      subtitle: "Jantung urban & Kehidupan Lahar",
      desc: "Membelah pusat kota Yogyakarta, Kali Code adalah ikon transformasi dari permukiman padat menjadi kampung wisata yang mandiri. Aliran lahar dingin Gunung Merapi menjadi tantangan sekaligus berkah bagi warga.",
      stats: [
        { label: "Panjang Sungai", value: "43,8 km" },
        { label: "Kedalaman Rata-rata", value: "1,5 - 3 meter" },
        { label: "Debit Aliran Rata-rata", value: "4,5 m³/detik" },
        { label: "Fokus Riset", value: "Mitigasi Lahar & Sanitasi" },
      ],
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "DAS WINONGO / 02",
      title: "Kali Winongo",
      subtitle: "Laboratorium Biosains & Kearifan Agraria",
      desc: "Membentang di bagian barat kota, Kali Winongo menyimpan kekayaan hayati dan kearifan lokal. Menjadi laboratorium alam bagi peneliti biologi dan akademisi untuk mempelajari ekosistem riparian dan akuatik.",
      stats: [
        { label: "Panjang Sungai", value: "43,5 km" },
        { label: "Kedalaman Rata-rata", value: "2 - 4 meter" },
        { label: "Debit Aliran Rata-rata", value: "5,2 m³/detik" },
        { label: "Fokus Riset", value: "Biodiversitas & Konservasi" },
      ],
      img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: "DAS GAJAHWONG / 03",
      title: "Kali Gajahwong",
      subtitle: "Koridor Hayati & Rute Bio-Indikator",
      desc: "Membelah pusat kota Yogyakarta, Kali Gajahwong kini menjadi ruang terbuka hijau yang ramah. Berbagai komunitas dan akademisi bekerja bersama untuk memulihkan ekosistem sungai dan meningkatkan kualitas air.",
      stats: [
        { label: "Panjang Sungai", value: "33,2 km" },
        { label: "Kedalaman Rata-rata", value: "1 - 2 meter" },
        { label: "Debit Aliran Rata-rata", value: "4,1 m³/detik" },
        { label: "Fokus Riset", value: "Pemantauan Kualitas Air" },
      ],
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-[#f4f5f3] border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono text-gray-500 tracking-widest block mb-2">PROFIL HIDROLOGI & WILAYAH</span>
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#0f1713] mb-4">Tiga Arti Kehidupan Yogyakarta</h2>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
            Masing-masing sungai mengemban karakter lanskap yang berbeda, tantangan ekologi yang unik, serta dinamika komunitas yang menjadikannya laboratorium hidup yang berbeda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sungaiData.map((sungai, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-sm flex flex-col h-full hover:shadow-lg transition-shadow">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-2 py-1">{sungai.id}</span>
                <span className="text-[10px] font-mono text-gray-400">Rilis: 21 Maret 2024</span>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-[#0f1713] mb-1">{sungai.title}</h3>
                <span className="text-xs text-gray-500 italic mb-4">{sungai.subtitle}</span>
                
                <div className="relative w-full h-40 bg-gray-100 rounded-sm mb-4 overflow-hidden">
                  <Image src={sungai.img} alt={sungai.title} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                
                <p className="text-xs text-gray-600 leading-relaxed mb-6 flex-grow">{sungai.desc}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-6 border-t border-gray-100 pt-4">
                  {sungai.stats.map((stat, sIdx) => (
                    <div key={sIdx}>
                      <span className="block text-[10px] text-gray-400 mb-0.5">{stat.label}</span>
                      <span className="block text-xs font-semibold text-[#0f1713]">{stat.value}</span>
                    </div>
                  ))}
                </div>
                
                <a href="#" className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1 mt-auto">
                  Eksplorasi DAS {sungai.title.split(" ")[1]} <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};