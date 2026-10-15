'use client'
import React from 'react';
import { NavItem } from '../molecules/NavItem';
import { NavDropdown } from '../molecules/NavDropdown';
import { usePathname } from 'next/navigation';
import { menuData } from './Navbar'; 

export const NavigationMenu: React.FC = () => {
  const currentPath = usePathname();

  return (
    <div className="hidden md:flex items-center gap-6">
      {menuData.map((item, index) => {
       
        if (item.type === "dropdown") {
          return (
            <NavDropdown 
              key={index} 
              label={item.label} 
              subItems={item.subItems} 
            />
          );
        }

        const isActive = currentPath === item.href;

        return (
          <NavItem 
            key={index} 
            label={item.label} 
            href={item.href!} 
            isActive={isActive} 
          />
        );
      })}
    </div>
  );
};