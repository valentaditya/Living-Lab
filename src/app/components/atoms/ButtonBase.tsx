import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const ButtonBase: React.FC<ButtonBaseProps> = ({ children, className = "", ...props }) => {
  return (
    <button 
      className={`bg-white text-gray-900 px-6 py-2 rounded-full font-medium transition hover:bg-gray-100 ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};