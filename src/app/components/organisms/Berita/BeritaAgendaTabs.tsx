"use client";

import { useState } from "react";
import type { AgendaItem } from "@/types/agenda";
import type { Article } from "@/types/article";
import { AgendaTabs } from "./AgendaTabs";
import { BeritaTerkini } from "./BeritaTerkini";
import { CtaBerita } from "./CtaBerita";
import { LaporanAktivitas } from "./LaporanAktivitas";
import { SiaranPersMedia } from "./SiaranPersMedia";
import { NewsSection } from "@/app/components/organisms/NewsSection";

const tabs = [
  { id: "berita", label: "Berita" },
  { id: "agenda", label: "Agenda" },
] as const;

export function BeritaAgendaTabs({
  articles,
  agendas,
}: {
  articles: Article[];
  agendas: AgendaItem[];
}) {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]["id"]>("berita");

  return (
    <div>
      <div className="sticky top-16 z-30 border-b border-[#e5ebe4] bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            role="tablist"
            aria-label="Pilih berita atau agenda"
            className="flex gap-2"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`berita-agenda-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`berita-agenda-panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`-mb-px border-b-2 px-5 py-4 text-sm font-semibold transition ${
                    isActive
                      ? "border-[#315b3d] text-[#315b3d]"
                      : "border-transparent text-[#78857b] hover:border-[#b8c9b8] hover:text-[#385944]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        id={`berita-agenda-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`berita-agenda-tab-${activeTab}`}
        tabIndex={0}
      >
        {activeTab === "berita" ? (
          <>
            <BeritaTerkini />
            <NewsSection articles={articles} />
            <SiaranPersMedia />
            <LaporanAktivitas />
            <CtaBerita />
          </>
        ) : (
          <section
            id="agenda"
            className="bg-[#f4f6f2] py-10 sm:py-14"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <header className="mb-8 flex flex-col justify-between gap-4 border-b border-[#e1e8df] pb-6 sm:flex-row sm:items-end">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#63816a]">
                    Kegiatan Living Lab
                  </span>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#1d3024] sm:text-3xl">
                    Agenda &amp; Kegiatan
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-[#718076]">
                  Agenda forum dan lokakarya serta kegiatan aksi lapangan Living
                  Lab.
                </p>
              </header>
              <AgendaTabs agendas={agendas} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
