import React from 'react';
import Image from 'next/image';

export const SainsWarga = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Main Quote */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#0f1713]">
              Sains Warga & Kearifan Bantara
            </h2>
            
            <div className="relative pl-6 border-l-4 border-teal-600">
              <span className="text-5xl text-teal-600 absolute -top-4 -left-3 font-serif">“</span>
              <p className="text-lg md:text-xl italic text-gray-700 leading-relaxed mb-6">
                Sungai dulu papan buwangan, nanging sumbering panguripan. Ketika masyarakat tepian sungai memilikinya kembali, menghadap kali, di situlah martabat dan keberlanjutan ekologis dimulai bersama.
              </p>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" alt="FX. Bambang Hendro" fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <span className="block font-semibold text-[#0f1713]">FX. Bambang Hendro</span>
                  <span className="block text-xs text-gray-500">Koordinator Lapangan Living Lab • Mitra Relawan DAS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Smaller Quotes */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-gray-50 p-6 border border-gray-100 rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop" alt="Totok Prantondo" fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <span className="block font-semibold text-sm text-[#0f1713]">Totok Prantondo</span>
                  <span className="block text-[10px] font-mono text-gray-500">Inisiator Komunitas Kali Winongo</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 italic leading-relaxed">
                "Menghidupkan kembali sungai berarti mengembalikan fungsi ekologis dan sosialnya. Warga adalah penjaga utama, bukan sekadar penonton."
              </p>
            </div>

            <div className="bg-gray-50 p-6 border border-gray-100 rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop" alt="Sekar Ayu Prabawati" fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <span className="block font-semibold text-sm text-[#0f1713]">Sekar Ayu Prabawati, S.Si.</span>
                  <span className="block text-[10px] font-mono text-gray-500">Peneliti Ekologi UAJY</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 italic leading-relaxed">
                "Setiap sampel air yang kami analisis membawa cerita tentang bagaimana manusia memperlakukan lingkungannya."
              </p>
            </div>

            <div className="bg-gray-50 p-6 border border-gray-100 rounded-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                  <Image src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop" alt="Endang Subekti" fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <span className="block font-semibold text-sm text-[#0f1713]">Endang Subekti</span>
                  <span className="block text-[10px] font-mono text-gray-500">Ketua Forum Komunitas Sungai DIY</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 italic leading-relaxed">
                "Kolaborasi adalah kunci. Tidak ada satu pihak pun yang bisa menyelesaikan masalah sungai sendirian."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};