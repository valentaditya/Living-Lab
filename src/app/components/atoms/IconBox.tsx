import React, { HTMLAttributes, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface IconBoxProps extends HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  children?: ReactNode;
}

export const IconBox: React.FC<IconBoxProps> = ({
  icon: Icon,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-800 transition-transform duration-300 group-hover:scale-105 ${className}`}
      {...props}
    >
      {Icon ? <Icon className="w-6 h-6 stroke-[1.8]" /> : children}
    </div>
  );
};