import React, { HTMLAttributes, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { IconBox } from '../atoms/IconBox';

export interface PillarCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  step: ReactNode;
  title: ReactNode;
  description: ReactNode;
  icon?: LucideIcon;
  customIcon?: ReactNode;
}

export const PillarCard: React.FC<PillarCardProps> = ({
  step,
  title,
  description,
  icon: Icon,
  customIcon,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`group bg-[#f8fafc]/80 hover:bg-slate-50 border border-slate-200/70 hover:border-emerald-200 rounded-2xl p-6 md:p-7 flex flex-col justify-start transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
      {...props}
    >
      
      {(Icon || customIcon) && (
        <div className="mb-8">
          <IconBox icon={Icon}>
            {customIcon}
          </IconBox>
        </div>
      )}

      
      {step && (
        <span className="text-[11px] font-bold text-emerald-700 tracking-wider uppercase mb-2 block">
          {step}
        </span>
      )}

    
      <h3 className="text-xl md:text-[22px] font-bold text-[#0B1E33] leading-snug mb-3">
        {title}
      </h3>
      {description && (
        <p className="text-slate-600 text-sm leading-relaxed font-normal mt-auto">
          {description}
        </p>
      )}
    </div>
  );
};