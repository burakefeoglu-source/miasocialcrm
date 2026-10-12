import { createClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/auth";
import { TeamClient } from "@/components/team/TeamClient";
import type { TeamMember } from "@/lib/types";

export default async function TeamPage() {
  const [{ member }, { data }] = await Promise.all([
    getSession(),
    createClient().from("team_members").select("*").order("name"),
  ]);
  return <TeamClient members={(data ?? []) as TeamMember[]} currentId={member!.id} />;
}
