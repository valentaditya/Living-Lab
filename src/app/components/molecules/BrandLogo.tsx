import React from 'react';
import Image from 'next/image';
import { Text } from '../atoms/HeaderText';

export const BrandLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-1.5">
        <Image
          src="/pictures/icon.png"
          alt=""
          width={512}
          height={512}
          className="h-full w-full object-contain"
        />
      </span>
      <span className="flex flex-col">
        <Text className="text-lg font-semibold tracking-wide">Living Lab Sungai</Text>
        <Text className="text-[10px] tracking-widest uppercase opacity-80">Universitas Atma Jaya Yogyakarta</Text>
      </span>
    </div>
  );
};