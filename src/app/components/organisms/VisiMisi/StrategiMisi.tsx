import React from 'react';
import { itemList, itemText, type ContentItem } from '@/lib/content-schema';

const tagColors = ["bg-blue-50 text-blue-700", "bg-green-50 text-green-700", "bg-purple-50 text-purple-700", "bg-orange-50 text-orange-700"];

export function toMission(item: ContentItem, index: number) {
  return {
    num: String(index + 1).padStart(2, "0"),
    title: itemText(item, "title"),
    desc: itemText(item, "desc"),
    tags: itemList(item, "tags"),
    tagColor: tagColors[index % tagColors.length],
  };
}

/** Satu kartu misi (dipakai halaman Visi & Misi dan pratinjau dashboard). */
export const MissionCard = ({ misi }: { misi: ReturnType<typeof toMission> }) => (
  <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8 bg-white border border-gray-100 rounded-sm shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
    <div className="flex-shrink-0">
      <span className="text-4xl md:text-5xl font-light text-gray-300">{misi.num}</span>
    </div>
    <div className="flex-grow">
      <h3 className="text-xl font-semibold text-[#0f1713] mb-3">{misi.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{misi.desc}</p>
      <div className="flex flex-wrap gap-2">
        {misi.tags.map((tag, tIdx) => (
          <span key={tIdx} className={`text-xs px-2 py-1 rounded-sm ${misi.tagColor}`}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export const StrategiMisi = ({ items }: { items: ContentItem[] }) => {
  const misiData = items.map(toMission);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            <div>
              <span className="block mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Pilar Operasional</span>
              <h2 className="text-3xl lg:text-4xl font-semibold leading-tight mb-6 text-[#0f1713]">
                Misi Strategis & Komitmen Nyata
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Menghubungkan data ilmiah presisi dengan kearifan lokal warga tepian air. Kami memandang sungai bukan sekadar saluran drainase abu-abu, melainkan koridor kehidupan organik yang mengartikan martabat sosial, ekologi, dan ekonomi regeneratif.
              </p>
            </div>

            {/* Manifesto Card */}
            <div className="bg-[#f8f9fa] border border-gray-200 p-6 rounded-sm">
              <span className="block mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Manifesto Sains Warga</span>
              <p className="text-sm italic text-gray-700 leading-relaxed border-l-2 border-[#0f1713] pl-4">
                "Riset tidak berhenti di lemari arsip akademis. Tiap tetes data parameter air, mikroplastik, dan kerentanan banjir dikembalikan ke tangan warga sebagai daya tawar politik dan kebijakan publik berbasis bukti."
              </p>
              <span className="text-xs text-gray-400 mt-4 block">Konsorsium UAJY & Bantara</span>
              <span className="text-xs text-gray-400 block">Inisiatif 2024-2030</span>
            </div>

            {/* Integrasi 4 Pilar */}
            <div>
              <span className="block mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Integrasi 4 Pilar</span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: "100%", sub: "Riset Terbuka" },
                  { val: "85%", sub: "Sirkularitas" },
                  { val: "92%", sub: "Telemetri Real-time" },
                  { val: "78%", sub: "Advokasi Perda" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 p-4 rounded-sm">
                    <span className="text-lg font-bold text-[#0f1713] block tabular-nums">{item.val}</span>
                    <span className="text-[10px] text-gray-500">{item.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 4 Mission Cards */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {misiData.map((misi, idx) => (
              <MissionCard key={idx} misi={misi} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};