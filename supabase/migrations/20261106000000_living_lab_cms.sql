-- Living Lab Sungai: skema CMS, hak akses admin, media, dan log aktivitas.
-- Jalankan sekali di Supabase Dashboard → SQL Editor. Aman dijalankan ulang.

-- ---------------------------------------------------------------------------
-- Admin: hanya user di tabel ini yang boleh masuk panel dan mengubah konten.
-- ---------------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "admin_users_select_own" on public.admin_users;
create policy "admin_users_select_own" on public.admin_users
  for select to authenticated
  using (user_id = (select auth.uid()));

grant select on public.admin_users to authenticated;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users where user_id = (select auth.uid())
  );
$$;

-- ---------------------------------------------------------------------------
-- Konten situs
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  id smallint primary key default 1 check (id = 1),
  hero_title text not null check (char_length(hero_title) between 1 and 180),
  hero_description text not null check (char_length(hero_description) between 1 and 500),
  updated_at timestamptz not null default now()
);

create table if not exists public.articles (
  id text primary key,
  sort_order integer not null default 0,
  category text not null,
  image text not null,
  date_label text not null,
  read_time text not null,
  tag text not null,
  title text not null,
  summary text not null,
  author text not null,
  action_text text not null,
  action_href text,
  updated_at timestamptz not null default now()
);

create table if not exists public.agenda_items (
  id text primary key,
  sort_order integer not null default 0,
  month text not null,
  day text not null,
  tag_label text not null,
  tag_color text not null check (tag_color in ('green', 'orange', 'blue')),
  time_label text not null,
  title text not null,
  location text not null,
  button_text text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id text primary key,
  sort_order integer not null default 0,
  question text not null,
  answer text not null,
  category text not null,
  updated_at timestamptz not null default now()
);

-- Publik boleh membaca, hanya admin yang boleh menulis.
do $$
declare
  table_name text;
begin
  foreach table_name in array array['site_settings', 'articles', 'agenda_items', 'faqs'] loop
    execute format('alter table public.%I enable row level security', table_name);

    execute format('drop policy if exists %I on public.%I', table_name || '_public_read', table_name);
    execute format(
      'create policy %I on public.%I for select to anon, authenticated using (true)',
      table_name || '_public_read', table_name);

    execute format('drop policy if exists %I on public.%I', table_name || '_admin_insert', table_name);
    execute format(
      'create policy %I on public.%I for insert to authenticated with check ((select public.is_admin()))',
      table_name || '_admin_insert', table_name);

    execute format('drop policy if exists %I on public.%I', table_name || '_admin_update', table_name);
    execute format(
      'create policy %I on public.%I for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))',
      table_name || '_admin_update', table_name);

    execute format('drop policy if exists %I on public.%I', table_name || '_admin_delete', table_name);
    execute format(
      'create policy %I on public.%I for delete to authenticated using ((select public.is_admin()))',
      table_name || '_admin_delete', table_name);

    execute format('grant select on public.%I to anon, authenticated', table_name);
    execute format('grant insert, update, delete on public.%I to authenticated', table_name);
  end loop;
end;
$$;

