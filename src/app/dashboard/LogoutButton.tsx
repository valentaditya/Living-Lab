"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");

  async function logout() {
    setError("");
    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) {
        throw new Error("Logout request failed.");
      }
      router.replace("/login");
      router.refresh();
    } catch {
      setError("Tidak dapat keluar. Silakan coba lagi.");
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={logout}
        disabled={isLoggingOut}
        className="rounded-lg border border-[#dce4dc] px-3.5 py-2 text-sm font-medium text-[#385944] transition hover:border-[#9db3a0] disabled:opacity-60"
      >
        {isLoggingOut ? "Keluar..." : "Keluar"}
      </button>
      {error && (
        <span role="alert" className="text-xs text-red-700">
          {error}
        </span>
      )}
    </div>
  );
}
