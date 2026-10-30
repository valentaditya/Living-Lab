import Link from "next/link";
import {
  CalendarDays,
  CircleHelp,
  FileText,
  Images,
  Settings2,
} from "lucide-react";
import { getCMSContent } from "@/lib/cms-content";

export default async function DashboardPage() {
  const content = await getCMSContent();
  const overviewCards = [
    {
      label: "Konten berita",
      value: `${content.articles.length} artikel`,
      description: "Artikel yang ditampilkan pada beranda",
      href: "/dashboard/news",
      icon: FileText,
    },
    {
      label: "Agenda kegiatan",
      value: `${content.agenda.length} agenda`,
      description: "Kegiatan yang ditampilkan pada beranda",
      href: "/dashboard/news",
      icon: CalendarDays,
    },
    {
      label: "Pertanyaan FAQ",
      value: `${content.faqs.length} pertanyaan`,
      description: "Informasi untuk pengunjung situs",
      href: "/dashboard/faq",
      icon: CircleHelp,
    },
  ];

  return (
    <>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#63816a]">
          Ringkasan pengelolaan
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1d3024]">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-[#718076]">
          Selamat datang. Kelola konten situs Living Lab dari satu tempat.
        </p>
      </div>

      <section aria-label="Ringkasan konten" className="grid gap-4 md:grid-cols-3">
        {overviewCards.map(({ label, value, description, href, icon: Icon }) => (
          <Link
            href={href}
            key={label}
            className="rounded-2xl border border-[#e5ebe4] bg-white p-6 transition hover:border-[#b8c9b8] hover:shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf3ec] text-[#52775a]">
              <Icon size={19} strokeWidth={1.8} />
            </div>
            <p className="mt-5 text-sm text-[#718076]">{label}</p>
            <p className="mt-1 text-xl font-semibold text-[#24392a]">{value}</p>
            <p className="mt-2 text-xs leading-5 text-[#89948b]">{description}</p>
          </Link>
        ))}
      </section>

      <section className="mt-6 rounded-2xl border border-[#e5ebe4] bg-white p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#63816a]">
          Pintasan
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link
            href="/dashboard/homepage"
            className="flex items-center gap-3 rounded-xl bg-[#f7f9f6] p-4 text-sm font-medium text-[#385944] hover:bg-[#edf3ec]"
          >
            <Settings2 size={18} /> Ubah judul beranda
          </Link>
          <Link
            href="/dashboard/media"
            className="flex items-center gap-3 rounded-xl bg-[#f7f9f6] p-4 text-sm font-medium text-[#385944] hover:bg-[#edf3ec]"
          >
            <Images size={18} /> Unggah gambar atau dokumen
          </Link>
        </div>
      </section>
    </>
  );
}
