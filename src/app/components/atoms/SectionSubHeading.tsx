import React from 'react';

export const SectionSubheading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl text-center font-normal">
    {children}
  </p>
);