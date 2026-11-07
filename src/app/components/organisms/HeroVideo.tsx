import React from 'react';
import Link from 'next/link';

interface HeroVideoProps {
    title?: string;
    description?: string;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ title, description }) => {
    return (
        <div className="relative flex min-h-svh w-full items-center justify-center overflow-hidden px-4 pb-40 pt-24 sm:px-6 sm:pb-36">

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
            <div className="relative z-10 flex flex-col items-center text-center">
                <h1 className="mb-4 max-w-5xl text-balance text-4xl font-bold leading-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl">
                    {title ?? "Memulihkan Sungai, Memberdayakan Masyarakat."}
                </h1>
                <p className="max-w-3xl text-pretty text-base text-gray-200 drop-shadow-md sm:text-lg md:text-xl">
                    {description ??
                        "Riset berbasis sains dan aksi warga kolaboratif untuk masa depan ekosistem sungai yang berkelanjutan."}
                </p>
                <div className="mt-8 sm:mt-10">
                    <Link
                        href="/kolaborasi"
                        className="inline-flex rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white transition hover:scale-105 hover:bg-brand-dark"
                    >
                        Terlibat Sekarang
                    </Link>
                </div>
            </div>
        </div>
    );
};
