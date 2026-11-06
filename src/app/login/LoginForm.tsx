"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result: { message?: string; redirectTo?: string } =
        await response.json();

      if (!response.ok) {
        setError(result.message ?? "Login gagal. Silakan coba lagi.");
        return;
      }

      // replace sudah mengambil halaman dashboard yang baru; refresh tambahan
      // hanya membuat dashboard dirender (dan query Supabase dijalankan) dua kali.
      router.replace(result.redirectTo ?? "/dashboard");
    } catch {
      setError("Tidak dapat terhubung ke server. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAF8] font-[var(--font-geist-sans)] text-[#1E3528]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden min-h-screen overflow-hidden bg-[#1E3528] text-white lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#14291e]/65 via-[#14291e]/35 to-[#14291e]/75" />

          <Link href="/" className="relative z-10 flex w-fit items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1.5">
              <Image
                src="/pictures/icon.png"
                alt=""
                width={512}
                height={512}
                className="h-full w-full object-contain"
              />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-wide">
                Living Lab Sungai
              </span>
              <span className="mt-1 block text-[10px] font-medium tracking-[0.15em] text-white/75">
                UNIVERSITAS ATMA JAYA YOGYAKARTA
              </span>
            </span>
          </Link>

          <div className="relative z-10 max-w-xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#D5E8B7]">
              Riset • Kolaborasi • Restorasi
            </p>
            <h1 className="text-4xl font-semibold leading-[1.12] tracking-[-0.035em] xl:text-5xl">
              Merawat sungai,
              <br />
              bersama masyarakat.
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-white/85">
              Ruang kerja kolaboratif untuk mengelola kegiatan dan pemulihan
              sungai bersama masyarakat.
            </p>
          </div>

          <p className="relative z-10 text-xs text-white/65">
            © 2025 Living Lab Sungai Yogyakarta
          </p>
        </section>

        <section className="flex min-h-screen flex-col bg-[#F8FAF8] px-5 py-7 sm:px-8 sm:py-9 lg:px-12 lg:py-10 xl:px-16">
          <Link href="/" className="flex w-fit items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-[#E3EAE3]">
              <Image
                src="/pictures/icon.png"
                alt=""
                width={512}
                height={512}
                className="h-full w-full object-contain"
              />
            </span>
            <span>
              <span className="block text-sm font-semibold text-[#1E3528]">
                Living Lab Sungai
              </span>
              <span className="mt-0.5 block text-[9px] font-medium tracking-[0.12em] text-[#718076]">
                UNIVERSITAS ATMA JAYA YOGYAKARTA
              </span>
            </span>
          </Link>

          <div className="flex flex-1 items-center justify-center py-10 lg:py-6">
            <div className="w-full max-w-[500px] rounded-[22px] border border-[#E8EEE8] bg-white px-6 py-8 shadow-[0_12px_40px_rgba(30,53,40,0.06)] sm:px-10 sm:py-10 lg:border-transparent lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F0E8] text-[#315C40]">
                <LockKeyhole size={22} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52735B]">
                PORTAL LIVING LAB
              </p>
              <h2 className="mt-2 text-[30px] font-semibold leading-tight tracking-[-0.03em] text-[#1E3528]">
                Selamat datang
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#68766D]">
                Masuk menggunakan akun Anda untuk melanjutkan ke dashboard.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[#314438]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Masukkan email admin"
                    className="h-[52px] w-full rounded-xl border border-[#DCE5DC] bg-white px-4 text-sm text-[#1E3528] outline-none transition placeholder:text-[#98A49B] hover:border-[#B9C9BB] focus:border-[#315C40] focus:ring-4 focus:ring-[#315C40]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-[#314438]"
                  >
                    Kata sandi
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Masukkan kata sandi"
                      className="h-[52px] w-full rounded-xl border border-[#DCE5DC] bg-white px-4 pr-12 text-sm text-[#1E3528] outline-none transition placeholder:text-[#98A49B] hover:border-[#B9C9BB] focus:border-[#315C40] focus:ring-4 focus:ring-[#315C40]/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={
                        showPassword
                          ? "Sembunyikan kata sandi"
                          : "Tampilkan kata sandi"
                      }
                      aria-pressed={showPassword}
                      className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-[#7C8A80] outline-none transition hover:text-[#315C40] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#315C40]"
                    >
                      {showPassword ? (
                        <EyeOff size={18} aria-hidden="true" />
                      ) : (
                        <Eye size={18} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                <div aria-live="polite" className="min-h-11">
                  {error && (
                    <p
                      role="alert"
                      className="rounded-xl border border-[#F2C9C5] bg-[#FFF4F2] px-4 py-3 text-sm leading-5 text-[#A13D32]"
                    >
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#315C40] px-5 text-sm font-semibold text-white shadow-sm outline-none transition hover:bg-[#274C34] active:scale-[0.99] focus-visible:ring-4 focus-visible:ring-[#315C40]/20 disabled:cursor-wait disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle
                        size={17}
                        className="animate-spin"
                        aria-hidden="true"
                      />
                      Memverifikasi...
                    </>
                  ) : (
                    <>
                      Masuk ke dashboard
                      <ArrowRight size={17} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-xs leading-5 text-[#7A877D]">
                Akses ini khusus untuk pengelola Living Lab.
              </p>
            </div>
          </div>

          <p className="text-center text-[11px] text-[#97A198]">
            © 2025 Living Lab Sungai Yogyakarta
          </p>
        </section>
      </div>
    </main>
  );
}
