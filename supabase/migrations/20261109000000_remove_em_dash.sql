-- Ganti em dash (—) pada data awal yang sudah tersimpan di database.
-- Hanya mengubah nilai yang masih sama persis dengan data awal, jadi isian
-- yang sudah diubah lewat dashboard tidak tertimpa. Aman dijalankan berulang kali.

update public.content_entries
set data = jsonb_set(data, '{title}', to_jsonb('Dokumenter Mini: Suara dari Tepian (Dokumentasi Kehidupan, Harapan, dan Aksi Warga)'::text))
where collection = 'stories'
  and data->>'title' = 'Dokumenter Mini: Suara dari Tepian — Dokumentasi Kehidupan, Harapan, dan Aksi Warga';

update public.content_entries
set data = jsonb_set(data, '{dateRange}', to_jsonb(replace(data->>'dateRange', ' — ', '–')))
where collection = 'roadmap'
  and data->>'dateRange' in (
    'Q1 2023 — Q4 2023',
    'Q1 2024 — Q4 2024',
    'Q1 2025 — Q4 2025',
    'Jangka Panjang 2026 — 2030'
  );
