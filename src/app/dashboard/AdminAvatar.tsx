export function initialsFor(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const letters = words.length > 1 ? words[0][0] + words[words.length - 1][0] : (words[0] ?? "A").slice(0, 2);
  return letters.toUpperCase();
}

/** Foto profil bulat; tampilkan inisial nama kalau belum ada foto. */
export function AdminAvatar({
  name,
  avatarUrl,
  size = 32,
  className = "",
}: {
  name: string;
  avatarUrl: string | null;
  size?: number;
  className?: string;
}) {
  const style = { width: size, height: size, fontSize: Math.max(11, Math.round(size * 0.36)) };

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt=""
        width={size}
        height={size}
        style={style}
        className={`shrink-0 rounded-full object-cover ring-1 ring-[#E3E9E2] ${className}`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      style={style}
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#E3EEE3] font-semibold text-[#315C40] ${className}`}
    >
      {initialsFor(name)}
    </span>
  );
}
