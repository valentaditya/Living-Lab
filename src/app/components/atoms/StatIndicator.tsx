import React, { HTMLAttributes } from 'react';

export interface StatIndicatorProps extends HTMLAttributes<HTMLSpanElement> {}

export const StatIndicator: React.FC<StatIndicatorProps> = ({ className = '', ...props }) => {
  return (
    <span
      className={`w-2.5 h-2.5 rounded-full bg-[#15803d] shrink-0 ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
};