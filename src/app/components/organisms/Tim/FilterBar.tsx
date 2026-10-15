import React from 'react';

export const FilterBar = () => {
  return (
    <div className="bg-white py-6 border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <span className="text-[10px] font-mono text-gray-400 mr-2 hidden md:block">FILTER DIVISI:</span>
          <button className="bg-[#0f1713] text-white px-4 py-1.5 text-xs font-medium rounded-sm whitespace-nowrap">
            Semua Tokoh (6)
          </button>
          <button className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-1.5 text-xs font-medium rounded-sm whitespace-nowrap transition-colors">
            Akademisi UAJY (3)
          </button>
          <button className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-1.5 text-xs font-medium rounded-sm whitespace-nowrap transition-colors">
            Akar Rumput (3)
          </button>
        </div>

        {/* Audit Status */}
        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
          <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">✓</span>
          <span>Status Audit Etik Laporan: Terverifikasi LPPM UAJY</span>
        </div>

      </div>
    </div>
  );
};