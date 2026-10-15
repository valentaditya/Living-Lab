// components/organisms/StoryArticleBody.tsx
import React from 'react';
import { Camera, Quote, Download, Share2 } from 'lucide-react';

interface StoryArticleBodyProps {
  abstract: string;
}

export const StoryArticleBody: React.FC<StoryArticleBodyProps> = ({ abstract }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

      <article className="lg:col-span-8 space-y-8 font-sans text-slate-700 leading-relaxed text-base sm:text-lg">
 
        <p className="text-lg sm:text-xl font-medium text-slate-900 leading-relaxed border-l-2 border-emerald-600 pl-4 bg-emerald-50/40 py-2 rounded-r-lg">
          {abstract}
        </p>

        <p>
          Perubahan ekosistem di sepanjang koridor sungai perkotaan Yogyakarta tidak pernah sekadar soal angka kualitas air atau fisik tanggul beton. Di balik setiap aliran air yang melalui permukiman padat, terdapat denyut kehidupan sosial yang digerakkan oleh tangan-tangan warga—terutama para ibu dan komunitas lokal yang menjadikan bantaran sebagai halaman depan kehidupan mereka.
        </p>

        <h3 className="text-2xl font-semibold text-slate-900 pt-4 font-sans tracking-tight">
          Transformasi Halaman Belakang Menjadi Ruang Publik Hijau
        </h3>

        <p>
          Selama bertahun-tahun, bagian belakang rumah yang menghadap langsung ke sungai kerap diperlakukan sebagai tempat pembuangan akhir informal. Namun, melalui inisiatif kolaboratif bersama Living Lab Sungai Yogyakarta, paradigma tersebut berbalik secara perlahan namun konsisten.
        </p>

        {/* Pull Quote Editorial */}
        <blockquote className="my-8 p-6 sm:p-8 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3">
          <Quote className="w-8 h-8 text-emerald-700 opacity-60" />
          <p className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight font-sans leading-snug">
            &quot;Sungai bukan lagi batas belakang yang kotor, melainkan teras depan tempat kita menyambut masa depan bersama.&quot;
          </p>
          <footer className="text-xs font-mono text-slate-500 uppercase tracking-wider">
            — Catatan Lapangan Tim Living Lab UAJY
          </footer>
        </blockquote>

        <h3 className="text-2xl font-semibold text-slate-900 pt-4 font-sans tracking-tight">
          Gerakan Kolektif & Ekonomi Sirkular Warga
        </h3>

        <p>
          Tidak hanya berfokus pada kebersihan lingkungan fisik, gerakan ini juga mengintegrasikan sistem bank sampah mandiri dan pemanfaatan air untuk urban farming di sempadan. Hasilnya, tercipta siklus ekologis dan ekonomi yang menopang kesejahteraan warga secara berkelanjutan.
        </p>

        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <span>KATEGORI: HUMAN INTEREST & COMMUNITY ACTION</span>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition text-slate-700">
              <Share2 className="w-3.5 h-3.5" />
              <span>Bagikan Kisah</span>
            </button>
          </div>
        </div>
      </article>

      {/* Kolom Sidebar Samping (Kanan) */}
      <aside className="lg:col-span-4 space-y-6">
        {/* Kotak Dokumen Terkait */}
        <div className="p-6 bg-white border border-slate-900/10 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-emerald-800 font-semibold block">
            Dokumen & Catatan Terkait
          </span>
          <h4 className="font-semibold text-slate-900 text-base">
            Unduh Laporan Lengkap Esei & Dokumentasi
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dapatkan transkrip wawancara penuh dan galeri foto resolusi tinggi dalam bentuk dokumen PDF.
          </p>
          <a
            href="#"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-emerald-800 text-white font-medium text-xs font-mono rounded-lg transition duration-200 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Laporan PDF (4.5 MB)</span>
          </a>
        </div>

        {/* Kotak Galeri Lapangan Ringkas */}
        <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-xl space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-700 font-semibold">
            <Camera className="w-4 h-4 text-emerald-700" />
            <span>Dokumentasi Visual Lapangan</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-24 bg-slate-200 rounded-lg flex items-center justify-center text-[10px] font-mono text-slate-500 border border-slate-300">
              [Foto 01 - Warga]
            </div>
            <div className="h-24 bg-slate-200 rounded-lg flex items-center justify-center text-[10px] font-mono text-slate-500 border border-slate-300">
              [Foto 02 - Sungai]
            </div>
          </div>
          <p className="text-[11px] font-mono text-slate-500 leading-relaxed">
            Arsip visual koridor DAS Winongo oleh Tim Dokumentasi Visual Living Lab UAJY.
          </p>
        </div>
      </aside>
    </div>
  );
};