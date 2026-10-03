import React, { HTMLAttributes } from 'react';
import { StatCard } from '../molecules/StatCard';


export interface StatItem {
  id: string | number;
  value: string;
  title: string;
  description: string;
}

export interface StatsSectionProps extends HTMLAttributes<HTMLElement> {
  stats?: StatItem[];
}

export const defaultStatsData: StatItem[] = [
  {
    id: 'prog-aktif',
    value: '12',
    title: 'Program Aktif',
    description: 'Inisiatif komunitas & riset multi-tahun di Sleman, Kota Yogyakarta & Bantul',
  },
  {
    id: 'kom-terlibat',
    value: '28',
    title: 'Komunitas Terlibat',
    description: 'Paguyuban RT/RW, pemerti sungai, dan koalisi pemuda',
  },
  {
    id: 'sungai-pantau',
    value: '3',
    title: 'Sungai Perkotaan Dipantau',
    description: 'Pengamatan berkala di DAS Kali Code, Kali Winongo, dan Kali Gajahwong',
  },
  {
    id: 'dataset-kebijakan',
    value: '45+',
    title: 'Dataset & Naskah Kebijakan',
    description: 'Akses terbuka hidrologi, peta sains warga, dan publikasi telaah kritis',
  },
];

export const StatsSection: React.FC<StatsSectionProps> = ({
  stats = defaultStatsData,
  className = '',
  ...props
}) => {
  return (
    <section className={`w-full py-8 md:py-12 bg-[#F7F8F9] ${className}`} {...props}>
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item) => (
            <StatCard
              key={item.id}
              value={item.value}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};