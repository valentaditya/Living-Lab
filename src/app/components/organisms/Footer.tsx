import Link from "next/link";

export default function Footer() {
  const navigasiLinks = [
    { name: "Beranda Utama", href: "/" },
    { name: "Tentang Living Lab (Profil & Roadmap)", href: "/tentang/profil" },
    { name: "Observatorium Tiga Sungai", href: "/sungai" },
    { name: "Kanal Kolaborasi & Kemitraan", href: "/kolaborasi" },
    { name: "Pusat Pertanyaan (FAQ)", href: "/faq" },
  ];

  const risetLinks = [
    { name: "Laporan Kualitas Air Real-Time", href: "/pengetahuan/data" },
    { name: "Indeks Kerentanan DAS DIY", href: "/pengetahuan/indeks" },
    { name: "Modul Sains Warga & Toolkit", href: "/pengetahuan/modul" },
    { name: "Repositori Jurnal Terbuka UAJY", href: "/pengetahuan/jurnal" },
  ];

  return (
    <footer className="bg-[#0f172a] text-white pt-20 pb-8 text-sm">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Description */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                <span className="text-[#0f172a] text-xs font-bold">LL</span>
              </div>
              <span className="font-semibold text-lg tracking-tight leading-tight">
                Living Lab Sungai<br />Yogyakarta
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Platform kolaboratif berbasis sains warga, dan restorasi ekologis DAS Code, Winongo, dan Gajahwong di Daerah Istimewa Yogyakarta.
            </p>
            <div className="text-[10px] font-mono text-gray-500 tracking-wider mt-2 uppercase border border-gray-700 p-2 rounded-sm w-fit">
              Civic Science • Eco Restoration • Participatory Design
            </div>
          </div>

          {/* Column 2: Navigasi Cepat */}
          <div>
            <h4 className="text-xs font-mono text-gray-500 tracking-wider mb-6">
              [ 01 / / NAVIGASI CEPAT ]
            </h4>
            <ul className="flex flex-col gap-3 text-gray-300">
              {navigasiLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-white transition-colors text-xs">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Riset & Arsip */}
          <div>
            <h4 className="text-xs font-mono text-gray-500 tracking-wider mb-6">
              [ 02 / / RISET & ARSIP ]
            </h4>
            <ul className="flex flex-col gap-3 text-gray-300">
              {risetLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-white transition-colors text-xs">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Kontak & Sekretariat */}
          <div>
            <h4 className="text-xs font-mono text-gray-500 tracking-wider mb-6">
              [ 03 / / KONTAK & SEKRETARIAT ]
            </h4>
            <div className="text-gray-400 text-xs space-y-3 leading-relaxed">
              <p>
                Kampus UAJY, Babarsari. Gedung Thomas Aquinas Lantai 3, Jl. Babarsari No. 44, Sleman, DIY Yogyakarta 55281.
              </p>
              <div className="pt-2 space-y-1">
                <a href="mailto:sekretariat@livinglabsungai.ac.id" className="block hover:text-white transition-colors">
                  E: sekretariat@livinglabsungai.ac.id
                </a>
                <a href="tel:+62274487711" className="block hover:text-white transition-colors">
                  T: +62 (274) 487-711 Ext. 2104
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-mono">
          <p>© 2025 Living Lab Sungai Yogyakarta. Universitas Atma Jaya Yogyakarta & Komunitas Bantara.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>STATUS: SISTEM OPERASIONAL DAS JOGJA</span>
          </div>
        </div>

      </div>
    </footer>
  );
}