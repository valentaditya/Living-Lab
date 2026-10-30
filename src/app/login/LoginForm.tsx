"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Waves } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
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
        body: JSON.stringify({ username, password }),
      });
      const result: { message?: string; redirectTo?: string } =
        await response.json();

      if (!response.ok) {
        setError(result.message ?? "Login gagal. Silakan coba lagi.");
        return;
      }

      router.replace(result.redirectTo ?? "/dashboard");
      router.refresh();
    } catch {
      setError("Tidak dapat terhubung ke server. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7f3] font-sans text-[#18271e]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-[#10281f] px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(121,165,112,0.28),transparent_48%),radial-gradient(ellipse_at_90%_85%,rgba(52,104,75,0.5),transparent_45%)]" />
          <div className="absolute -bottom-28 -left-20 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute -bottom-16 -left-8 h-72 w-72 rounded-full border border-white/10" />
          <Link href="/" className="relative flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
              <Waves size={23} strokeWidth={1.7} />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-wide">
                Living Lab Sungai
              </span>
              <span className="mt-0.5 block text-[10px] tracking-[0.16em] text-white/60">
                UNIVERSITAS ATMA JAYA YOGYAKARTA
              </span>
            </span>
          </Link>

          <div className="relative max-w-xl pb-8">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-[#c5d8bb]">
              Riset • Kolaborasi • Restorasi
            </p>
            <h1 className="text-4xl font-semibold leading-[1.18] tracking-tight xl:text-5xl">
              Merawat sungai,
              <br />
              bersama masyarakat.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
              Masuk ke ruang kerja Living Lab untuk mengelola kegiatan,
              pemantauan, dan kolaborasi pemulihan sungai.
            </p>
          </div>
          <p className="relative text-xs text-white/45">
            © 2025 Living Lab Sungai Yogyakarta
          </p>
        </section>

        <section className="flex min-h-screen flex-col px-6 py-7 sm:px-10 lg:px-14 xl:px-24">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <Waves size={22} className="text-[#416d50]" />
            <span className="text-sm font-semibold">Living Lab Sungai</span>
          </Link>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-14">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8efe7] text-[#416d50]">
              <LockKeyhole size={21} strokeWidth={1.8} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#63816a]">
              Portal Living Lab
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1d3024]">
              Selamat datang
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#718076]">
              Masuk menggunakan akun Anda untuk melanjutkan ke dashboard.
            </p>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-[#314438]"
                >
                  Nama pengguna
                </label>
                <input
                  id="username"
                  name="username"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Masukkan nama pengguna"
                  className="h-12 w-full rounded-xl border border-[#dce4dc] bg-white px-4 text-sm outline-none transition placeholder:text-[#a0aaa2] focus:border-[#63816a] focus:ring-4 focus:ring-[#63816a]/10"
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
                    className="h-12 w-full rounded-xl border border-[#dce4dc] bg-white px-4 pr-12 text-sm outline-none transition placeholder:text-[#a0aaa2] focus:border-[#63816a] focus:ring-4 focus:ring-[#63816a]/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={
                      showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
                    }
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#87938a] transition hover:text-[#385944]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#315b3d] px-5 text-sm font-semibold text-white transition hover:bg-[#274b32] focus:outline-none focus:ring-4 focus:ring-[#315b3d]/20 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Memverifikasi..." : "Masuk ke dashboard"}
                {!isSubmitting && <ArrowRight size={17} />}
              </button>
            </form>

            <p className="mt-7 text-center text-xs leading-5 text-[#87938a]">
              Akses ini khusus untuk pengelola Living Lab.
            </p>
          </div>

          <p className="text-center text-xs text-[#9aa49c]">
            Living Lab Sungai Yogyakarta
          </p>
        </section>
      </div>
    </main>
  );
}
