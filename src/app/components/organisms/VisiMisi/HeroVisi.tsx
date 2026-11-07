import React from 'react';
import type { BlockData } from '@/lib/content-schema';

export const HeroVisi = ({ vision }: { vision: BlockData }) => {
  const metrics = [1, 2, 3]
    .map((n) => ({ label: vision[`metric${n}Label`], value: vision[`metric${n}Value`], note: vision[`metric${n}Note`] }))
    .filter((metric) => metric.value);
  return (
    <section className="bg-[#f8f9fa] pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        <div className="flex flex-col items-center text-center mb-16">
          <span className="block mb-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
            {vision.label}
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.15] tracking-tight max-w-4xl mx-auto mb-8 text-[#0f1713]">
            “{vision.statement}”
          </h1>
          
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {vision.description}
          </p>
        </div>

        {metrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {metrics.map((metric) => (
              <div key={metric.label} className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 text-center flex flex-col items-center">
                <span className="text-xs text-gray-400 mb-2">{metric.label}</span>
                <span className="text-3xl font-bold text-[#0f1713]">{metric.value}</span>
                <span className="text-xs text-gray-500 mt-1">{metric.note}</span>
              </div>
            ))}
          </div>
        )}

        <p className="border-t border-gray-200 pt-6 text-center text-xs text-gray-500">
          {vision.footnote}
        </p>

      </div>
    </section>
  );
};