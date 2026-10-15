import { Article } from '../types/article';

export const DUMMY_ARTICLES: Article[] = [
  {
    id: "1",
    category: "Riset Lapangan",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=900&auto=format&fit=crop",
    date: "Nov 2024",
    readTime: "8 mnt baca",
    tag: "DAS Winongo",
    title: "Kajian Kualitas Air Sepanjang Daerah Aliran Kali Winongo 2024",
    summary: "Analisis kimiawi dan mikrobiologis komprehensif membandingkan kadar oksigen terlarut (DO), kebutuhan oksigen biologis (BOD), dan konsentrasi...",
    author: "Dr. Ir. Maria Retno, M.Eng.",
    actionText: "Baca Abstrak",
    actionHref: "/riset/kajian-kualitas-air-winongo-2024"
  },
  {
    id: "2",
    category: "Aksi Komunitas",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop",
    date: "Okt 2024",
    readTime: "5 mnt baca",
    tag: "Koridor Code",
    title: "Pemberdayaan Pemuda Terban dalam Pengujian Kualitas Air Warga",
    summary: "Pelatihan 40 penjaga sungai muda dari Kampung Terban dan Gondolayu untuk uji kekeruhan optik real-time dan identifikasi bioindikator makroinvertebrata.",
    author: "Tim Pengabdian Lab",
    actionText: "Baca Artikel",
    actionHref: "/artikel/pemberdayaan-pemuda-terban"
  },
  {
    id: "3",
    category: "Naskah Kebijakan",
    
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=900&auto=format&fit=crop",
    date: "Sep 2024",
    readTime: "12 mnt baca",
    tag: "Kebijakan DIY",
    title: "Forum Akademisi UAJY Menyerahkan Rekomendasi Sempadan Sungai ke DLH DIY",
    summary: "Menyampaikan naskah kebijakan spasial berbasis data sains terkait penetapan sempadan sungai, sistem bio-retensi terdesentralisasi, dan RTH...",
    author: "Kelompok Penasihat Kebijakan",
    actionText: "Unduh PDF",
    actionHref: "/dokumen/rekomendasi-sempadan-sungai-dlh-diy.pdf"
  }
];