import React from 'react';

export const SubNavBerita = () => {
  const navItems = [
    { label: "Semua Berita Terkini", href: "#", active: true },
    { label: "Agenda & Acara", href: "#", active: false },
    { label: "Siaran Pers Resmi", href: "#", active: false },
    { label: "Liputan Media & Kliping", href: "#", active: false },
    { label: "Laporan Aktivitas & Riset", href: "#", active: false },
  ];

  return (
    <div className="bg-[#0f172a] border-t border-gray-800">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex items-center gap-6 overflow-x-auto py-4 scrollbar-hide">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className={`text-xs font-medium whitespace-nowrap pb-2 border-b-2 transition-colors ${
                item.active 
                  ? 'text-teal-400 border-teal-400' 
                  : 'text-gray-400 border-transparent hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};