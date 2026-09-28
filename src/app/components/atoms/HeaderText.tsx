import React, { HTMLAttributes, ReactNode } from 'react';

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({ children, className = "", ...props }) => {
  return (
    <span className={`text-white ${className}`} {...props}>
      {children}
    </span>
  );
};