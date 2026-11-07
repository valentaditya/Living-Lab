'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  /** Nilai akhir, boleh berawalan/berakhiran teks, mis. "45+" atau "1.500". */
  value: string;
  /** Durasi animasi dalam milidetik. */
  duration?: number;
  className?: string;
}

/** Memisahkan "45+" menjadi awalan "", angka 45, akhiran "+". */
function parseValue(value: string) {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!match) return null;
  const number = Number(match[2].replace(/[.,]/g, ''));
  return Number.isFinite(number) ? { prefix: match[1], number, suffix: match[3] } : null;
}

const formatNumber = (number: number) => new Intl.NumberFormat('id-ID').format(number);

/**
 * Angka yang menghitung dari 0 ke nilai akhir saat pertama kali terlihat di layar.
 * Pembaca layar langsung mendapat nilai akhir; pengguna "reduce motion" tidak
 * melihat animasi.
 */
export const CountUp: React.FC<CountUpProps> = ({ value, duration = 1600, className = '' }) => {
  const parsed = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!parsed || !element) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(parsed.number);
      return;
    }

    let frame = 0;
    const animate = () => {
      // Waktu mulai diambil dari frame pertama; timestamp rAF bisa sedikit lebih awal
      // dari performance.now() sehingga progres tidak boleh negatif.
      let start: number | null = null;
      const step = (now: number) => {
        start ??= now;
        const progress = Math.min(1, Math.max(0, (now - start) / duration));
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setCurrent(Math.round(parsed.number * eased));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    // Mulai begitu kartu (bukan hanya angkanya) mulai terlihat; cukup sekali.
    // Kartu statistik ada di tepi bawah layar saat halaman baru dibuka.
    const target = element.parentElement ?? element;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          animate();
        }
      },
      { threshold: 0 },
    );
    observer.observe(target);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // parsed diturunkan dari value; cukup bergantung pada value dan duration.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  if (!parsed) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="tabular-nums">
        {parsed.prefix}
        {formatNumber(current)}
        {parsed.suffix}
      </span>
    </span>
  );
};
