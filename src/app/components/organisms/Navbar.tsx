'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { BrandLogo } from '../molecules/BrandLogo';
import { NavigationMenu } from './NavigationMenu';
import { MobileMenu } from './MobileMenu';

export { menuData } from './navigation-data';
export type { MenuItem } from './navigation-data';

// Halaman yang memakai navbar gelap solid (halaman lain: transparan di atas hero)
const darkPages = ['/tentang', '/kolaborasi', '/pengetahuan', '/kisah-sungai'];

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  // Menyimpan path saat menu dibuka, sehingga menu otomatis tertutup ketika halaman berganti.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const isMobileOpen = openedAt === pathname;
  const closeMobile = () => setOpenedAt(null);

  const isDarkPage = darkPages.some((page) => pathname.startsWith(page));

  // Header selalu menempel di atas; di halaman dengan hero foto ia transparan
  // di posisi paling atas dan berubah solid begitu halaman digulir.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const solid = isDarkPage || scrolled;

  useEffect(() => {
    if (!isMobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenedAt(null);
    };
    // Menu mobile disembunyikan mulai breakpoint xl, jadi tutup juga state-nya.
    const desktopQuery = window.matchMedia('(min-width: 80rem)');
    const onDesktop = () => {
      if (desktopQuery.matches) setOpenedAt(null);
    };

    window.addEventListener('keydown', onKeyDown);
    desktopQuery.addEventListener('change', onDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      desktopQuery.removeEventListener('change', onDesktop);
    };
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 font-sans text-white transition-[background-color,box-shadow] duration-300 ${
          solid ? 'bg-[#0f1713]/95 shadow-[0_6px_24px_rgba(0,0,0,0.18)] backdrop-blur' : 'bg-transparent'
        }`}
      >
        <nav
          aria-label="Navigasi utama"
          className="mx-auto flex h-16 max-w-[96rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        >
          <BrandLogo />

          <NavigationMenu pathname={pathname} />

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden rounded-full border border-white/35 px-4 py-2 text-xs font-semibold transition hover:bg-white/10 sm:inline-flex"
            >
              Masuk
            </Link>
            {/* Tombol "Menjadi Mitra" dinonaktifkan sementara; hapus komentar untuk mengaktifkan lagi.
            <Link
              href="/kolaborasi"
              className="hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 min-[90rem]:inline-flex"
            >
              Menjadi Mitra
            </Link>
            */}

            <button
              type="button"
              className="-mr-2 rounded-lg p-2 transition hover:bg-white/10 xl:hidden"
              onClick={() => setOpenedAt(pathname)}
              aria-label="Buka menu"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={isMobileOpen} onClose={closeMobile} pathname={pathname} />
    </>
  );
};
