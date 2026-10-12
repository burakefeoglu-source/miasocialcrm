import { createClient } from "@/lib/supabase/server";
import type { TeamMember } from "@/lib/types";

// Giriş yapan kullanıcıyı ve (varsa) ekip kaydını döner.
export async function getSession() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return { user: null, member: null as TeamMember | null };

  const { data } = await supabase
    .from("team_members")
    .select("*")
    .eq("email", user.email.toLowerCase())
    .maybeSingle();

  return { user, member: (data as TeamMember | null) ?? null };
}
