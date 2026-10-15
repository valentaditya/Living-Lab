import React from 'react';
import { ButtonBase } from '../atoms/ButtonBase';

export const HeroVideo: React.FC = () => {
    return (
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">

            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover -z-20"
            >

                <source src="/videos/hero.mp4" type="video/mp4" />
            </video>


            <div className="absolute inset-0 bg-black/60 -z-10"></div>
            <div className="relative z-10 text-center px-4 flex flex-col items-center">
                <h1 className="text-white text-4xl md:text-6xl max-w-6xl font-bold mb-4 drop-shadow-md leading-snug">
                    Memulihkan Sungai, Memberdayakan
                    Masyarakat.
                </h1>
                <p className="text-gray-200 text-lg md:text-xl max-w-3xl drop-shadow-md">
                    Riset berbasis sains dan aksi warga kolaboratif untuk masa depan ekosistem
                    sungai yang berkelanjutan.
                </p>
                <div className='mt-10'>
                    <ButtonBase className='py-3.5 text-sm font-semibold hover:scale-105 cursor-pointer'>Terlibat Sekarang</ButtonBase>
                </div>
            </div>
        </div>
    );
};