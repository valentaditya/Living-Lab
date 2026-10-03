import React from 'react';

interface CategoryBadgeProps {
  label: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ label }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-slate-800 shadow-sm backdrop-blur-xs select-none">
      {label}
    </span>
  );
};