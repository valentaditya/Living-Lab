/**
 * Mengubah ContentItem (data dashboard) ke bentuk yang dipakai komponen publik.
 * Dipakai halaman publik (server) dan pratinjau dashboard (client).
 */
import { itemList, itemText, type ContentItem } from '@/lib/content-schema';
import type { PublicationItem } from '@/app/components/molecules/PublicationItemRow';
import type { DatasetItem } from '@/app/components/molecules/DataSetItemRow';
import type { ModuleItem } from '@/app/components/molecules/ModulItemRow';
import type { StoryItem } from '@/app/components/molecules/StoryItemRow';

export type StoryWithBody = StoryItem & { body: string };

export const toPublication = (item: ContentItem): PublicationItem => ({
  id: item.id,
  type: itemText(item, 'type') as PublicationItem['type'],
  title: itemText(item, 'title'),
  authors: itemList(item, 'authors'),
  institution: itemText(item, 'institution'),
  abstract: itemText(item, 'abstract'),
  date: itemText(item, 'date'),
  doi: itemText(item, 'doi') || undefined,
  fileSize: itemText(item, 'fileSize'),
  downloadUrl: itemText(item, 'downloadUrl') || '#',
});

export const toDataset = (item: ContentItem): DatasetItem => ({
  id: item.id,
  category: itemText(item, 'category') as DatasetItem['category'],
  title: itemText(item, 'title'),
  location: itemText(item, 'location'),
  institution: itemText(item, 'institution'),
  description: itemText(item, 'description'),
  date: itemText(item, 'date'),
  format: itemText(item, 'format') as DatasetItem['format'],
  fileSize: itemText(item, 'fileSize'),
  downloadUrl: itemText(item, 'downloadUrl') || '#',
});

export const toModule = (item: ContentItem): ModuleItem => ({
  id: item.id,
  category: itemText(item, 'category') as ModuleItem['category'],
  title: itemText(item, 'title'),
  authors: itemList(item, 'authors'),
  audience: itemText(item, 'audience'),
  description: itemText(item, 'description'),
  highlights: itemList(item, 'highlights'),
  date: itemText(item, 'date'),
  pages: itemText(item, 'pages'),
  fileSize: itemText(item, 'fileSize'),
  downloadUrl: itemText(item, 'downloadUrl') || '#',
});

export const toStory = (item: ContentItem): StoryWithBody => ({
  id: item.id,
  category: itemText(item, 'category') as StoryItem['category'],
  title: itemText(item, 'title'),
  authorOrFigure: itemText(item, 'authorOrFigure'),
  location: itemText(item, 'location'),
  abstract: itemText(item, 'abstract'),
  date: itemText(item, 'date'),
  readTimeOrMedia: itemText(item, 'readTimeOrMedia'),
  slug: itemText(item, 'slug'),
  body: itemText(item, 'body'),
});
