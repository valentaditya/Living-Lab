import React, { HTMLAttributes, ReactNode } from 'react';

export interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <h2
      className={`text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B1E33] tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
};