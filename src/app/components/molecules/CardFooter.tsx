import React from 'react';
import { ArrowLink } from '../atoms/ArrowLink';

interface CardFooterProps {
  author: string;
  actionText: string;
  actionHref?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  author,
  actionText,
  actionHref = "#"
}) => {
  return (
    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
      <span className="text-xs font-medium text-slate-500 truncate" title={author}>
        {author}
      </span>
      <div className="shrink-0">
        <ArrowLink text={actionText} href={actionHref} />
      </div>
    </div>
  );
};