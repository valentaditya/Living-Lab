import React, { HTMLAttributes, ReactNode } from 'react';
import { StatIndicator } from '../atoms/StatIndicator';


export interface StatCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  value: ReactNode;
  title: ReactNode;
  description: ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  title,
  description,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-100 p-6 md:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow duration-300 flex flex-col justify-between ${className}`}
      {...props}
    >
      <div>
     
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1E33] tracking-tight leading-none">
            {value}
          </span>
          <StatIndicator className="mt-2" />
        </div>

     
        <div className="w-8 h-1 bg-[#15803d] rounded-full mb-4" />

        <h4 className="text-sm md:text-base font-bold text-[#0B1E33] tracking-tight mb-2">
          {title}
        </h4>
      </div>

      
      <p className="text-xs md:text-[13px] text-slate-500 leading-relaxed font-normal">
        {description}
      </p>
    </div>
  );
};