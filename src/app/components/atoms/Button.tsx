import React from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  icon?: React.ReactNode;
  children: React.ReactNode;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({ variant, icon, children, href = "#" }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-95";
  
  const variants = {
    primary: "bg-white text-slate-900 hover:bg-slate-50 shadow-sm",
    secondary: "bg-[#2a3f5f]/80 text-white hover:bg-[#344a6e] border border-white/10 backdrop-blur-sm"
  };

  return (
    <a href={href} className={`${baseStyles} ${variants[variant]}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </a>
  );
};