import Link from "next/link";
import Image from "next/image";
import type { BlockData } from "@/lib/content-schema";

const footerColumns = [
  {
    title: "Navigasi",
    links: [
      { name: "Beranda", href: "/" },
      { name: "Profil Living Lab", href: "/tentang/profil" },
      { name: "Roadmap", href: "/tentang/roadmap" },
      { name: "Sungai", href: "/sungai" },
      { name: "Kolaborasi", href: "/kolaborasi" },
      { name: "FAQ", href: "/tentang/faq" },
    ],
  },
  {
    title: "Riset & Arsip",
    links: [
      { name: "Data Kualitas Air", href: "/pengetahuan/data" },
      { name: "Modul Edukasi", href: "/pengetahuan/modul" },
      { name: "Jurnal & Publikasi", href: "/pengetahuan/jurnal" },
    ],
  },
];

export default function Footer({ contact }: { contact: BlockData }) {
  return (
    <footer className="bg-[#0f172a] pb-8 pt-14 text-sm text-white sm:pt-20">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:mb-16 lg:grid-cols-4 lg:gap-12">
          <div className="col-span-2 flex flex-col gap-5 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white p-1">
                <Image
                  src="/pictures/icon.png"
                  alt=""
                  width={512}
                  height={512}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-lg font-semibold leading-tight tracking-tight">
                Living Lab Sungai Yogyakarta
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-400">
              Platform kolaboratif berbasis sains warga untuk restorasi ekologis DAS Code, Winongo, dan Gajahwong di Daerah Istimewa Yogyakarta.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-sm font-semibold text-white">{column.title}</h4>
              <ul className="flex flex-col gap-3 text-gray-400">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="transition-colors hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 lg:col-span-1">
            <h4 className="mb-4 text-sm font-semibold text-white">Kontak</h4>
            <address className="space-y-3 not-italic leading-relaxed text-gray-400">
              <p>{contact.address}</p>
              <p className="flex flex-col gap-1">
                <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-white">
                  {contact.email}
                </a>
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-white">
                  {contact.phone}
                </a>
                {contact.hours && <span>{contact.hours}</span>}
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-xs text-gray-500">
          <p>© 2025 Living Lab Sungai Yogyakarta · Universitas Atma Jaya Yogyakarta &amp; Komunitas Bantara.</p>
        </div>
      </div>
    </footer>
  );
}
