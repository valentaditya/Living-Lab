"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (confirmationOpen) cancelButtonRef.current?.focus();
  }, [confirmationOpen]);

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
    <>
      <div className="flex flex-col items-end gap-1">
        <button
          type="button"
          onClick={() => {
            setError("");
            setConfirmationOpen(true);
          }}
          disabled={isLoggingOut}
          aria-label="Keluar"
          title={compact ? "Keluar" : undefined}
          className={`flex items-center justify-center gap-2 rounded-lg text-sm font-medium text-[#526157] outline-none transition hover:bg-[#FCEFED] hover:text-[#A13D32] focus-visible:ring-4 focus-visible:ring-[#315C40]/15 disabled:opacity-60 ${
            compact ? "h-9 w-9" : "px-3 py-2"
          }`}
        >
          <LogOut size={16} aria-hidden="true" />
          {!compact && (isLoggingOut ? "Keluar..." : "Keluar")}
        </button>
        {error && (
          <span role="alert" className="max-w-40 text-right text-xs text-[#A13D32]">
            {error}
          </span>
        )}
      </div>
      {confirmationOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1E3528]/35 p-4 backdrop-blur-[2px]"
            onKeyDown={(event) => {
              if (event.key === "Escape" && !isLoggingOut) {
                setConfirmationOpen(false);
                return;
              }
              if (event.key === "Tab") {
                const focusable =
                  event.currentTarget.querySelectorAll<HTMLElement>(
                    'button:not(:disabled)',
                  );
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                  event.preventDefault();
                  last?.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault();
                  first?.focus();
                }
              }
            }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !isLoggingOut) {
                setConfirmationOpen(false);
              }
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="logout-title"
              aria-describedby="logout-description"
              className="w-full max-w-sm rounded-2xl border border-[#E3E9E2] bg-white p-6 shadow-[0_20px_60px_rgba(30,53,40,0.2)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FCEFED] text-[#A13D32]">
                <LogOut size={19} aria-hidden="true" />
              </div>
              <h2
                id="logout-title"
                className="mt-4 text-lg font-semibold text-[#26372D]"
              >
                Keluar dari panel admin?
              </h2>
              <p
                id="logout-description"
                className="mt-2 text-sm leading-6 text-[#7A887E]"
              >
                Anda perlu masuk kembali untuk mengelola konten Living Lab.
              </p>
              {error && (
                <p role="alert" className="mt-3 text-xs text-[#A13D32]">
                  {error}
                </p>
              )}
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  ref={cancelButtonRef}
                  disabled={isLoggingOut}
                  onClick={() => setConfirmationOpen(false)}
                  className="rounded-xl border border-[#E3E9E2] px-4 py-2.5 text-sm font-medium text-[#526157] transition hover:bg-[#F5F7F4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#315C40]/15 disabled:opacity-60"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={isLoggingOut}
                  onClick={logout}
                  className="rounded-xl bg-[#315C40] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#274C34] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#315C40]/20 disabled:cursor-wait disabled:opacity-70"
                >
                  {isLoggingOut ? "Memproses..." : "Ya, keluar"}
                </button>
              </div>
            </section>
          </div>,
          document.body,
        )}
    </>
  );
}
