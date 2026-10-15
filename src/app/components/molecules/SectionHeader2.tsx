import React from 'react';
import { SectionHeaderBadge } from '../atoms/SectionHeaderBadge';
import { ArrowLink } from '../atoms/ArrowLink';

interface SectionHeaderBarProps {
  badgeText: string;
  title: string;
  moreText: string;
  moreHref?: string;
}

export const SectionHeaderBar: React.FC<SectionHeaderBarProps> = ({
  badgeText,
  title,
  moreText,
  moreHref = "#"
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <SectionHeaderBadge text={badgeText} />
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0B1E33] tracking-tight">
          {title}
        </h2>
      </div>
      <div>
        <ArrowLink
          text={moreText}
          href={moreHref}
          className="text-sm font-semibold text-[#1b7a43]"
        />
      </div>
    </div>
  );
};