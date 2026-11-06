import React, { HTMLAttributes, ReactNode } from 'react';

export interface StatCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  value: ReactNode;
  title: ReactNode;
  description: ReactNode;
}

/** Di ponsel: angka di kiri, teks di kanan. Mulai sm: kartu vertikal. */
export const StatCard: React.FC<StatCardProps> = ({
  value,
  title,
  description,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-md sm:flex-col sm:gap-0 sm:p-6 md:p-7 ${className}`}
      {...props}
    >
      <div className="w-16 shrink-0 sm:w-auto">
        <span className="block text-3xl font-black leading-none tracking-tight text-[#0B1E33] sm:text-4xl md:text-5xl">
          {value}
        </span>
        <div className="mt-3 hidden h-1 w-8 rounded-full bg-[#15803d] sm:mb-4 sm:block" />
      </div>

      <div className="min-w-0">
        <h4 className="mb-1 text-sm font-bold tracking-tight text-[#0B1E33] sm:mb-2 md:text-base">
          {title}
        </h4>
        <p className="text-xs leading-relaxed text-slate-500 md:text-[13px]">
          {description}
        </p>
      </div>
    </div>
  );
};
