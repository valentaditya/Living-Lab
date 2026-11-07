import React from 'react';
// Handshake dipakai tombol "Menjadi Mitra" yang sedang dinonaktifkan di bawah.
import { Handshake, LayoutGrid } from 'lucide-react'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { Button } from '../atoms/Button';

export const ActionButtonGroup: React.FC = () => (
  <div className="flex w-full flex-col items-stretch justify-center gap-3 mt-8 sm:mt-10 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
    {/* Tombol "Menjadi Mitra" dinonaktifkan sementara; hapus komentar untuk mengaktifkan lagi.
    <Button 
      variant="primary"
      href="/kolaborasi"
      icon={<Handshake className="w-4 h-4 text-emerald-600 stroke-[2.5]" />}
    >
      Menjadi Mitra
    </Button>
    */}
    <Button 
      variant="primary"
      href="/pengetahuan/data"
      icon={<LayoutGrid className="w-4 h-4 text-white stroke-[2.5]" />}
    >
      Akses Data Terbuka
    </Button>
  </div>
);