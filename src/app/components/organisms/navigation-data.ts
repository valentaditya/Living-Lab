export interface SubMenuItem {
  label: string;
  href: string;
}

export interface MenuItem {
  label: string;
  type: 'link' | 'dropdown';
  href?: string;
  subItems?: SubMenuItem[];
}

export const menuData: MenuItem[] = [
  { label: "Beranda", href: "/", type: "link" },
  {
    label: "Tentang Kami",
    type: "dropdown",
    subItems: [
      { label: "Profil Living Lab", href: "/tentang/profil" },
      { label: "Tim Kami", href: "/tentang/tim" },
      { label: "Visi & Misi", href: "/tentang/visi-misi" }
    ]
  },
  { label: "Sungai", href: "/sungai", type: "link" },
  {
    label: "Pusat Pengetahuan",
    type: "dropdown",
    subItems: [
      { label: "Jurnal & Publikasi", href: "/pengetahuan/jurnal" },
      { label: "Data Kualitas Air", href: "/pengetahuan/data" },
      { label: "Modul Edukasi", href: "/pengetahuan/modul" }
    ]
  },
  { label: "Berita", href: "/berita", type: "link" },
  { label: "Kisah Sungai", href: "/kisah-sungai", type: "link" },
  { label: "Kolaborasi", href: "/kolaborasi", type: "link" },
];

/** True when `pathname` is `href` itself or a page below it. */
export const isPathActive = (href: string, pathname: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/** A link is active on its own route; a dropdown is active when one of its sub-pages is. */
export const isItemActive = (item: MenuItem, pathname: string) =>
  item.type === "dropdown"
    ? (item.subItems ?? []).some((sub) => isPathActive(sub.href, pathname))
    : !!item.href && isPathActive(item.href, pathname);
