'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { isItemActive, isPathActive, menuData } from './navigation-data';

interface NavigationMenuProps {
  pathname: string;
}

const itemClass = (active: boolean) =>
  `flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 transition-colors ${
    active ? 'bg-white/10 text-white' : 'text-white/85 hover:bg-white/10 hover:text-white'
  }`;

// Lepas fokus setelah memilih submenu, agar dropdown (yang terbuka lewat focus-within) menutup.
const blurOnSelect = (event: React.MouseEvent<HTMLAnchorElement>) => event.currentTarget.blur();

/** Menu desktop, tampil mulai lebar xl (1280px). Di bawahnya dipakai MobileMenu. */
export const NavigationMenu: React.FC<NavigationMenuProps> = ({ pathname }) => {
  return (
    <ul className="hidden items-center gap-1 text-sm font-medium xl:flex">
      {menuData.map((item) => {
        const active = isItemActive(item, pathname);

        if (item.type === 'link') {
          return (
            <li key={item.label}>
              <Link
                href={item.href || '#'}
                aria-current={active ? 'page' : undefined}
                className={itemClass(active)}
              >
                {item.label}
              </Link>
            </li>
          );
        }

        return (
          <li key={item.label} className="group relative">
            <button type="button" aria-haspopup="true" className={itemClass(active)}>
              {item.label}
              <ChevronDown
                className="h-4 w-4 transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180"
                aria-hidden="true"
              />
            </button>

            {/* pt-2 (bukan mt-2) supaya area hover tidak terputus antara tombol dan panel */}
            <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                {item.subItems?.map((sub) => {
                  const subActive = isPathActive(sub.href, pathname);
                  return (
                    <li key={sub.href}>
                      <Link
                        href={sub.href}
                        onClick={blurOnSelect}
                        aria-current={subActive ? 'page' : undefined}
                        className={`block px-4 py-2 text-sm transition-colors hover:bg-slate-50 hover:text-[#0f1713] ${
                          subActive ? 'font-semibold text-[#0f1713]' : 'text-slate-700'
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
  );
};
