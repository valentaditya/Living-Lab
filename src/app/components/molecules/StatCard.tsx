import React, { HTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { CountUp } from '../atoms/CountUp';

export interface StatCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  value: ReactNode;
  title: ReactNode;
  description?: string;
  icon?: LucideIcon;
}

/** Kartu putih ringkas: ikon, angka, garis kecil, label (deskripsi muncul sebagai tooltip). */
export const StatCard: React.FC<StatCardProps> = ({
  value,
  title,
  description,
  icon: Icon,
  className = '',
  ...props
}) => {
  return (
    <div
      title={description}
      className={`flex flex-col items-center justify-center bg-white px-3 py-6 text-center shadow-[0_12px_32px_rgba(15,23,19,0.12)] sm:px-5 sm:py-8 ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-8 w-8 text-[#1b7a43] sm:h-9 sm:w-9" strokeWidth={1.4} aria-hidden="true" />}
      <span className="mt-3 text-3xl font-bold tracking-tight text-[#0B1E33] sm:mt-4 sm:text-4xl">
        {typeof value === 'string' ? <CountUp value={value} /> : value}
      </span>
      <span className="my-3 h-px w-8 bg-slate-300" aria-hidden="true" />
      <span className="text-xs font-medium text-slate-500 sm:text-sm">{title}</span>
    </div>
  );
};
