import React from 'react';

export const SiaranPersMedia = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Siaran Pers */}
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-[10px] font-mono text-gray-500 tracking-widest block mb-2">[ SIARAN PERS // DISTRIBUSI RESMI ]</span>
              <h2 className="text-3xl font-semibold text-[#0f1713] mb-2">Siaran Pers Resmi</h2>
              <p className="text-gray-500 text-sm">Pernyataan tertulis, rangkuman eksekutif hasil uji laboratorium, dan rilis kerja sama multipihak Living Lab Sungai Yogyakarta.</p>
            </div>

            <div className="flex flex-col divide-y divide-gray-100">
              {[
                { date: "10 FEB 2025", title: "Hasil Uji Laboratorium Air Pasca-Banjir Lahar Hujan Kali Code: Kandungan Logam Berat Dalam Batas Aman", link: "Unduh Dokumen (PDF)" },
                { date: "03 JAN 2025", title: "Nota Kesepahaman UAJY dan Balai Besar Wilayah Sungai Serayu Opak (BBWSSO) untuk Koridor Riset Terpadu", link: "Unduh Dokumen (PDF)" },
                { date: "20 DES 2024", title: "Deklarasi Pijakan Sempadan Berkualitas: Usulan Kebijakan Penataan Ruang Riparian DIY 2025-2030", link: "Unduh Dokumen (PDF)" },
              ].map((item, idx) => (
                <div key={idx} className="py-4 flex gap-4 items-start">
                  <span className="text-[10px] font-mono text-red-600 font-bold bg-red-50 px-1.5 py-0.5 mt-0.5">PDF</span>
                  <div className="flex-grow">
                    <span className="text-[10px] font-mono text-gray-400 block mb-1">{item.date}</span>
                    <h4 className="text-sm font-semibold text-[#0f1713] mb-2">{item.title}</h4>
                    <a href="#" className="text-[10px] font-mono text-teal-700 hover:text-teal-900">{item.link} ↓</a>
                  </div>
                </div>
              ))}
            </div>
            
            <a href="#" className="text-xs font-semibold text-[#0f1713] hover:text-teal-700 flex items-center gap-1">
              LIHAT SEMUA SIARAN PERS <span>→</span>
            </a>
          </div>

          {/* Right Column: Liputan Media */}
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-[10px] font-mono text-gray-500 tracking-widest block mb-2">[ LIPUTAN MEDIA // PERS NASIONAL & LOKAL ]</span>
              <h2 className="text-3xl font-semibold text-[#0f1713] mb-2">Liputan & Sorotan Media</h2>
              <p className="text-gray-500 text-sm">Catatan publikasi, ulasan investigasi lingkungan, dan dokumentasi independen media arus utama maupun media lokal di Yogyakarta.</p>
            </div>

            <div className="flex flex-col gap-6">
              {[
                { source: "HARIAN KOMPAS", date: "EDISI CETAK // 18 FEB 2025", quote: "\"Model Living Lab di Kali Code membuktikan bahwa warga bantaran bukan sekadar objek kajian, melainkan penentu utama yang menggerakkan solusi sungai secara swadaya.\"", link: "Baca Kliping Media →" },
                { source: "MONGABAY INDONESIA", date: "FITUR KHUSUS // 29 JAN 2025", quote: "\"Di tengah ancaman sedimentasi lahan dan limbah domestik perkotaan, jaringan sensor IoT milik bantaran menjadi laboratorium sains warga pertama di Jawa bagian selatan.\"", link: "Baca Kliping Media →" },
                { source: "RADAR JOGJA", date: "BERITA UTAMA // 05 DES 2024", quote: "\"Gerakan Madhep Kali menemukan momentumnya: bagaimana arsitektur ramah bantaran dan bank sampah Muju Muju mengubah wajah sempadan Gajahwong.\"", link: "Baca Kliping Media →" },
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-100 p-5 rounded-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-[#0f1713]">{item.source}</span>
                    <span className="text-[9px] font-mono text-gray-400">{item.date}</span>
                  </div>
                  <p className="text-xs italic text-gray-600 leading-relaxed mb-4">{item.quote}</p>
                  <a href="#" className="text-[10px] font-mono text-teal-700 hover:text-teal-900">{item.link}</a>
                </div>
              ))}
            </div>

            <a href="#" className="text-xs font-semibold text-[#0f1713] hover:text-teal-700 flex items-center gap-1">
              UNDUH BUKU KLIPING PERS TAHUNAN <span>→</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};