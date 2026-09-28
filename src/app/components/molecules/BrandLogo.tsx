import React from 'react';
import { Text } from '../atoms/HeaderText';

export const BrandLogo: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Text className="text-lg font-semibold tracking-wide">Living Lab Sungai</Text>
      <Text className="text-[10px] tracking-widest uppercase opacity-80">Universitas Atma Jaya Yogyakarta</Text>
    </div>
  );
};