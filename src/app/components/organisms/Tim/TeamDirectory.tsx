'use client';

import React, { useState } from 'react';
import { itemText, type ContentItem } from '@/lib/content-schema';
import { TeamCard } from './TeamCard';

/** Filter kelompok + grid anggota tim (data dari dashboard). */
export const TeamDirectory = ({ members }: { members: ContentItem[] }) => {
  const [group, setGroup] = useState('Semua');
  const groups = [...new Set(members.map((member) => itemText(member, 'group')).filter(Boolean))];
  const filters = [
    { label: 'Semua Tokoh', value: 'Semua', count: members.length },
    ...groups.map((value) => ({
      label: value,
      value,
      count: members.filter((member) => itemText(member, 'group') === value).length,
    })),
  ];
  const visible = group === 'Semua' ? members : members.filter((member) => itemText(member, 'group') === group);

  return (
    <>
      <div className="bg-white py-6 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div role="group" aria-label="Filter kelompok tim" className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => {
              const active = group === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setGroup(filter.value)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-sm whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-brand text-white hover:bg-brand-dark'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          {visible.length === 0 ? (
            <p className="text-center text-sm text-gray-500">Belum ada anggota tim.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visible.map((member) => (
                <TeamCard
                  key={member.id}
                  badge={itemText(member, 'badge')}
                  image={itemText(member, 'image')}
                  role={itemText(member, 'role')}
                  name={itemText(member, 'name')}
                  title={itemText(member, 'title')}
                  quote={itemText(member, 'quote')}
                  focusLabel="Fokus Utama"
                  focusValue={itemText(member, 'focusValue')}
                  icon={itemText(member, 'icon')}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
