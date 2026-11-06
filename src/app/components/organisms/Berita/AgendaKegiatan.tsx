import React from 'react';

export const AgendaKegiatan = ({ subsection = false }: { subsection?: boolean }) => {
  const agendaData = [
    {
      day: "28", month: "FEB", year: "2025",
      title: "Rembuk Akbar Pegiat Tiga Sungai: Evaluasi Indeks Kerapuhan Sempadan Musim Hujan",
      category: "Kolaborasi Sains Warga · Bantara Code",
      time: "08:00 - 12:00 WIB",
      location: "Pendopo Kraton Kilen Code, Tirtomulyo",
      quota: "KUOTA: 80 PESERTA"
    },
    {
      day: "07", month: "MAR", year: "2025",
      title: "Lokakarya Perancangan & Kalibrasi Sensor Telemetri Aliran Mandiri",
      category: "Workshop Sains Lapangan · Fasilitas Teknologi Industri",
      time: "09:00 - 15:00 WIB",
      location: "Laboratorium Komputer & IoT UAJY, Kampus Babarsari",
      quota: "KUOTA: 25 PESERTA"
    },
    {
      day: "15", month: "MAR", year: "2025",
      title: "Aksi Tanam 500 Bibit Gayaman & Bambu Petung: Restorasi Sempadan Rawan Longsor",
      category: "Area Forestry · Sempadan Winongo",
      time: "06:30 - 11:00 WIB",
      location: "Bantaran Winongo, Kalasan, Bantul (Titik Kumpul Sanga Pituwa)",
      quota: "TERBUKA UNTUK RELAWAN"
    }
  ];

  return (
    <section
      className={
        subsection
          ? "mt-10 border-t border-[#e5ebe4] pt-8"
          : "py-20 bg-[#f4f5f3] border-t border-gray-200"
      }
    >
      <div className={subsection ? "" : "container mx-auto px-4 lg:px-8 max-w-7xl"}>
        
        {!subsection && <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="block mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Agenda & Aksi</span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#0f1713]">Agenda & Kegiatan Terjadwal</h2>
          </div>
          <p className="text-gray-500 text-sm max-w-md text-left md:text-right">
            Terbuka untuk akademisi, relawan mahasiswa, masyarakat umum, dan komunitas peduli sungai di Yogyakarta.
          </p>
        </div>}

        <div className="flex flex-col gap-6">
          {agendaData.map((agenda, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-sm p-6 flex flex-col md:flex-row gap-6 items-start md:items-center hover:shadow-md transition-shadow">
              
              {/* Date Box */}
              <div className="flex flex-col items-center justify-center bg-[#0f1713] text-white w-20 h-20 rounded-sm flex-shrink-0">
                <span className="text-2xl font-bold leading-none">{agenda.day}</span>
                <span className="text-[10px] tracking-wider text-gray-400 tabular-nums">{agenda.month} {agenda.year}</span>
              </div>

              {/* Content */}
              <div className="flex-grow flex flex-col gap-2">
                <span className="text-xs text-teal-700">{agenda.category}</span>
                <h3 className="text-lg font-semibold text-[#0f1713]">{agenda.title}</h3>
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">🕒 {agenda.time}</span>
                  <span className="flex items-center gap-1">📍 {agenda.location}</span>
                  <span className="flex items-center gap-1 font-semibold text-[#0f1713]">👤 {agenda.quota}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                <button className="w-full md:w-auto bg-white border border-teal-600 text-teal-700 px-6 py-3 rounded-sm text-xs font-semibold hover:bg-teal-50 transition-colors">
                  DAFTAR KEGIATAN
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};