import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const BrandLogo: React.FC = () => {
  return (
    <Link href="/" aria-label="Living Lab Sungai — Beranda" className="flex min-w-0 items-center gap-3 text-white">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-1.5">
        <Image
          src="/pictures/icon.png"
          alt=""
          width={512}
          height={512}
          className="h-full w-full object-contain"
        />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="whitespace-nowrap text-base font-semibold leading-tight tracking-wide sm:text-lg">
          Living Lab Sungai
        </span>
        <span className="text-[10px] uppercase leading-tight tracking-wider opacity-80">
          Universitas Atma Jaya Yogyakarta
        </span>
      </span>
    </Link>
  );
};
