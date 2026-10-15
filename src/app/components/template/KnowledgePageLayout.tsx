// components/templates/KnowledgePageLayout.tsx
import React from 'react';

interface KnowledgePageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const KnowledgePageLayout: React.FC<KnowledgePageLayoutProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900 antialiased selection:bg-emerald-200 selection:text-emerald-950 font-sans">
   
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <main className={`relative z-10  mx-auto px-6 sm:px-8 lg:px-12 pt-28 md:pt-36 pb-24 space-y-12 ${className}`}>
        {children}
      </main>
    </div>
  );
};