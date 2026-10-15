import React from 'react';

export const TargetCapaian = () => {
  const targetData = [
    { value: "24", label: "STASIUN PANTAU", desc: "Titik Aksi", sub: "Sensor telemetri terintegrasi di DAS Code, Winongo, & Gajahwong" },
    { value: "1.200+", label: "RELAWAN SAINS WARGA", desc: "Warga Terlatih", sub: "Kader sampling air dan mitigasi darurat tingkat RW/Kalurahan." },
    { value: "12", label: "KERTAS KEBIJAKAN", desc: "Naskah Akademik", sub: "Diserahkan kepada Bappeda DIY dan Balai Besar Wilayah Sungai." },
    { value: "+35%", label: "INDEKS KESEHATAN KALI", desc: "Kemajuan Mutu", sub: "Target reduksi beban limbah cair domestik & sampah makro terhanyut." }
  ];

  return (
    <section className="py-20 lg:py-24 bg-gray-50 border-t border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-[10px] font-mono text-gray-500 tracking-widest block mb-2">[ MATRIKS DAMPAK STRATEGIS ]</span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#0f1713]">Target Capaian 2025-2030</h2>
          </div>
          <p className="text-gray-500 text-sm max-w-md text-left md:text-right">
            Parameter evaluasi kuantitatif yang dipantau melalui dewan kurator independen dan perwakilan forum komunitas tiga sungai.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetData.map((target, idx) => (
            <div key={idx} className="bg-white p-6 rounded-sm border border-gray-100 flex flex-col justify-between h-full shadow-sm">
              <div>
                <span className="text-[10px] font-mono text-gray-400 block mb-2">{target.label}</span>
                <span className="text-4xl lg:text-5xl font-bold text-[#0f1713] block mb-1">{target.value}</span>
                <span className="text-sm font-semibold text-gray-700 block mb-3">{target.desc}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-3 mt-4">
                {target.sub}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};