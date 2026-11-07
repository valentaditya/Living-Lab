"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ExternalLink, Eye } from "lucide-react";

/**
 * Merender komponen publik pada lebar desain aslinya lalu mengecilkannya
 * agar muat di kolom pratinjau, jadi tampilannya sama seperti di website.
 */
export function PreviewFrame({
  width,
  children,
  className = "bg-white",
}: {
  width: number;
  children: ReactNode;
  className?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ scale: 1, height: 0, offset: 0 });

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const update = () => {
      const available = outer.clientWidth;
      const scale = Math.min(1, available / width);
      setBox({
        scale,
        height: inner.offsetHeight * scale,
        offset: Math.max(0, (available - width) / 2),
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(outer);
    observer.observe(inner);
    update();
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={outerRef} className={`relative overflow-hidden ${className}`} style={{ height: box.height || undefined }}>
      <div
        ref={innerRef}
        inert
        className="absolute left-0 top-0 select-none"
        style={{ width, transform: `translateX(${box.offset}px) scale(${box.scale})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}

/** Kolom pratinjau yang menempel saat discroll (khusus layar lebar). */
export function PreviewPanel({
  path,
  children,
  note,
}: {
  path?: string;
  children: ReactNode;
  note?: string;
}) {
  return (
    <aside aria-label="Pratinjau tampilan" className="hidden xl:block xl:sticky xl:top-6 xl:self-start">
      <div className="overflow-hidden rounded-2xl border border-[#e5ebe4] bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-[#e5ebe4] bg-[#f6f8f5] px-4 py-2.5">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-[#526157]">
            <Eye size={14} aria-hidden="true" /> Pratinjau di website
          </span>
          {path && (
            <a
              href={path}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#1b7a43] hover:underline"
            >
              {path} <ExternalLink size={12} aria-hidden="true" />
            </a>
          )}
        </div>
        <div className="max-h-[calc(100vh-7rem)] space-y-4 overflow-y-auto bg-[#eef1ee] p-4">{children}</div>
        {note && <p className="border-t border-[#e5ebe4] px-4 py-2 text-[11px] text-[#87938a]">{note}</p>}
      </div>
    </aside>
  );
}

/** Judul kecil di atas tiap bingkai pratinjau. */
export function PreviewLabel({ children }: { children: ReactNode }) {
  return <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-[#87938a]">{children}</p>;
}

/** Gambar abu-abu untuk foto yang belum dipilih / URL yang belum lengkap. */
export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="600" height="400" fill="#e5e7eb"/><text x="300" y="210" font-family="sans-serif" font-size="22" fill="#9ca3af" text-anchor="middle">Belum ada gambar</text></svg>',
  );

export function safeImage(src: string) {
  return /^(https?:\/\/[^\s]+\.[^\s]+|\/[^/]|data:image\/)/.test(src) ? src : PLACEHOLDER_IMAGE;
}
