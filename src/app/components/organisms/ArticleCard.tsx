import React from 'react';

import { CardHeaderMedia } from '../molecules/CardHeaderMedia';
import { MetaInfo } from '../atoms/MetaInfo';
import { CardFooter } from '../molecules/CardFooter';
import { Article } from '@/types/article';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <article className="group bg-[#F7F8F9] hover:bg-white rounded-3xl p-3 sm:p-4  hover:border-slate-300 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 mt-8">
    
      <CardHeaderMedia
        imageUrl={article.image}
        altText={article.title}
        category={article.category}
      />

    
      <div className="px-2 pt-5 pb-4 flex flex-col flex-1">
        <MetaInfo
          date={article.date}
          readTime={article.readTime}
          tag={article.tag}
        />

        <h3 className="mt-2.5 text-lg sm:text-xl font-bold text-[#0B1E33] leading-snug tracking-tight group-hover:text-emerald-950 transition-colors line-clamp-2">
          <a href={article.actionHref || "#"}>
            {article.title}
          </a>
        </h3>

        
        <p className="mt-2.5 text-sm text-slate-500 leading-relaxed line-clamp-3 font-normal">
          {article.summary}
        </p>
      </div>

     
      <div className="px-2 pb-1">
        <CardFooter
          author={article.author}
          actionText={article.actionText}
          actionHref={article.actionHref}
        />
      </div>
    </article>
  );
};