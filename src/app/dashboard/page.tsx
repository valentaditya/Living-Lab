import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  CircleHelp,
  ClipboardList,
  FileText,
  Images,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import { getActivityLogs } from "@/lib/activity-log";
import { getCMSContentStrict } from "@/lib/cms-content";

const shortcutItems: {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Kelola Beranda",
    description: "Ubah judul, deskripsi, dan konten utama halaman beranda.",
    href: "/dashboard/homepage",
    icon: Settings2,
  },
  {
    title: "Tambah Berita",
    description: "Buat artikel berita atau publikasi baru.",
    href: "/dashboard/news",
    icon: FileText,
  },
  {
    title: "Tambah Agenda",
    description: "Tambahkan kegiatan atau event ke situs.",
    href: "/dashboard/news?tab=agenda",
    icon: CalendarDays,
  },
  {
    title: "Unggah Media",
    description: "Unggah gambar, dokumen, dan aset website.",
    href: "/dashboard/media",
    icon: Images,
  },
];

function formatRelativeTime(date: string, now: number) {
  const timestamp = Date.parse(date);
  if (Number.isNaN(timestamp)) return "Waktu tidak tersedia";

  const minutes = Math.max(0, Math.floor((now - timestamp) / 60_000));
  if (minutes < 1) return "Baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} hari lalu`;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(timestamp);
}

