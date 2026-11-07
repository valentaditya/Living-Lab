import React from 'react';
import { itemText, type ContentItem } from '@/lib/content-schema';

export const JejaringMitra = ({ items }: { items: ContentItem[] }) => {
  const lembaga = items.filter((item) => itemText(item, "kind") === "Lembaga");
  const komunitasList = items.filter((item) => itemText(item, "kind") === "Komunitas").map((item) => itemText(item, "name"));

  return (
    <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="block mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Jejaring Mitra</span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#0f1713]">DIPERCAYA OLEH LINTAS LEMBAGA & KOMUNITAS</h2>
          </div>
          <p className="text-gray-500 text-sm max-w-md text-left md:text-right">
            Sinergi multi-pihak yang melibatkan badan pemerintahan, industri yang berorientasi lingkungan, organisasi non-pemerintah, dan komunitas riset independen di Yogyakarta.
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
          {lembaga.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 h-20 flex items-center justify-center rounded-sm px-4 text-center text-sm font-bold text-gray-700 tracking-wider">
              {itemText(item, "logo") ? (
                <img src={itemText(item, "logo")} alt={itemText(item, "name")} className="max-h-12 w-auto object-contain" />
              ) : (
                itemText(item, "name")
              )}
            </div>
          ))}
        </div>

        {/* Community List */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 pt-8">
          <span className="text-[10px] text-gray-400 tracking-widest">JEJARING KOMUNITAS SUNGAI:</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {komunitasList.map((komunitas, idx) => (
              <span key={idx} className="text-xs text-gray-600 font-medium">
                {komunitas}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};