"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/auth";
import { ROLES } from "@/lib/config";

export type ActionResult = { error?: string };

function parse(fd: FormData): { error: string } | { values: Record<string, string | null> } {
  const name = String(fd.get("name") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim().toLowerCase();
  const role = String(fd.get("role") ?? "");
  const phone = String(fd.get("phone") ?? "").trim();

  if (!name) return { error: "İsim gerekli." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Geçerli bir e-posta gir." };
  if (!ROLES.some((r) => r.value === role)) return { error: "Rol seç." };
  return { values: { name, email, role, phone: phone || null } };
}

function dbError(code?: string): ActionResult {
  return { error: code === "23505" ? "Bu e-posta zaten ekipte kayıtlı." : "Kaydedilemedi. Tekrar dene." };
}

export async function createMember(fd: FormData): Promise<ActionResult> {
  const parsed = parse(fd);
  if ("error" in parsed) return parsed;
  const { error } = await createClient().from("team_members").insert(parsed.values);
  if (error) return dbError(error.code);
  revalidatePath("/team");
  return {};
}

export async function updateMember(id: string, fd: FormData): Promise<ActionResult> {
  const parsed = parse(fd);
  if ("error" in parsed) return parsed;
  const { error } = await createClient().from("team_members").update(parsed.values).eq("id", id);
  if (error) return dbError(error.code);
  revalidatePath("/team");
  return {};
}

export async function deleteMember(id: string): Promise<ActionResult> {
  const { member } = await getSession();
  if (member?.id === id) return { error: "Kendi hesabını silemezsin." };
  const { error } = await createClient().from("team_members").delete().eq("id", id);
  if (error) return dbError(error.code);
  revalidatePath("/team");
  return {};
}
