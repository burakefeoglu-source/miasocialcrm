# Mia Social CRM

Next.js 14 + Supabase + Tailwind. Ajans operasyonları: müşteri, içerik planı, görev, çekim, ekip.

## Kurulum

1. **Supabase:** yeni proje (bölge: Frankfurt). SQL Editor'de `supabase/migrations/` içindeki dosyaları **numara sırasıyla** çalıştır.
2. **İlk kullanıcı (sen):** SQL Editor'de
   `insert into team_members (name, email, role) values ('Adın', 'giris-yapacagin@mail.com', 'management');`
   (e-posta küçük harfle yazılmalı)
3. **Vercel:** repo'yu import et, `.env.local.example` içindeki iki değişkeni Environment Variables'a gir.
4. **Supabase > Authentication > URL Configuration:** Site URL = Vercel adresin, Redirect URLs = `<adres>/auth/callback`.
5. Siteye gir, e-postanla giriş bağlantısı iste.

## Yerelde çalıştırma

```
cp .env.local.example .env.local   # değerleri doldur
npm install && npm run dev
```

## Mimari notlar

- Erişim kuralı veritabanında: giriş yapan kişinin e-postası `team_members` tablosunda yoksa hiçbir veriyi göremez (`is_team_member()`).
- Tasarım sistemi: renk/yazı tipi `tailwind.config.ts`, ortak bileşenler `components/ui/`.
- `/api/*` rotaları giriş kontrolünden muaf (webhook'lar için); Supabase yavaşlarsa middleware 4 sn sonra giriş sayfasına yönlendirir.
