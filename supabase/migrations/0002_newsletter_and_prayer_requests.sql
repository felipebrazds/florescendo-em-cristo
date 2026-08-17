-- Florescendo em Cristo — captura de newsletter e pedidos de oração
-- Duas tabelas de "caixa de entrada": qualquer visitante pode inserir uma
-- linha (assinar a carta semanal / enviar um pedido de oração), mas só a
-- Bruna (role='admin', via is_admin() já criada na migration 0001) pode ler
-- o conteúdo depois. Sem service role key no app — RLS cobre os dois casos.

-- ---------------------------------------------------------------------------
-- newsletter_subscribers
-- ---------------------------------------------------------------------------
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

comment on table public.newsletter_subscribers is 'E-mails que pediram a Carta semanal. Insert público (RLS), leitura só para admin.';

alter table public.newsletter_subscribers enable row level security;

create policy "newsletter_subscribers_public_insert"
  on public.newsletter_subscribers for insert
  with check (true);

create policy "newsletter_subscribers_admin_select"
  on public.newsletter_subscribers for select
  using (public.is_admin());

create policy "newsletter_subscribers_admin_delete"
  on public.newsletter_subscribers for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- prayer_requests
-- ---------------------------------------------------------------------------
create table public.prayer_requests (
  id uuid primary key default gen_random_uuid(),
  name text,
  message text not null,
  created_at timestamptz not null default now()
);

comment on table public.prayer_requests is 'Pedidos de oração enviados pelo site. Insert público (RLS), leitura só para admin.';

alter table public.prayer_requests enable row level security;

create policy "prayer_requests_public_insert"
  on public.prayer_requests for insert
  with check (char_length(message) between 1 and 4000);

create policy "prayer_requests_admin_select"
  on public.prayer_requests for select
  using (public.is_admin());

create policy "prayer_requests_admin_delete"
  on public.prayer_requests for delete
  using (public.is_admin());
