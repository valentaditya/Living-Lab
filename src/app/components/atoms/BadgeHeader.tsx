import React from 'react';
import { ArrowLeftRight } from 'lucide-react';

export const BadgeHeader = ({ text = "SIKLUS KREASI BERSAMA RISET & AKSI" }) => {
  return (
    <div className="inline-flex items-center gap-2 text-emerald-700 font-bold tracking-wider text-xs md:text-sm uppercase mb-3 select-none">
      <ArrowLeftRight className="w-4 h-4 stroke-[2.5]" />
      <span>{text}</span>
    </div>
  );
};