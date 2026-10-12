import type { Role } from "@/lib/types";

export const ROLES: { value: Role; label: string }[] = [
  { value: "social", label: "Sosyal medya" },
  { value: "design", label: "Tasarım" },
  { value: "video", label: "Video" },
  { value: "edit", label: "Kurgu" },
  { value: "ads", label: "Reklam" },
  { value: "account", label: "Müşteri temsilcisi" },
  { value: "management", label: "Yönetim" },
];

export const roleLabel = (role: string) => ROLES.find((r) => r.value === role)?.label ?? role;
