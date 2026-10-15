import React from 'react';

export const FormKontak = () => {
  return (
    <section className="py-24 bg-[#0a192f] text-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="text-[10px] font-mono text-teal-400 tracking-widest block mb-3">[ SEKSI 04 // KONTAK & SEKRETARIAT ]</span>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">MULAI INISIATIF BERSAMA KAMI</h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Sampaikan ide kemitraan, permohonan magang, proposal riset, atau ajakan diskusi lapangan. Tim koordinasi Living Lab Sungai Yogyakarta akan segera merespons.
              </p>
            </div>

            <div className="flex flex-col gap-6 mt-4">
              <div>
                <span className="text-[10px] font-mono text-gray-500 block mb-1">SUREL RESMI SEKRETARIAT</span>
                <a href="mailto:sekretariat@livinglabsungai.ac.id" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
                  sekretariat@livinglabsungai.ac.id
                </a>
              </div>
              <div>
                <span className="text-[10px] font-mono text-gray-500 block mb-1">PIKET RISET & LABORATORIUM</span>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Gedung Thomas Aquinas Lantai 3, Kampus 1 Universitas Atma Jaya Yogyakarta.<br />
                  Jl. Babarsari No. 44, Caturtunggal, Depok, Sleman, D.I. Yogyakarta 55281
                </p>
              </div>
              <div className="flex gap-12">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 block mb-1">TELEPON KANTOR</span>
                  <span className="text-sm text-gray-300">+62 (274) 487711</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 block mb-1">JAM LAYANAN</span>
                  <span className="text-sm text-gray-300">08:30 - 16:00 WIB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/5 border border-white/10 rounded-sm p-8">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="nama" className="text-[10px] font-mono text-gray-400 uppercase">Nama Lengkap / Kontak *</label>
                  <input type="text" id="nama" className="bg-transparent border border-gray-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-teal-500 transition-colors text-sm" placeholder="Dr. Bambang Sudarmo / Instansi" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] font-mono text-gray-400 uppercase">Alamat Email *</label>
                  <input type="email" id="email" className="bg-transparent border border-gray-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-teal-500 transition-colors text-sm" placeholder="nama@institusi.ac.id" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="institusi" className="text-[10px] font-mono text-gray-400 uppercase">Institusi / Komunitas</label>
                  <input type="text" id="institusi" className="bg-transparent border border-gray-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-teal-500 transition-colors text-sm" placeholder="Nama Organisasi / Komunitas" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="jalur" className="text-[10px] font-mono text-gray-400 uppercase">Jalur Kolaborasi *</label>
                  <select id="jalur" className="bg-transparent border border-gray-700 text-gray-300 px-4 py-3 rounded-sm focus:outline-none focus:border-teal-500 transition-colors text-sm appearance-none">
                    <option value="">Pilih Jalur Kolaborasi</option>
                    <option value="mitra">01. Menjadi Mitra Strategis (Partner)</option>
                    <option value="relawan">02. Relawan Ekspedisi & Sains Warga</option>
                    <option value="magang">03. Magang Riset Lapangan (Internship)</option>
                    <option value="riset">04. Kolaborasi Riset & Hibah Ilmiah</option>
                    <option value="komunitas">05. Integrasi Jejaring Komunitas</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="pesan" className="text-[10px] font-mono text-gray-400 uppercase">Pesan atau Deskripsi Rencana Kerja Sama *</label>
                  <textarea id="pesan" rows={4} className="bg-transparent border border-gray-700 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-teal-500 transition-colors text-sm resize-none" placeholder="Jelaskan secara singkat fokus program, kapasitas waktu, atau inisiatif yang ingin Anda rencanakan bersama Living Lab."></textarea>
                </div>

                <div className="md:col-span-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-2">
                  <p className="text-[10px] text-gray-500 italic max-w-sm">
                    Semua data dikirimkan kode etik riset Universitas Atma Jaya Yogyakarta.
                  </p>
                  <button type="submit" className="bg-teal-600 text-white px-8 py-3 rounded-sm font-semibold text-sm hover:bg-teal-700 transition-colors w-full md:w-auto">
                    KIRIM PESAN
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};