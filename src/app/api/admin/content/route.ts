import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getCMSContentStrict, saveCMSContent } from "@/lib/cms-content";
import { writeActivityLog } from "@/lib/activity-log";
import type { AgendaItem } from "@/types/agenda";
import type { Article } from "@/types/article";
import type { FAQItem } from "@/lib/cms-content";

export const runtime = "nodejs";

/** Halaman publik yang menampilkan konten CMS; dirender ulang setelah konten disimpan. */
const publicPagesUsingContent = ["/", "/berita", "/tentang/faq"];

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Terjadi kesalahan pada server.";
}

function isArticle(value: unknown): value is Article {
  if (!value || typeof value !== "object") return false;
  const article = value as Record<string, unknown>;
  const textFieldsAreValid = [
    "id",
    "category",
    "date",
    "readTime",
    "tag",
    "title",
    "summary",
    "author",
    "actionText",
  ].every(
    (key) =>
      typeof article[key] === "string" &&
      article[key].length > 0 &&
      article[key].length <= 4000,
  );
  const isAllowedLink = (link: unknown) =>
    typeof link === "string" &&
    link.length <= 2048 &&
    (link.startsWith("/") && !link.startsWith("//") ||
      /^https?:\/\//i.test(link));
  return (
    textFieldsAreValid &&
    isAllowedLink(article.image) &&
    (article.actionHref === undefined || isAllowedLink(article.actionHref))
  );
}

function isAgendaItem(value: unknown): value is AgendaItem {
  if (!value || typeof value !== "object") return false;
  const agenda = value as Record<string, unknown>;
  return (
    ["id", "month", "day", "tagLabel", "time", "title", "location", "buttonText"].every(
      (key) =>
        typeof agenda[key] === "string" &&
        agenda[key].length > 0 &&
        agenda[key].length <= 4000,
    ) &&
    ["green", "orange", "blue"].includes(String(agenda.tagColor))
  );
}

function isFAQItem(value: unknown): value is FAQItem {
  if (!value || typeof value !== "object") return false;
  const faq = value as Record<string, unknown>;
  return ["id", "question", "answer", "category"].every(
    (key) =>
      typeof faq[key] === "string" &&
      faq[key].length > 0 &&
      faq[key].length <= 4000,
  );
}

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    return NextResponse.json(await getCMSContentStrict(admin.supabase));
  } catch (error) {
    return NextResponse.json({ message: errorMessage(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  let content: unknown;
  try {
    content = await request.json();
  } catch {
    return NextResponse.json({ message: "Format data tidak valid." }, { status: 400 });
  }

  if (
    !content ||
    typeof content !== "object" ||
    !("settings" in content) ||
    !("articles" in content) ||
    !("agenda" in content) ||
    !("faqs" in content) ||
    !content.settings ||
    typeof content.settings !== "object" ||
    !("heroTitle" in content.settings) ||
    !("heroDescription" in content.settings) ||
    typeof content.settings.heroTitle !== "string" ||
    typeof content.settings.heroDescription !== "string" ||
    !Array.isArray(content.articles) ||
    !content.articles.every(isArticle) ||
    !Array.isArray(content.agenda) ||
    !content.agenda.every(isAgendaItem) ||
    !Array.isArray(content.faqs) ||
    !content.faqs.every(isFAQItem)
  ) {
    return NextResponse.json({ message: "Struktur konten tidak valid." }, { status: 400 });
  }

  let current;
  try {
    current = await getCMSContentStrict(admin.supabase);
  } catch (error) {
    return NextResponse.json({ message: errorMessage(error) }, { status: 500 });
  }

  const next = {
    settings: {
      heroTitle: content.settings.heroTitle.trim().slice(0, 180),
      heroDescription: content.settings.heroDescription.trim().slice(0, 500),
    },
    articles: content.articles,
    agenda: content.agenda,
    faqs: content.faqs,
  };

  if (
    next.settings.heroTitle.length === 0 ||
    next.settings.heroDescription.length === 0 ||
    next.articles.length > 200 ||
    next.agenda.length > 200 ||
    next.faqs.length > 200
  ) {
    return NextResponse.json({ message: "Jumlah konten melebihi batas." }, { status: 400 });
  }

  const updatedSections = [
    current.settings.heroTitle !== next.settings.heroTitle ||
    current.settings.heroDescription !== next.settings.heroDescription
      ? "Beranda"
      : null,
    JSON.stringify(current.articles) !== JSON.stringify(next.articles)
      ? "Berita"
      : null,
    JSON.stringify(current.agenda) !== JSON.stringify(next.agenda)
      ? "Agenda"
      : null,
    JSON.stringify(current.faqs) !== JSON.stringify(next.faqs) ? "FAQ" : null,
  ].filter((section): section is string => section !== null);

  try {
    await saveCMSContent(admin.supabase, { ...current, ...next });
  } catch (error) {
    return NextResponse.json({ message: errorMessage(error) }, { status: 500 });
  }

  publicPagesUsingContent.forEach((path) => revalidatePath(path));

  if (updatedSections.length > 0) {
    await writeActivityLog(
      admin.supabase,
      "Memperbarui konten",
      `Bagian yang diperbarui: ${updatedSections.join(", ")}.`,
      admin.email,
    );
  }
  return NextResponse.json({ message: "Konten berhasil disimpan." });
}
