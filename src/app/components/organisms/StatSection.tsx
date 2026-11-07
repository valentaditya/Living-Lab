import React, { HTMLAttributes } from 'react';
import {
  Database,
  FileText,
  FolderKanban,
  HandHeart,
  MapPin,
  RadioTower,
  UsersRound,
  Waves,
  type LucideIcon,
} from 'lucide-react';
import { itemText, type ContentItem } from '@/lib/content-schema';
import { StatCard } from '../molecules/StatCard';

/** Nama ikon yang bisa dipilih di dashboard (lihat STAT_ICONS di content-schema). */
export const STAT_ICON_MAP: Record<string, LucideIcon> = {
  Folder: FolderKanban,
  Komunitas: UsersRound,
  Sungai: Waves,
  Data: Database,
  Sensor: RadioTower,
  Dokumen: FileText,
  Relawan: HandHeart,
  Lokasi: MapPin,
};

export interface StatsSectionProps extends HTMLAttributes<HTMLElement> {
  stats: ContentItem[];
}

/** Kartu statistik yang menumpang di batas bawah video hero (margin negatif). */
export const StatsSection: React.FC<StatsSectionProps> = ({
  stats,
  className = '',
  ...props
}) => {
  return (
    <section
      aria-label="Capaian Living Lab"
      className={`relative z-10 -mt-28 w-full bg-[linear-gradient(to_bottom,transparent_7rem,#fff_7rem)] pb-4 sm:-mt-24 sm:bg-[linear-gradient(to_bottom,transparent_6rem,#fff_6rem)] ${className}`}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {stats.map((item) => (
            <StatCard
              key={item.id}
              value={itemText(item, 'value')}
              title={itemText(item, 'title')}
              description={itemText(item, 'description')}
              icon={STAT_ICON_MAP[itemText(item, 'icon')] ?? FolderKanban}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
