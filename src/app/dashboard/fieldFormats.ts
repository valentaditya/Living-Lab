/**
 * Konversi antara nilai input form (date, month, time, number) dan format teks
 * yang disimpan/ditampilkan di situs ("Nov 2024", "NOV" + "28", "09:00 - 13:00 WIB",
 * "8 mnt baca"). Format tersimpan tidak berubah, jadi situs publik tetap sama.
 */

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
// Singkatan Inggris juga dikenali, untuk data lama.
const MONTH_ALIASES: Record<string, number> = {
  may: 4, aug: 7, oct: 9, dec: 11, agt: 7, ags: 7,
};

function monthIndex(label: string) {
  const key = label.trim().slice(0, 3).toLowerCase();
  const index = MONTHS.findIndex((month) => month.toLowerCase() === key);
  return index >= 0 ? index : (MONTH_ALIASES[key] ?? -1);
}

/** "Nov 2024" → { month: "Nov", year: "2024" } (kosong jika tidak dikenali) */
export function splitMonthLabel(label: string) {
  const match = label.trim().match(/^([A-Za-z]+)\.?\s+(\d{4})$/);
  const index = match ? monthIndex(match[1]) : -1;
  return index >= 0 && match ? { month: MONTHS[index], year: match[2] } : { month: "", year: "" };
}

/** ("Nov", "2024") → "Nov 2024" */
export function joinMonthLabel(month: string, year: string) {
  return month && year ? `${month} ${year}` : "";
}

/** "8 mnt baca" → "8" */
export function readTimeToMinutes(readTime: string) {
  return readTime.match(/\d+/)?.[0] ?? "";
}

/** "8" → "8 mnt baca" */
export function minutesToReadTime(minutes: string) {
  const value = Number.parseInt(minutes, 10);
  return Number.isFinite(value) && value > 0 ? `${value} mnt baca` : "";
}

/** "2026-11-28" → { month: "NOV", day: "28" } */
export function dateInputToAgenda(value: string) {
  const [, month, day] = value.split("-").map(Number);
  if (!month || !day) return { month: "", day: "" };
  return { month: MONTHS[month - 1].toUpperCase(), day: String(day).padStart(2, "0") };
}

/** { month: "NOV", day: "28" } → "2026-11-28" (tahun berjalan, karena tahun tidak disimpan) */
export function agendaToDateInput(month: string, day: string) {
  const index = monthIndex(month);
  const dayNumber = Number.parseInt(day, 10);
  if (index < 0 || !dayNumber) return "";
  const year = new Date().getFullYear();
  return `${year}-${String(index + 1).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
}

export const TIME_ZONES = ["WIB", "WITA", "WIT"] as const;

/** "09:00 - 13:00 WIB" → { start: "09:00", end: "13:00", zone: "WIB" } */
export function parseTimeRange(value: string) {
  const times = value.match(/\d{1,2}[:.]\d{2}/g) ?? [];
  const normalize = (time?: string) =>
    time ? time.replace(".", ":").padStart(5, "0") : "";
  const zone = TIME_ZONES.find((candidate) => new RegExp(`\\b${candidate}\\b`).test(value)) ?? "WIB";
  return { start: normalize(times[0]), end: normalize(times[1]), zone };
}

/** ("09:00", "13:00", "WIB") → "09:00 - 13:00 WIB" */
export function formatTimeRange(start: string, end: string, zone: string) {
  if (!start) return "";
  return end ? `${start} - ${end} ${zone}` : `${start} ${zone}`;
}

/** Nilai unik yang tidak kosong, untuk saran isian (datalist). */
export function suggestions(values: (string | undefined)[], extra: string[] = []) {
  return [...new Set([...extra, ...values].map((value) => value?.trim()).filter(Boolean) as string[])];
}

/** Tautan yang diterima server: path internal ("/…") atau http(s). */
export const LINK_PATTERN = "(/(?!/).*|https?://.+)";
