import React from 'react';

import { ArticleCard } from './ArticleCard';
import { SectionHeaderBar } from '../molecules/SectionHeader2';
import { Article } from '@/types/article';

interface NewsSectionProps {
  articles: Article[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ articles }) => {
  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeaderBar
          badgeText="KABAR LAPANGAN & RISET AKADEMIK"
          title="Kabar Lapangan & Publikasi Riset Terbaru"
          moreText="Lihat Semua Berita & Artikel"
          moreHref="/berita"
        />

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {articles.map((item) => (
            <ArticleCard key={item.id} article={item} />
          ))}
        </div>
      </div>
    </section>
  );
};