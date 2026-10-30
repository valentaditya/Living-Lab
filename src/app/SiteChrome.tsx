"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./components/organisms/Navbar";
import Footer from "./components/organisms/Footer";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortalPage =
    pathname === "/login" ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/api");

  return (
    <>
      {!isPortalPage && <Navbar />}
      {children}
      {!isPortalPage && <Footer />}
    </>
  );
}
