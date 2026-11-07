// Data bawaan (sama dengan isi situs sebelum dikelola dari dashboard).
// Dipakai sebagai cadangan jika Supabase belum bisa dibaca, dan sebagai isi awal migrasi SQL.
import type { BlockData, ContentItem } from "@/lib/content-schema";

export const DEFAULT_COLLECTIONS: Record<string, ContentItem[]> = {
  "team": [
    {
      "id": "team-1",
      "name": "Dr. Ir. Budi Santoso, M.Eng.",
      "role": "Ketua Tim Riset",
      "group": "Akademisi UAJY",
      "badge": "Lab Code",
      "icon": "💧",
      "title": "Dosen Teknik Lingkungan UAJY • Spesialis Hidrodinamika",
      "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
      "quote": "Laboratorium sejati bukan berada di dalam ruang tertutup kampus, melainkan di bentaran kali dan obrolan warga.",
      "focusValue": "Hidrologi Urban & Tata Kelola DAS"
    },
    {
      "id": "team-2",
      "name": "Sekar Ayu Prabawati, S.Si., M.Sc.",
      "role": "Koordinator Ekologi",
      "group": "Akademisi UAJY",
      "badge": "Eco-Lab",
      "icon": "🔬",
      "title": "Peneliti Biologi Perairan UAJY • Bioindikator Makrobentos",
      "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
      "quote": "Setiap mikroorganisme di aliran sungai adalah indikator kejujuran peradaban kota kita.",
      "focusValue": "Bio-indikator Bentik & Kimia Sungai"
    },
    {
      "id": "team-3",
      "name": "FX. Bambang Hendro",
      "role": "Koordinator Lapangan",
      "group": "Akar Rumput",
      "badge": "Paguyuban Code",
      "icon": "🤝",
      "title": "Tokoh Paguyuban Pemerti Kali Code • Relawan Bencana DAS",
      "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
      "quote": "Sungai bukan tempat membuang masa lalu, melainkan halaman depan masa depan anak cucu kami.",
      "focusValue": "Aksi Relawan & Edukasi Warga"
    },
    {
      "id": "team-4",
      "name": "Maria Dwi Lestari, S.T.",
      "role": "Spesialis IoT & Sains Warga",
      "group": "Akademisi UAJY",
      "badge": "Telemetri IoT",
      "icon": "📡",
      "title": "Peneliti Sains Komputasi DIY • Pegiat Open Hardware",
      "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
      "quote": "Teknologi sensor hanya bermakna jika datanya dipahami dan dijaga bersama oleh warga yang tinggal di tepiannya.",
      "focusValue": "Telemetri LoRaWAN & Open Hardware"
    },
    {
      "id": "team-5",
      "name": "Danang Wijayanto",
      "role": "Inisiator Konservasi",
      "group": "Akar Rumput",
      "badge": "Konservasi Winongo",
      "icon": "🌿",
      "title": "Inisiator FKWA Winongo Asri • Penggiat Ekoparian",
      "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      "quote": "Mungkur kali dadi madhep kali: ketika sungai dihormati, bencana luapan berubah menjadi anugerah kehidupan.",
      "focusValue": "Ruang Terbuka Hijau & Ekowisata"
    },
    {
      "id": "team-6",
      "name": "Nurul Hidayati, M.P.W.K.",
      "role": "Perencana Tata Ruang",
      "group": "Akademisi UAJY",
      "badge": "Spasial & Kebijakan",
      "icon": "📐",
      "title": "Dosen Perencanaan Wilayah Kota UAJY • Analis Spasial",
      "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
      "quote": "Mengintegrasikan kearifan lokal bantara ke dalam rencana tata ruang kota adalah wujud keadilan spasial.",
      "focusValue": "Kebijakan Sempadan & Mitigasi Banjir"
    }
  ],
  "stories": [
    {
      "id": "story-1",
      "title": "Perempuan Penjaga Titik Air: Ketangguhan Ibu-Ibu Bantaran Winongo Merawat Aliran Kehidupan",
      "slug": "perempuan-penjaga-titik-air",
      "category": "People of the River",
      "date": "Okt 2026",
      "authorOrFigure": "Ibu Siti Aminah & Komunitas Perempuan Bantaran",
      "location": "Koridor DAS Winongo, Yogyakarta",
      "readTimeOrMedia": "6 Menit Baca / Video",
      "abstract": "Bagaimana gerakan kolektif para ibu di tepian sungai mengubah stigma halaman belakang rumah yang kotor menjadi ruang publik hijau dan pusat ekonomi sirkular warga.",
      "body": "Perubahan ekosistem di sepanjang koridor sungai perkotaan Yogyakarta tidak pernah sekadar soal angka kualitas air atau fisik tanggul beton. Di balik setiap aliran air yang melalui permukiman padat, terdapat denyut kehidupan sosial yang digerakkan oleh tangan-tangan warga, terutama para ibu dan komunitas lokal yang menjadikan bantaran sebagai halaman depan kehidupan mereka.\n\n## Transformasi Halaman Belakang Menjadi Ruang Publik Hijau\n\nSelama bertahun-tahun, bagian belakang rumah yang menghadap langsung ke sungai kerap diperlakukan sebagai tempat pembuangan akhir informal. Namun, melalui inisiatif kolaboratif bersama Living Lab Sungai Yogyakarta, paradigma tersebut berbalik secara perlahan namun konsisten.\n\n> Sungai bukan lagi batas belakang yang kotor, melainkan teras depan tempat kita menyambut masa depan bersama.\n\n## Gerakan Kolektif & Ekonomi Sirkular Warga\n\nTidak hanya berfokus pada kebersihan lingkungan fisik, gerakan ini juga mengintegrasikan sistem bank sampah mandiri dan pemanfaatan air untuk urban farming di sempadan. Hasilnya, tercipta siklus ekologis dan ekonomi yang menopang kesejahteraan warga secara berkelanjutan."
    },
    {
      "id": "story-2",
      "title": "Bank Sampah Muja Muju: Dari Timbulan Plastik Menjadi Kolektif Ekonomi Warga",
      "slug": "bank-sampah-muja-muju",
      "category": "Community Stories",
      "date": "Sep 2026",
      "authorOrFigure": "Pengurus Bank Sampah Mandiri",
      "location": "Bantaran Sungai Gajahwong",
      "readTimeOrMedia": "5 Menit Baca",
      "abstract": "Transformasi pengelolaan sampah mandiri yang tidak hanya membersihkan aliran sungai tetapi juga menggerakkan tabungan pendidikan anak-anak warga sekitar.",
      "body": ""
    },
    {
      "id": "story-3",
      "title": "Catatan Lapangan: Mengukur Kualitas Air Bersama Petani Urban Pertanian Organik Tepi Sungai",
      "slug": "catatan-lapangan-petani-urban",
      "category": "Field Notes",
      "date": "Agu 2026",
      "authorOrFigure": "Tim Riset Lapangan Living Lab UAJY",
      "location": "Gapoktan Sempadan Code",
      "readTimeOrMedia": "8 Menit Baca",
      "abstract": "Catatan harian peneliti mengenai pemanfaatan air irigasi sempadan dan tantangan adaptasi petani terhadap fluktuasi debit air musim kemarau.",
      "body": ""
    },
    {
      "id": "story-4",
      "title": "Esei Foto: Wajah-Wajah di Balik Pelestarian Titik Nol Aliran Sungai Code",
      "slug": "esei-foto-titik-nol-code",
      "category": "Photo Essay",
      "date": "Jul 2026",
      "authorOrFigure": "Dokumentasi Visual Living Lab",
      "location": "Koridor Code Tengah",
      "readTimeOrMedia": "12 Foto",
      "abstract": "Kumpulan potret hitam-putih dan berwarna yang merekam dinamika keseharian para penggerak komunitas, anak-anak, dan relawan di bantaran sungai.",
      "body": ""
    },
    {
      "id": "story-5",
      "title": "Menelusuri Riwayat Sempadan: Menjaga Keseimbangan Ekologis di Tengah Padatnya Kota",
      "slug": "menelusuri-riwayat-sempadan",
      "category": "River Stories",
      "date": "Jun 2026",
      "authorOrFigure": "Divisi Kajian & Sejarah DAS",
      "location": "Kawasan Perkotaan Yogyakarta",
      "readTimeOrMedia": "7 Menit Baca",
      "abstract": "Refleksi historis mengenai perubahan tata guna lahan di sepanjang aliran sungai utama Yogyakarta dan upaya pemulihan fungsi sempadan.",
      "body": ""
    },
    {
      "id": "story-6",
      "title": "Dokumenter Mini: Suara dari Tepian — Dokumentasi Kehidupan, Harapan, dan Aksi Warga",
      "slug": "dokumenter-mini-suara-dari-tepian",
      "category": "Mini Documentary",
      "date": "Mei 2026",
      "authorOrFigure": "Tim Media & Sinema Living Lab UAJY",
      "location": "DAS Winongo, Code, & Gajahwong",
      "readTimeOrMedia": "15 Menit Tonton",
      "abstract": "Tayangan visual berdurasi 15 menit yang merangkum suara hati warga bantaran, anak-anak, dan para relawan dalam merawat masa depan sungai.",
      "body": ""
    }
  ],
  "publications": [
    {
      "id": "pub-1",
      "title": "Strategi Pengendalian Beban Pencemaran Mikroplastik dan Limbah Domestik DAS",
      "type": "Policy Brief",
      "date": "Sep 2026",
      "authors": [
        "Tim Peneliti Living-Lab",
        "Aliansi Warga Bantaran",
        "PSL UAJY"
      ],
      "institution": "Universitas Atma Jaya Yogyakarta",
      "abstract": "Analisis rekomendasi kebijakan untuk pemerintah daerah mengenai integrasi regulasi sempadan sungai, penegakan baku mutu air, dan insentif pemilahan sampah organik rumah tangga.",
      "doi": "10.1016/policy.2026.09",
      "fileSize": "4.2 MB",
      "downloadUrl": ""
    },
    {
      "id": "pub-2",
      "title": "Biomonitoring Bentos Makroinvertebrata Sebagai Bioindikator Kualitas Air Sungai",
      "type": "Jurnal Riset",
      "date": "Jul 2026",
      "authors": [
        "Dr. Hendra W.",
        "Siti Nur A.",
        "Lab Terpadu Teknik Sipil"
      ],
      "institution": "Jurnal Pengelolaan Sumberdaya Alam",
      "abstract": "Studi komparasi antara indeks biotik famili makroinvertebrata dengan parameter kimiawi (BOD, COD, DO) di 14 titik sampling hulu hingga hilir sungai.",
      "doi": "10.1016/j.aquat.2026.04",
      "fileSize": "8.1 MB",
      "downloadUrl": ""
    },
    {
      "id": "pub-3",
      "title": "Model Partisipatif: Transformasi Sensor Kualitas Air IoT oleh Komunitas Tepi Sungai",
      "type": "Artikel Ilmiah",
      "date": "Mei 2026",
      "authors": [
        "Hardiek Tatendra",
        "Grup Riset Sistem Tertanam",
        "Forum Kali"
      ],
      "institution": "Prosiding Konferensi Rekayasa Komputasi & Lingkungan",
      "abstract": "Evaluasi akurasi dan ketahanan sensor open-source telemetri kualitas air berbasis mikrokontroler murah yang dipelihara secara kolektif oleh warga bantaran.",
      "doi": "",
      "fileSize": "2.8 MB",
      "downloadUrl": ""
    }
  ],
  "datasets": [
    {
      "id": "data-1",
      "title": "Rekapitulasi Kualitas Air Sungai (pH, DO, BOD, COD, TDS) di 14 Titik Pantau",
      "category": "Uji Laboratorium",
      "date": "Sep 2026",
      "location": "Hulu hingga Hilir Sungai Yogyakarta",
      "institution": "Laboratorium Teknik Sipil & Lingkungan UAJY",
      "description": "Kumpulan data hasil pengujian sampel air bulanan untuk memantau tingkat kebersihan sungai dan beban pencemaran limbah domestik.",
      "format": "Excel (XLSX)",
      "fileSize": "2.4 MB",
      "downloadUrl": ""
    },
    {
      "id": "data-2",
      "title": "Catatan Pemantauan Harian Kejernihan Air, Suhu, dan Kondisi Cuaca oleh Warga",
      "category": "Pemantauan Lapangan",
      "date": "Jul 2026",
      "location": "Koridor Bantaran Sungai",
      "institution": "Komunitas Warga & Tim Living Lab",
      "description": "Arsip pencatatan rutin yang dilakukan bersama warga tepi sungai sebagai dasar peringatan dini perubahan kualitas air.",
      "format": "CSV / Excel",
      "fileSize": "3.1 MB",
      "downloadUrl": ""
    },
    {
      "id": "data-3",
      "title": "Data Sebaran Titik Mata Air, Ruang Terbuka Hijau, dan Timbulan Sampah Sempadan",
      "category": "Peta & Spasial",
      "date": "Mei 2026",
      "location": "Kawasan Sempadan Sungai",
      "institution": "Pusat Studi Lingkungan UAJY",
      "description": "Data titik koordinat dan peta area sempadan sungai untuk mendukung perencanaan tata ruang dan konservasi ekologis.",
      "format": "GeoJSON / Peta",
      "fileSize": "5.8 MB",
      "downloadUrl": ""
    }
  ],
  "modules": [
    {
      "id": "mod-1",
      "title": "Panduan Menilai Kesehatan Sungai Melalui Pengamatan Biota Air (Biomonitoring)",
      "category": "Panduan Praktik",
      "date": "Agu 2026",
      "authors": [
        "Tim Edukasi Living-Lab",
        "Komunitas Sekolah Sungai"
      ],
      "audience": "Warga, Pelajar & Relawan",
      "description": "Buku panduan praktis mengenali jenis serangga dan biota dasar sungai sebagai indikator alami kebersihan air tanpa menggunakan alat kimia yang rumit.",
      "highlights": [
        "Cara mengambil sampel biota di tepian sungai secara aman",
        "Lembar bergambar pengenalan biota air bersih vs tercemar",
        "Langkah menyimpulkan status kesehatan sungai bersama warga"
      ],
      "pages": "36 Halaman",
      "fileSize": "5.2 MB",
      "downloadUrl": ""
    },
    {
      "id": "mod-2",
      "title": "Buku Saku Pengelolaan Sampah Rumah Tangga & Limbah Cair di Kawasan Bantaran",
      "category": "Buku Saku",
      "date": "Jun 2026",
      "authors": [
        "PSL UAJY",
        "Aliansi Warga Bantaran"
      ],
      "audience": "Keluarga & Pengurus RT/RW",
      "description": "Langkah sederhana memilah sampah organik rumah tangga dan membuat saringan air limbah cucian sederhana agar tidak mencemari aliran sungai.",
      "highlights": [
        "Pembuatan kompos rumahan dari sisa dapur",
        "Desain bak saring air cucian dengan tanaman lokal",
        "Panduan kerja bakti pembersihan sempadan sungai"
      ],
      "pages": "24 Halaman",
      "fileSize": "3.8 MB",
      "downloadUrl": ""
    },
    {
      "id": "mod-3",
      "title": "Poster Edukasi: Mengenal Ekosistem Sungai Yogyakarta & Cara Menjaganya",
      "category": "Infografis",
      "date": "Apr 2026",
      "authors": [
        "Tim Desain Komunikasi & Lingkungan UAJY"
      ],
      "audience": "Sekolah & Ruang Publik Warga",
      "description": "Rangkaian poster visual ukuran cetak A3 yang menjelaskan fungsi sempadan sungai, bahaya sampah plastik, serta peran vegetasi tepi sungai.",
      "highlights": [
        "Ilustrasi rantai makanan ekosistem sungai",
        "Dampak mikroplastik bagi kesehatan lingkungan",
        "Daftar tanaman lokal penahan erosi tebing sungai"
      ],
      "pages": "6 Poster",
      "fileSize": "7.4 MB",
      "downloadUrl": ""
    }
  ],
  "roadmap": [
    {
      "id": "phase-1",
      "phaseTag": "Fase 1: Inisiasi & Baseline",
      "year": "2023",
      "status": "Fase Selesai",
      "dateRange": "Q1 2023 — Q4 2023",
      "title": "Fondasi Konsortium Pentahelix & Audit Awal Kualitas Tiga Sungai",
      "desc": "Pembentukan konsortium pentahelix awal yang mempertemukan akademisi UAJY, komunitas Paguyuban Kali/ngga, pemerintah Kota Yogyakarta, dan kelompok swadaya. Menetapkan modul sains warga terapan, telemetri hidrologi, dan pemetaan spasial partisipatif.",
      "tags": [
        "Fokus Utama: Pemetaan Spasial 15 Pos",
        "Uji Makrobentos",
        "Konsolidasi Tokoh Bantara"
      ],
      "outputName": "Modul Standardisasi & Piagam Kolaborasi",
      "outputDesc": "Dokumen resmi kesepakatan 12 komunitas bantaran dan naskah metodologi sampling air baku terstandardisasi.",
      "outputFooter": "15 Pos Terverifikasi · 100% Selesai",
      "progressLabel": "",
      "progressValue": "",
      "progressPercent": null
    },
    {
      "id": "phase-2",
      "phaseTag": "Fase 2: Lab Uji-Coba & IoT",
      "year": "2024",
      "status": "Sedang Berjalan",
      "dateRange": "Q1 2024 — Q4 2024",
      "title": "Penerapan Sensor Nirkabel Komunal & Inkubasi Sains Bantara",
      "desc": "Deploy pilot sensor IoT kualitas air nirkabel berbasis LoRaWAN, perakitan purwarupa sistem pengolahan limbah cair domestik (IPAL) skala komunal di Terban (Code) dan Suryowijayan (Winongo), serta pengenalan kurikulum sains warga bagi generasi muda sekolah bantara.",
      "tags": [
        "Implementasi Lapangan",
        "Gateway LoRaWAN Mergi-Code",
        "Bio-Filter Bambu Komunal"
      ],
      "outputName": "Inkubasi Teknologi & Jaringan Telemetri LoRaWAN",
      "outputDesc": "Sensor telemetri real-time dengan update berkala tiap 15 menit ke dashboard pemantau publik.",
      "outputFooter": "Protokol: LoRaWAN AS923-1",
      "progressLabel": "Target Instalasi Node Sensor (24 Unit)",
      "progressValue": "16 / 24 Terpasang (66.7%)",
      "progressPercent": 66.7
    },
    {
      "id": "phase-3",
      "phaseTag": "Fase 3: Integrasi & Scale-Up",
      "year": "2025",
      "status": "Rencana Mendatang",
      "dateRange": "Q1 2025 — Q4 2025",
      "title": "Portal Keterbukaan Data Terpadu & Koridor Ekowisata Bantara",
      "desc": "Peluncuran portal keterbukaan data terpadu se-DIY untuk akses publik, akademisi, dan pembuat kebijakan. Penguatan koridor ekowisata bantaran sungai mandiri berbasis kelola warga, serta standardisasi replikasi metodologi living lab untuk DAS regional di luar lingkup Yogyakarta.",
      "tags": [
        "Target Utama: Open API Kualitas Air",
        "3 Rute Ekowisata Edukasi",
        "Policy Brief Pemda DIY"
      ],
      "outputName": "Portal Terbuka & Replikasi Wilayah DAS",
      "outputDesc": "Infrastruktur repositori data terbuka terintegrasi dan buku panduan replikasi living lab skala wilayah DAS.",
      "outputFooter": "Replikasi Wilayah: Sungai, Progo, & Opak",
      "progressLabel": "",
      "progressValue": "",
      "progressPercent": null
    },
    {
      "id": "phase-4",
      "phaseTag": "Fase 4: Regenerasi Mandiri",
      "year": "2026+",
      "status": "Visi Masa Depan",
      "dateRange": "Jangka Panjang 2026 — 2030",
      "title": "Kemandirian Komunitas Bantara & Standar Mutu Air Kelas II",
      "desc": "Tercapainya kemandirian tata kelola komunitas bantara tanpa ketergantungan intervensi eksternal penuh. Peningkatan mutu air konsisten ke standar Kelas II Nasional (rekreasi air & budidaya tawar), serta terbangunnya ketahanan iklim mikro perkotaan Yogyakarta menghadapi risiko banjir lahar dan curah ekstrem.",
      "tags": [
        "Sasaran Strategis: BOD < 3 mg/L",
        "Dana Abadi Konservasi Warga",
        "Zero Direct Waste Inflow"
      ],
      "outputName": "Kemandirian Paguyuban & Mutu Air Berkelanjutan",
      "outputDesc": "Lembaga otonom bantara tersertifikasi, ekosistem sungai hidup, dan ketahanan ekologis lestari lintas generasi.",
      "outputFooter": "Target Baku Mutu: Kelas II PP 22/2021",
      "progressLabel": "",
      "progressValue": "",
      "progressPercent": null
    }
  ],
  "missions": [
    {
      "id": "misi-1",
      "title": "Memfasilitasi Riset Kolaboratif & Inovasi Teknologi",
      "desc": "Memadukan riset multidisiplin dan pengujian teknologi tepat guna berbasis sains warga, melibatkan akademisi, praktisi, dan komunitas. Mencakup purwarupa sensor nirkabel kualitas air, pemodelan hidrologi mikro, serta pemantauan vegetasi riparian endemik untuk bioremediasi alami.",
      "tags": [
        "Sensor IoT Mandiri",
        "Fitoremediasi Riparian",
        "Audit Morfologi Sungai"
      ]
    },
    {
      "id": "misi-2",
      "title": "Memberdayakan Komunitas Berbasis Sirkular",
      "desc": "Mengembangkan kapasitas warga bantaran sungai melalui edukasi kepedulian air, tata kelola sampah partisipatif, serta pengembangan ekonomi sirkular lokal. Mewujudkan posko pemilahan organik-anorganik bantara mandiri, pembuatan kompos fermentasi air kali, dan lokakarya daur plastik mikro.",
      "tags": [
        "Bank Sampah Bantara",
        "Sanitasi Komunal Berkelanjutan",
        "Sekolah Sungai Mandiri"
      ]
    },
    {
      "id": "misi-3",
      "title": "Menyediakan Data Terbuka & Transparan",
      "desc": "Membangun repositori data terbuka pemantauan kualitas air dan indeks ekologis sungai secara real-time untuk penguatan sains warga (citizen science). Siapa pun, mulai dari pelajar SD hingga peneliti doktoral, dapat mengunduh raw telemetry pH, DO, BOD, serta status debit kali tanpa dinding berbayar.",
      "tags": [
        "Open API Hidrologi",
        "Indeks Makroinvertebrata",
        "Peta Spasial Risiko Banjir"
      ]
    },
    {
      "id": "misi-4",
      "title": "Akselerasi Tata Kelola & Kebijakan Publik",
      "desc": "Mengakselerasi terwujudnya tata kelola sungai partisipatif dan kebijakan publik terpadu bersama pemangku kebijakan di tingkat Penda DIY maupun Kota/Kabupaten. Menyelenggarakan forum musyawarah bantara reguler dan penyusunan kertas kebijakan (policy brief) protokol sempadan sungai.",
      "tags": [
        "Policy Brief Semesteran",
        "Konsultasi Publik AMDAL",
        "Harmonisasi Perda Sempadan"
      ]
    }
  ],
  "targets": [
    {
      "id": "target-1",
      "value": "24",
      "label": "Stasiun Pantau",
      "desc": "Titik Aksi",
      "sub": "Sensor telemetri terintegrasi di DAS Code, Winongo, & Gajahwong"
    },
    {
      "id": "target-2",
      "value": "1.200+",
      "label": "Relawan Sains Warga",
      "desc": "Warga Terlatih",
      "sub": "Kader sampling air dan mitigasi darurat tingkat RW/Kalurahan."
    },
    {
      "id": "target-3",
      "value": "12",
      "label": "Kertas Kebijakan",
      "desc": "Naskah Akademik",
      "sub": "Diserahkan kepada Bappeda DIY dan Balai Besar Wilayah Sungai."
    },
    {
      "id": "target-4",
      "value": "+35%",
      "label": "Indeks Kesehatan Kali",
      "desc": "Kemajuan Mutu",
      "sub": "Target reduksi beban limbah cair domestik & sampah makro terhanyut."
    }
  ],
  "partners": [
    {
      "id": "lembaga-1",
      "name": "SHIND",
      "kind": "Lembaga",
      "logo": ""
    },
    {
      "id": "lembaga-2",
      "name": "SGH",
      "kind": "Lembaga",
      "logo": ""
    },
    {
      "id": "lembaga-3",
      "name": "DLH DIY",
      "kind": "Lembaga",
      "logo": ""
    },
    {
      "id": "lembaga-4",
      "name": "KLHK RI",
      "kind": "Lembaga",
      "logo": ""
    },
    {
      "id": "lembaga-5",
      "name": "AQUA",
      "kind": "Lembaga",
      "logo": ""
    },
    {
      "id": "komunitas-1",
      "name": "FKWA (Forum Komunitas Winongo Asri)",
      "kind": "Komunitas",
      "logo": ""
    },
    {
      "id": "komunitas-2",
      "name": "Pemerti Kali Code",
      "kind": "Komunitas",
      "logo": ""
    },
    {
      "id": "komunitas-3",
      "name": "Komunitas Peduli Gajahwong",
      "kind": "Komunitas",
      "logo": ""
    },
    {
      "id": "komunitas-4",
      "name": "Sekolah Sungai DIY",
      "kind": "Komunitas",
      "logo": ""
    }
  ],
  "stats": [
    {
      "id": "stat-1",
      "value": "12",
      "title": "Program Aktif",
      "icon": "Folder",
      "description": "Inisiatif komunitas & riset multi-tahun di Sleman, Kota Yogyakarta & Bantul"
    },
    {
      "id": "stat-2",
      "value": "28",
      "title": "Komunitas Terlibat",
      "icon": "Komunitas",
      "description": "Paguyuban RT/RW, pemerti sungai, dan koalisi pemuda"
    },
    {
      "id": "stat-3",
      "value": "3",
      "title": "Sungai Dipantau",
      "icon": "Sungai",
      "description": "Pengamatan berkala di DAS Kali Code, Kali Winongo, dan Kali Gajahwong"
    },
    {
      "id": "stat-4",
      "value": "45+",
      "title": "Dataset & Naskah Kebijakan",
      "icon": "Data",
      "description": "Akses terbuka hidrologi, peta sains warga, dan publikasi telaah kritis"
    }
  ]
};

