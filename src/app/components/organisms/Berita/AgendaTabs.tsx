"use client";

import { useState } from "react";
import type { AgendaItem } from "@/types/agenda";
import { AgendaSection } from "@/app/components/organisms/AgendaSection";
import { AgendaKegiatan } from "./AgendaKegiatan";

const tabs = [
  { id: "sarasehan", label: "Sarasehan & Lokakarya" },
  { id: "lapangan", label: "Aksi & Kegiatan Lapangan" },
] as const;

export function AgendaTabs({ agendas }: { agendas: AgendaItem[] }) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>(
    "sarasehan",
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Jenis agenda"
        className="mb-7 flex flex-wrap gap-2 border-b border-[#dfe7dd]"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`agenda-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`agenda-panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "border-brand text-brand"
                  : "border-transparent text-[#78857b] hover:border-[#b8c9b8] hover:text-[#385944]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`agenda-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`agenda-tab-${activeTab}`}
        tabIndex={0}
      >
        {activeTab === "sarasehan" ? (
          <AgendaSection agendas={agendas} subsection />
        ) : (
          <AgendaKegiatan subsection />
        )}
      </div>
    </div>
  );
}
