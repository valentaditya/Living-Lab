import React from 'react';
import Link from 'next/link';
import { menuData } from './Navbar'; // Sesuaikan path import

export const NavigationMenu = () => {
  return (
    <div className="hidden md:flex items-center gap-6"> {/* Jarak antar menu konsisten */}
      {menuData.map((item, idx) => (
        <div key={idx} className="relative group">
          {item.type === 'link' ? (
            <Link 
              href={item.href || '#'} 
              className="flex items-center px-2 py-1 transition-opacity hover:opacity-75 text-current" // text-current agar ikut warna Navbar
            >
              {item.label}
            </Link>
          ) : (
            <div className="flex items-center px-2 py-1 cursor-pointer transition-opacity hover:opacity-75 text-current">
              {item.label}
              {/* Ikon panah ke bawah */}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}

          {/* Dropdown Menu (Jika ada subItems) */}
          {item.type === 'dropdown' && item.subItems && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                {item.subItems.map((sub, sIdx) => (
                  <Link 
                    key={sIdx} 
                    href={sub.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#0f1713] transition-colors"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};