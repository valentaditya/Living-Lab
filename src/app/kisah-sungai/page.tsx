import type { Metadata } from 'next';
import { getStories } from './stories';
import KisahSungaiPage from './KisahSungaiClient';

export const metadata: Metadata = { title: 'Kisah Sungai | Living Lab Sungai Yogyakarta' };

export default async function Page() {
  const stories = await getStories();
  // Isi lengkap tidak dikirim ke daftar; cukup di halaman detail.
  return <KisahSungaiPage items={stories.map(({ body, ...story }) => (void body, story))} />;
}
