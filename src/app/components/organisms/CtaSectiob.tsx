import React from 'react';
import { CtaContent } from '../organisms/CtaContent';

export const CtaSection: React.FC = () => {
  return (
    <section className="relative w-full py-20 md:py-28 bg-[#182840] overflow-hidden">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img
          src="/cta-bg.svg" // Pastikan file SVG Anda ada di folder public
          alt=""
          loading="lazy"
          decoding="async"
          // Opacity dinaikkan dan mix-blend dihapus agar gambar tidak tenggelam oleh warna background
          className="w-full h-full object-cover opacity-60" 
        />
        
        {/* 
          OVERLAY DIPERBAIKI: 
          Menggunakan radial gradient halus di tengah (untuk teks) 
          tapi membiarkan pinggiran (kiri/kanan) tetap jelas terlihat.
        */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#182840]/40 via-[#182840]/20 to-transparent"></div>
      </div>

      {/* Main Content */}
      <CtaContent />
    </section>
  );
};

export default CtaSection;