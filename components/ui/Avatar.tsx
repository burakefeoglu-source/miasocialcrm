const initials = (name: string) =>
  name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

export function Avatar({ name, src, size = 40 }: { name: string; src?: string | null; size?: number }) {
  const style = { width: size, height: size, fontSize: Math.max(10, size * 0.34) };
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} style={style} className="rounded-full object-cover bg-black/5 shrink-0" />;
  }
  return (
    <div style={style} className="rounded-full bg-brand-100 text-brand font-medium flex items-center justify-center shrink-0">
      {initials(name)}
    </div>
  );
}
