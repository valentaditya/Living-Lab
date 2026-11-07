"use client";

import { itemText, type BlockData, type BlockDef, type CollectionDef, type ContentItem } from "@/lib/content-schema";
import { toDataset, toModule, toPublication, toStory } from "@/lib/content-mappers";
import { TeamCard } from "@/app/components/organisms/Tim/TeamCard";
import { StoryItemRow } from "@/app/components/molecules/StoryItemRow";
import { StoryContentHeader } from "@/app/components/molecules/StoryContentHeader";
import { StoryArticleBody } from "@/app/components/organisms/StoryArticalBody";
import { PublicationItemRow } from "@/app/components/molecules/PublicationItemRow";
import { DatasetItemRow } from "@/app/components/molecules/DataSetItemRow";
import { ModuleItemRow } from "@/app/components/molecules/ModulItemRow";
import { RoadmapPhase, toRoadmapPhase } from "@/app/components/organisms/Roadmap/TimelineRoadmap";
import { MissionCard, toMission } from "@/app/components/organisms/VisiMisi/StrategiMisi";
import { TargetCard } from "@/app/components/organisms/VisiMisi/TargetCapaian";
import { HeroVisi } from "@/app/components/organisms/VisiMisi/HeroVisi";
import { JejaringMitra } from "@/app/components/organisms/Kolaborasi/JejaringMitra";
import { FormKontak } from "@/app/components/organisms/Kolaborasi/FormKontak";
import { StatCard } from "@/app/components/molecules/StatCard";
import { STAT_ICON_MAP } from "@/app/components/organisms/StatSection";
import { PreviewFrame, PreviewLabel, PreviewPanel, safeImage } from "../preview/PreviewPanel";

/** Isian wajib yang masih kosong diganti nama field-nya, supaya bentuk kartunya tetap terlihat. */
function withPlaceholders(fields: CollectionDef["fields"], draft: ContentItem): ContentItem {
  const filled: ContentItem = { ...draft, id: draft.id || "pratinjau" };
  for (const field of fields) {
    const value = draft[field.key];
    const empty = value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0);
    if (!empty || !field.required) continue;
    if (field.type === "list") filled[field.key] = [field.label];
    else if (field.type === "select") filled[field.key] = field.options?.[0] ?? field.label;
    else if (field.type === "monthYear") filled[field.key] = "Bulan Tahun";
    else if (field.type !== "number" && field.type !== "image" && field.type !== "file") filled[field.key] = field.label;
  }
  return filled;
}

