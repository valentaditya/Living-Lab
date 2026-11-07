import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StoryContentHeader } from '@/app/components/molecules/StoryContentHeader';
import { StoryArticleBody } from '@/app/components/organisms/StoryArticalBody';
import { getStories } from '../stories';

type Props = { params: Promise<{ slug: string }> };

async function findStory(params: Props['params']) {
  const { slug } = await params;
  return (await getStories()).find((story) => story.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = await findStory(params);
  return story
    ? { title: `${story.title} | Kisah Sungai`, description: story.abstract }
    : { title: 'Kisah tidak ditemukan | Living Lab Sungai Yogyakarta' };
}

export default async function StoryDetailPage({ params }: Props) {
  const story = await findStory(params);
  if (!story) notFound();

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900 antialiased selection:bg-emerald-200 selection:text-emerald-950 font-sans relative">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <main className="relative z-10 mx-auto px-6 sm:px-8 lg:px-12 pt-28 md:pt-36 pb-24 space-y-12">
        <StoryContentHeader
          category={story.category}
          title={story.title}
          authorOrFigure={story.authorOrFigure}
          location={story.location}
          date={story.date}
          readTime={story.readTimeOrMedia}
        />

        <StoryArticleBody abstract={story.abstract} body={story.body} />
      </main>
    </div>
  );
}
