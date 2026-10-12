"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Pill } from "@/components/ui/Pill";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { TeamMemberForm } from "@/components/team/TeamMemberForm";
import { roleLabel } from "@/lib/config";
import type { TeamMember } from "@/lib/types";

export function TeamClient({ members, currentId }: { members: TeamMember[]; currentId: string }) {
  const router = useRouter();
  const [editing, setEditing] = useState<TeamMember | null>(null);

  const done = () => {
    setEditing(null);
    router.refresh();
  };

  return (
    <div>
      <PageHeader title="Ekip" description="Sisteme giriş yapabilen herkes burada kayıtlı olmalı." />

      <div className="flex flex-col xl:flex-row gap-6 items-start">
        <div className="flex-1 min-w-0 w-full">
          {members.length ? (
            <div className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-3">
              {members.map((m) => (
                <button key={m.id} onClick={() => setEditing(m)} className="text-left">
                  <Card className="flex items-center gap-3 hover:border-black/15 transition-colors">
                    <Avatar name={m.name} src={m.avatar_url} />
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">
                        {m.name} {m.id === currentId && <span className="text-xs text-mute font-normal">(sen)</span>}
                      </div>
                      <div className="mt-1"><Pill tone="brand">{roleLabel(m.role)}</Pill></div>
                      <div className="text-xs text-black/40 truncate mt-1">{m.email}</div>
                    </div>
                  </Card>
                </button>
              ))}
            </div>
          ) : (
            <EmptyState title="Henüz ekip üyesi yok" description="Sağdaki formdan ilkini ekle." />
          )}
        </div>

        <Card className="w-full xl:w-[320px] xl:shrink-0 xl:sticky xl:top-[96px]">
          <h2 className="text-[15px] font-medium mb-4">Ekip üyesi ekle</h2>
          <TeamMemberForm onDone={() => router.refresh()} />
        </Card>
      </div>

      {editing && (
        <Modal title="Ekip üyesini düzenle" onClose={() => setEditing(null)}>
          <TeamMemberForm initial={editing} canDelete={editing.id !== currentId} onDone={done} />
        </Modal>
      )}
    </div>
  );
}