function CollectionPreviewBody({ def, item }: { def: CollectionDef; item: ContentItem }) {
  switch (def.key) {
    case "team":
      return (
        <>
          <PreviewLabel>Kartu di halaman Tim</PreviewLabel>
          <PreviewFrame width={380} className="bg-gray-50 py-4">
            <TeamCard
              badge={itemText(item, "badge")}
              image={safeImage(itemText(item, "image"))}
              role={itemText(item, "role")}
              name={itemText(item, "name")}
              title={itemText(item, "title")}
              quote={itemText(item, "quote")}
              focusLabel="Fokus Utama"
              focusValue={itemText(item, "focusValue")}
              icon={itemText(item, "icon")}
            />
          </PreviewFrame>
        </>
      );
    case "stories": {
      const story = toStory(item);
      return (
        <>
          <PreviewLabel>Baris di daftar Kisah Sungai</PreviewLabel>
          <PreviewFrame width={1100}>
            <StoryItemRow item={story} />
          </PreviewFrame>
          <PreviewLabel>Halaman cerita</PreviewLabel>
          <PreviewFrame width={1000} className="bg-[#f8faf9]">
            <div className="space-y-12 px-12 py-12">
              <StoryContentHeader
                category={story.category}
                title={story.title}
                authorOrFigure={story.authorOrFigure}
                location={story.location}
                date={story.date}
                readTime={story.readTimeOrMedia}
              />
              <StoryArticleBody abstract={story.abstract} body={story.body} />
            </div>
          </PreviewFrame>
        </>
      );
    }
    case "publications":
      return (
        <>
          <PreviewLabel>Baris di daftar Jurnal & Publikasi</PreviewLabel>
          <PreviewFrame width={1100}>
            <PublicationItemRow item={toPublication(item)} />
          </PreviewFrame>
        </>
      );
    case "datasets":
      return (
        <>
          <PreviewLabel>Baris di daftar Data Kualitas Air</PreviewLabel>
          <PreviewFrame width={1100}>
            <DatasetItemRow item={toDataset(item)} />
          </PreviewFrame>
        </>
      );
    case "modules":
      return (
        <>
          <PreviewLabel>Baris di daftar Modul Edukasi</PreviewLabel>
          <PreviewFrame width={1100}>
            <ModuleItemRow item={toModule(item)} />
          </PreviewFrame>
        </>
      );
    case "roadmap":
      return (
        <>
          <PreviewLabel>Fase di halaman Roadmap</PreviewLabel>
          <PreviewFrame width={1100}>
            <div className="px-8 py-10">
              <div className="relative border-l-2 border-gray-200 pl-16">
                <RoadmapPhase phase={toRoadmapPhase(item)} />
              </div>
            </div>
          </PreviewFrame>
        </>
      );
    case "missions":
      return (
        <>
          <PreviewLabel>Kartu misi</PreviewLabel>
          <PreviewFrame width={760} className="bg-white p-4">
            <MissionCard misi={toMission(item, 0)} />
          </PreviewFrame>
        </>
      );
    case "targets":
      return (
        <>
          <PreviewLabel>Kartu target capaian</PreviewLabel>
          <PreviewFrame width={300} className="bg-gray-50 py-4">
            <TargetCard
              target={{
                value: itemText(item, "value"),
                label: itemText(item, "label"),
                desc: itemText(item, "desc"),
                sub: itemText(item, "sub"),
              }}
            />
          </PreviewFrame>
        </>
      );
    case "partners": {
      const logo = itemText(item, "logo");
      return (
        <>
          <PreviewLabel>Bagian Jejaring Mitra</PreviewLabel>
          <PreviewFrame width={1200}>
            <JejaringMitra items={[{ ...item, logo: logo ? safeImage(logo) : "" }]} />
          </PreviewFrame>
        </>
      );
    }
    case "stats":
      return (
        <>
          <PreviewLabel>Kartu statistik di beranda</PreviewLabel>
          <PreviewFrame width={270} className="bg-[linear-gradient(to_bottom,#1f2a24_45%,#fff_45%)] py-6">
            <div className="px-4">
              <StatCard
                value={itemText(item, "value")}
                title={itemText(item, "title")}
                description={itemText(item, "description")}
                icon={STAT_ICON_MAP[itemText(item, "icon")]}
              />
            </div>
          </PreviewFrame>
        </>
      );
    default:
      return <p className="text-xs text-[#87938a]">Pratinjau belum tersedia untuk bagian ini.</p>;
  }
}

export function CollectionPreview({ def, draft }: { def: CollectionDef; draft: ContentItem }) {
  return (
    <PreviewPanel path={def.publicPath} note="Isian wajib yang masih kosong ditampilkan dengan nama kolomnya.">
      <CollectionPreviewBody def={def} item={withPlaceholders(def.fields, draft)} />
    </PreviewPanel>
  );
}

export function BlockPreview({ def, data }: { def: BlockDef; data: BlockData }) {
  const filled: BlockData = { ...data };
  for (const field of def.fields) if (!filled[field.key] && field.required) filled[field.key] = field.label;

  return (
    <PreviewPanel path={def.publicPath}>
      {def.key === "vision" ? (
        <>
          <PreviewLabel>Bagian atas halaman Visi & Misi</PreviewLabel>
          <PreviewFrame width={1200}>
            <HeroVisi vision={filled} />
          </PreviewFrame>
        </>
      ) : def.key === "contact" ? (
        <>
          <PreviewLabel>Kontak di halaman Kolaborasi</PreviewLabel>
          <PreviewFrame width={1200}>
            <FormKontak contact={filled} />
          </PreviewFrame>
          <PreviewLabel>Kolom kontak di footer</PreviewLabel>
          <PreviewFrame width={320} className="bg-[#0f1713] p-6">
            <h4 className="mb-4 text-sm font-semibold text-white">Kontak</h4>
            <address className="space-y-3 text-sm not-italic leading-relaxed text-gray-400">
              <p>{filled.address}</p>
              <p className="flex flex-col gap-1">
                <span className="break-all">{filled.email}</span>
                <span>{filled.phone}</span>
                {filled.hours && <span>{filled.hours}</span>}
              </p>
            </address>
          </PreviewFrame>
        </>
      ) : (
        <p className="text-xs text-[#87938a]">Pratinjau belum tersedia untuk bagian ini.</p>
      )}
    </PreviewPanel>
  );
}
