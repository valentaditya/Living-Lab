import React from 'react';

export const PeluangKontribusi = () => {
  const opportunities = [
    {
      num: "01",
      title: "MENJADI MITRA STRATEGIS (BECOME A PARTNER)",
      desc: "Berkolaborasi dalam program jangka panjang, pendanaan riset aksi, program CSR berbasis sains tepat-guna, penyediaan infrastruktur sensor pemantau kualitas air, atau adopsi sempadan sungai bantaran warga.",
      tags: ["MOBILITAS", "BIAYA SENSOR", "INVESTASI DANA"],
      cta: "AJUKAN KEMITRAAN STRATEGIS →"
    },
    {
      num: "02",
      title: "RELAWAN EKSPEDISI & SAINS WARGA (VOLUNTEER)",
      desc: "Bergabung dalam aksi pemantauan sungai secara berkala, penanaman bibit, audit sampah plastik di kali, edukasi ke sekolah dasar, dan pengalaman berharga pemetaan erosi.",
      tags: ["AKSI BERSIH", "AUDIT SAMPAH", "RESTORASI VEGETASI"],
      cta: "DAFTAR RELAWAN LAPANGAN →"
    },
    {
      num: "03",
      title: "MAGANG RISET LAPANGAN (INTERNSHIP)",
      desc: "Program magang terstruktur berbasis untuk mahasiswa tingkat akhir. Bidang linguistik, lingkungan, sosial, komunikasi, dan informatika untuk proyek analisis data & publikasi sains.",
      tags: ["KONVERSI SKRIPSI", "SISTEM INFORMASI", "EKOLOGI & SOSIAL"],
      cta: "LIHAT POSISI MAGANG →"
    },
    {
      num: "04",
      title: "KOLABORASI RISET & HIBAH ILMIAH (RESEARCH)",
      desc: "Akses bank data hidrologi terukur 24/7, sistem telemetri DAS, dan jaringan sosial bantara untuk kepentingan penulisan disertasi, jurnal internasional bereputasi, maupun pengujian inovasi riset bersama.",
      tags: ["OPEN DATA HIDROLOGI", "PUBLIKASI BERSAMA", "STASIUN IOT TERINTEGRASI"],
      cta: "PROPOSALKAN PENELITIAN →"
    },
    {
      num: "05",
      title: "INTEGRASI JEJARING KOMUNITAS (COMMUNITY NETWORK)",
      desc: "Mengadopsi data atau posko sungai bantara Anda ke dalam peta simpul jejaring kami. Dapatkan akses ke modul pelatihan dan basis data sensor swadaya warga, dan forum dialog berkala pemelihara DAS.",
      tags: ["KELAYAKAN SIMPLIS", "FORUM LINTAS DAS", "ADVOKASI SEMPADAN"],
      cta: "HUBUNGAN KOMUNITAS →"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <span className="text-[10px] font-mono text-gray-500 tracking-widest block mb-2">[ SEKSI 03 // PELUANG KONTRIBUSI ]</span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#0f1713]">PILIH JALUR KETERLIBATAN ANDA</h2>
          </div>
          <p className="text-gray-500 text-sm max-w-md text-left md:text-right">
            Living Lab membuka peluang multidisiplin bagi institusi, akademisi, mahasiswa, hingga pegiat mandiri untuk mengambil peran nyata dalam konservasi hidrologi koridor sungai Yogyakarta.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-gray-200">
          {opportunities.map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10 items-start hover:bg-gray-50 transition-colors px-4 -mx-4">
              
              {/* Number */}
              <div className="md:col-span-1">
                <span className="text-5xl lg:text-6xl font-light text-gray-300 leading-none">{item.num}</span>
              </div>

              {/* Content */}
              <div className="md:col-span-8 flex flex-col gap-3">
                <h3 className="text-xl font-bold text-[#0f1713]">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">{item.desc}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[9px] font-mono bg-gray-100 text-gray-500 px-2 py-1 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="md:col-span-3 flex md:justify-end mt-4 md:mt-0">
                <a href="#" className="text-xs font-bold text-teal-700 hover:text-teal-900 uppercase tracking-wider flex items-center gap-2 border-b-2 border-transparent hover:border-teal-700 pb-1 transition-all">
                  {item.cta}
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};