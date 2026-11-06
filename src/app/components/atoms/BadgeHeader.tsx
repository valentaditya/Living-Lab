import React from 'react';

export const BadgeHeader = ({ text = "SIKLUS KREASI BERSAMA RISET & AKSI" }) => {
  return (
    <span className="mb-2 block select-none text-xs font-bold uppercase tracking-wider text-[#1b7a43]">
      {text}
    </span>
  );
};
