import React from 'react';

import { StatusBadge } from '../atoms/StatusBadge';
import { AgendaItem } from '@/types/agenda';
import { LocationText } from '../atoms/Location';


interface AgendaDetailsProps {
  item: AgendaItem;
}

export const AgendaDetails: React.FC<AgendaDetailsProps> = ({ item }) => (
  <div className="flex-1 min-w-0">
    <div className="flex flex-wrap items-center gap-3 mb-1.5">
      <StatusBadge label={item.tagLabel} color={item.tagColor} />
      <span className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-wide">
        {item.time}
      </span>
    </div>
    <h3 className="text-sm sm:text-[15px] font-bold text-[#0B1E33] leading-snug truncate whitespace-normal line-clamp-2">
      {item.title}
    </h3>
    <LocationText text={item.location} />
  </div>
);