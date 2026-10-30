import { redirect } from "next/navigation";
import { hasValidSession } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  if (await hasValidSession()) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
