import type { ReactNode } from "react";

/**
 * Skeleton loading untuk panel admin. Bentuknya meniru tata letak aslinya,
 * supaya halaman tidak "melompat" saat konten selesai dimuat.
 * Tanpa hooks, jadi bisa dipakai di loading.tsx (server) maupun komponen klien.
 */

export function Bone({ className = "" }: { className?: string }) {
  // Radius bawaan hanya dipakai jika tidak ada class rounded-* lain; di Tailwind
  // yang menang adalah urutan di CSS, bukan urutan class, jadi jangan digabung.
  const radius = /(^|\s)rounded(-|\s|$)/.test(className) ? "" : "rounded-lg";
  return (
    <div
      aria-hidden="true"
      className={`${radius} bg-[#e6ece5] motion-safe:animate-pulse ${className}`}
    />
  );
}

/** Pembungkus yang memberi tahu pembaca layar bahwa konten sedang dimuat. */
export function SkeletonRegion({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

const cardClass = "rounded-2xl border border-[#e5ebe4] bg-white p-5 sm:p-7";

export function HeadingSkeleton() {
  return (
    <div className="mb-7">
      <Bone className="h-2.5 w-28" />
      <Bone className="mt-3 h-8 w-64 max-w-full" />
      <Bone className="mt-3 h-4 w-96 max-w-full" />
    </div>
  );
}

function FieldSkeleton({ tall = false }: { tall?: boolean }) {
  return (
    <div>
      <Bone className="h-3 w-24" />
      <Bone className={`mt-2 w-full rounded-xl ${tall ? "h-24" : "h-[42px]"}`} />
    </div>
  );
}

export function FormCardSkeleton({
  fields = 4,
  columns = 2,
  tallField = false,
}: {
  fields?: number;
  columns?: 1 | 2;
  tallField?: boolean;
}) {
  return (
    <div className={`${cardClass} mb-7 space-y-5`}>
      <Bone className="h-5 w-40" />
      <div className={`grid gap-4 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
        {Array.from({ length: fields }, (_, index) => (
          <FieldSkeleton key={index} />
        ))}
      </div>
      {tallField && <FieldSkeleton tall />}
      <div className="flex justify-end">
        <Bone className="h-10 w-36 rounded-xl" />
      </div>
    </div>
  );
}

export function ToolbarSkeleton({ withFilters = false, withTitle = true }: { withFilters?: boolean; withTitle?: boolean }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {withTitle && <Bone className="h-5 w-36" />}
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <Bone className="h-[42px] w-full rounded-xl sm:w-80" />
        {withFilters && <Bone className="h-[38px] w-44 rounded-xl" />}
      </div>
    </div>
  );
}

export function ListRowsSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 rounded-xl border border-[#e5ebe4] bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0 flex-1">
            <Bone className={`h-4 ${index % 2 === 0 ? "w-3/4" : "w-2/3"}`} />
            <Bone className="mt-2 h-3 w-40" />
          </div>
          <div className="flex gap-2">
            <Bone className="h-7 w-14" />
            <Bone className="h-7 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function MediaGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-xl border border-[#e5ebe4] bg-white">
          <Bone className="h-40 w-full rounded-none" />
          <div className="p-3">
            <Bone className="h-3 w-3/4" />
            <Bone className="mt-2 h-2.5 w-1/2" />
            <div className="mt-3 flex gap-2">
              <Bone className="h-7 flex-1" />
              <Bone className="h-7 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LogTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e5ebe4] bg-white">
      <div className="hidden grid-cols-[minmax(160px,0.8fr)_minmax(180px,0.8fr)_minmax(0,2fr)] gap-4 border-b border-[#edf0ec] bg-[#f8faf7] px-5 py-3.5 sm:grid">
        <Bone className="h-2.5 w-14" />
        <Bone className="h-2.5 w-16" />
        <Bone className="h-2.5 w-12" />
      </div>
      <div className="divide-y divide-[#edf0ec]">
        {Array.from({ length: rows }, (_, index) => (
          <div
            key={index}
            className="grid gap-2 px-5 py-4 sm:grid-cols-[minmax(160px,0.8fr)_minmax(180px,0.8fr)_minmax(0,2fr)] sm:items-center sm:gap-4"
          >
            <Bone className="h-3 w-28" />
            <div>
              <Bone className="h-4 w-32" />
              <Bone className="mt-1.5 h-2.5 w-24" />
            </div>
            <Bone className={`h-3.5 ${index % 3 === 0 ? "w-5/6" : index % 3 === 1 ? "w-2/3" : "w-3/4"}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TabsSkeleton() {
  return (
    <div className="mb-7 flex gap-2 border-b border-[#dfe7dd] pb-3">
      <Bone className="h-6 w-20" />
      <Bone className="h-6 w-20" />
    </div>
  );
}

export type EditorSection = "homepage" | "news" | "faq" | "media" | "logs";

const editorLabels: Record<EditorSection, string> = {
  homepage: "Memuat konten beranda",
  news: "Memuat berita dan agenda",
  faq: "Memuat daftar pertanyaan",
  media: "Memuat pustaka media",
  logs: "Memuat log aktivitas",
};

/** Skeleton satu halaman editor, dipakai di loading.tsx dan saat editor memuat data. */
export function EditorSkeleton({ section, newsTab = "news" }: { section: EditorSection; newsTab?: "news" | "agenda" }) {
  return (
    <SkeletonRegion label={editorLabels[section]}>
      <HeadingSkeleton />
      {section === "homepage" && (
        <div className={`${cardClass} space-y-5`}>
          <FieldSkeleton tall />
          <FieldSkeleton tall />
          <div className="flex justify-end">
            <Bone className="h-10 w-36 rounded-xl" />
          </div>
        </div>
      )}
      {section === "news" && (
        <>
          <TabsSkeleton />
          {newsTab === "news" ? <FormCardSkeleton fields={6} tallField /> : <FormCardSkeleton fields={6} />}
          <ToolbarSkeleton />
          <ListRowsSkeleton rows={4} />
        </>
      )}
      {section === "faq" && (
        <>
          <FormCardSkeleton fields={2} columns={1} tallField />
          <ToolbarSkeleton />
          <ListRowsSkeleton rows={5} />
        </>
      )}
      {section === "media" && (
        <>
          <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-dashed border-[#c9d6c9] bg-white p-5 sm:flex-row sm:items-end sm:p-7">
            <div className="flex-1">
              <Bone className="h-3 w-36" />
              <Bone className="mt-2 h-[42px] w-full rounded-xl" />
            </div>
            <Bone className="h-[42px] w-32 rounded-xl" />
          </div>
          <ToolbarSkeleton withFilters withTitle={false} />
          <MediaGridSkeleton />
        </>
      )}
      {section === "logs" && (
        <>
          <ToolbarSkeleton withTitle={false} />
          <LogTableSkeleton />
        </>
      )}
    </SkeletonRegion>
  );
}

/** Halaman utama dashboard: statistik, pintasan, aktivitas, dan tabel konten. */
export function DashboardHomeSkeleton() {
  return (
    <SkeletonRegion label="Memuat dashboard">
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Bone className="h-2.5 w-36" />
            <Bone className="mt-3 h-8 w-44" />
            <Bone className="mt-3 h-4 w-80 max-w-full" />
          </div>
          <Bone className="h-4 w-48" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="rounded-2xl border border-[#E3E9E2] bg-white p-5 sm:p-6">
              <Bone className="h-11 w-11 rounded-xl" />
              <Bone className="mt-5 h-4 w-28" />
              <Bone className="mt-2 h-7 w-32" />
              <Bone className="mt-3 h-3 w-full" />
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[#E3E9E2] bg-white p-5 sm:p-6">
          <Bone className="h-2.5 w-20" />
          <Bone className="mt-2 h-5 w-28" />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="flex min-h-[104px] items-start gap-4 rounded-xl border border-[#E8EEE8] bg-[#FBFCFB] p-4">
                <Bone className="h-10 w-10 shrink-0 rounded-xl" />
                <div className="flex-1">
                  <Bone className="h-4 w-32" />
                  <Bone className="mt-2 h-3 w-full" />
                  <Bone className="mt-1.5 h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-2xl border border-[#E3E9E2] bg-white p-5 sm:p-6">
            <Bone className="h-2.5 w-28" />
            <Bone className="mt-2 h-5 w-40" />
            <div className="mt-5 space-y-4">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="flex gap-3">
                  <Bone className="h-8 w-8 shrink-0" />
                  <div className="flex-1">
                    <Bone className="h-4 w-36" />
                    <Bone className="mt-1.5 h-3 w-full" />
                    <Bone className="mt-1.5 h-2.5 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#E3E9E2] bg-white p-5 sm:p-6">
            <Bone className="h-2.5 w-28" />
            <Bone className="mt-2 h-5 w-40" />
            <div className="mt-5 space-y-3">
              <Bone className="h-3 w-full" />
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 py-1">
                  <Bone className="h-3.5" />
                  <Bone className="h-3.5" />
                  <Bone className="h-5 w-16 rounded-full" />
                  <Bone className="h-3.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SkeletonRegion>
  );
}

/** Halaman Profil Saya: kartu foto, info akun, data diri, dan kata sandi. */
export function ProfileSkeleton() {
  return (
    <SkeletonRegion label="Memuat profil">
      <HeadingSkeleton />
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <div className="space-y-6">
          <div className={cardClass}>
            <div className="flex flex-col items-center">
              <Bone className="h-28 w-28 rounded-full" />
              <Bone className="mt-4 h-5 w-40" />
              <Bone className="mt-2 h-4 w-28" />
              <Bone className="mt-2 h-3 w-44" />
            </div>
            <div className="mt-6 flex justify-center gap-2">
              <Bone className="h-10 w-32 rounded-xl" />
            </div>
          </div>
          <div className={`${cardClass} space-y-4`}>
            <Bone className="h-5 w-32" />
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="flex justify-between gap-4">
                <Bone className="h-3.5 w-24" />
                <Bone className="h-3.5 w-32" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className={`${cardClass} space-y-5`}>
            <Bone className="h-5 w-28" />
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2"><FieldSkeleton /></div>
              <FieldSkeleton />
              <FieldSkeleton />
              <div className="sm:col-span-2"><FieldSkeleton /></div>
            </div>
            <div className="flex justify-end">
              <Bone className="h-10 w-36 rounded-xl" />
            </div>
          </div>
          <div className={`${cardClass} space-y-5`}>
            <Bone className="h-5 w-36" />
            <FieldSkeleton />
            <div className="grid gap-5 sm:grid-cols-2">
              <FieldSkeleton />
              <FieldSkeleton />
            </div>
            <div className="flex justify-end">
              <Bone className="h-10 w-32 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </SkeletonRegion>
  );
}
