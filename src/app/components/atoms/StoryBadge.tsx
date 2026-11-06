
import React from 'react';

interface StoryBadgeProps {
  text: string;
}

export const StoryBadge: React.FC<StoryBadgeProps> = ({ text }) => {
  return (
    <span className="inline-block text-[11px] font-medium uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
      {text}
    </span>
  );
};
