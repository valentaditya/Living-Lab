import React, { useState } from 'react';

import { Text } from '../atoms/HeaderText';
import { CloseIcon } from '../atoms/CloseIcon';
import { ChevronIcon } from '../atoms/ChevronIcon';
import { ButtonCTA } from '../molecules/ButonCta';
import { menuData } from './Navbar'; 
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {

  const currentPath = usePathname();
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <>
      
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden z-40 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

    
      <div 
        className={`fixed top-0 right-0 w-3/4 max-w-sm h-screen bg-neutral-900/95 backdrop-blur-md border-l border-white/10 p-6 flex flex-col transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end mb-8">
          <button onClick={onClose} className="p-2 -mr-2 text-white hover:bg-white/10 rounded-full transition">
            <CloseIcon />
          </button>
        </div>
        <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-2">
          {menuData.map((item, index) => {
            const isMenuRouteActive = currentPath === item.href && item.type !== 'dropdown';
            const isDropdownOpen = openDropdown === item.label;
            
            return item.type === 'dropdown' ? (
              <div key={index} className="flex flex-col border-b border-white/10">
                <button 
                  onClick={() => toggleDropdown(item.label)}
                  className="flex items-center justify-between py-2 w-full text-left"
                >
                  <Text className="text-lg font-medium">{item.label}</Text>
                  <div className={`transform transition-transform duration-300 ${isDropdownOpen ? '-rotate-180' : ''}`}>
                    <ChevronIcon />
                  </div>
                </button>

                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isDropdownOpen ? 'max-h-48 opacity-100 mb-3' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="flex flex-col gap-3 pl-4 pt-2 border-l border-white/20 ml-2">
                    {item.subItems?.map((sub, idx) => (
                      <Link
                        key={idx} 
                        href={sub.href} 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                key={index} 
                href={item.href || '#'} 
                onClick={onClose}
                className={`py-2 border-b border-white/10 transition-colors ${
                  isMenuRouteActive ? 'text-white font-bold border-white' : 'text-gray-300 hover:text-white'
                }`}
              >
                <Text className={`text-lg ${isMenuRouteActive ? 'font-bold' : ''}`}>{item.label}</Text>
              </Link>
            );
          })}
        </div>

        <div className="pt-6 mt-auto">
          <ButtonCTA text="Menjadi Mitra" />
        </div>
      </div>
    </>
  );
};