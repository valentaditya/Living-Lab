import React from 'react';

interface SectionHeaderBadgeProps {
  text: string;
}

export const SectionHeaderBadge: React.FC<SectionHeaderBadgeProps> = ({ text }) => {
  return (
    <span className="text-[11px] sm:text-xs font-bold text-[#1b7a43] tracking-wider uppercase block mb-1.5 select-none">
      {text}
    </span>
  );
};