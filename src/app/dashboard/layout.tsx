import { redirect } from "next/navigation";
import { hasValidSession } from "@/lib/auth";
import { DashboardShell } from "./DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await hasValidSession())) {
    redirect("/login");
  }

  return <DashboardShell>{children}</DashboardShell>;
}
