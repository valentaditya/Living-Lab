"use client";

import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff, ImageUp, Trash2 } from "lucide-react";
import { useId, useRef, useState } from "react";
import type { AdminProfile } from "@/lib/admin-profile";
import { AdminAvatar } from "../AdminAvatar";

const cardClass = "rounded-2xl border border-[#e5ebe4] bg-white p-5 sm:p-7";
const headingClass = "text-base font-semibold text-[#24392a]";
const labelClass = "block text-xs font-medium text-[#526157]";
const inputClass =
  "mt-1.5 w-full rounded-xl border border-[#dce4dc] bg-white px-3.5 py-2.5 text-sm text-[#26392b] outline-none focus:border-[#63816a] focus:ring-4 focus:ring-[#63816a]/10 aria-[invalid=true]:border-red-300 disabled:bg-[#f5f7f4] disabled:text-[#718076]";
const primaryButtonClass =
  "rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60";
const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-[#dce4dc] bg-white px-4 py-2.5 text-sm font-semibold text-[#315b3d] transition hover:bg-[#f5f8f5] disabled:cursor-not-allowed disabled:opacity-60";

const maximumAvatarBytes = 2 * 1024 * 1024;
const avatarTypes = ["image/jpeg", "image/png", "image/webp"];

type Message = { type: "success" | "error"; text: string } | null;

function Alert({ message }: { message: Message }) {
  if (!message) return null;
  return message.type === "success" ? (
    <p role="status" className="rounded-xl bg-[#eaf4e9] px-4 py-3 text-sm text-[#315b3d]">
      {message.text}
    </p>
  ) : (
    <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
      {message.text}
    </p>
  );
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}

async function readJson(response: Response) {
  try {
    return (await response.json()) as { message?: string; field?: string; avatarUrl?: string | null };
  } catch {
    return {};
  }
}

function PasswordInput({
  label,
  value,
  onChange,
  autoComplete,
  invalid,
  describedBy,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  invalid: boolean;
  describedBy?: string;
}) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          required
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          className={`${inputClass} pr-11`}
        />
        <button
          type="button"
          onClick={() => setVisible((shown) => !shown)}
          aria-label={visible ? `Sembunyikan ${label.toLowerCase()}` : `Tampilkan ${label.toLowerCase()}`}
          className="absolute right-1.5 top-[calc(50%+3px)] -translate-y-1/2 rounded-lg p-2 text-[#7a887e] transition hover:bg-[#f3f6f3] hover:text-[#315b3d]"
        >
          {visible ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}

export function ProfileEditor({ initialProfile }: { initialProfile: AdminProfile }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const requirementsId = useId();

  const [saved, setSaved] = useState({
    fullName: initialProfile.fullName,
    phone: initialProfile.phone,
    position: initialProfile.position,
  });
  const [fields, setFields] = useState(saved);
  const [savingFields, setSavingFields] = useState(false);
  const [fieldsMessage, setFieldsMessage] = useState<Message>(null);

  const [avatarUrl, setAvatarUrl] = useState(initialProfile.avatarUrl);
  const [avatarBusy, setAvatarBusy] = useState(false);
  const [avatarMessage, setAvatarMessage] = useState<Message>(null);

  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<Message>(null);
  const [passwordField, setPasswordField] = useState<string | null>(null);

  const displayName = saved.fullName || initialProfile.email.split("@")[0] || "Admin";
  const dirty =
    fields.fullName !== saved.fullName ||
    fields.phone !== saved.phone ||
    fields.position !== saved.position;

  const requirements = [
    { label: "Minimal 8 karakter", met: passwords.newPassword.length >= 8 },
    {
      label: "Berisi huruf dan angka",
      met: /[A-Za-z]/.test(passwords.newPassword) && /[0-9]/.test(passwords.newPassword),
    },
    {
      label: "Sama dengan ulangan kata sandi",
      met: passwords.newPassword.length > 0 && passwords.newPassword === passwords.confirmPassword,
    },
  ];

  async function saveFields(event: React.FormEvent) {
    event.preventDefault();
    setSavingFields(true);
    setFieldsMessage(null);
    try {
      const response = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const result = (await readJson(response)) as { message?: string; fields?: typeof fields };
      if (!response.ok) throw new Error(result.message ?? "Gagal menyimpan profil.");
      const next = result.fields ?? fields;
      setSaved(next);
      setFields(next);
      setFieldsMessage({ type: "success", text: result.message ?? "Profil berhasil disimpan." });
      router.refresh();
    } catch (error) {
      setFieldsMessage({ type: "error", text: error instanceof Error ? error.message : "Gagal menyimpan profil." });
    } finally {
      setSavingFields(false);
    }
  }

  async function uploadAvatar(file: File) {
    setAvatarMessage(null);
    if (!avatarTypes.includes(file.type)) {
      setAvatarMessage({ type: "error", text: "Format foto harus JPG, PNG, atau WebP." });
      return;
    }
    if (file.size > maximumAvatarBytes) {
      setAvatarMessage({ type: "error", text: "Ukuran foto maksimal 2 MB." });
      return;
    }

    setAvatarBusy(true);
    try {
      const data = new FormData();
      data.set("file", file);
      const response = await fetch("/api/admin/profile/avatar", { method: "POST", body: data });
      const result = await readJson(response);
      if (!response.ok) throw new Error(result.message ?? "Gagal mengunggah foto.");
      setAvatarUrl(result.avatarUrl ?? null);
      setAvatarMessage({ type: "success", text: result.message ?? "Foto profil diperbarui." });
      router.refresh();
    } catch (error) {
      setAvatarMessage({ type: "error", text: error instanceof Error ? error.message : "Gagal mengunggah foto." });
    } finally {
      setAvatarBusy(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function deleteAvatar() {
    setAvatarBusy(true);
    setAvatarMessage(null);
    try {
      const response = await fetch("/api/admin/profile/avatar", { method: "DELETE" });
      const result = await readJson(response);
      if (!response.ok) throw new Error(result.message ?? "Gagal menghapus foto.");
      setAvatarUrl(null);
      setAvatarMessage({ type: "success", text: result.message ?? "Foto profil dihapus." });
      router.refresh();
    } catch (error) {
      setAvatarMessage({ type: "error", text: error instanceof Error ? error.message : "Gagal menghapus foto." });
    } finally {
      setAvatarBusy(false);
    }
  }

  async function changePassword(event: React.FormEvent) {
    event.preventDefault();
    setPasswordMessage(null);
    setPasswordField(null);

    const unmet = requirements.find((requirement) => !requirement.met);
    if (unmet) {
      setPasswordMessage({ type: "error", text: `Kata sandi baru belum memenuhi syarat: ${unmet.label.toLowerCase()}.` });
      setPasswordField(unmet.label.startsWith("Sama") ? "confirmPassword" : "newPassword");
      return;
    }

    setSavingPassword(true);
    try {
      const response = await fetch("/api/admin/profile/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwords),
      });
      const result = await readJson(response);
      if (!response.ok) {
        setPasswordField(result.field ?? null);
        throw new Error(result.message ?? "Gagal mengubah kata sandi.");
      }
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordMessage({ type: "success", text: result.message ?? "Kata sandi berhasil diubah." });
    } catch (error) {
      setPasswordMessage({ type: "error", text: error instanceof Error ? error.message : "Gagal mengubah kata sandi." });
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <>
      <div className="mb-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#63816a]">Akun</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#1d3024] sm:text-3xl">Profil Saya</h1>
        <p className="mt-2 text-sm leading-6 text-[#718076]">
          Atur foto, data diri, dan kata sandi akun admin Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <div className="space-y-6">
          <section aria-labelledby="avatar-heading" className={cardClass}>
            <h2 id="avatar-heading" className="sr-only">Foto profil</h2>
            <div className="flex flex-col items-center text-center">
              <AdminAvatar name={displayName} avatarUrl={avatarUrl} size={112} />
              <p className="mt-4 text-lg font-semibold text-[#1d3024]">{displayName}</p>
              <p className="text-sm text-[#718076]">{saved.position || "Pengelola situs"}</p>
              <p className="mt-1 break-all text-xs text-[#87938a]">{initialProfile.email}</p>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                id="avatar-input"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void uploadAvatar(file);
                }}
              />
              <button
                type="button"
                disabled={avatarBusy}
                onClick={() => fileInputRef.current?.click()}
                className={secondaryButtonClass}
              >
                <ImageUp size={16} aria-hidden="true" />
                {avatarBusy ? "Memproses..." : avatarUrl ? "Ganti foto" : "Unggah foto"}
              </button>
              {avatarUrl && (
                <button
                  type="button"
                  disabled={avatarBusy}
                  onClick={() => void deleteAvatar()}
                  className={`${secondaryButtonClass} text-red-700 hover:bg-red-50`}
                >
                  <Trash2 size={16} aria-hidden="true" />
                  Hapus
                </button>
              )}
            </div>
            <p className="mt-3 text-center text-xs text-[#87938a]">JPG, PNG, atau WebP, maksimal 2 MB.</p>
            {avatarMessage && (
              <div className="mt-4">
                <Alert message={avatarMessage} />
              </div>
            )}
          </section>

          <section aria-labelledby="account-heading" className={cardClass}>
            <h2 id="account-heading" className={headingClass}>Informasi akun</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ["Email", initialProfile.email],
                ["Peran", "Admin"],
                ["Bergabung sejak", formatDate(initialProfile.createdAt)],
                ["Login terakhir", formatDate(initialProfile.lastSignInAt)],
              ].map(([term, detail]) => (
                <div key={term} className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="text-[#718076]">{term}</dt>
                  <dd className="break-all font-medium text-[#26392b] sm:text-right">{detail}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <div className="space-y-6">
          <form onSubmit={saveFields} aria-labelledby="fields-heading" className={`${cardClass} space-y-5`}>
            <div>
              <h2 id="fields-heading" className={headingClass}>Data diri</h2>
              <p className="mt-1 text-sm text-[#718076]">Nama dan jabatan tampil di panel admin.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className={`${labelClass} sm:col-span-2`}>
                Nama lengkap
                <input
                  required
                  minLength={2}
                  maxLength={120}
                  autoComplete="name"
                  value={fields.fullName}
                  onChange={(event) => setFields({ ...fields, fullName: event.target.value })}
                  placeholder="Nama lengkap Anda"
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Nomor telepon
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={24}
                  value={fields.phone}
                  onChange={(event) => setFields({ ...fields, phone: event.target.value })}
                  placeholder="0812-3456-7890"
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Jabatan
                <input
                  maxLength={120}
                  autoComplete="organization-title"
                  value={fields.position}
                  onChange={(event) => setFields({ ...fields, position: event.target.value })}
                  placeholder="mis. Koordinator Konten"
                  className={inputClass}
                />
              </label>
              <label className={`${labelClass} sm:col-span-2`}>
                Email
                <input value={initialProfile.email} disabled readOnly className={inputClass} />
                <span className="mt-1.5 block font-normal text-[#87938a]">
                  Email dipakai untuk login dan diatur dari Supabase, jadi tidak bisa diubah di sini.
                </span>
              </label>
            </div>

            <Alert message={fieldsMessage} />
            <div className="flex flex-wrap items-center justify-end gap-3">
              {dirty && <span className="text-xs text-[#87938a]">Ada perubahan yang belum disimpan</span>}
              <button type="submit" disabled={savingFields || !dirty} className={primaryButtonClass}>
                {savingFields ? "Menyimpan..." : "Simpan perubahan"}
              </button>
            </div>
          </form>

          <form onSubmit={changePassword} aria-labelledby="password-heading" className={`${cardClass} space-y-5`}>
            <div>
              <h2 id="password-heading" className={headingClass}>Ubah kata sandi</h2>
              <p className="mt-1 text-sm text-[#718076]">
                Masukkan kata sandi lama untuk memastikan ini memang Anda.
              </p>
            </div>

            {/* Membantu pengelola kata sandi mengenali akun yang diubah */}
            <input type="email" autoComplete="username" value={initialProfile.email} readOnly hidden />

            <PasswordInput
              label="Kata sandi lama"
              autoComplete="current-password"
              value={passwords.currentPassword}
              onChange={(value) => setPasswords({ ...passwords, currentPassword: value })}
              invalid={passwordField === "currentPassword"}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <PasswordInput
                label="Kata sandi baru"
                autoComplete="new-password"
                value={passwords.newPassword}
                onChange={(value) => setPasswords({ ...passwords, newPassword: value })}
                invalid={passwordField === "newPassword"}
                describedBy={requirementsId}
              />
              <PasswordInput
                label="Ulangi kata sandi baru"
                autoComplete="new-password"
                value={passwords.confirmPassword}
                onChange={(value) => setPasswords({ ...passwords, confirmPassword: value })}
                invalid={passwordField === "confirmPassword"}
                describedBy={requirementsId}
              />
            </div>

            <ul id={requirementsId} className="space-y-1.5 text-xs">
              {requirements.map((requirement) => (
                <li
                  key={requirement.label}
                  className={`flex items-center gap-2 ${requirement.met ? "text-[#315b3d]" : "text-[#87938a]"}`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full ${
                      requirement.met ? "bg-brand text-white" : "border border-[#c9d3ca]"
                    }`}
                  >
                    {requirement.met && <Check size={11} strokeWidth={3} aria-hidden="true" />}
                  </span>
                  {requirement.label}
                  <span className="sr-only">{requirement.met ? "(terpenuhi)" : "(belum)"}</span>
                </li>
              ))}
            </ul>

            <Alert message={passwordMessage} />
            <div className="flex justify-end">
              <button type="submit" disabled={savingPassword} className={primaryButtonClass}>
                {savingPassword ? "Memproses..." : "Ubah kata sandi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
