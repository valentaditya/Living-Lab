"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import {
  BarChart3,
  BookOpenText,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  Database,
  Eye,
  FileText,
  GraduationCap,
  Handshake,
  Home,
  Images,
  Info,
  LayoutDashboard,
  Library,
  ListChecks,
  ListOrdered,
  Megaphone,
  Menu,
  Network,
  Newspaper,
  PanelLeftClose,
  PanelLeftOpen,
  PanelTop,
  Phone,
  Route,
  Target,
  UserRound,
  UsersRound,
  Waves,
  X,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import type { AdminAccountSummary } from "@/lib/admin-profile";
import { AdminAvatar } from "./AdminAvatar";
import { LogoutButton } from "./LogoutButton";
import { OfflineBanner } from "./drafts";

type NavLeaf = { label: string; href: string; icon: LucideIcon };
type Chapter = {
  label: string;
  icon: LucideIcon;
  /** Langsung ke satu halaman editor (tanpa sub bab). */
  href?: string;
  items?: NavLeaf[];
  /** Halaman publik yang belum punya editor di dashboard. */
  note?: string;
};

/** Urutan bab mengikuti menu navbar website publik (lihat navigation-data.ts). */
const chapters: Chapter[] = [
  {
    label: "Beranda", icon: Home,
    items: [
      { label: "Konten Pembuka", href: "/dashboard/homepage", icon: PanelTop },
      { label: "Statistik", href: "/dashboard/content/stats", icon: BarChart3 },
    ],
  },
  {
    label: "Tentang Kami", icon: Info,
    items: [
      { label: "Tim Kami", href: "/dashboard/content/team", icon: UsersRound },
      { label: "Visi", href: "/dashboard/content/vision", icon: Eye },
      { label: "Misi", href: "/dashboard/content/missions", icon: ListOrdered },
      { label: "Target Capaian", href: "/dashboard/content/targets", icon: Target },
      { label: "Roadmap", href: "/dashboard/content/roadmap", icon: Route },
      { label: "FAQ", href: "/dashboard/faq", icon: CircleHelp },
    ],
  },
  { label: "Sungai", icon: Waves, note: "Halaman Sungai belum bisa diubah dari dashboard." },
  {
    label: "Pusat Pengetahuan", icon: Library,
    items: [
      { label: "Jurnal & Publikasi", href: "/dashboard/content/publications", icon: FileText },
      { label: "Data Kualitas Air", href: "/dashboard/content/datasets", icon: Database },
      { label: "Modul Edukasi", href: "/dashboard/content/modules", icon: GraduationCap },
    ],
  },
  {
    label: "Berita", icon: Megaphone,
    items: [
      { label: "Berita", href: "/dashboard/news", icon: Newspaper },
      { label: "Agenda", href: "/dashboard/news?tab=agenda", icon: CalendarDays },
    ],
  },
  { label: "Kisah Sungai", icon: BookOpenText, href: "/dashboard/content/stories" },
  {
    label: "Kolaborasi", icon: Network,
    items: [
      { label: "Mitra & Komunitas", href: "/dashboard/content/partners", icon: Handshake },
      { label: "Kontak & Sekretariat", href: "/dashboard/content/contact", icon: Phone },
    ],
  },
];

const extraLinks = [
  { label: "Pustaka Media", href: "/dashboard/media", icon: Images },
  { label: "Log Aktivitas", href: "/dashboard/logs", icon: ListChecks },
  { label: "Profil Saya", href: "/dashboard/profile", icon: UserRound },
];

/** Cocokkan link (termasuk ?tab=) dengan halaman yang sedang dibuka. */
function isLeafActive(href: string, pathname: string, tab: string | null) {
  const [path, query] = href.split("?");
  if (pathname !== path && !(path !== "/dashboard" && pathname.startsWith(`${path}/`))) return false;
  const wantedTab = new URLSearchParams(query ?? "").get("tab");
  return path === "/dashboard/news" ? (wantedTab ?? "news") === (tab ?? "news") : true;
}

const chapterLeaves = (chapter: Chapter): NavLeaf[] =>
  chapter.items ?? (chapter.href ? [{ label: chapter.label, href: chapter.href, icon: chapter.icon }] : []);

/** Judul halaman untuk breadcrumb, mis. ["Tentang Kami", "Tim Kami"]. */
function pageTrail(pathname: string, tab: string | null): string[] {
  if (pathname === "/dashboard") return ["Dashboard"];
  for (const chapter of chapters) {
    const leaf = chapterLeaves(chapter).find((item) => isLeafActive(item.href, pathname, tab));
    if (leaf) return chapter.items ? [chapter.label, leaf.label] : [chapter.label];
  }
  const extra = extraLinks.find((item) => isLeafActive(item.href, pathname, tab));
  return [extra?.label ?? "Dashboard"];
}

