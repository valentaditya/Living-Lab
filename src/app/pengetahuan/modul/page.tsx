import type { Metadata } from 'next';
import { toModule } from '@/lib/content-mappers';
import { getCollection } from '@/lib/site-content';
import EducationModulesPage from './ModulesClient';

export const metadata: Metadata = { title: 'Modul Edukasi | Living Lab Sungai Yogyakarta' };

export default async function Page() {
  return <EducationModulesPage items={(await getCollection('modules')).map(toModule)} />;
}