-- Simpan seluruh konten dari dashboard dalam satu transaksi.
-- Item yang tidak ada lagi di daftar akan dihapus; urutan disimpan di sort_order.
create or replace function public.save_cms_content(content jsonb)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'Hanya admin yang boleh menyimpan konten.' using errcode = '42501';
  end if;

  insert into public.site_settings (id, hero_title, hero_description, updated_at)
  values (1, content #>> '{settings,heroTitle}', content #>> '{settings,heroDescription}', now())
  on conflict (id) do update
    set hero_title = excluded.hero_title,
        hero_description = excluded.hero_description,
        updated_at = now();

  delete from public.articles
  where id not in (select item ->> 'id' from jsonb_array_elements(content -> 'articles') as item);

  insert into public.articles (
    id, sort_order, category, image, date_label, read_time, tag, title, summary,
    author, action_text, action_href, updated_at
  )
  select
    item ->> 'id', ord::integer, item ->> 'category', item ->> 'image', item ->> 'date',
    item ->> 'readTime', item ->> 'tag', item ->> 'title', item ->> 'summary',
    item ->> 'author', item ->> 'actionText', nullif(item ->> 'actionHref', ''), now()
  from jsonb_array_elements(content -> 'articles') with ordinality as t(item, ord)
  on conflict (id) do update
    set sort_order = excluded.sort_order,
        category = excluded.category,
        image = excluded.image,
        date_label = excluded.date_label,
        read_time = excluded.read_time,
        tag = excluded.tag,
        title = excluded.title,
        summary = excluded.summary,
        author = excluded.author,
        action_text = excluded.action_text,
        action_href = excluded.action_href,
        updated_at = now();

  delete from public.agenda_items
  where id not in (select item ->> 'id' from jsonb_array_elements(content -> 'agenda') as item);

  insert into public.agenda_items (
    id, sort_order, month, day, tag_label, tag_color, time_label, title, location,
    button_text, updated_at
  )
  select
    item ->> 'id', ord::integer, item ->> 'month', item ->> 'day', item ->> 'tagLabel',
    item ->> 'tagColor', item ->> 'time', item ->> 'title', item ->> 'location',
    item ->> 'buttonText', now()
  from jsonb_array_elements(content -> 'agenda') with ordinality as t(item, ord)
  on conflict (id) do update
    set sort_order = excluded.sort_order,
        month = excluded.month,
        day = excluded.day,
        tag_label = excluded.tag_label,
        tag_color = excluded.tag_color,
        time_label = excluded.time_label,
        title = excluded.title,
        location = excluded.location,
        button_text = excluded.button_text,
        updated_at = now();

  delete from public.faqs
  where id not in (select item ->> 'id' from jsonb_array_elements(content -> 'faqs') as item);

  insert into public.faqs (id, sort_order, question, answer, category, updated_at)
  select
    item ->> 'id', ord::integer, item ->> 'question', item ->> 'answer',
    item ->> 'category', now()
  from jsonb_array_elements(content -> 'faqs') with ordinality as t(item, ord)
  on conflict (id) do update
    set sort_order = excluded.sort_order,
        question = excluded.question,
        answer = excluded.answer,
        category = excluded.category,
        updated_at = now();
end;
$$;

revoke execute on function public.save_cms_content(jsonb) from public, anon;
grant execute on function public.save_cms_content(jsonb) to authenticated;

-- ---------------------------------------------------------------------------
-- Log aktivitas admin
-- ---------------------------------------------------------------------------
create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  detail text not null,
  actor_id uuid default auth.uid() references auth.users (id) on delete set null,
  actor_email text,
  created_at timestamptz not null default now()
);

create index if not exists activity_logs_created_at_idx
  on public.activity_logs (created_at desc);

alter table public.activity_logs enable row level security;

drop policy if exists "activity_logs_admin_read" on public.activity_logs;
create policy "activity_logs_admin_read" on public.activity_logs
  for select to authenticated
  using ((select public.is_admin()));

drop policy if exists "activity_logs_admin_insert" on public.activity_logs;
create policy "activity_logs_admin_insert" on public.activity_logs
  for insert to authenticated
  with check ((select public.is_admin()));

grant select, insert on public.activity_logs to authenticated;

-- ---------------------------------------------------------------------------
-- Media: bucket publik (file bisa dibuka lewat URL), upload khusus admin.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', true, 10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "media_admin_read" on storage.objects;
create policy "media_admin_read" on storage.objects
  for select to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));

drop policy if exists "media_admin_insert" on storage.objects;
create policy "media_admin_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and (select public.is_admin()));

drop policy if exists "media_admin_update" on storage.objects;
create policy "media_admin_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));

drop policy if exists "media_admin_delete" on storage.objects;
create policy "media_admin_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));

-- ---------------------------------------------------------------------------
-- Konten awal (diambil dari konten bawaan aplikasi). Tidak menimpa data yang sudah ada.
-- ---------------------------------------------------------------------------
insert into public.site_settings (id, hero_title, hero_description)
values (1, 'Memulihkan Sungai, Memberdayakan Masyarakat.', 'Riset berbasis sains dan aksi warga kolaboratif untuk masa depan ekosistem sungai yang berkelanjutan.')
on conflict (id) do nothing;

