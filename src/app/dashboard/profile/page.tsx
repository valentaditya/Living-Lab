import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getAdminProfile, type AdminProfile } from "@/lib/admin-profile";
import { ProfileEditor } from "./ProfileEditor";

export const metadata: Metadata = {
  title: "Profil Saya | Panel Admin Living Lab",
};

export default async function ProfilePage() {
  const admin = await getAdminSession();
  if (!admin) redirect("/login");

  let profile: AdminProfile;
  try {
    profile = await getAdminProfile(admin);
  } catch (error) {
    return (
      <div className="rounded-2xl border border-[#e5ebe4] bg-white p-6 sm:p-8">
        <h1 className="text-xl font-semibold text-[#1d3024]">Profil belum bisa dimuat</h1>
        <p role="alert" className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error instanceof Error ? error.message : "Terjadi kesalahan saat memuat profil."}
        </p>
      </div>
    );
  }

  return <ProfileEditor initialProfile={profile} />;
}
