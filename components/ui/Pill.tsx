export type Tone = "neutral" | "brand" | "success" | "warning" | "danger";

const TONES: Record<Tone, string> = {
  neutral: "bg-black/5 text-black/60",
  brand: "bg-brand-100 text-brand",
  success: "bg-green-50 text-green-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-600",
};

export function Pill({ tone = "neutral", children }: { tone?: Tone; children: React.ReactNode }) {
  return <span className={`inline-block text-xs px-2.5 py-1 rounded-lg ${TONES[tone]}`}>{children}</span>;
}
