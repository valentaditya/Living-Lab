import { CMSAdminEditor } from "../CMSAdminEditor";

export default async function NewsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  return (
    <CMSAdminEditor
      section="news"
      initialTab={tab === "agenda" ? "agenda" : "news"}
    />
  );
}
