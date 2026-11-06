import Link from 'next/link';

export default function AboutCTA() {
  return (
    <section className="bg-[#0f1713] py-24 text-center">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl flex flex-col items-center">
        
        <span className="block mb-2 text-xs font-semibold uppercase tracking-wider text-teal-300">
          Partisipasi Sains Warga DAS Jogja
        </span>
        
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Ingin Mengembangkan Riset atau Berkolaborasi di Koridor Tiga Sungai?
        </h2>
        
        <p className="text-gray-400 text-lg mb-10 max-w-2xl">
          Kami membuka pintu kemitraan selebar-lebarnya untuk universitas, lembaga donor, korporasi, dan pemuda penggerak lingkungan.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-teal-600 text-white px-8 py-4 rounded-sm text-sm font-bold hover:bg-teal-500 transition-colors">
            DAFTARKAN AGENDA KOLABORASI
          </button>
          <Link href="/tentang/faq"
          className="w-full sm:w-auto text-white px-8 py-4 rounded-sm text-sm font-semibold hover:text-teal-300 transition-colors border border-gray-700 sm:border-transparent">
            AJUKAN PERTANYAAN PADA KAMI
          </Link>
        </div>
      </div>
    </section>
  );
}