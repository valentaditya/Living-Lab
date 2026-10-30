"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChevronLeft,
  CircleHelp,
  FileText,
  Images,
  LayoutDashboard,
  ListChecks,
  Menu,
  Settings2,
  Waves,
  X,
} from "lucide-react";
import { useState } from "react";
import { LogoutButton } from "./LogoutButton";

const groups = [
  {
    title: "MENU UTAMA",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "KONTEN SITUS",
    items: [
      { label: "Beranda", href: "/dashboard/homepage", icon: Settings2 },
      { label: "Berita & Agenda", href: "/dashboard/news", icon: CalendarDays },
      { label: "FAQ", href: "/dashboard/faq", icon: CircleHelp },
    ],
  },
  {
    title: "MEDIA",
    items: [
      { label: "Pustaka Media", href: "/dashboard/media", icon: Images },
      { label: "Log Aktivitas", href: "/dashboard/logs", icon: ListChecks },
    ],
  },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f7f3] font-sans text-[#18271e]">
      {sidebarOpen && (
        <button
          aria-label="Tutup menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-[#10281f]/40 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-[#e5ebe4] bg-white transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-[#edf0ec] px-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8efe7] text-[#416d50]">
              <Waves size={21} />
            </span>
            <span>
              <span className="block text-sm font-semibold">Living Lab</span>
              <span className="text-[10px] tracking-wide text-[#849087]">
                PANEL ADMIN
              </span>
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Tutup menu"
            className="text-[#829087] lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-7 overflow-y-auto px-3 py-6">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="px-3 text-[10px] font-semibold tracking-[0.16em] text-[#9aa49c]">
                {group.title}
              </p>
              <div className="mt-2 space-y-1">
                {group.items.map(({ label, href, icon: Icon }) => {
                  const active =
                    pathname === href ||
                    (href !== "/dashboard" && pathname.startsWith(href));
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        active
                          ? "bg-[#edf3ec] text-[#315b3d]"
                          : "text-[#68766d] hover:bg-[#f6f8f5] hover:text-[#315b3d]"
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.8} />
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-[#edf0ec] p-4">
          <Link
            href="/"
            className="mb-3 flex items-center gap-2 px-2 py-2 text-xs text-[#6f7d73] hover:text-[#315b3d]"
          >
            <ChevronLeft size={15} /> Kembali ke situs
          </Link>
          <div className="flex items-center justify-between rounded-xl bg-[#f7f9f6] p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dfeade] text-xs font-semibold text-[#416d50]">
                A
              </div>
              <span className="text-xs font-medium text-[#526157]">Admin</span>
            </div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      <div className="lg:pl-[270px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-[#e5ebe4] bg-white/95 px-5 backdrop-blur sm:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Buka menu"
            className="text-[#416d50] lg:hidden"
          >
            <Menu size={22} />
          </button>
          <div className="hidden items-center gap-2 text-xs text-[#849087] sm:flex">
            <FileText size={15} /> Sistem pengelolaan konten
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs text-[#6f7d73]">
            <span className="h-2 w-2 rounded-full bg-[#69a477]" />
            Admin aktif
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
