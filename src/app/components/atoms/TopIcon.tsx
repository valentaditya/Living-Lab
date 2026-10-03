import React from 'react';
import { Network } from 'lucide-react';

export const TopIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 shadow-sm ring-1 ring-white/5 backdrop-blur-sm">
    <Network className="w-6 h-6 text-emerald-400 stroke-2" />
  </div>
);