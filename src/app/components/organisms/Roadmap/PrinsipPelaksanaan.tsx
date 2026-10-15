import React from 'react';

export const PrinsipPelaksanaan = () => {
  const prinsipData = [
    {
      num: "01 / BIG DATA SAINS",
      title: "Metodologi Terbuka & Teruji",
      desc: "Kalibrasi alat sensor berkala bersama laboratorium Teknik Lingkungan UAJY guna memastikan akurasi data sebelum instrumen baku pemerintah.",
      ref: "REF: STANDAR SNI-6989",
      icon: "🔬"
    },
    {
      num: "02 / CO-KREASI WARGA",
      title: "Pengetahuan Lokal Bantaran",
      desc: "Teknologi tidak dipaksakan dari atas, melainkan dirancang bersama relawan sungai untuk memastikan keberlanjutan perawatan dan rasa kepemilikan komunitas.",
      ref: "REF: KEARIFAN PAGUYUBAN BANTARA",
      icon: "🤝"
    },
    {
      num: "03 / DAMPAK KEBIJAKAN",
      title: "Advokasi Berbasis Bukti",
      desc: "Seluruh rekom data telemetri diolah menjadi policy brief politik bagi BBWS Serayu Opak dan Dinas Lingkungan Hidup DIY sebagai dasar pendekatan pencapaian.",
      ref: "REF: ADVOKASI DAS DIY 2024-2029",
      icon: "⚖️"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-[10px] font-mono text-gray-500 tracking-widest block mb-2">[ PENDEKATAN METODOLOGIS // KERANGKA KERJA ]</span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#0f1713]">Prinsip Pelaksanaan Tiap Tahapan</h2>
          </div>
          <p className="text-gray-500 text-sm max-w-md text-left md:text-right">
            Setiap fase dalam roadmap dirancang agar dapat dipertanggungjawabkan secara akademik, praktis diadopsi warga, dan patuh regulasi tata ruang wilayah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prinsipData.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-sm border border-gray-100 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
              <div>
                <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-sm flex items-center justify-center mb-6 text-lg">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono text-gray-400 block mb-2">{item.num}</span>
                <h3 className="text-lg font-semibold text-[#0f1713] mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{item.desc}</p>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-auto">
                <span className="text-[10px] font-mono text-gray-400">{item.ref}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};