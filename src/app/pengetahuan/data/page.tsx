import type { Metadata } from 'next';
import { toDataset } from '@/lib/content-mappers';
import { getCollection } from '@/lib/site-content';
import WaterQualityDataPage from './DataClient';

export const metadata: Metadata = { title: 'Data Kualitas Air | Living Lab Sungai Yogyakarta' };

export default async function Page() {
  return <WaterQualityDataPage items={(await getCollection('datasets')).map(toDataset)} />;
}
