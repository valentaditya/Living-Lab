import React from 'react';
import Link from 'next/link';
import { Text } from '../atoms/HeaderText';

interface NavItemProps {
  label: string;
  href: string;
  isActive?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ label, href, isActive = false }) => {
  return (
   
    <Link href={href} className="relative flex items-center group">
      <Text 
        className={`text-sm transition-all duration-200 ${
          isActive ? 'font-semibold opacity-100' : 'opacity-80 hover:opacity-100'
        }`}
      >
        {label}
      </Text>
      
     
      {isActive && (
        <div className="absolute top-full mt-1.5 left-0 w-full h-0.5 bg-white rounded-full"></div>
      )}
    </Link>
  );
};