insert into public.articles (id, sort_order, category, image, date_label, read_time, tag, title, summary, author, action_text, action_href)
values
  ('1', 1, 'Riset Lapangan', 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=900&auto=format&fit=crop', 'Nov 2024', '8 mnt baca', 'DAS Winongo', 'Kajian Kualitas Air Sepanjang Daerah Aliran Kali Winongo 2024', 'Analisis kimiawi dan mikrobiologis komprehensif membandingkan kadar oksigen terlarut (DO), kebutuhan oksigen biologis (BOD), dan konsentrasi...', 'Dr. Ir. Maria Retno, M.Eng.', 'Baca Abstrak', '/riset/kajian-kualitas-air-winongo-2024'),
  ('2', 2, 'Aksi Komunitas', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop', 'Okt 2024', '5 mnt baca', 'Koridor Code', 'Pemberdayaan Pemuda Terban dalam Pengujian Kualitas Air Warga', 'Pelatihan 40 penjaga sungai muda dari Kampung Terban dan Gondolayu untuk uji kekeruhan optik real-time dan identifikasi bioindikator makroinvertebrata.', 'Tim Pengabdian Lab', 'Baca Artikel', '/artikel/pemberdayaan-pemuda-terban'),
  ('3', 3, 'Naskah Kebijakan', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=900&auto=format&fit=crop', 'Sep 2024', '12 mnt baca', 'Kebijakan DIY', 'Forum Akademisi UAJY Menyerahkan Rekomendasi Sempadan Sungai ke DLH DIY', 'Menyampaikan naskah kebijakan spasial berbasis data sains terkait penetapan sempadan sungai, sistem bio-retensi terdesentralisasi, dan RTH...', 'Kelompok Penasihat Kebijakan', 'Unduh PDF', '/dokumen/rekomendasi-sempadan-sungai-dlh-diy.pdf')
on conflict (id) do nothing;

insert into public.agenda_items (id, sort_order, month, day, tag_label, tag_color, time_label, title, location, button_text)
values
  ('1', 1, 'NOV', '28', 'Forum Publik', 'green', '09:00 - 13:00 WIB', 'Sarasehan Publik Data Terbuka Kualitas Air & Presentasi Sensor Lapangan', 'Gedung Bonaventura Kampus 3 UAJY & Siaran Daring Hybrid', 'Daftar Gratis'),
  ('2', 2, 'DES', '05', 'Laboratorium Lapangan', 'orange', '07:30 - 11:30 WIB', 'Lokakarya Biomonitoring Warga: Bioindikator Makroinvertebrata Sungai', 'Pendopo Code Heritage · Terban, Gondokusuman, Yogyakarta', 'Daftar Gratis'),
  ('3', 3, 'DES', '18', 'Meja Bundar Kebijakan', 'blue', '13:30 - 17:00 WIB', 'Dialog Meja Bundar Multi-Pihak Pengelolaan DAS Yogyakarta 2024', 'Auditorium DLH DIY & Balai Eksekutif', 'Ajukan Kehadiran')
on conflict (id) do nothing;

insert into public.faqs (id, sort_order, question, answer, category)
values
  ('faq-1', 1, 'Apa itu Living Lab Sungai Yogyakarta?', 'Living Lab Sungai Yogyakarta adalah inisiatif riset kolaboratif terapan yang menempatkan koridor sungai (Kali Code, Winongo, Gajahwong) sebagai laboratorium hidup di mana akademisi, warga bantaran, pemerintah, dan industri bekerja sama secara egaliter untuk menyelesaikan persoalan sosial-ekologis secara nyata.', 'Landasan Operasional'),
  ('faq-2', 2, 'Siapa saja yang bisa terlibat dalam inisiatif ini?', 'Inisiatif ini terbuka untuk siapa saja yang memiliki kepedulian terhadap sungai, mulai dari akademisi, mahasiswa, komunitas warga, LSM, sektor swasta, hingga instansi pemerintah.', 'Keterlibatan & Warga'),
  ('faq-3', 3, 'Bagaimana cara masyarakat atau peneliti berkontribusi data?', 'Anda dapat berkontribusi dengan mengikuti pelatihan sains warga (citizen science) yang kami adakan secara berkala, atau mengirimkan data hasil pemantauan mandiri melalui portal data terbuka kami.', 'Data & Akses'),
  ('faq-4', 4, 'Apakah data kualitas air dan riset dapat diakses secara publik?', 'Ya, seluruh data telemetri dan hasil riset kami dipublikasikan secara terbuka melalui repositori data kami. Kami percaya bahwa data terbuka adalah kunci untuk advokasi kebijakan yang berbasis bukti.', 'Data & Akses'),
  ('faq-5', 5, 'Bagaimana prosedur menjadi mitra resmi atau sponsor riset?', 'Silakan menghubungi tim sekretariat kami melalui email untuk mendapatkan dokumen panduan kemitraan. Kami akan menjadwalkan sesi diskusi awal untuk menyelaraskan tujuan dan ruang lingkup kolaborasi.', 'Kelembagaan')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Langkah terakhir (sekali saja): jadikan akun Anda admin.
-- 1. Authentication → Users → Add user → Create new user (centang "Auto Confirm User").
-- 2. Ganti email di bawah, hapus tanda komentar "--", lalu jalankan baris ini:
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'email-admin@contoh.ac.id'
-- on conflict do nothing;
