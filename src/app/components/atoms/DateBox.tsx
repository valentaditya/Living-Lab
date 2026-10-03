import React from 'react';

interface DateBoxProps {
  month: string;
  day: string;
}

export const DateBox: React.FC<DateBoxProps> = ({ month, day }) => (
  <div className="bg-white rounded-xl sm:rounded-2xl w-14 h-16 sm:w-16 sm:h-18 flex flex-col items-center justify-center shrink-0 shadow-sm border border-slate-100">
    <span className="text-[10px] sm:text-[11px] font-bold text-[#1b7a43] uppercase tracking-wider mb-0.5">
      {month}
    </span>
    <span className="text-lg sm:text-xl font-extrabold text-[#0B1E33] leading-none">
      {day}
    </span>
  </div>
);