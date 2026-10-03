import React from 'react';

export const TrustItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-[#567a9f]">
    <span className="text-emerald-500">{icon}</span>
    <span className="text-xs sm:text-sm font-medium">{text}</span>
  </div>
);