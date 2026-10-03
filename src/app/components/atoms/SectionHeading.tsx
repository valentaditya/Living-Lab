import React from 'react';

export const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl sm:text-4xl md:text-[40px] font-bold text-white tracking-tight leading-[1.2] mb-5 max-w-3xl text-center">
    {children}
  </h2>
);