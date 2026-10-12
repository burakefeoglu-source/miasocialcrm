"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import { createClient } from "@/lib/supabase/client";
import { Avatar } from "@/components/ui/Avatar";
import { roleLabel } from "@/lib/config";
import type { TeamMember } from "@/lib/types";

export function ProfileMenu({ member }: { member: TeamMember }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const signOut = async () => {
    await createClient().auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-xl hover:bg-black/5">
        <Avatar name={member.name} src={member.avatar_url} size={36} />
        <span className="hidden md:block text-sm font-medium">{member.name.split(" ")[0]}</span>
        <IconChevronDown size={14} className="text-black/40" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-line rounded-2xl shadow-pop overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-line">
            <div className="text-sm font-medium">{member.name}</div>
            <div className="text-xs text-mute">{roleLabel(member.role)}</div>
            <div className="text-xs text-black/35 truncate">{member.email}</div>
          </div>
          <button onClick={signOut} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50">
            <IconLogout size={16} /> Çıkış yap
          </button>
        </div>
      )}
    </div>
  );
}
