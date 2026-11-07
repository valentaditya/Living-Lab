-- Living Lab Sungai: konten halaman yang dikelola dari dashboard
-- (tim, kisah sungai, pusat pengetahuan, roadmap, misi, target, mitra, statistik,
-- kontak, visi). Jalankan di Supabase → SQL Editor setelah dua migrasi sebelumnya.
-- Aman dijalankan ulang; konten awal tidak menimpa data yang sudah ada.

-- Koleksi: setiap baris = satu item (anggota tim, kisah, publikasi, ...).
create table if not exists public.content_entries (
  collection text not null check (collection ~ '^[a-z]+$'),
  id text not null check (id ~ '^[A-Za-z0-9_-]{1,64}$'),
  sort_order integer not null default 0,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (collection, id)
);

create index if not exists content_entries_order_idx
  on public.content_entries (collection, sort_order);

-- Blok: satu set isian per kunci (kontak, visi).
create table if not exists public.site_blocks (
  key text primary key check (key ~ '^[a-z]+$'),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

do $$
declare
  table_name text;
begin
  foreach table_name in array array['content_entries', 'site_blocks'] loop
    execute format('alter table public.%I enable row level security', table_name);

    execute format('drop policy if exists %I on public.%I', table_name || '_public_read', table_name);
    execute format('create policy %I on public.%I for select to anon, authenticated using (true)',
      table_name || '_public_read', table_name);

    execute format('drop policy if exists %I on public.%I', table_name || '_admin_insert', table_name);
    execute format('create policy %I on public.%I for insert to authenticated with check ((select public.is_admin()))',
      table_name || '_admin_insert', table_name);

    execute format('drop policy if exists %I on public.%I', table_name || '_admin_update', table_name);
    execute format('create policy %I on public.%I for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))',
      table_name || '_admin_update', table_name);

    execute format('drop policy if exists %I on public.%I', table_name || '_admin_delete', table_name);
    execute format('create policy %I on public.%I for delete to authenticated using ((select public.is_admin()))',
      table_name || '_admin_delete', table_name);

    execute format('grant select on public.%I to anon, authenticated', table_name);
    execute format('grant insert, update, delete on public.%I to authenticated', table_name);
  end loop;
end;
$$;

-- Simpan seluruh isi satu koleksi dalam satu transaksi. Item yang tidak ada lagi
-- di daftar dihapus; urutan di daftar menjadi sort_order.
create or replace function public.save_collection(p_collection text, p_items jsonb)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'Hanya admin yang boleh menyimpan konten.' using errcode = '42501';
  end if;

  delete from public.content_entries
  where collection = p_collection
    and id not in (select item ->> 'id' from jsonb_array_elements(p_items) as item);

  insert into public.content_entries (collection, id, sort_order, data, updated_at)
  select p_collection, item ->> 'id', ord::integer, item - 'id', now()
  from jsonb_array_elements(p_items) with ordinality as t(item, ord)
  on conflict (collection, id) do update
    set sort_order = excluded.sort_order,
        data = excluded.data,
        updated_at = now();
end;
$$;

revoke execute on function public.save_collection(text, jsonb) from public, anon;
grant execute on function public.save_collection(text, jsonb) to authenticated;

-- ---------------------------------------------------------------------------
-- Konten awal (isi situs sebelumnya). Tidak menimpa data yang sudah ada.
-- ---------------------------------------------------------------------------
insert into public.content_entries (collection, id, sort_order, data)
values
  ('team', 'team-1', 1, '{"name": "Dr. Ir. Budi Santoso, M.Eng.", "role": "Ketua Tim Riset", "group": "Akademisi UAJY", "badge": "Lab Code", "icon": "💧", "title": "Dosen Teknik Lingkungan UAJY • Spesialis Hidrodinamika", "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop", "quote": "Laboratorium sejati bukan berada di dalam ruang tertutup kampus, melainkan di bentaran kali dan obrolan warga.", "focusValue": "Hidrologi Urban & Tata Kelola DAS"}'::jsonb),
  ('team', 'team-2', 2, '{"name": "Sekar Ayu Prabawati, S.Si., M.Sc.", "role": "Koordinator Ekologi", "group": "Akademisi UAJY", "badge": "Eco-Lab", "icon": "🔬", "title": "Peneliti Biologi Perairan UAJY • Bioindikator Makrobentos", "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop", "quote": "Setiap mikroorganisme di aliran sungai adalah indikator kejujuran peradaban kota kita.", "focusValue": "Bio-indikator Bentik & Kimia Sungai"}'::jsonb),
  ('team', 'team-3', 3, '{"name": "FX. Bambang Hendro", "role": "Koordinator Lapangan", "group": "Akar Rumput", "badge": "Paguyuban Code", "icon": "🤝", "title": "Tokoh Paguyuban Pemerti Kali Code • Relawan Bencana DAS", "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop", "quote": "Sungai bukan tempat membuang masa lalu, melainkan halaman depan masa depan anak cucu kami.", "focusValue": "Aksi Relawan & Edukasi Warga"}'::jsonb),
  ('team', 'team-4', 4, '{"name": "Maria Dwi Lestari, S.T.", "role": "Spesialis IoT & Sains Warga", "group": "Akademisi UAJY", "badge": "Telemetri IoT", "icon": "📡", "title": "Peneliti Sains Komputasi DIY • Pegiat Open Hardware", "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop", "quote": "Teknologi sensor hanya bermakna jika datanya dipahami dan dijaga bersama oleh warga yang tinggal di tepiannya.", "focusValue": "Telemetri LoRaWAN & Open Hardware"}'::jsonb),
  ('team', 'team-5', 5, '{"name": "Danang Wijayanto", "role": "Inisiator Konservasi", "group": "Akar Rumput", "badge": "Konservasi Winongo", "icon": "🌿", "title": "Inisiator FKWA Winongo Asri • Penggiat Ekoparian", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop", "quote": "Mungkur kali dadi madhep kali: ketika sungai dihormati, bencana luapan berubah menjadi anugerah kehidupan.", "focusValue": "Ruang Terbuka Hijau & Ekowisata"}'::jsonb),
  ('team', 'team-6', 6, '{"name": "Nurul Hidayati, M.P.W.K.", "role": "Perencana Tata Ruang", "group": "Akademisi UAJY", "badge": "Spasial & Kebijakan", "icon": "📐", "title": "Dosen Perencanaan Wilayah Kota UAJY • Analis Spasial", "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop", "quote": "Mengintegrasikan kearifan lokal bantara ke dalam rencana tata ruang kota adalah wujud keadilan spasial.", "focusValue": "Kebijakan Sempadan & Mitigasi Banjir"}'::jsonb),
  ('stories', 'story-1', 1, '{"title": "Perempuan Penjaga Titik Air: Ketangguhan Ibu-Ibu Bantaran Winongo Merawat Aliran Kehidupan", "slug": "perempuan-penjaga-titik-air", "category": "People of the River", "date": "Okt 2026", "authorOrFigure": "Ibu Siti Aminah & Komunitas Perempuan Bantaran", "location": "Koridor DAS Winongo, Yogyakarta", "readTimeOrMedia": "6 Menit Baca / Video", "abstract": "Bagaimana gerakan kolektif para ibu di tepian sungai mengubah stigma halaman belakang rumah yang kotor menjadi ruang publik hijau dan pusat ekonomi sirkular warga.", "body": "Perubahan ekosistem di sepanjang koridor sungai perkotaan Yogyakarta tidak pernah sekadar soal angka kualitas air atau fisik tanggul beton. Di balik setiap aliran air yang melalui permukiman padat, terdapat denyut kehidupan sosial yang digerakkan oleh tangan-tangan warga, terutama para ibu dan komunitas lokal yang menjadikan bantaran sebagai halaman depan kehidupan mereka.\n\n## Transformasi Halaman Belakang Menjadi Ruang Publik Hijau\n\nSelama bertahun-tahun, bagian belakang rumah yang menghadap langsung ke sungai kerap diperlakukan sebagai tempat pembuangan akhir informal. Namun, melalui inisiatif kolaboratif bersama Living Lab Sungai Yogyakarta, paradigma tersebut berbalik secara perlahan namun konsisten.\n\n> Sungai bukan lagi batas belakang yang kotor, melainkan teras depan tempat kita menyambut masa depan bersama.\n\n## Gerakan Kolektif & Ekonomi Sirkular Warga\n\nTidak hanya berfokus pada kebersihan lingkungan fisik, gerakan ini juga mengintegrasikan sistem bank sampah mandiri dan pemanfaatan air untuk urban farming di sempadan. Hasilnya, tercipta siklus ekologis dan ekonomi yang menopang kesejahteraan warga secara berkelanjutan."}'::jsonb),
  ('stories', 'story-2', 2, '{"title": "Bank Sampah Muja Muju: Dari Timbulan Plastik Menjadi Kolektif Ekonomi Warga", "slug": "bank-sampah-muja-muju", "category": "Community Stories", "date": "Sep 2026", "authorOrFigure": "Pengurus Bank Sampah Mandiri", "location": "Bantaran Sungai Gajahwong", "readTimeOrMedia": "5 Menit Baca", "abstract": "Transformasi pengelolaan sampah mandiri yang tidak hanya membersihkan aliran sungai tetapi juga menggerakkan tabungan pendidikan anak-anak warga sekitar.", "body": ""}'::jsonb),
  ('stories', 'story-3', 3, '{"title": "Catatan Lapangan: Mengukur Kualitas Air Bersama Petani Urban Pertanian Organik Tepi Sungai", "slug": "catatan-lapangan-petani-urban", "category": "Field Notes", "date": "Agu 2026", "authorOrFigure": "Tim Riset Lapangan Living Lab UAJY", "location": "Gapoktan Sempadan Code", "readTimeOrMedia": "8 Menit Baca", "abstract": "Catatan harian peneliti mengenai pemanfaatan air irigasi sempadan dan tantangan adaptasi petani terhadap fluktuasi debit air musim kemarau.", "body": ""}'::jsonb),
  ('stories', 'story-4', 4, '{"title": "Esei Foto: Wajah-Wajah di Balik Pelestarian Titik Nol Aliran Sungai Code", "slug": "esei-foto-titik-nol-code", "category": "Photo Essay", "date": "Jul 2026", "authorOrFigure": "Dokumentasi Visual Living Lab", "location": "Koridor Code Tengah", "readTimeOrMedia": "12 Foto", "abstract": "Kumpulan potret hitam-putih dan berwarna yang merekam dinamika keseharian para penggerak komunitas, anak-anak, dan relawan di bantaran sungai.", "body": ""}'::jsonb),
  ('stories', 'story-5', 5, '{"title": "Menelusuri Riwayat Sempadan: Menjaga Keseimbangan Ekologis di Tengah Padatnya Kota", "slug": "menelusuri-riwayat-sempadan", "category": "River Stories", "date": "Jun 2026", "authorOrFigure": "Divisi Kajian & Sejarah DAS", "location": "Kawasan Perkotaan Yogyakarta", "readTimeOrMedia": "7 Menit Baca", "abstract": "Refleksi historis mengenai perubahan tata guna lahan di sepanjang aliran sungai utama Yogyakarta dan upaya pemulihan fungsi sempadan.", "body": ""}'::jsonb),
  ('stories', 'story-6', 6, '{"title": "Dokumenter Mini: Suara dari Tepian (Dokumentasi Kehidupan, Harapan, dan Aksi Warga)", "slug": "dokumenter-mini-suara-dari-tepian", "category": "Mini Documentary", "date": "Mei 2026", "authorOrFigure": "Tim Media & Sinema Living Lab UAJY", "location": "DAS Winongo, Code, & Gajahwong", "readTimeOrMedia": "15 Menit Tonton", "abstract": "Tayangan visual berdurasi 15 menit yang merangkum suara hati warga bantaran, anak-anak, dan para relawan dalam merawat masa depan sungai.", "body": ""}'::jsonb),
  ('publications', 'pub-1', 1, '{"title": "Strategi Pengendalian Beban Pencemaran Mikroplastik dan Limbah Domestik DAS", "type": "Policy Brief", "date": "Sep 2026", "authors": ["Tim Peneliti Living-Lab", "Aliansi Warga Bantaran", "PSL UAJY"], "institution": "Universitas Atma Jaya Yogyakarta", "abstract": "Analisis rekomendasi kebijakan untuk pemerintah daerah mengenai integrasi regulasi sempadan sungai, penegakan baku mutu air, dan insentif pemilahan sampah organik rumah tangga.", "doi": "10.1016/policy.2026.09", "fileSize": "4.2 MB", "downloadUrl": ""}'::jsonb),
  ('publications', 'pub-2', 2, '{"title": "Biomonitoring Bentos Makroinvertebrata Sebagai Bioindikator Kualitas Air Sungai", "type": "Jurnal Riset", "date": "Jul 2026", "authors": ["Dr. Hendra W.", "Siti Nur A.", "Lab Terpadu Teknik Sipil"], "institution": "Jurnal Pengelolaan Sumberdaya Alam", "abstract": "Studi komparasi antara indeks biotik famili makroinvertebrata dengan parameter kimiawi (BOD, COD, DO) di 14 titik sampling hulu hingga hilir sungai.", "doi": "10.1016/j.aquat.2026.04", "fileSize": "8.1 MB", "downloadUrl": ""}'::jsonb),
  ('publications', 'pub-3', 3, '{"title": "Model Partisipatif: Transformasi Sensor Kualitas Air IoT oleh Komunitas Tepi Sungai", "type": "Artikel Ilmiah", "date": "Mei 2026", "authors": ["Hardiek Tatendra", "Grup Riset Sistem Tertanam", "Forum Kali"], "institution": "Prosiding Konferensi Rekayasa Komputasi & Lingkungan", "abstract": "Evaluasi akurasi dan ketahanan sensor open-source telemetri kualitas air berbasis mikrokontroler murah yang dipelihara secara kolektif oleh warga bantaran.", "doi": "", "fileSize": "2.8 MB", "downloadUrl": ""}'::jsonb),
  ('datasets', 'data-1', 1, '{"title": "Rekapitulasi Kualitas Air Sungai (pH, DO, BOD, COD, TDS) di 14 Titik Pantau", "category": "Uji Laboratorium", "date": "Sep 2026", "location": "Hulu hingga Hilir Sungai Yogyakarta", "institution": "Laboratorium Teknik Sipil & Lingkungan UAJY", "description": "Kumpulan data hasil pengujian sampel air bulanan untuk memantau tingkat kebersihan sungai dan beban pencemaran limbah domestik.", "format": "Excel (XLSX)", "fileSize": "2.4 MB", "downloadUrl": ""}'::jsonb),
  ('datasets', 'data-2', 2, '{"title": "Catatan Pemantauan Harian Kejernihan Air, Suhu, dan Kondisi Cuaca oleh Warga", "category": "Pemantauan Lapangan", "date": "Jul 2026", "location": "Koridor Bantaran Sungai", "institution": "Komunitas Warga & Tim Living Lab", "description": "Arsip pencatatan rutin yang dilakukan bersama warga tepi sungai sebagai dasar peringatan dini perubahan kualitas air.", "format": "CSV / Excel", "fileSize": "3.1 MB", "downloadUrl": ""}'::jsonb),
  ('datasets', 'data-3', 3, '{"title": "Data Sebaran Titik Mata Air, Ruang Terbuka Hijau, dan Timbulan Sampah Sempadan", "category": "Peta & Spasial", "date": "Mei 2026", "location": "Kawasan Sempadan Sungai", "institution": "Pusat Studi Lingkungan UAJY", "description": "Data titik koordinat dan peta area sempadan sungai untuk mendukung perencanaan tata ruang dan konservasi ekologis.", "format": "GeoJSON / Peta", "fileSize": "5.8 MB", "downloadUrl": ""}'::jsonb),
  ('modules', 'mod-1', 1, '{"title": "Panduan Menilai Kesehatan Sungai Melalui Pengamatan Biota Air (Biomonitoring)", "category": "Panduan Praktik", "date": "Agu 2026", "authors": ["Tim Edukasi Living-Lab", "Komunitas Sekolah Sungai"], "audience": "Warga, Pelajar & Relawan", "description": "Buku panduan praktis mengenali jenis serangga dan biota dasar sungai sebagai indikator alami kebersihan air tanpa menggunakan alat kimia yang rumit.", "highlights": ["Cara mengambil sampel biota di tepian sungai secara aman", "Lembar bergambar pengenalan biota air bersih vs tercemar", "Langkah menyimpulkan status kesehatan sungai bersama warga"], "pages": "36 Halaman", "fileSize": "5.2 MB", "downloadUrl": ""}'::jsonb),
  ('modules', 'mod-2', 2, '{"title": "Buku Saku Pengelolaan Sampah Rumah Tangga & Limbah Cair di Kawasan Bantaran", "category": "Buku Saku", "date": "Jun 2026", "authors": ["PSL UAJY", "Aliansi Warga Bantaran"], "audience": "Keluarga & Pengurus RT/RW", "description": "Langkah sederhana memilah sampah organik rumah tangga dan membuat saringan air limbah cucian sederhana agar tidak mencemari aliran sungai.", "highlights": ["Pembuatan kompos rumahan dari sisa dapur", "Desain bak saring air cucian dengan tanaman lokal", "Panduan kerja bakti pembersihan sempadan sungai"], "pages": "24 Halaman", "fileSize": "3.8 MB", "downloadUrl": ""}'::jsonb),
  ('modules', 'mod-3', 3, '{"title": "Poster Edukasi: Mengenal Ekosistem Sungai Yogyakarta & Cara Menjaganya", "category": "Infografis", "date": "Apr 2026", "authors": ["Tim Desain Komunikasi & Lingkungan UAJY"], "audience": "Sekolah & Ruang Publik Warga", "description": "Rangkaian poster visual ukuran cetak A3 yang menjelaskan fungsi sempadan sungai, bahaya sampah plastik, serta peran vegetasi tepi sungai.", "highlights": ["Ilustrasi rantai makanan ekosistem sungai", "Dampak mikroplastik bagi kesehatan lingkungan", "Daftar tanaman lokal penahan erosi tebing sungai"], "pages": "6 Poster", "fileSize": "7.4 MB", "downloadUrl": ""}'::jsonb),
  ('roadmap', 'phase-1', 1, '{"phaseTag": "Fase 1: Inisiasi & Baseline", "year": "2023", "status": "Fase Selesai", "dateRange": "Q1 2023–Q4 2023", "title": "Fondasi Konsortium Pentahelix & Audit Awal Kualitas Tiga Sungai", "desc": "Pembentukan konsortium pentahelix awal yang mempertemukan akademisi UAJY, komunitas Paguyuban Kali/ngga, pemerintah Kota Yogyakarta, dan kelompok swadaya. Menetapkan modul sains warga terapan, telemetri hidrologi, dan pemetaan spasial partisipatif.", "tags": ["Fokus Utama: Pemetaan Spasial 15 Pos", "Uji Makrobentos", "Konsolidasi Tokoh Bantara"], "outputName": "Modul Standardisasi & Piagam Kolaborasi", "outputDesc": "Dokumen resmi kesepakatan 12 komunitas bantaran dan naskah metodologi sampling air baku terstandardisasi.", "outputFooter": "15 Pos Terverifikasi · 100% Selesai", "progressLabel": "", "progressValue": "", "progressPercent": null}'::jsonb),
  ('roadmap', 'phase-2', 2, '{"phaseTag": "Fase 2: Lab Uji-Coba & IoT", "year": "2024", "status": "Sedang Berjalan", "dateRange": "Q1 2024–Q4 2024", "title": "Penerapan Sensor Nirkabel Komunal & Inkubasi Sains Bantara", "desc": "Deploy pilot sensor IoT kualitas air nirkabel berbasis LoRaWAN, perakitan purwarupa sistem pengolahan limbah cair domestik (IPAL) skala komunal di Terban (Code) dan Suryowijayan (Winongo), serta pengenalan kurikulum sains warga bagi generasi muda sekolah bantara.", "tags": ["Implementasi Lapangan", "Gateway LoRaWAN Mergi-Code", "Bio-Filter Bambu Komunal"], "outputName": "Inkubasi Teknologi & Jaringan Telemetri LoRaWAN", "outputDesc": "Sensor telemetri real-time dengan update berkala tiap 15 menit ke dashboard pemantau publik.", "outputFooter": "Protokol: LoRaWAN AS923-1", "progressLabel": "Target Instalasi Node Sensor (24 Unit)", "progressValue": "16 / 24 Terpasang (66.7%)", "progressPercent": 66.7}'::jsonb),
  ('roadmap', 'phase-3', 3, '{"phaseTag": "Fase 3: Integrasi & Scale-Up", "year": "2025", "status": "Rencana Mendatang", "dateRange": "Q1 2025–Q4 2025", "title": "Portal Keterbukaan Data Terpadu & Koridor Ekowisata Bantara", "desc": "Peluncuran portal keterbukaan data terpadu se-DIY untuk akses publik, akademisi, dan pembuat kebijakan. Penguatan koridor ekowisata bantaran sungai mandiri berbasis kelola warga, serta standardisasi replikasi metodologi living lab untuk DAS regional di luar lingkup Yogyakarta.", "tags": ["Target Utama: Open API Kualitas Air", "3 Rute Ekowisata Edukasi", "Policy Brief Pemda DIY"], "outputName": "Portal Terbuka & Replikasi Wilayah DAS", "outputDesc": "Infrastruktur repositori data terbuka terintegrasi dan buku panduan replikasi living lab skala wilayah DAS.", "outputFooter": "Replikasi Wilayah: Sungai, Progo, & Opak", "progressLabel": "", "progressValue": "", "progressPercent": null}'::jsonb),
  ('roadmap', 'phase-4', 4, '{"phaseTag": "Fase 4: Regenerasi Mandiri", "year": "2026+", "status": "Visi Masa Depan", "dateRange": "Jangka Panjang 2026–2030", "title": "Kemandirian Komunitas Bantara & Standar Mutu Air Kelas II", "desc": "Tercapainya kemandirian tata kelola komunitas bantara tanpa ketergantungan intervensi eksternal penuh. Peningkatan mutu air konsisten ke standar Kelas II Nasional (rekreasi air & budidaya tawar), serta terbangunnya ketahanan iklim mikro perkotaan Yogyakarta menghadapi risiko banjir lahar dan curah ekstrem.", "tags": ["Sasaran Strategis: BOD < 3 mg/L", "Dana Abadi Konservasi Warga", "Zero Direct Waste Inflow"], "outputName": "Kemandirian Paguyuban & Mutu Air Berkelanjutan", "outputDesc": "Lembaga otonom bantara tersertifikasi, ekosistem sungai hidup, dan ketahanan ekologis lestari lintas generasi.", "outputFooter": "Target Baku Mutu: Kelas II PP 22/2021", "progressLabel": "", "progressValue": "", "progressPercent": null}'::jsonb),
  ('missions', 'misi-1', 1, '{"title": "Memfasilitasi Riset Kolaboratif & Inovasi Teknologi", "desc": "Memadukan riset multidisiplin dan pengujian teknologi tepat guna berbasis sains warga, melibatkan akademisi, praktisi, dan komunitas. Mencakup purwarupa sensor nirkabel kualitas air, pemodelan hidrologi mikro, serta pemantauan vegetasi riparian endemik untuk bioremediasi alami.", "tags": ["Sensor IoT Mandiri", "Fitoremediasi Riparian", "Audit Morfologi Sungai"]}'::jsonb),
  ('missions', 'misi-2', 2, '{"title": "Memberdayakan Komunitas Berbasis Sirkular", "desc": "Mengembangkan kapasitas warga bantaran sungai melalui edukasi kepedulian air, tata kelola sampah partisipatif, serta pengembangan ekonomi sirkular lokal. Mewujudkan posko pemilahan organik-anorganik bantara mandiri, pembuatan kompos fermentasi air kali, dan lokakarya daur plastik mikro.", "tags": ["Bank Sampah Bantara", "Sanitasi Komunal Berkelanjutan", "Sekolah Sungai Mandiri"]}'::jsonb),
  ('missions', 'misi-3', 3, '{"title": "Menyediakan Data Terbuka & Transparan", "desc": "Membangun repositori data terbuka pemantauan kualitas air dan indeks ekologis sungai secara real-time untuk penguatan sains warga (citizen science). Siapa pun, mulai dari pelajar SD hingga peneliti doktoral, dapat mengunduh raw telemetry pH, DO, BOD, serta status debit kali tanpa dinding berbayar.", "tags": ["Open API Hidrologi", "Indeks Makroinvertebrata", "Peta Spasial Risiko Banjir"]}'::jsonb),
  ('missions', 'misi-4', 4, '{"title": "Akselerasi Tata Kelola & Kebijakan Publik", "desc": "Mengakselerasi terwujudnya tata kelola sungai partisipatif dan kebijakan publik terpadu bersama pemangku kebijakan di tingkat Penda DIY maupun Kota/Kabupaten. Menyelenggarakan forum musyawarah bantara reguler dan penyusunan kertas kebijakan (policy brief) protokol sempadan sungai.", "tags": ["Policy Brief Semesteran", "Konsultasi Publik AMDAL", "Harmonisasi Perda Sempadan"]}'::jsonb),
  ('targets', 'target-1', 1, '{"value": "24", "label": "Stasiun Pantau", "desc": "Titik Aksi", "sub": "Sensor telemetri terintegrasi di DAS Code, Winongo, & Gajahwong"}'::jsonb),
  ('targets', 'target-2', 2, '{"value": "1.200+", "label": "Relawan Sains Warga", "desc": "Warga Terlatih", "sub": "Kader sampling air dan mitigasi darurat tingkat RW/Kalurahan."}'::jsonb),
  ('targets', 'target-3', 3, '{"value": "12", "label": "Kertas Kebijakan", "desc": "Naskah Akademik", "sub": "Diserahkan kepada Bappeda DIY dan Balai Besar Wilayah Sungai."}'::jsonb),
  ('targets', 'target-4', 4, '{"value": "+35%", "label": "Indeks Kesehatan Kali", "desc": "Kemajuan Mutu", "sub": "Target reduksi beban limbah cair domestik & sampah makro terhanyut."}'::jsonb),
  ('partners', 'lembaga-1', 1, '{"name": "SHIND", "kind": "Lembaga", "logo": ""}'::jsonb),
  ('partners', 'lembaga-2', 2, '{"name": "SGH", "kind": "Lembaga", "logo": ""}'::jsonb),
  ('partners', 'lembaga-3', 3, '{"name": "DLH DIY", "kind": "Lembaga", "logo": ""}'::jsonb),
  ('partners', 'lembaga-4', 4, '{"name": "KLHK RI", "kind": "Lembaga", "logo": ""}'::jsonb),
  ('partners', 'lembaga-5', 5, '{"name": "AQUA", "kind": "Lembaga", "logo": ""}'::jsonb),
  ('partners', 'komunitas-1', 6, '{"name": "FKWA (Forum Komunitas Winongo Asri)", "kind": "Komunitas", "logo": ""}'::jsonb),
  ('partners', 'komunitas-2', 7, '{"name": "Pemerti Kali Code", "kind": "Komunitas", "logo": ""}'::jsonb),
  ('partners', 'komunitas-3', 8, '{"name": "Komunitas Peduli Gajahwong", "kind": "Komunitas", "logo": ""}'::jsonb),
  ('partners', 'komunitas-4', 9, '{"name": "Sekolah Sungai DIY", "kind": "Komunitas", "logo": ""}'::jsonb),
  ('stats', 'stat-1', 1, '{"value": "12", "title": "Program Aktif", "icon": "Folder", "description": "Inisiatif komunitas & riset multi-tahun di Sleman, Kota Yogyakarta & Bantul"}'::jsonb),
  ('stats', 'stat-2', 2, '{"value": "28", "title": "Komunitas Terlibat", "icon": "Komunitas", "description": "Paguyuban RT/RW, pemerti sungai, dan koalisi pemuda"}'::jsonb),
  ('stats', 'stat-3', 3, '{"value": "3", "title": "Sungai Dipantau", "icon": "Sungai", "description": "Pengamatan berkala di DAS Kali Code, Kali Winongo, dan Kali Gajahwong"}'::jsonb),
  ('stats', 'stat-4', 4, '{"value": "45+", "title": "Dataset & Naskah Kebijakan", "icon": "Data", "description": "Akses terbuka hidrologi, peta sains warga, dan publikasi telaah kritis"}'::jsonb)
on conflict (collection, id) do nothing;

insert into public.site_blocks (key, data)
values
  ('contact', '{"email": "sekretariat@livinglabsungai.ac.id", "phone": "+62 (274) 487711", "hours": "08:30 - 16:00 WIB", "address": "Gedung Thomas Aquinas Lantai 3, Kampus 1 Universitas Atma Jaya Yogyakarta, Jl. Babarsari No. 44, Caturtunggal, Depok, Sleman, D.I. Yogyakarta 55281"}'::jsonb),
  ('vision', '{"label": "Visi Kolektif 2030", "statement": "Ekosistem kolaborasi dan laboratorium hidup untuk transformasi sosial-ekologis sungai perkotaan.", "description": "Meneguhkan sungai bukan sebagai halaman belakang yang terpinggirkan, melainkan episentrum kebudayaan, ketahanan iklim, dan martabat masyarakat bantara Daerah Istimewa Yogyakarta.", "metric1Label": "Cakupan Wilayah", "metric1Value": "3 DAS Utama", "metric1Note": "Code, Winongo, Gajahwong", "metric2Label": "Pendekatan", "metric2Value": "Civic Science", "metric2Note": "Sains Warga & Aksi Kolaboratif", "metric3Label": "Target Manfaat", "metric3Value": "38 Kalurahan", "metric3Note": "Komunitas Koridor Sungai", "footnote": "Transisi paradigma dari eksploitasi ke pemulihan regeneratif"}'::jsonb)
on conflict (key) do nothing;
