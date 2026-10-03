import React from 'react';
import Image from 'next/image';

export const Biodiversitas = () => {
  const bioData = [
    { name: "Ikan Wader Pari", local: "Wader", desc: "Ikan kecil endemik perairan tawar Jawa. Rentan terhadap pencemaran, menjadikannya indikator utama kualitas air yang baik.", status: "Rentan", peran: "Indikator Kualitas Air", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop" },
    { name: "Capung Jumputan", local: "Capung", desc: "Predator alami serangga kecil. Keberadaannya menandakan ekosistem perairan yang sehat dan minim bahan kimia.", status: "Melimpah", peran: "Bioindikator", img: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=400&auto=format&fit=crop" },
    { name: "Bambu Apus & Petung", local: "Bambu", desc: "Tanaman riparian yang akarnya kuat mengikat tanah, mencegah erosi tebing sungai, dan menjadi habitat berbagai satwa.", status: "Dilindungi", peran: "Stabilisasi Tebing", img: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=400&auto=format&fit=crop" },
    { name: "Raja Udang Mentimun", local: "Raja Udang", desc: "Burung pemakan ikan yang menjadi indikator kualitas air bersih. Sensitif terhadap perubahan lingkungan perairan.", status: "Langka", peran: "Indikator Air Bersih", img: "https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=400&auto=format&fit=crop" },
    { name: "Udang Galah Sungai", local: "Udang Galah", desc: "Spesies krustasea yang memiliki nilai ekonomi tinggi. Keberadaannya menandakan kualitas air yang masih baik.", status: "Melimpah", peran: "Bioindikator", img: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=400&auto=format&fit=crop" },
    { name: "Pohon Gayam", local: "Gayam", desc: "Pohon besar dengan akar kuat yang mampu menyerap air tanah dan mencegah erosi. Sering digunakan sebagai peneduh.", status: "Dilindungi", peran: "Konservasi Air", img: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=400&auto=format&fit=crop" },
  ];

  return (
    <section className="py-24 bg-[#0f1713] text-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        <div className="mb-12">
          <span className="text-[10px] font-mono text-teal-400 tracking-widest block mb-3">KEANEKARAGAMAN HAYATI RIPARIAN & AKUATIK</span>
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Keanekaragaman Hayati Riparian & Akuatik</h2>
          <p className="text-gray-400 text-sm max-w-2xl">
            Dokumentasi taksonomi spesies bio-indikator kualitas air dan vegetasi penyangga tanggul alami hasil ekspedisi lapangan Living Lab UAJY.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bioData.map((item, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-sm overflow-hidden flex flex-col">
              <div className="relative h-48 w-full bg-gray-800">
                <Image src={item.img} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute top-3 left-3 bg-teal-600 text-white text-[10px] font-mono px-2 py-1">
                  {item.status}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
                <span className="text-xs text-teal-400 font-mono mb-4">{item.local}</span>
                <p className="text-xs text-gray-400 leading-relaxed mb-6 flex-grow">{item.desc}</p>
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-gray-500">Peran Ekologis:</span>
                  <span className="text-xs font-medium text-white">{item.peran}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};