import React from 'react';
import { Handshake, LayoutGrid } from 'lucide-react';
import { Button } from '../atoms/Button';

export const ActionButtonGroup: React.FC = () => (
  <div className="flex w-full flex-col items-stretch justify-center gap-3 mt-8 sm:mt-10 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
    <Button 
      variant="primary"
      href="/kolaborasi"
      icon={<Handshake className="w-4 h-4 text-emerald-600 stroke-[2.5]" />}
    >
      Menjadi Mitra
    </Button>
    <Button 
      variant="secondary"
      href="/pengetahuan/data"
      icon={<LayoutGrid className="w-4 h-4 text-slate-300 stroke-[2.5]" />}
    >
      Akses Data Terbuka
    </Button>
  </div>
);