import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getAccountSummary } from "@/lib/admin-profile";
import { DashboardShell } from "./DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminSession();
  if (!admin) {
    redirect("/login");
  }

  const account = await getAccountSummary(admin);
  return <DashboardShell account={account}>{children}</DashboardShell>;
}
