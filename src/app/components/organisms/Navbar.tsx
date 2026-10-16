'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; 
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
      { label: "Visi & Misi", href: "/tentang/visi-misi" }
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
  const pathname = usePathname(); 

  // Daftar halaman yang membutuhkan navbar gelap
  const darkPages = ['/tentang', '/kolaborasi', '/pengetahuan', '/kisah-sungai'];
  
  // Cek apakah URL saat ini termasuk halaman gelap
  const isDarkPage = darkPages.some(page => pathname.startsWith(page));

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
        className={`w-full px-4 md:px-8 py-3 flex items-center justify-between absolute top-0 z-40 transition-colors duration-300 
        font-sans text-sm font-medium tracking-wide
        ${
          isDarkPage 
            ? 'bg-[#0f1713] text-white'      // Halaman gelap: background solid, tanpa blur/shadow
            : 'bg-transparent text-white'    // Halaman default: murni transparan, tanpa blur/shadow/border
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