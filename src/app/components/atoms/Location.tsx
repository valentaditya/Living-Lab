import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationTextProps {
  text: string;
}

export const LocationText: React.FC<LocationTextProps> = ({ text }) => (
  <div className="flex items-start gap-1.5 mt-1.5 text-slate-500">
    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 stroke-2" />
    <span className="text-[11px] sm:text-xs leading-relaxed">{text}</span>
  </div>
);