export type Role = "social" | "design" | "video" | "edit" | "ads" | "account" | "management";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
}
