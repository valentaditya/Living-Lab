import React from 'react';

export const StrategiMisi = () => {
  const misiData = [
    {
      num: "01",
      title: "Memfasilitasi Riset Kolaboratif & Inovasi Teknologi",
      desc: "Memadukan riset multidisiplin dan pengujian teknologi tepat guna berbasis sains warga, melibatkan akademisi, praktisi, dan komunitas. Mencakup purwarupa sensor nirkabel kualitas air, pemodelan hidrologi mikro, serta pemantauan vegetasi riparian endemik untuk bioremediasi alami.",
      tags: ["Sensor IoT Mandiri", "Fitoremediasi Riparian", "Audit Morfologi Sungai"],
      tagColor: "bg-blue-50 text-blue-700"
    },
    {
      num: "02",
      title: "Memberdayakan Komunitas Berbasis Sirkular",
      desc: "Mengembangkan kapasitas warga bantaran sungai melalui edukasi kepedulian air, tata kelola sampah partisipatif, serta pengembangan ekonomi sirkular lokal. Mewujudkan posko pemilahan organik-anorganik bantara mandiri, pembuatan kompos fermentasi air kali, dan lokakarya daur plastik mikro.",
      tags: ["Bank Sampah Bantara", "Sanitasi Komunal Berkelanjutan", "Sekolah Sungai Mandiri"],
      tagColor: "bg-green-50 text-green-700"
    },
    {
      num: "03",
      title: "Menyediakan Data Terbuka & Transparan",
      desc: "Membangun repositori data terbuka pemantauan kualitas air dan indeks ekologis sungai secara real-time untuk penguatan sains warga (citizen science). Siapa pun, mulai dari pelajar SD hingga peneliti doktoral, dapat mengunduh raw telemetry pH, DO, BOD, serta status debit kali tanpa dinding berbayar.",
      tags: ["Open API Hidrologi", "Indeks Makroinvertebrata", "Peta Spasial Risiko Banjir"],
      tagColor: "bg-purple-50 text-purple-700"
    },
    {
      num: "04",
      title: "Akselerasi Tata Kelola & Kebijakan Publik",
      desc: "Mengakselerasi terwujudnya tata kelola sungai partisipatif dan kebijakan publik terpadu bersama pemangku kebijakan di tingkat Penda DIY maupun Kota/Kabupaten. Menyelenggarakan forum musyawarah bantara reguler dan penyusunan kertas kebijakan (policy brief) protokol sempadan sungai.",
      tags: ["Policy Brief Semesteran", "Konsultasi Publik AMDAL", "Harmonisasi Perda Sempadan"],
      tagColor: "bg-orange-50 text-orange-700"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            <div>
              <span className="text-[10px] font-mono text-gray-500 tracking-widest block mb-3">[ PILAR OPERASIONAL ]</span>
              <h2 className="text-3xl lg:text-4xl font-semibold leading-tight mb-6 text-[#0f1713]">
                Misi Strategis & Komitmen Nyata
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Menghubungkan data ilmiah presisi dengan kearifan lokal warga tepian air. Kami memandang sungai bukan sekadar saluran drainase abu-abu, melainkan koridor kehidupan organik yang mengartikan martabat sosial, ekologi, dan ekonomi regeneratif.
              </p>
            </div>

            {/* Manifesto Card */}
            <div className="bg-[#f8f9fa] border border-gray-200 p-6 rounded-sm">
              <div className="text-xs font-mono text-gray-500 mb-2">@ Manifesio Sains Warga</div>
              <p className="text-sm italic text-gray-700 leading-relaxed border-l-2 border-[#0f1713] pl-4">
                "Riset tidak berhenti di lemari arsip akademis. Tiap tetes data parameter air, mikroplastik, dan kerentanan banjir dikembalikan ke tangan warga sebagai daya tawar politik dan kebijakan publik berbasis bukti."
              </p>
              <span className="text-[10px] font-mono text-gray-400 mt-4 block">Konsorsium UAJY & Bantara</span>
              <span className="text-[10px] font-mono text-gray-400 block">Inisiatif 2024-2030</span>
            </div>

            {/* Integrasi 4 Pilar */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono text-gray-500">Integrasi 4 Pilar</span>
                <span className="text-[10px] font-mono text-gray-500">STATUS: AKTIF</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "01 RIS", val: "100%", sub: "Riset Terbuka" },
                  { label: "02 SIR", val: "85%", sub: "Sirkularitas" },
                  { label: "03 DAT", val: "92%", sub: "Telemetri Real-time" },
                  { label: "04 POL", val: "78%", sub: "Advokasi Perda" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 p-4 rounded-sm">
                    <span className="text-[9px] font-mono text-gray-400 block mb-1">{item.label}</span>
                    <span className="text-lg font-bold text-[#0f1713] block">{item.val}</span>
                    <span className="text-[10px] text-gray-500">{item.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 4 Mission Cards */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {misiData.map((misi, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-6 p-6 md:p-8 bg-white border border-gray-100 rounded-sm shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <span className="text-4xl md:text-5xl font-light text-gray-300">{misi.num}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-[#0f1713] mb-3">{misi.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{misi.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {misi.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={`text-[10px] font-mono px-2 py-1 rounded-sm ${misi.tagColor}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};