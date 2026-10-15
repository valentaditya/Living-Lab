import React from 'react';

import { DateBox } from '../atoms/DateBox';
import { ActionButton } from '../atoms/ActionButton';
import { AgendaDetails } from '../molecules/AgendaDetail';
import { AgendaItem } from '@/types/agenda';


interface AgendaCardProps {
  item: AgendaItem;
}

export const AgendaCard: React.FC<AgendaCardProps> = ({ item }) => (
  <div className="bg-[#f8fafc]/80 rounded-[20px] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 border border-transparent hover:border-slate-200 transition-all hover:shadow-xs group">
   
    <DateBox month={item.month} day={item.day} />
    
    {/* Tengah: Detail Agenda */}
    <AgendaDetails item={item} />
    
    {/* Kanan: Tombol */}
    <div className="mt-2 sm:mt-0 w-full sm:w-auto shrink-0">
      <ActionButton text={item.buttonText} />
    </div>
  </div>
);