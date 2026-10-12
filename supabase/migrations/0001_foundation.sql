-- 0001 — Temel: ekip tablosu + erişim kuralları.
-- Supabase > SQL Editor'de çalıştır. Sonraki migration'lar sırayla gelecek.

create extension if not exists "pgcrypto";

-- ============ Ekip ============
create table team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique check (email = lower(email)),
  role text not null check (role in ('social', 'design', 'video', 'edit', 'ads', 'account', 'management')),
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============ Ortak: updated_at otomatik güncellensin ============
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger team_members_updated_at before update on team_members
  for each row execute function set_updated_at();

-- ============ Erişim kuralı ============
-- Giriş yapmış olmak yetmez: e-postanın ekip tablosunda kayıtlı olması gerekir.
-- (Yoksa herhangi biri kendi mailiyle giriş linki isteyip tüm veriyi okuyabilirdi.)
create or replace function is_team_member() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from team_members
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

alter table team_members enable row level security;
create policy "team_all" on team_members for all
  using (is_team_member()) with check (is_team_member());

-- Sonraki tablolar için kalıp:
--   alter table <t> enable row level security;
--   create policy "team_all" on <t> for all using (is_team_member()) with check (is_team_member());
