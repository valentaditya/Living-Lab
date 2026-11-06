import React from 'react';

import { AgendaHeader } from '../molecules/AgendaHeader';
import { AgendaCard } from '../organisms/AgendaCard';
import { AGENDA_DATA } from '@/data/dummyAnggota';
import type { AgendaItem } from '@/types/agenda';

export const AgendaSection: React.FC<{
  agendas?: AgendaItem[];
  subsection?: boolean;
}> = ({
  agendas = AGENDA_DATA,
  subsection = false,
}) => {
  return (
    <section
      className={`w-full font-sans antialiased ${
        subsection ? "" : "bg-white py-12 sm:py-16"
      }`}
    >
      <div className={subsection ? "" : "mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8"}>
        {!subsection && (
          <AgendaHeader />
        )}

        <div className="flex flex-col gap-3 sm:gap-4">
          {agendas.map((agenda) => (
            <AgendaCard key={agenda.id} item={agenda} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AgendaSection;