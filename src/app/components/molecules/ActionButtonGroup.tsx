import React from 'react';
import { Handshake, LayoutGrid } from 'lucide-react';
import { Button } from '../atoms/Button';

export const ActionButtonGroup: React.FC = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 mb-12">
    <Button 
      variant="primary" 
      icon={<Handshake className="w-4 h-4 text-emerald-600 stroke-[2.5]" />}
    >
      Menjadi Mitra
    </Button>
    <Button 
      variant="secondary" 
      icon={<LayoutGrid className="w-4 h-4 text-slate-300 stroke-[2.5]" />}
    >
      Akses Data Terbuka
    </Button>
  </div>
);