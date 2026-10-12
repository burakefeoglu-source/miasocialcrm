"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { Card } from "@/components/ui/Card";

function LoginForm() {
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    params.get("error") ? "Giriş bağlantısı geçersiz ya da süresi dolmuş. Yeni bir bağlantı iste." : null
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await createClient().auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) {
      setError(error.status === 429 ? "Çok fazla deneme yapıldı. Biraz bekleyip tekrar dene." : `Bağlantı gönderilemedi: ${error.message}`);
      return;
    }
    setSent(true);
  };

  return (
    <Card className="w-full max-w-sm p-8">
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center text-white font-display font-semibold">M</div>
        <span className="font-display font-medium">Mia Social CRM</span>
      </div>

      {sent ? (
        <div className="text-sm text-mute leading-relaxed">
          <span className="text-ink font-medium">{email}</span> adresine giriş bağlantısı gönderdik. Gelen kutunu kontrol et.
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Field label="Ekip e-posta adresin" error={error ?? undefined}>
            <Input type="email" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ad@sirket.com" />
          </Field>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Gönderiliyor…" : "Giriş bağlantısı gönder"}
          </Button>
        </form>
      )}
    </Card>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
