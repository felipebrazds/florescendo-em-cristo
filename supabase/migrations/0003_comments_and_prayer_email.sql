-- Florescendo em Cristo — comentários em posts + e-mail no pedido de oração
--
-- comments: leitoras deixam nome + comentário num post publicado. Insert e
-- leitura públicos (comentário aparece na hora, sem moderação prévia); só a
-- Bruna (is_admin) pode apagar.
--
-- prayer_requests: adiciona e-mail à captura já existente (nome + mensagem).
-- Nome e e-mail passam a ser exigidos via RLS (mesmo padrão já usado para o
-- tamanho da mensagem) em vez de NOT NULL na coluna, pra não quebrar as
-- linhas de teste que já existem na tabela.
--
-- Aplicada em produção via mcp__claude_ai_Supabase__apply_migration em
-- 2026-08-17 (nome da migration lá: `comments_and_prayer_email`); este
-- arquivo é o espelho local pro histórico do repo.

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  author_name text not null,
  body text not null,
  created_at timestamptz not null default now()
);

comment on table public.comments is 'Comentários de leitoras em posts publicados. Insert e leitura públicos (RLS); só admin apaga.';

create index comments_post_id_created_at_idx on public.comments (post_id, created_at);

alter table public.comments enable row level security;

create policy "comments_public_read"
  on public.comments for select
  using (true);

create policy "comments_public_insert"
  on public.comments for insert
  with check (
    char_length(author_name) between 1 and 120
    and char_length(body) between 1 and 3000
  );

create policy "comments_admin_delete"
  on public.comments for delete
  using (public.is_admin());

-- ---------------------------------------------------------------------------

alter table public.prayer_requests add column if not exists email text;

drop policy if exists "prayer_requests_public_insert" on public.prayer_requests;

create policy "prayer_requests_public_insert"
  on public.prayer_requests for insert
  with check (
    char_length(coalesce(name, '')) between 1 and 120
    and char_length(coalesce(email, '')) between 3 and 200
    and char_length(message) between 1 and 4000
  );
