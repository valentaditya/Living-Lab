import React from 'react';
import { itemText, type ContentItem } from '@/lib/content-schema';

/** Satu kartu target (dipakai halaman Visi & Misi dan pratinjau dashboard). */
export const TargetCard = ({ target }: { target: { value: string; label: string; desc: string; sub: string } }) => (
  <div className="bg-white p-6 rounded-sm border border-gray-100 flex flex-col justify-between h-full shadow-sm">
    <div>
      <span className="text-xs text-gray-400 block mb-2">{target.label}</span>
      <span className="text-4xl lg:text-5xl font-bold text-[#0f1713] block mb-1">{target.value}</span>
      <span className="text-sm font-semibold text-gray-700 block mb-3">{target.desc}</span>
    </div>
    <p className="text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-3 mt-4">
      {target.sub}
    </p>
  </div>
);

export const TargetCapaian = ({ items }: { items: ContentItem[] }) => {
  const targetData = items.map((item) => ({
    value: itemText(item, "value"),
    label: itemText(item, "label"),
    desc: itemText(item, "desc"),
    sub: itemText(item, "sub"),
  }));

  return (
    <section className="py-20 lg:py-24 bg-gray-50 border-t border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="block mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Matriks Dampak Strategis</span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#0f1713]">Target Capaian 2025-2030</h2>
          </div>
          <p className="text-gray-500 text-sm max-w-md text-left md:text-right">
            Parameter evaluasi kuantitatif yang dipantau melalui dewan kurator independen dan perwakilan forum komunitas tiga sungai.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetData.map((target, idx) => (
            <TargetCard key={idx} target={target} />
          ))}
        </div>

      </div>
    </section>
  );
};