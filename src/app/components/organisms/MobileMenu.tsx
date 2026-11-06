'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, X } from 'lucide-react';
import { isItemActive, isPathActive, menuData } from './navigation-data';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

/** Panel menu untuk layar di bawah xl (1280px). */
export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, pathname }) => {
  // Grup yang berisi halaman aktif terbuka otomatis, kecuali pengguna menutupnya sendiri.
  const [toggled, setToggled] = useState<Record<string, boolean>>({});

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        inert={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 flex h-dvh w-[85vw] max-w-sm flex-col bg-[#0f1713] font-sans text-white shadow-2xl transition-transform duration-300 ease-out xl:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <span className="text-base font-semibold">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu"
            className="-mr-2 rounded-full p-2 transition hover:bg-white/10"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Navigasi seluler" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {menuData.map((item) => {
              const active = isItemActive(item, pathname);

              if (item.type === 'link') {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href || '#'}
                      onClick={onClose}
                      aria-current={active ? 'page' : undefined}
                      className={`block rounded-lg px-3 py-3 text-base transition-colors ${
                        active ? 'bg-white/10 font-semibold text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const expanded = toggled[item.label] ?? active;
              const panelId = `mobile-submenu-${item.label.toLowerCase().replace(/\s+/g, '-')}`;

              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setToggled((prev) => ({ ...prev, [item.label]: !expanded }))}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base transition-colors ${
                      active ? 'font-semibold text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={panelId}
                    inert={!expanded}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <ul className="ml-3 flex flex-col gap-1 overflow-hidden border-l border-white/15 pl-3">
                      {item.subItems?.map((sub) => {
                        const subActive = isPathActive(sub.href, pathname);
                        return (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={onClose}
                              aria-current={subActive ? 'page' : undefined}
                              className={`block rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                                subActive ? 'bg-white/10 font-medium text-white' : 'text-white/65 hover:bg-white/5 hover:text-white'
                              }`}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 flex-col gap-3 border-t border-white/10 p-5">
          <Link
            href="/kolaborasi"
            onClick={onClose}
            className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
          >
            Menjadi Mitra
          </Link>
          <Link
            href="/login"
            onClick={onClose}
            className="rounded-full border border-white/35 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Masuk
          </Link>
        </div>
      </div>
    </>
  );
};
