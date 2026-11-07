// components/organisms/StoryArticleBody.tsx
import React from 'react';
import { Quote } from 'lucide-react';

interface StoryArticleBodyProps {
  abstract: string;
  /** Isi dari dashboard: paragraf dipisah baris kosong, "## " = subjudul, "> " = kutipan. */
  body?: string;
}

type Block = { kind: 'heading' | 'quote' | 'paragraph'; text: string };

function parseBody(body: string): Block[] {
  return body
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      if (chunk.startsWith('## ')) return { kind: 'heading', text: chunk.slice(3).trim() };
      if (chunk.startsWith('> ')) return { kind: 'quote', text: chunk.replace(/^>\s?/gm, '').trim() };
      return { kind: 'paragraph', text: chunk };
    });
}

export const StoryArticleBody: React.FC<StoryArticleBodyProps> = ({ abstract, body = '' }) => {
  const blocks = parseBody(body);

  return (
    <article className="max-w-3xl space-y-8 font-sans text-slate-700 leading-relaxed text-base sm:text-lg">
      <p className="text-lg sm:text-xl font-medium text-slate-900 leading-relaxed border-l-2 border-emerald-600 pl-4 bg-emerald-50/40 py-2 rounded-r-lg">
        {abstract}
      </p>

      {blocks.map((block, index) =>
        block.kind === 'heading' ? (
          <h3 key={index} className="text-2xl font-semibold text-slate-900 pt-4 tracking-tight">
            {block.text}
          </h3>
        ) : block.kind === 'quote' ? (
          <blockquote key={index} className="my-8 p-6 sm:p-8 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3">
            <Quote className="w-8 h-8 text-emerald-700 opacity-60" aria-hidden="true" />
            <p className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight leading-snug">{block.text}</p>
          </blockquote>
        ) : (
          <p key={index} className="whitespace-pre-line">{block.text}</p>
        ),
      )}
    </article>
  );
};
