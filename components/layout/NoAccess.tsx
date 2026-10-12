"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function NoAccess({ email }: { email: string }) {
  const router = useRouter();
  const signOut = async () => {
    await createClient().auth.signOut();
    router.push("/login");
    router.refresh();
  };
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-8 text-center">
        <h1 className="font-display text-lg font-medium mb-2">Bu hesap ekipte kayıtlı değil</h1>
        <p className="text-sm text-mute mb-6 leading-relaxed">
          <span className="text-ink">{email}</span> ile giriş yaptın ama bu adres ekip listesinde yok. Yöneticiden seni eklemesini iste.
        </p>
        <Button onClick={signOut}>Çıkış yap</Button>
      </Card>
    </main>
  );
}
