import React from 'react';
import { ArrowRight, Mic, Send } from 'lucide-react';

export const KisahPenjagaSungai: React.FC = () => {
  return (
    <section className="w-full bg-[#fcfdfd] py-12 font-sans text-slate-800 antialiased">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        
      
        <div className="mb-10 max-w-3xl">
          <span className="text-xs font-bold text-[#1b7a43] tracking-wider uppercase block mb-2 select-none">
            SEJARAH LISAN &amp; NARASI KEMANUSIAAN
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[36px] font-extrabold text-[#0B1E33] tracking-tight leading-snug mb-3">
            Kisah &amp; Penjaga Sungai Yogyakarta
          </h2>
          <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
            Cerita personal, ingatan warga bantaran, dan catatan lapangan dari mereka yang hidup berdampingan dengan sungai-sungai Yogyakarta.
          </p>
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          <div className="lg:col-span-7 bg-white rounded-[24px] border border-slate-200/80 shadow-sm overflow-hidden flex flex-col h-full">
            
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop"
                alt="Pak Mulyono"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#168a48] text-white w-fit mb-3">
                  Sosok Penjaga Sungai
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight pr-4">
                  Pak Mulyono: Empat Dekade Merawat Rumpun Bambu Kali Gajahwong
                </h3>
              </div>
            </div>

            {/* Konten Teks Bawah Hero */}
            <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between gap-6">
              <div className="space-y-4">
                <div className="border-l-[3px] border-[#168a48] pl-4 py-0.5">
                  <p className="text-slate-700 text-sm sm:text-[15px] italic leading-relaxed font-medium">
                    “Sungai bukanlah halaman belakang tempat membuang kotoran; sungai adalah teras depan tempat leluhur dan anak cucu kita bercengkerama.”
                  </p>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Tinggal di bantaran Giwangan dekat Kotagede, Pak Mulyono telah menyaksikan metamorfosis sungai. Dalam arsip lisan ini ia menceritakan teknik pelindung tebing dengan bambu petung dan bagaimana mahasiswa teknik sipil UAJY belajar dari kearifan struktur pasangan batu tradisional.
                </p>
              </div>

              {/* Action Bar Bawah */}
              <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f8fafc] border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <Mic className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0B1E33]">Direkam oleh Tim Etno-Ekologi UAJY</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Audio arsip • 18 menit</p>
                  </div>
                </div>

                <a
                  href="#kisah"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0B1E33] hover:bg-slate-900 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <span>Baca Kisah Lengkap</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        
          <div className="lg:col-span-5 flex flex-col justify-between gap-5 h-full">
            

            <div className="bg-white rounded-[24px] p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-row gap-4 items-start group hover:border-slate-300 transition-all">
             
              <div className="w-28 h-20 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop"
                  alt="Kali Code"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="flex-1 flex flex-col h-full min-w-0 justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#1b7a43] uppercase tracking-wider block mb-1.5">
                    CATATAN LAPANGAN
                  </span>
                  <h4 className="text-sm font-bold text-[#0B1E33] leading-snug group-hover:text-[#1b7a43] transition-colors mb-2 line-clamp-2">
                    Menyusuri Kabut Pagi di Sepanjang Aliran Kali Code
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">
                    Mendokumentasikan siklus iklim mikro, kelembaban, dan denyut kehidupan warga bantaran yang terbangun...
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3">
                  <span className="font-medium">15 Nov 2024 • 4 mnt baca</span>
                  <a href="#baca" className="text-slate-800 hover:text-[#1b7a43] font-bold inline-flex items-center gap-1">
                    Baca <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-row gap-4 items-start group hover:border-slate-300 transition-all">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop"
                  alt="Penganyam Bambu"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              <div className="flex-1 flex flex-col h-full min-w-0 justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#1b7a43] uppercase tracking-wider block mb-1.5">
                    PENGHIDUPAN WARGA
                  </span>
                  <h4 className="text-sm font-bold text-[#0B1E33] leading-snug group-hover:text-[#1b7a43] transition-colors mb-2 line-clamp-2">
                    Perempuan Penganyam Bambu dan Ekonomi Mandiri Karanganyar
                  </h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">
                    Pemanfaatan material ramah lingkungan dan pertanian organik bantaran sungai dalam membangun...
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3">
                  <span className="font-medium">28 Okt 2024 • 6 mnt baca</span>
                  <a href="#baca" className="text-slate-800 hover:text-[#1b7a43] font-bold inline-flex items-center gap-1">
                    Baca <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#eff3fe] border border-[#e0e7ff] rounded-[24px] p-5 sm:p-6 flex flex-row items-center justify-between gap-4 shadow-sm shrink-0">
              <div className="flex items-start gap-3">
                <div className="text-[#1b7a43] mt-0.5 shrink-0 bg-white p-1.5 rounded-lg shadow-xs">
                  <Send className="w-4 h-4 -rotate-45 stroke-[2.5]" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-[#0B1E33] mb-0.5">
                    Punya cerita atau ingatan tentang sungai?
                  </h5>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Kirimkan kenangan dan foto bersejarah Anda ke repositori arsip partisipatif kami.
                  </p>
                </div>
              </div>

              <a
                href="#kirim"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b7a43] hover:text-[#115e33] transition-colors shrink-0 group/send"
              >
                <span>Kirim Kisah Anda</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/send:translate-x-1 stroke-[2.5]" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default KisahPenjagaSungai;