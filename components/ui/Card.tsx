export function Card({
  children,
  className = "",
  padded = true,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return <div className={`bg-white border border-line rounded-2xl shadow-card ${padded ? "p-5" : ""} ${className}`}>{children}</div>;
}
