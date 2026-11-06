This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Admin Living Lab (Supabase)

Login, konten publik, dan panel admin memakai [Supabase](https://supabase.com):

| Bagian | Disimpan di |
| --- | --- |
| Login admin | Supabase Auth (email + kata sandi), hak admin di tabel `admin_users` |
| Judul/deskripsi beranda, berita, agenda, FAQ | Tabel `site_settings`, `articles`, `agenda_items`, `faqs` |
| Gambar dan PDF (maks. 10 MB) | Storage bucket `media` (publik untuk dibaca) |
| Riwayat login/logout, perubahan konten, unggahan | Tabel `activity_logs` |
| Profil admin (nama, telepon, jabatan) dan foto profil | Tabel `admin_profiles`, Storage bucket `avatars` |

Publik hanya bisa membaca konten. Menulis data hanya bisa dilakukan akun yang
terdaftar di `admin_users` (dijaga Row Level Security di database).

### Setup sekali

1. Salin `.env.example` menjadi `.env.local`, lalu isi URL dan publishable key
   dari Supabase → Project Settings → API Keys.
2. Supabase → SQL Editor: tempel **isi** file berikut (bukan path-nya) lalu
   jalankan, satu per satu sesuai urutan:
   - `supabase/migrations/20261106000000_living_lab_cms.sql`: tabel konten,
     aturan akses, bucket `media`, dan konten awal.
   - `supabase/migrations/20261107000000_admin_profiles.sql`: tabel
     `admin_profiles` dan bucket `avatars` untuk halaman Profil Saya.
3. Supabase → Authentication → Users → Add user → Create new user. Isi email
   dan kata sandi admin, centang **Auto Confirm User**.
4. Jadikan akun itu admin lewat SQL Editor:

   ```sql
   insert into public.admin_users (user_id)
   select id from auth.users where email = 'email-admin@contoh.ac.id'
   on conflict do nothing;
   ```

5. Disarankan: Authentication → Sign In / Providers → matikan
   **Allow new users to sign up**, supaya tidak ada orang lain yang bisa
   membuat akun.

Lalu jalankan `npm run dev`, buka `/login`, dan masuk dengan email tersebut.
Dashboard ada di `/dashboard`. Beranda, Berita, dan FAQ membaca konten dari
Supabase di setiap kunjungan, jadi perubahan dari dashboard langsung tampil.

This project uses [`next/font`](https://nextjs.org/docs/app/building/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
