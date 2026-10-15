import React from 'react';

interface MetaInfoProps {
  date: string;
  readTime: string;
  tag: string;
}

export const MetaInfo: React.FC<MetaInfoProps> = ({ date, readTime, tag }) => {
  return (
    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
      <span>{date}</span>
      <span>•</span>
      <span>{readTime}</span>
      <span>•</span>
      <span>{tag}</span>
    </div>
  );
};