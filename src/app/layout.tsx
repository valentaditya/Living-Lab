import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "./SiteChrome";
import { getBlock } from "@/lib/site-content";

// Footer menampilkan kontak dari dashboard, jadi semua halaman dirender per kunjungan
// agar perubahan kontak langsung terlihat.
export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Living Lab Sungai Yogyakarta",
  description:
    "Riset berbasis sains dan aksi warga kolaboratif untuk masa depan ekosistem sungai yang berkelanjutan.",
  icons: {
    icon: "/pictures/icon.png",
    shortcut: "/pictures/icon.png",
    apple: "/pictures/icon.png",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const contact = await getBlock("contact");
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteChrome contact={contact}>{children}</SiteChrome>
      </body>
    </html>
  );
}
