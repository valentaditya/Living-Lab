-- Living Lab Sungai: profil admin (nama, telepon, jabatan, foto).
-- Jalankan sekali di Supabase Dashboard → SQL Editor, setelah migrasi
-- 20261106000000_living_lab_cms.sql. Aman dijalankan ulang.

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  full_name text check (full_name is null or char_length(full_name) between 1 and 120),
  phone text check (phone is null or phone ~ '^\+?[0-9][0-9 ()-]{6,22}$'),
  position text check (position is null or char_length(position) <= 120),
  avatar_path text,
  updated_at timestamptz not null default now()
);

alter table public.admin_profiles enable row level security;

-- Sesama admin boleh melihat profil (misalnya untuk menampilkan nama di log),
-- tapi masing-masing hanya boleh mengubah profilnya sendiri.
drop policy if exists "admin_profiles_admin_read" on public.admin_profiles;
create policy "admin_profiles_admin_read" on public.admin_profiles
  for select to authenticated
  using ((select public.is_admin()));

drop policy if exists "admin_profiles_insert_own" on public.admin_profiles;
create policy "admin_profiles_insert_own" on public.admin_profiles
  for insert to authenticated
  with check (user_id = (select auth.uid()) and (select public.is_admin()));

drop policy if exists "admin_profiles_update_own" on public.admin_profiles;
create policy "admin_profiles_update_own" on public.admin_profiles
  for update to authenticated
  using (user_id = (select auth.uid()) and (select public.is_admin()))
  with check (user_id = (select auth.uid()) and (select public.is_admin()));

grant select, insert, update on public.admin_profiles to authenticated;

-- ---------------------------------------------------------------------------
-- Foto profil: bucket publik, maks. 2 MB, path <user_id>/<nama-file>.
-- Admin hanya boleh mengelola file di foldernya sendiri.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "avatars_own_read" on storage.objects;
create policy "avatars_own_read" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "avatars_own_insert" on storage.objects;
create policy "avatars_own_insert" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select public.is_admin())
  );

drop policy if exists "avatars_own_update" on storage.objects;
create policy "avatars_own_update" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select public.is_admin())
  );

drop policy if exists "avatars_own_delete" on storage.objects;
create policy "avatars_own_delete" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select public.is_admin())
  );
