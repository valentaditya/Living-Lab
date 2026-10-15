import React from 'react';
import { CategoryBadge } from '../atoms/CategoryBadge';

interface CardHeaderMediaProps {
  imageUrl: string;
  altText: string;
  category: string;
}

export const CardHeaderMedia: React.FC<CardHeaderMediaProps> = ({
  imageUrl,
  altText,
  category
}) => {
  return (
    <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-slate-100">
      <img
        src={imageUrl}
        alt={altText}
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        loading="lazy"
      />
      {/* Badge diposisikan persis di kiri atas dengan padding */}
      <div className="absolute top-3.5 left-3.5 z-10">
        <CategoryBadge label={category} />
      </div>
    </div>
  );
};