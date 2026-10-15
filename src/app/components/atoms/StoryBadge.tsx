
import React from 'react';

interface StoryBadgeProps {
  text: string;
  variant?: 'code' | 'category';
}

export const StoryBadge: React.FC<StoryBadgeProps> = ({ text, variant = 'category' }) => {
  if (variant === 'code') {
    return (
      <span className="font-mono text-xs font-semibold text-emerald-800 tracking-wider">
        {text}
      </span>
    );
  }

  return (
    <span className="inline-block text-[11px] font-medium uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
      {text}
    </span>
  );
};