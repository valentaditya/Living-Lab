import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const ButtonBase: React.FC<ButtonBaseProps> = ({ children, className = "", ...props }) => {
  return (
    <button 
      className={`bg-brand text-white px-6 py-2 rounded-full font-medium transition hover:bg-brand-dark ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};