export const DEFAULT_BLOCKS: Record<string, BlockData> = {
  "contact": {
    "email": "sekretariat@livinglabsungai.ac.id",
    "phone": "+62 (274) 487711",
    "hours": "08:30 - 16:00 WIB",
    "address": "Gedung Thomas Aquinas Lantai 3, Kampus 1 Universitas Atma Jaya Yogyakarta, Jl. Babarsari No. 44, Caturtunggal, Depok, Sleman, D.I. Yogyakarta 55281"
  },
  "vision": {
    "label": "Visi Kolektif 2030",
    "statement": "Ekosistem kolaborasi dan laboratorium hidup untuk transformasi sosial-ekologis sungai perkotaan.",
    "description": "Meneguhkan sungai bukan sebagai halaman belakang yang terpinggirkan, melainkan episentrum kebudayaan, ketahanan iklim, dan martabat masyarakat bantara Daerah Istimewa Yogyakarta.",
    "metric1Label": "Cakupan Wilayah",
    "metric1Value": "3 DAS Utama",
    "metric1Note": "Code, Winongo, Gajahwong",
    "metric2Label": "Pendekatan",
    "metric2Value": "Civic Science",
    "metric2Note": "Sains Warga & Aksi Kolaboratif",
    "metric3Label": "Target Manfaat",
    "metric3Value": "38 Kalurahan",
    "metric3Note": "Komunitas Koridor Sungai",
    "footnote": "Transisi paradigma dari eksploitasi ke pemulihan regeneratif"
  }
};
