import React from 'react';

interface ActionButtonProps {
  text: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ text }) => (
  <button className="w-full sm:w-auto px-5 py-2.5 bg-[#0B1E33] hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shadow-sm">
    {text}
  </button>
);