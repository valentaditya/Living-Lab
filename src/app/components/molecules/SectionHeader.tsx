import React, { HTMLAttributes, ReactNode } from 'react';
import { BadgeHeader } from '../atoms/BadgeHeader';
import { SectionTitle } from '../atoms/SectionTitle';

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  badgeText?: string;
  title: ReactNode;
  description?: ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  title,
  description,
  className = '',
  ...props
}) => {
  return (
    <header className={`mb-12 max-w-3xl ${className}`} {...props}>
      {badgeText && <BadgeHeader text={badgeText} />}
      <SectionTitle className="mb-4">{title}</SectionTitle>
      {description && (
        <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
          {description}
        </p>
      )}
    </header>
  );
};