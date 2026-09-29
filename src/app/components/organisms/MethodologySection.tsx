export default function MethodologySection() {
  const steps = [
    { num: "01", title: "Temu Kenali Lapangan", desc: "Pemetaan isu hulu-hilir bersama warga rukun kampung: debit banjir lahar dingin, timbunan limbah mikroplastik, dan status sempadan.", tag: "FASE DIAGNOSTIK" },
    { num: "02", title: "Ko-Desain Solusi", desc: "Laboratorium bersama antara insinyur sipil, biolog, sosiolog UAJY, dan pegiat paguyuban merancang prototipe penanganan.", tag: "FASE PROTOTYPING" },
    { num: "03", title: "Implementasi Lapangan", desc: "Pemasangan teknologi bio-filter, instalasi penampung tmbuk air otomatis, dan penataan ruang terbuka publik ramah lansia.", tag: "FASE DEPLOYMENT" },
    { num: "04", title: "Advokasi & Replikasi", desc: "Penyusunan naskah kebijakan berbasis bukti, limbah bagi pemangku kepentingan DIY dan replikasi model di DAS sekunder lainnya.", tag: "FASE ADVOKASI POLISI" },
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-mono text-teal-700 mb-2">[ METODOLOGI KERJA // SIKLUS LIVING LAB ]</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0f1713] mb-3">Bagaimana Laboratorium Hidup Beroperasi</h2>
            <p className="text-gray-600">
              Empat fase iteratif yang menjamin setiap riset akademik langsung terjun dan dirasakan manfaatnya di bantaran sungai.
            </p>
          </div>
          <button className="bg-teal-700 text-white px-6 py-3 rounded-sm text-sm font-semibold hover:bg-teal-800 transition-colors whitespace-nowrap">
            GABUNG RISET TERAPAN
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm flex flex-col h-full">
              <div className="text-3xl font-bold text-gray-300 mb-4">{step.num}</div>
              <h3 className="text-lg font-bold text-[#0f1713] mb-3">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">{step.desc}</p>
              <div className="text-[10px] font-mono text-gray-400 border-t border-gray-100 pt-3">
                [ {step.tag} ]
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}