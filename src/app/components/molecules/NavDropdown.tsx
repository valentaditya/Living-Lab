import React from 'react';

import { Text } from '../atoms/HeaderText';
import { ChevronIcon } from '../atoms/ChevronIcon';
import { MenuItem } from '../organisms/Navbar'; 
import Link from 'next/link';

interface NavDropdownProps {
  label: string;
  subItems?: MenuItem['subItems'];
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ label, subItems }) => {
  return (
 
    <div className="relative group py-4"> 
      <div className="flex items-center cursor-pointer">
        <Text className="text-sm group-hover:opacity-80 transition-opacity">{label}</Text>
       
        <div className="transform transition-transform duration-300 group-hover:-rotate-180">
          <ChevronIcon />
        </div>
      </div>


      <div className="absolute top-full left-0 -mt-2.5 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">

        <div className="py-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl shadow-xl flex flex-col overflow-hidden">
          {subItems?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};