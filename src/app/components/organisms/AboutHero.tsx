import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="bg-[#f8f9fa] py-16 lg:py-24 border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Kolom Kiri: Teks */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
              <span>ARSIP 01 // PROFIL LEMBAGA | D.I. YOGYAKARTA</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#0f1713] leading-tight">
              Tentang <span className="text-teal-700">Living Lab</span>
            </h1>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Platform kolaboratif yang mempertemukan masyarakat, akademisi, pemerintahan, industri, dan komunitas untuk bersama-sama belajar, berinovasi, dan bertindak untuk keberlanjutan sungai di Yogyakarta.
            </p>

            {/* Grid Info */}
            <div className="grid grid-cols-3 gap-4 mt-4 border-t border-b border-gray-300 py-6">
              <div>
                <div className="text-[10px] font-mono text-gray-500 mb-1">AFILIASI RISET</div>
                <div className="text-sm font-semibold text-[#0f1713]">UAJY & Paguyuban Bantara</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-gray-500 mb-1">KORIDOR DAS</div>
                <div className="text-sm font-semibold text-[#0f1713]">Code • Winongo • Gajahwong</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-gray-500 mb-1">METODOLOGI</div>
                <div className="text-sm font-semibold text-[#0f1713]">Sains Warga & IoT Sensor</div>
              </div>
            </div>

            {/* Verification Badge */}
            <div className="flex items-start gap-4 bg-gray-200/50 p-4 rounded-sm mt-2">
              <div className="bg-teal-700 text-white p-2 rounded-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-[#0f1713]">Terdaftar dalam Jaringan Laboratorium Hidrologi Warga</div>
                <div className="text-xs text-gray-500 mt-1">SK. Bantara DIY No. 114/2024 • Sertifikasi Kualitas Air</div>
                <a href="#" className="text-xs font-semibold text-teal-700 mt-2 inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Pelajari Agenda <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Gambar */}
          <div className="relative h-[500px] lg:h-[600px] w-full rounded-sm overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=1000&auto=format&fit=crop"
              alt="Tim Living Lab di lapangan"
              fill
              priority // PENTING: Untuk LCP (Largest Contentful Paint) score
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            
            {/* Overlay Top */}
            <div className="absolute top-4 left-4 bg-[#0f1713]/80 backdrop-blur-sm text-white px-3 py-1.5 text-[10px] font-mono flex items-center gap-2 rounded-sm">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
              STATUS TELEMETRI #04 - BRONTOKUSUMAN
            </div>

            {/* Overlay Bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 pt-20 text-white">
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-300 mb-4 border-b border-gray-700 pb-2">
                <span>DOC. REF: FIELD-2024</span>
                <span>Koordinat: -7.78, 110.42</span>
              </div>
              <p className="text-sm italic leading-relaxed text-gray-200">
                "Uji kualitas air bantara Kali Brontokusuman — Tim gabungan mahasiswa Fakultas Teknologi UAJY bersama Paguyuban Bantara Kali Code mengambli sampel Dissolved Oxygen dan konduktivitas debit hulu."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}