const sectionTitle = "px-3 text-[10px] font-semibold tracking-[0.15em] text-[#96A198]";

function NavLink({
  href,
  label,
  icon,
  active,
  collapsed,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  collapsed: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      title={collapsed ? label : undefined}
      aria-current={active ? "page" : undefined}
      className={`flex items-center rounded-xl text-sm font-medium outline-none transition focus-visible:ring-4 focus-visible:ring-[#315C40]/15 ${
        collapsed ? "justify-center px-0 py-3" : "gap-3 px-3 py-2.5"
      } ${active ? "bg-[#EAF1EA] text-[#315C40]" : "text-[#68766D] hover:bg-[#F5F8F5] hover:text-[#315C40]"}`}
    >
      {icon}
      {!collapsed && label}
    </Link>
  );
}

export function DashboardShell({
  children,
  account,
}: {
  children: React.ReactNode;
  account: AdminAccountSummary;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const tab = useSearchParams().get("tab");
  const trail = pageTrail(pathname, tab);
  const activeChapter = chapters.find((chapter) =>
    chapterLeaves(chapter).some((leaf) => isLeafActive(leaf.href, pathname, tab)),
  )?.label;
  // Bab yang sedang dibuka otomatis terbuka; bab lain bisa dibuka/tutup sendiri.
  const [openChapters, setOpenChapters] = useState<string[]>(activeChapter ? [activeChapter] : []);
  const [lastActive, setLastActive] = useState(activeChapter);
  if (activeChapter !== lastActive) {
    setLastActive(activeChapter);
    if (activeChapter && !openChapters.includes(activeChapter)) setOpenChapters([...openChapters, activeChapter]);
  }
  const toggleChapter = (label: string) =>
    setOpenChapters((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );

  return (
    <div className="min-h-screen bg-[#F5F7F4] font-sans text-[#26372D]">
      {sidebarOpen && (
        <button
          aria-label="Tutup menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-[#1E3528]/40 backdrop-blur-[2px] lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col border-r border-[#E3E9E2] bg-white transition-[width,transform] duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          sidebarCollapsed
            ? "lg:w-[76px] lg:translate-x-0"
            : "lg:w-[250px] lg:translate-x-0"
        }`}
      >
        <div
          className={`flex h-[72px] shrink-0 items-center border-b border-[#EDF1ED] ${
            sidebarCollapsed
              ? "justify-center px-2"
              : "justify-between px-4"
          }`}
        >
          <Link
            href="/dashboard"
            title={sidebarCollapsed ? "Dashboard Living Lab" : undefined}
            className={`flex min-w-0 items-center ${
              sidebarCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 ring-1 ring-[#E3E9E2]">
              <Image
                src="/pictures/icon.png"
                alt=""
                width={512}
                height={512}
                className="h-full w-full object-contain"
              />
            </span>
            {!sidebarCollapsed && (
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-[#1E3528]">
                  Living Lab Sungai
                </span>
                <span className="text-[10px] font-medium tracking-[0.1em] text-[#7A887E]">
                  PANEL ADMIN
                </span>
              </span>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Tutup menu"
            className="rounded-lg p-2 text-[#7A887E] transition hover:bg-[#F3F6F3] lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav
          aria-label="Navigasi dashboard"
          className={`flex-1 space-y-6 overflow-y-auto py-6 ${
            sidebarCollapsed ? "px-2" : "px-3"
          }`}
        >
          <NavLink
            href="/dashboard"
            label="Dashboard"
            icon={<LayoutDashboard size={18} strokeWidth={1.8} aria-hidden="true" />}
            active={pathname === "/dashboard"}
            collapsed={sidebarCollapsed}
            onNavigate={() => setSidebarOpen(false)}
          />

          <div>
            {!sidebarCollapsed && <p className={sectionTitle}>HALAMAN WEBSITE</p>}
            <ul className={`${sidebarCollapsed ? "mt-0" : "mt-2"} space-y-1`}>
              {chapters.map((chapter) => {
                const leaves = chapterLeaves(chapter);
                const chapterActive = chapter.label === activeChapter;
                const ChapterIcon = chapter.icon;
                const badge = <ChapterIcon size={18} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />;

                // Sidebar diciutkan: hanya ikon bab, menuju halaman pertamanya.
                if (sidebarCollapsed) {
                  return (
                    <li key={chapter.label}>
                      {leaves[0] ? (
                        <Link
                          href={leaves[0].href}
                          title={chapter.label}
                          aria-current={chapterActive ? "page" : undefined}
                          className={`flex justify-center rounded-xl py-3 outline-none transition focus-visible:ring-4 focus-visible:ring-[#315C40]/15 ${
                            chapterActive ? "bg-[#EAF1EA] text-[#315C40]" : "text-[#68766D] hover:bg-[#F5F8F5] hover:text-[#315C40]"
                          }`}
                        >
                          {badge}
                        </Link>
                      ) : (
                        <span title={`${chapter.label}: ${chapter.note}`} className="flex justify-center py-3 text-[#C2CAC4]">
                          {badge}
                        </span>
                      )}
                    </li>
                  );
                }

                if (chapter.note) {
                  return (
                    <li key={chapter.label} title={chapter.note} className="flex items-center gap-3 px-3 py-2 text-sm text-[#B4BDB6]">
                      {badge}
                      <span>
                        {chapter.label}
                        <span className="block text-[10px]">Belum bisa diubah</span>
                      </span>
                    </li>
                  );
                }

                if (!chapter.items) {
                  return (
                    <li key={chapter.label}>
                      <NavLink
                        href={chapter.href!}
                        label={chapter.label}
                        icon={badge}
                        active={chapterActive}
                        collapsed={false}
                        onNavigate={() => setSidebarOpen(false)}
                      />
                    </li>
                  );
                }

                const open = openChapters.includes(chapter.label);
                const listId = `nav-chapter-${chapter.label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
                return (
                  <li key={chapter.label}>
                    <button
                      type="button"
                      onClick={() => toggleChapter(chapter.label)}
                      aria-expanded={open}
                      aria-controls={listId}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium outline-none transition focus-visible:ring-4 focus-visible:ring-[#315C40]/15 ${
                        chapterActive ? "text-[#315C40]" : "text-[#4F5E54] hover:bg-[#F5F8F5] hover:text-[#315C40]"
                      }`}
                    >
                      {badge}
                      <span className="flex-1">{chapter.label}</span>
                      <ChevronRight
                        size={15}
                        aria-hidden="true"
                        className={`text-[#A6B0A8] transition-transform ${open ? "rotate-90" : ""}`}
                      />
                    </button>
                    {open && (
                      <ul id={listId} className="mb-1 ml-[20px] mt-0.5 space-y-0.5 border-l border-[#E3E9E2] pl-3">
                        {chapter.items.map((leaf) => {
                          const active = isLeafActive(leaf.href, pathname, tab);
                          return (
                            <li key={leaf.href}>
                              <Link
                                href={leaf.href}
                                onClick={() => setSidebarOpen(false)}
                                aria-current={active ? "page" : undefined}
                                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] outline-none transition focus-visible:ring-4 focus-visible:ring-[#315C40]/15 ${
                                  active
                                    ? "bg-[#EAF1EA] font-medium text-[#315C40]"
                                    : "text-[#68766D] hover:bg-[#F5F8F5] hover:text-[#315C40]"
                                }`}
                              >
                                <leaf.icon size={15} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
                                {leaf.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            {!sidebarCollapsed && <p className={sectionTitle}>LAINNYA</p>}
            <div className={`${sidebarCollapsed ? "mt-0" : "mt-2"} space-y-1`}>
              {extraLinks.map(({ label, href, icon: Icon }) => (
                <NavLink
                  key={href}
                  href={href}
                  label={label}
                  icon={<Icon size={18} strokeWidth={1.8} aria-hidden="true" />}
                  active={isLeafActive(href, pathname, tab)}
                  collapsed={sidebarCollapsed}
                  onNavigate={() => setSidebarOpen(false)}
                />
              ))}
            </div>
          </div>
        </nav>

        <div
          className={`shrink-0 border-t border-[#EDF1ED] py-4 ${
            sidebarCollapsed ? "px-2" : "px-3"
          }`}
        >
          <Link
            href="/"
            title={sidebarCollapsed ? "Kembali ke situs" : undefined}
            className={`mb-3 flex items-center rounded-xl py-2.5 text-xs font-medium text-[#68766D] outline-none transition hover:bg-[#F5F8F5] hover:text-[#315C40] focus-visible:ring-4 focus-visible:ring-[#315C40]/15 ${
              sidebarCollapsed ? "justify-center px-0" : "gap-2 px-3"
            }`}
          >
            <ChevronRight
              size={16}
              className="rotate-180"
              aria-hidden="true"
            />
            {!sidebarCollapsed && "Kembali ke situs"}
          </Link>
          <div
            className={`flex items-center ${
              sidebarCollapsed
                ? "flex-col gap-3"
                : "justify-between rounded-xl bg-[#F5F7F4] p-2.5"
            }`}
          >
            <Link
              href="/dashboard/profile"
              onClick={() => setSidebarOpen(false)}
              className={`flex min-w-0 items-center rounded-lg outline-none focus-visible:ring-4 focus-visible:ring-[#315C40]/15 ${
                sidebarCollapsed ? "justify-center" : "gap-2.5"
              }`}
              title={`Profil Saya (${account.name})`}
            >
              <AdminAvatar name={account.name} avatarUrl={account.avatarUrl} size={32} />
              {!sidebarCollapsed && (
                <span className="min-w-0">
                  <span className="block truncate text-xs font-semibold text-[#43564A]">
                    {account.name}
                  </span>
                  <span className="block truncate text-[10px] text-[#87938A]">
                    {account.position}
                  </span>
                </span>
              )}
            </Link>
            <LogoutButton compact={sidebarCollapsed} />
          </div>
        </div>
      </aside>

      <div
        className={`min-h-screen transition-[padding] duration-200 ${
          sidebarCollapsed ? "lg:pl-[76px]" : "lg:pl-[250px]"
        }`}
      >
        <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-[#E3E9E2] bg-white/95 px-4 backdrop-blur sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Buka menu"
              className="rounded-lg p-2 text-[#52735B] transition hover:bg-[#F2F6F2] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#315C40]/15 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <button
              onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
              aria-label={
                sidebarCollapsed ? "Perluas sidebar" : "Ciutkan sidebar"
              }
              aria-expanded={!sidebarCollapsed}
              className="hidden rounded-lg p-2 text-[#52735B] transition hover:bg-[#F2F6F2] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#315C40]/15 lg:block"
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen size={19} />
              ) : (
                <PanelLeftClose size={19} />
              )}
            </button>
            <div className="flex min-w-0 items-center gap-2 text-sm">
              <span className="hidden text-[#87938A] sm:inline">
                Panel Admin
              </span>
              <ChevronRight
                size={14}
                className="hidden text-[#A6B0A8] sm:block"
                aria-hidden="true"
              />
              {trail.slice(0, -1).map((part) => (
                <span key={part} className="hidden items-center gap-2 text-[#87938A] md:flex">
                  {part}
                  <ChevronRight size={14} className="text-[#A6B0A8]" aria-hidden="true" />
                </span>
              ))}
              <span className="truncate font-medium text-[#314438]">
                {trail[trail.length - 1]}
              </span>
            </div>
          </div>
          <div className="relative ml-3">
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              aria-expanded={profileOpen}
              className="flex items-center gap-2 rounded-xl p-1.5 pr-2.5 outline-none transition hover:bg-[#F5F7F4] focus-visible:ring-4 focus-visible:ring-[#315C40]/15"
            >
              <AdminAvatar name={account.name} avatarUrl={account.avatarUrl} size={32} />
              <span className="hidden max-w-[180px] text-left sm:block">
                <span className="block truncate text-xs font-semibold text-[#314438]">
                  {account.name}
                </span>
                <span className="block truncate text-[10px] text-[#87938A]">
                  {account.position}
                </span>
              </span>
            </button>
            {profileOpen && (
              <>
                <button
                  type="button"
                  aria-label="Tutup menu profil"
                  onClick={() => setProfileOpen(false)}
                  className="fixed inset-0 z-30 cursor-default"
                />
                <div className="absolute right-0 top-full z-40 mt-2 w-60 rounded-xl border border-[#E3E9E2] bg-white p-3 shadow-[0_12px_32px_rgba(30,53,40,0.12)]">
                  <p className="truncate px-2 py-1 text-xs font-semibold text-[#314438]">
                    {account.name}
                  </p>
                  <p className="truncate px-2 pb-2 text-[11px] text-[#7A887E]">
                    {account.email}
                  </p>
                  <div className="space-y-1 border-t border-[#EDF1ED] pt-2">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium text-[#43564A] outline-none transition hover:bg-[#F5F8F5] hover:text-[#315C40] focus-visible:ring-4 focus-visible:ring-[#315C40]/15"
                    >
                      <UserRound size={15} aria-hidden="true" />
                      Profil saya
                    </Link>
                    <LogoutButton />
                  </div>
                </div>
              </>
            )}
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1440px] px-4 py-7 sm:px-7 sm:py-9 lg:px-10">
          <OfflineBanner />
          {children}
        </main>
      </div>
    </div>
  );
}
