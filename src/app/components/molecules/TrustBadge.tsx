import React from 'react';
import { ShieldCheck, Globe2 } from 'lucide-react';
import { TrustItem } from '../atoms/TrusItem';

export const TrustBadges: React.FC = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 opacity-80">
    <TrustItem 
      icon={<ShieldCheck className="w-4 h-4 stroke-[2.5]" />} 
      text="Pusat Riset Universitas Terverifikasi" 
    />
    <span className="hidden sm:block text-[#567a9f]/50">•</span>
    <TrustItem 
      icon={<Globe2 className="w-4 h-4 stroke-[2.5]" />} 
      text="Lisensi Data Akademik Terbuka" 
    />
  </div>
);