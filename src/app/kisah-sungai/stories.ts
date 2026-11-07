import 'server-only';

import { toStory, type StoryWithBody } from '@/lib/content-mappers';
import { getCollection } from '@/lib/site-content';

export type { StoryWithBody };

/** Kisah dari dashboard, dalam bentuk yang dipakai komponen halaman Kisah Sungai. */
export async function getStories(): Promise<StoryWithBody[]> {
  return (await getCollection('stories')).map(toStory);
}
