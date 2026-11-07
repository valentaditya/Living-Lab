import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlockDef, getCollectionDef } from "@/lib/content-schema";
import { BlockEditor, CollectionEditor } from "../ContentEditor";

type Props = { params: Promise<{ key: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { key } = await params;
  const label = getCollectionDef(key)?.label ?? getBlockDef(key)?.label ?? "Konten";
  return { title: `${label} | Panel Admin Living Lab` };
}

export default async function ContentPage({ params }: Props) {
  const { key } = await params;
  if (getCollectionDef(key)) return <CollectionEditor key={key} collectionKey={key} />;
  if (getBlockDef(key)) return <BlockEditor key={key} blockKey={key} />;
  notFound();
}
