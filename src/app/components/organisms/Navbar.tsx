'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // 1. Import usePathname
import { BrandLogo } from '../molecules/BrandLogo';
import { NavigationMenu } from './NavigationMenu'; 
import { ButtonCTA } from '../molecules/ButonCta';
import { MenuIcon } from '../atoms/MenuIcon';
import { MobileMenu } from './MobileMenu';

interface SubMenuItem {
  label: string;
  href: string;
}

export interface MenuItem {
  label: string;
  type: 'link' | 'dropdown';
  href?: string;
  subItems?: SubMenuItem[];
}

export const menuData: MenuItem[] = [
  { label: "Beranda", href: "/", type: "link" },
  { 
    label: "Tentang Kami", 
    type: "dropdown",
    subItems: [
      { label: "Profil Living Lab", href: "/tentang/profil" },
      { label: "Tim Kami", href: "/tentang/tim" },
      { label: "Sejarah & Visi", href: "/tentang/sejarah" }
    ]
  },
  { label: "Sungai", href: "/sungai", type: "link" },
  { 
    label: "Pusat Pengetahuan", 
    type: "dropdown",
    subItems: [
      { label: "Jurnal & Publikasi", href: "/pengetahuan/jurnal" },
      { label: "Data Kualitas Air", href: "/pengetahuan/data" },
      { label: "Modul Edukasi", href: "/pengetahuan/modul" }
    ]
  },
  { label: "Berita", href: "/berita", type: "link" },
  { label: "Kisah Sungai", href: "/kisah-sungai", type: "link" },
  { label: "Kolaborasi", href: "/kolaborasi", type: "link" },
];

export const Navbar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname(); // 2. Inisialisasi pathname

  // 3. Cek apakah URL saat ini dimulai dengan '/tentang'
  const isTentangPage = pathname.startsWith('/tentang');

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileOpen]);

  return (
    <>
      <nav 
        className={`w-full backdrop-blur-md border-b px-4 md:px-8 py-3 flex items-center justify-between absolute top-0 z-40 transition-colors duration-300 ${
          isTentangPage 
            ? 'bg-[#0f1713] border-gray-800' // Warna gelap untuk halaman /tentang/*
            : 'bg-transparent border-white/10' // Warna default (transparan)
        }`}
      >
        <BrandLogo />
       
        <NavigationMenu />

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ButtonCTA text="Menjadi Mitra" />
          </div>
          
          <button 
            className="p-2 md:hidden text-white hover:bg-white/10 rounded-lg transition"
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open Menu"
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </>
  );
};