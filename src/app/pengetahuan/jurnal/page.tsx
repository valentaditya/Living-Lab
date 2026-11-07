import type { Metadata } from 'next';
import { toPublication } from '@/lib/content-mappers';
import { getCollection } from '@/lib/site-content';
import PublicationsPage from './PublicationsClient';

export const metadata: Metadata = { title: 'Jurnal & Publikasi | Living Lab Sungai Yogyakarta' };

export default async function Page() {
  return <PublicationsPage items={(await getCollection('publications')).map(toPublication)} />;
}
