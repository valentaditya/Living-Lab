"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./components/organisms/Navbar";
import Footer from "./components/organisms/Footer";
import type { BlockData } from "@/lib/content-schema";

export function SiteChrome({ children, contact }: { children: React.ReactNode; contact: BlockData }) {
  const pathname = usePathname();
  const isPortalPage =
    pathname === "/login" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/api");

  return (
    <>
      {!isPortalPage && <Navbar />}
      {children}
      {!isPortalPage && <Footer contact={contact} />}
    </>
  );
}
