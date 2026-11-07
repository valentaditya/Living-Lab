import React from 'react';
import { itemList, itemNumber, itemText, type ContentItem } from '@/lib/content-schema';

const statusColors: Record<string, string> = {
  "Fase Selesai": "bg-green-50 text-green-700 border-green-200",
  "Sedang Berjalan": "bg-teal-50 text-teal-700 border-teal-200",
};
export function toRoadmapPhase(item: ContentItem) {
  const percent = itemNumber(item, "progressPercent");
  const label = itemText(item, "progressLabel");
  return {
    year: itemText(item, "year"),
    status: itemText(item, "status"),
    statusColor: statusColors[itemText(item, "status")] ?? "bg-gray-50 text-gray-600 border-gray-200",
    phaseTag: itemText(item, "phaseTag"),
    dateRange: itemText(item, "dateRange"),
    title: itemText(item, "title"),
    desc: itemText(item, "desc"),
    tags: itemList(item, "tags"),
    outputTitle: "Output Kunci",
    outputName: itemText(item, "outputName"),
    outputDesc: itemText(item, "outputDesc"),
    outputFooter: itemText(item, "outputFooter"),
    progress: label && percent !== null
      ? { label, value: itemText(item, "progressValue"), percentage: `${percent}%` }
      : undefined,
  };
}


/** Satu fase roadmap (dipakai halaman Roadmap dan pratinjau dashboard). */
export const RoadmapPhase = ({ phase }: { phase: ReturnType<typeof toRoadmapPhase> }) => (
<div className="relative">
  {/* Timeline Dot */}
  <div className="absolute -left-[41px] md:-left-[73px] top-0 w-5 h-5 bg-white border-4 border-gray-300 rounded-full z-10"></div>
  
  <div className="flex flex-col md:flex-row gap-8 items-start">
    
    {/* Year Column */}
    <div className="md:w-32 flex-shrink-0 pt-2">
      <span className="block text-4xl md:text-5xl font-bold text-gray-300 leading-none">{phase.year}</span>
      <span className={`inline-block mt-2 text-xs font-medium px-2 py-1 border rounded-sm ${phase.statusColor}`}>
        {phase.status}
      </span>
    </div>

    {/* Card Column */}
    <div className="flex-grow bg-white border border-gray-200 rounded-sm shadow-sm w-full">
      <div className="p-6 md:p-8">
        
        {/* Card Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-6 border-b border-gray-100 pb-4">
          <span className="text-xs font-semibold text-gray-500">{phase.phaseTag}</span>
          <span className="text-xs text-gray-400 tabular-nums">{phase.dateRange}</span>
        </div>

        <h3 className="text-xl md:text-2xl font-semibold text-[#0f1713] mb-4">{phase.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">{phase.desc}</p>

        {/* Progress Bar (Khusus Fase 2) */}
        {phase.progress && (
          <div className="mb-6 bg-gray-50 p-4 border border-gray-100 rounded-sm">
            <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1 text-xs text-gray-500 mb-2">
              <span>{phase.progress.label}</span>
              <span className="font-bold text-teal-700 tabular-nums">{phase.progress.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: phase.progress.percentage }}></div>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {phase.tags.map((tag, tIdx) => (
            <span key={tIdx} className="text-xs bg-gray-100 text-gray-500 px-2 py-1">
              {tag}
            </span>
          ))}
        </div>

        {/* Output Box */}
        <div className="bg-gray-50 border border-gray-100 p-5 rounded-sm flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex-grow">
            <span className="text-xs text-gray-400 block mb-1">{phase.outputTitle}</span>
            <span className="block text-sm font-bold text-[#0f1713] mb-2">{phase.outputName}</span>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xl">{phase.outputDesc}</p>
          </div>
          <div className="text-xs text-gray-400 text-left md:text-right w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0">
            {phase.outputFooter}
          </div>
        </div>

      </div>
    </div>

  </div>
</div>
);

export const TimelineRoadmap = ({ items }: { items: ContentItem[] }) => {
  const phases = items.map(toRoadmapPhase);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="relative border-l-2 border-gray-200 pl-8 md:pl-16 space-y-16">
          {phases.map((phase, idx) => (
            <RoadmapPhase key={idx} phase={phase} />
          ))}
        </div>
      </div>
    </section>
  );
};
