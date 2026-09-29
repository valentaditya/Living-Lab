import Image from "next/image";

export default function RiverLabSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 max-w-3xl">
          <div className="text-xs font-mono text-teal-700 mb-2">— KERANGKA KERJA EKOSISTEM</div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0f1713] mb-4">River as Living Laboratory</h2>
          <p className="text-gray-600 text-lg">
            Sungai sebagai ruang multidimensi tempat bertemunya riset terapan, aksi sosial warga, dan advokasi kebijakan publik berkelanjutan di Daerah Istimewa Yogyakarta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Kiri: Gambar Besar */}
          <div className="lg:col-span-7">
            <div className="relative h-[450px] lg:h-[550px] rounded-sm overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1000&auto=format&fit=crop"
                alt="Laboratorium Lapangan"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1713]/95 via-[#0f1713]/50 to-transparent flex flex-col justify-end p-8">
                <span className="text-xs font-mono text-teal-400 mb-2">BENTO 01 // PILAR UTAMA</span>
                <h3 className="text-3xl font-bold text-white mb-3">Laboratorium Lapangan Bagi Generasi Penjaga Sungai</h3>
                <p className="text-gray-300 text-sm max-w-lg mb-6">
                  Sarana edukasi ekologi terbuka bagi pelajar, mahasiswa, dan masyarakat umum di sepanjang koridor Kali Code, Kali Winongo, dan Kali Gajahwong. Menjadikan sungai sebagai buku terbuka alam dan ruang interaksi kultural.
                </p>
                <div className="flex items-center gap-6 text-xs font-mono text-gray-300 border-t border-gray-700 pt-4">
                  <span>• 24 Titik Edu-Wisata</span>
                  <span>• 1.200+ Peserta Fieldwork / 7bln</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kanan: Kartu & Grid */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Card 1: Ruang Inovasi */}
            <div className="bg-white border border-gray-200 p-8 rounded-sm shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-gray-500">[ 02 // TEKNOLOGI TERAPAN GUNA ]</span>
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0f1713] mb-3">Ruang Inovasi</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Inkubasi teknologi tepat guna ramah lingkungan: instalasi filter, kolam domestik komunal, rekayasa vegetasi bantaran riparian, dan sensor telemetri debit air nirkabel berbasis LoRaWAN.
                </p>
              </div>
              {/* Mock Bar Chart */}
              <div className="bg-gray-50 p-4 rounded-sm border border-gray-100">
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 mb-2">
                  <span>Pengujian Sensor Mikro-IoT</span>
                  <span>18 Unit Aktif</span>
                </div>
                <div className="flex items-end gap-1 h-8">
                  <div className="w-full bg-teal-600 h-[40%] rounded-t-sm"></div>
                  <div className="w-full bg-teal-600 h-[60%] rounded-t-sm"></div>
                  <div className="w-full bg-teal-600 h-[80%] rounded-t-sm"></div>
                  <div className="w-full bg-teal-600 h-[50%] rounded-t-sm"></div>
                  <div className="w-full bg-teal-600 h-[90%] rounded-t-sm"></div>
                  <div className="w-full bg-teal-600 h-[70%] rounded-t-sm"></div>
                  <div className="w-full bg-teal-600 h-[100%] rounded-t-sm"></div>
                </div>
                <div className="flex justify-between text-[9px] font-mono text-gray-400 mt-1">
                  <span>Sleman Hulu</span>
                  <span>Bantul Hilir</span>
                </div>
              </div>
            </div>

            {/* Grid 3 Card Kecil */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#f8f9fa] border border-gray-200 p-5 rounded-sm flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-mono text-gray-500">[ 03 // PENTAHELIX HUB ]</span>
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <h4 className="font-bold text-sm text-[#0f1713] mb-2">Ruang Kolaborasi</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">Titik temu pentahelix yang cair dan egaliter: paguyuban warga tepi sungai, peneliti lintas fakultas UAJY, Dinas Lingkungan Hidup DIY, dan konsorsium LSM peduli sungai.</p>
                <div className="mt-auto pt-2 border-t border-gray-200">
                  <a href="#" className="text-[10px] font-semibold text-teal-700">Forum Triwulanan →</a>
                </div>
              </div>

              <div className="bg-[#f8f9fa] border border-gray-200 p-5 rounded-sm flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-mono text-gray-500">[ 04 // DATA & ARSIP ]</span>
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                </div>
                <h4 className="font-bold text-sm text-[#0f1713] mb-2">Ruang Produksi Pengetahuan</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">Repositori sains warga terbuka, pemetaan partisipatif spasial risiko sempadan, dan pengarsipan data hidrologi jangka panjang yang dapat diakses publik secara bebas.</p>
                <div className="mt-auto pt-2 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-gray-500">Data Terbuka DIY</span>
                  <span className="text-[10px] font-mono text-gray-500">14.2 GB</span>
                </div>
              </div>

              <div className="bg-[#f8f9fa] border border-gray-200 p-5 rounded-sm flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-mono text-gray-500">[ 05 // GERAKAN BUDAYA ]</span>
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h4 className="font-bold text-sm text-[#0f1713] mb-2">Ruang Transformasi Sosial</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">Mendorong pergeseran budaya kultural memblokir orientasi pemukiman menjadikan sungai sebagai beranda depan perjumpaan warga melalui etos filosofis "Madhep Kali".</p>
                <div className="mt-auto pt-2 border-t border-gray-200">
                  <div className="text-[10px] font-mono text-gray-500 mb-1">FILOSOFI LOKAL:</div>
                  <div className="text-[10px] italic text-gray-600">"Sungai dulu papan buangan, nanging sambung panggul."</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}