export default async function DashboardPage() {
  const [content, activityLogs] = await Promise.all([
    getCMSContentStrict(),
    getActivityLogs(undefined, 5),
  ]);
  const now = Date.now();
  const currentDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeZone: "Asia/Jakarta",
  }).format(now);

  const statistics: {
    label: string;
    value: number;
    noun: string;
    description: string;
    href: string;
    icon: LucideIcon;
  }[] = [
    {
      label: "Konten Berita",
      value: content.articles.length,
      noun: "Artikel",
      description: "Artikel yang ditampilkan pada beranda.",
      href: "/dashboard/news",
      icon: FileText,
    },
    {
      label: "Agenda Kegiatan",
      value: content.agenda.length,
      noun: "Agenda",
      description: "Kegiatan yang ditampilkan pada beranda.",
      href: "/dashboard/news",
      icon: CalendarDays,
    },
    {
      label: "Pertanyaan FAQ",
      value: content.faqs.length,
      noun: "Pertanyaan",
      description: "Informasi untuk pengunjung situs.",
      href: "/dashboard/faq",
      icon: CircleHelp,
    },
  ];

  const recentContent = [
    ...content.articles.slice(0, 3).map((article) => ({
      id: `article-${article.id}`,
      title: article.title,
      type: "Berita",
      href: "/dashboard/news",
      updatedAt: null,
    })),
    ...content.agenda.slice(0, 2).map((agenda) => ({
      id: `agenda-${agenda.id}`,
      title: agenda.title,
      type: "Agenda",
      href: "/dashboard/news",
      updatedAt: null,
    })),
    ...content.faqs.slice(0, 2).map((faq) => ({
      id: `faq-${faq.id}`,
      title: faq.question,
      type: "FAQ",
      href: "/dashboard/faq",
      updatedAt: null,
    })),
  ].slice(0, 5);

  return (
    <div className="space-y-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#52735B]">
            Ringkasan pengelolaan
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#1E3528]">
            Dashboard
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#7A887E]">
            Selamat datang. Kelola konten situs Living Lab dari satu tempat.
          </p>
        </div>
        <p className="flex items-center gap-2 text-xs font-medium text-[#718076] sm:pb-1">
          <CalendarDays size={15} className="text-[#52735B]" aria-hidden="true" />
          {currentDate}
        </p>
      </header>

      <section aria-label="Ringkasan konten" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {statistics.map(({ label, value, noun, description, href, icon: Icon }) => (
          <Link
            href={href}
            key={label}
            className="group rounded-2xl border border-[#E3E9E2] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#B9C9BB] hover:shadow-[0_10px_28px_rgba(30,53,40,0.07)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#315C40]/15 sm:p-6"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF1EA] text-[#315C40]">
                <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <ArrowDownRight
                size={18}
                className="text-[#A0ADA2] transition group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-[#315C40]"
                aria-hidden="true"
              />
            </div>
            <p className="mt-5 text-sm font-medium text-[#718076]">{label}</p>
            <p className="mt-1 text-[26px] font-semibold tracking-tight text-[#26372D]">
              {value} <span className="text-base font-medium">{noun}</span>
            </p>
            <p className="mt-2 text-xs leading-5 text-[#7A887E]">{description}</p>
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border border-[#E3E9E2] bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#52735B]">
              Pintasan
            </p>
            <h2 className="mt-1 text-lg font-semibold text-[#26372D]">
              Aksi cepat
            </h2>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {shortcutItems.map(({ title, description, href, icon: Icon }) => (
            <Link
              href={href}
              key={title}
              className="group flex min-h-[104px] items-start gap-4 rounded-xl border border-[#E8EEE8] bg-[#FBFCFB] p-4 transition hover:border-[#B9C9BB] hover:bg-[#F4F8F4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#315C40]/15"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF1EA] text-[#315C40]">
                <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2 text-sm font-semibold text-[#314438]">
                  {title}
                  <ArrowRight
                    size={15}
                    className="shrink-0 text-[#9BA89D] transition group-hover:translate-x-1 group-hover:text-[#315C40]"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1 block text-xs leading-5 text-[#7A887E]">
                  {description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-2xl border border-[#E3E9E2] bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#52735B]">
                Aktivitas terbaru
              </p>
              <h2 className="mt-1 text-lg font-semibold text-[#26372D]">
                Riwayat pengelolaan
              </h2>
            </div>
            <Link
              href="/dashboard/logs"
              className="text-xs font-semibold text-[#315C40] hover:text-[#1E3528] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315C40]"
            >
              Lihat semua
            </Link>
          </div>
          {activityLogs.length > 0 ? (
            <ul className="mt-5 divide-y divide-[#EEF1EE]">
              {activityLogs.slice(0, 5).map((entry) => (
                <li key={entry.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF1EA] text-[#52735B]">
                    <FileText size={15} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#314438]">{entry.action}</p>
                    <p className="mt-0.5 text-xs leading-5 text-[#7A887E]">
                      {entry.detail}
                    </p>
                    <p className="mt-1 text-[11px] text-[#97A198]">
                      Admin · {formatRelativeTime(entry.createdAt, now)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-[#DCE5DC] bg-[#FBFCFB] px-5 py-8 text-center">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF1EA] text-[#52735B]">
                <ClipboardList size={18} aria-hidden="true" />
              </span>
              <p className="mt-3 text-sm font-medium text-[#43564A]">
                Belum ada aktivitas
              </p>
              <p className="mt-1 text-xs text-[#7A887E]">
                Perubahan konten akan tercatat di bagian ini.
              </p>
            </div>
          )}
        </section>

        <section className="min-w-0 rounded-2xl border border-[#E3E9E2] bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#52735B]">
                Konten terbaru
              </p>
              <h2 className="mt-1 text-lg font-semibold text-[#26372D]">
                Ringkasan konten
              </h2>
            </div>
            <Link
              href="/dashboard/news"
              className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[#315C40] hover:text-[#1E3528] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315C40]"
            >
              Lihat semua <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          {recentContent.length > 0 ? (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#E8EEE8] text-[11px] font-medium text-[#7A887E]">
                    <th scope="col" className="pb-3 pr-4 font-medium">Judul</th>
                    <th scope="col" className="pb-3 pr-4 font-medium">Jenis</th>
                    <th scope="col" className="pb-3 pr-4 font-medium">Status</th>
                    <th scope="col" className="pb-3 font-medium">Terakhir diperbarui</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEF1EE]">
                  {recentContent.map((item) => (
                    <tr key={item.id} className="text-xs">
                      <td className="max-w-[230px] py-3 pr-4">
                        <Link
                          href={item.href}
                          title={item.title}
                          className="block truncate font-medium text-[#314438] hover:text-[#315C40] focus-visible:outline-none focus-visible:underline"
                        >
                          {item.title}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-[#718076]">{item.type}</td>
                      <td className="py-3 pr-4">
                        <span className="inline-flex rounded-full bg-[#EAF1EA] px-2.5 py-1 text-[10px] font-semibold text-[#315C40]">
                          Published
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-3 text-[#7A887E]">
                        {item.updatedAt || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-[#DCE5DC] bg-[#FBFCFB] px-5 py-8 text-center">
              <p className="text-sm font-medium text-[#43564A]">
                Belum ada konten
              </p>
              <p className="mt-1 text-xs text-[#7A887E]">
                Konten yang tersedia akan muncul di sini.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
