"use client";

import { useRef, useState, useTransition } from "react";
import { IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { ROLES } from "@/lib/config";
import { createMember, updateMember, deleteMember, type ActionResult } from "@/lib/actions/team";
import type { TeamMember } from "@/lib/types";

export function TeamMemberForm({
  initial,
  canDelete = false,
  onDone,
}: {
  initial?: TeamMember;
  canDelete?: boolean;
  onDone?: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const finish = (result: ActionResult, reset = false) => {
    if (result.error) return setError(result.error);
    if (reset) formRef.current?.reset();
    onDone?.();
  };

  const submit = (fd: FormData) => {
    setError(null);
    startTransition(async () => {
      finish(initial ? await updateMember(initial.id, fd) : await createMember(fd), !initial);
    });
  };

  const remove = () => {
    if (!initial || !confirm(`${initial.name} ekipten çıkarılsın mı?`)) return;
    setError(null);
    startTransition(async () => finish(await deleteMember(initial.id)));
  };

  return (
    <form ref={formRef} action={submit} className="flex flex-col gap-4">
      <Field label="İsim">
        <Input name="name" required defaultValue={initial?.name} />
      </Field>
      <Field label="Rol">
        <Select name="role" required defaultValue={initial?.role ?? ""}>
          <option value="" disabled>Seç</option>
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </Select>
      </Field>
      <Field label="E-posta" hint="Giriş bu adresle yapılır.">
        <Input name="email" type="email" required defaultValue={initial?.email} placeholder="ad@sirket.com" />
      </Field>
      <Field label="Telefon (WhatsApp)">
        <Input name="phone" type="tel" defaultValue={initial?.phone ?? ""} placeholder="+90 5xx xxx xx xx" />
      </Field>

      {error && <div className="text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2">{error}</div>}

      <div className="flex gap-2 mt-1">
        {initial && canDelete && (
          <Button variant="danger" onClick={remove} disabled={pending} aria-label="Sil" className="w-10 px-0">
            <IconTrash size={16} />
          </Button>
        )}
        <Button type="submit" variant="primary" disabled={pending} className="flex-1">
          {pending ? "Kaydediliyor…" : initial ? "Kaydet" : "Ekle"}
        </Button>
      </div>
    </form>
  );
}
