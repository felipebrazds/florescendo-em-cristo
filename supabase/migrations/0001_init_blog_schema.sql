-- Florescendo em Cristo — schema inicial do blog
-- categories + posts (conteúdo público de leitura) e profiles (controle de quem
-- é admin). Leitoras usam só SELECT público; Bruna (role='admin') tem CRUD
-- completo via RLS, sem precisar de service role key no app.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- profiles: 1 linha por usuário autenticado (hoje, só a Bruna deve existir).
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  role text not null default 'reader' check (role in ('admin', 'reader')),
  created_at timestamptz not null default now()
);

comment on table public.profiles is 'Um perfil por usuário autenticado. role=admin libera o painel /admin.';

alter table public.profiles enable row level security;

-- checa se o usuário autenticado é admin. security definer p/ não recursar
-- nas próprias policies de profiles quando usada em outras tabelas.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

-- cria automaticamente um profile (role=reader) para qualquer novo usuário
-- do Supabase Auth. A promoção a admin é manual (ver README/SETUP).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', new.email),
    'reader'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------------
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;

create policy "categories_public_read"
  on public.categories for select
  using (true);

create policy "categories_admin_write"
  on public.categories for insert
  with check (public.is_admin());

create policy "categories_admin_update"
  on public.categories for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "categories_admin_delete"
  on public.categories for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- posts
-- ---------------------------------------------------------------------------
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null default '',
  cover_image_url text,
  category_id uuid references public.categories (id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  reading_time_minutes int,
  author_id uuid references public.profiles (id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index posts_status_published_at_idx
  on public.posts (status, published_at desc);

alter table public.posts enable row level security;

create policy "posts_public_read_published"
  on public.posts for select
  using (status = 'published' or public.is_admin());

create policy "posts_admin_write"
  on public.posts for insert
  with check (public.is_admin());

create policy "posts_admin_update"
  on public.posts for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "posts_admin_delete"
  on public.posts for delete
  using (public.is_admin());

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- storage: capas dos posts
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('post-covers', 'post-covers', true)
on conflict (id) do nothing;

create policy "post_covers_public_read"
  on storage.objects for select
  using (bucket_id = 'post-covers');

create policy "post_covers_admin_insert"
  on storage.objects for insert
  with check (bucket_id = 'post-covers' and public.is_admin());

create policy "post_covers_admin_update"
  on storage.objects for update
  using (bucket_id = 'post-covers' and public.is_admin());

create policy "post_covers_admin_delete"
  on storage.objects for delete
  using (bucket_id = 'post-covers' and public.is_admin());
