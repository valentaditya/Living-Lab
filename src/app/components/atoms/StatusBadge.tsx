import React from 'react';

interface StatusBadgeProps {
  label: string;
  color: 'green' | 'orange' | 'blue';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label, color }) => {
  const colorStyles = {
    green: "bg-[#e8f5e9] text-[#1b7a43]",
    orange: "bg-[#fff3e0] text-[#e65100]",
    blue: "bg-[#e3f2fd] text-[#1565c0]"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold ${colorStyles[color]}`}>
      {label}
    </span>
  );
};