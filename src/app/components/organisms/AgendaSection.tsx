import React from 'react';

import { AgendaHeader } from '../molecules/AgendaHeader';
import { AgendaCard } from '../organisms/AgendaCard';
import { AGENDA_DATA } from '@/data/dummyAnggota';

export const AgendaSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-12 sm:py-16 font-sans antialiased">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        
        <AgendaHeader />

        <div className="flex flex-col gap-3 sm:gap-4">
          {AGENDA_DATA.map((agenda) => (
            <AgendaCard key={agenda.id} item={agenda} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AgendaSection;