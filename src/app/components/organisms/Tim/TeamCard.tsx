import React from 'react';
import Image from 'next/image';

interface TeamCardProps {
  badge: string;
  image: string;
  role: string;
  name: string;
  title: string;
  quote: string;
  focusLabel: string;
  focusValue: string;
  pId: string;
  icon: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  badge, image, role, name, title, quote, focusLabel, focusValue, pId, icon
}) => {
  return (
    <article className="bg-white border border-gray-200 rounded-sm flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      
      {/* Image Container */}
      <div className="relative w-full h-[320px] bg-gray-100">
        <div className="absolute top-4 left-4 z-10 bg-[#0f1713] text-white text-[10px] font-mono px-2 py-1 uppercase tracking-wider">
          {badge}
        </div>
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-2 py-1 w-fit mb-3">
          {role}
        </span>
        <h3 className="text-xl font-bold text-[#0f1713] mb-1">{name}</h3>
        <p className="text-xs text-gray-500 mb-4">{title}</p>

        {/* Quote */}
        <div className="bg-[#f4f6f8] p-4 border-l-2 border-[#0f1713] mb-6 flex-grow">
          <p className="text-xs italic text-gray-600 leading-relaxed">"{quote}"</p>
        </div>

        {/* Footer Info */}
        <div className="mt-auto border-t border-gray-100 pt-4 flex flex-col gap-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
            <span>{focusLabel}</span>
            <span>{pId}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#0f1713]">
            <span>{icon}</span>
            <span>{focusValue}</span>
          </div>
        </div>
      </div>

    </article>
  );
};