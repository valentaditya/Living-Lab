import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ArrowLinkProps {
  text: string;
  href?: string;
  className?: string;
  iconClassName?: string;
}

export const ArrowLink: React.FC<ArrowLinkProps> = ({
  text,
  href = "#",
  className = "",
  iconClassName = "w-4 h-4"
}) => {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#1b7a43] hover:text-emerald-800 transition-colors group/link ${className}`}
    >
      <span>{text}</span>
      <ArrowRight className={`${iconClassName} transition-transform duration-200 group-hover/link:translate-x-1 stroke-[2.2]`} />
    </a>
  );
};