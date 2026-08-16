# Florescendo em Cristo

Blog da Bruna Figueiredo. Next.js (App Router) + Supabase
(banco, autenticação e armazenamento de imagens), pronto para deploy na
Vercel.

- **Leitoras**: só leem — Home, Sobre e os posts. Sem login, sem conta.
- **Bruna**: escreve e administra os posts em `/admin`, atrás de login.

## Como rodar localmente

```bash
npm install
npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000). Precisa do arquivo
`.env.local` (veja `.env.example`) com a URL e a chave pública do projeto
Supabase — já está preenchido neste ambiente; se for clonar em outra
máquina, copie `.env.example` para `.env.local` e pegue os valores em
Supabase → Project Settings → API.

## Estrutura

```
app/
  (site)/            → páginas públicas: Home, /sobre, /posts/[slug]
  admin/
    login, forgot-password, update-password   → autenticação
    (protected)/       → painel da Bruna: lista de posts, novo, editar
  globals.css          → tokens de cor/tipografia + estilos compartilhados
components/           → cabeçalho, rodapé, card de post, newsletter…
components/admin/     → editor de texto rico, upload de capa, exclusão
lib/
  supabase/            → clientes Supabase (browser, server, middleware)
  posts.ts             → leitura de posts/categorias
  auth.ts              → perfil do usuário logado
  database.types.ts    → tipos gerados a partir do schema do Supabase
supabase/migrations/    → histórico do schema do banco (SQL)
proxy.ts                 → middleware do Next 16 (protege /admin, atualiza sessão)
_legacy-export/          → versões anteriores do projeto, arquivadas (não usadas)
_unused-assets/          → arquivos órfãos encontrados no projeto original (ver abaixo)
```

## Banco de dados (Supabase)

Projeto: **Florescendo em Cristo** (`nizxfpbvtglaonsnqrbf`, região
`sa-east-1`).

- `categories` — Devocionais, Estudos, Testemunhos, Família, Propósito.
  Leitura pública.
- `posts` — título, slug, resumo, conteúdo (HTML gerado pelo editor),
  capa, categoria, `status` (`draft`/`published`), data de publicação,
  tempo de leitura (calculado automaticamente). Leitura pública só enxerga
  `status='published'`; a Bruna (via RLS) enxerga tudo.
- `profiles` — 1 linha por usuário autenticado, com `role` (`admin` ou
  `reader`). É o que libera o painel `/admin` — RLS usa isso, não um
  e-mail fixo no código.
- Bucket de Storage `post-covers` — capas dos posts, upload feito direto
  do navegador da Bruna para o Supabase (o servidor Next.js nunca vê o
  arquivo).

Tudo protegido por Row Level Security — o app nunca usa a service role
key, só a chave pública (`anon`/`publishable`), então mesmo que alguém
inspecione o código do site no navegador, não consegue escrever nada sem
estar logada como admin.

### Dar acesso de administradora pra Bruna

1. No [Supabase Dashboard](https://supabase.com/dashboard/project/nizxfpbvtglaonsnqrbf/auth/users) → **Authentication → Users → Add user**, crie a conta dela (e-mail + senha, ou "send invite").
2. Rode este SQL uma vez (SQL Editor do Supabase, ou peça pra mim rodar):
   ```sql
   update public.profiles set role = 'admin' where email = 'email-da-bruna@...';
   ```
3. Ela entra em `/admin/login`. Se esquecer a senha, tem "Esqueci minha
   senha" na tela de login.

## Deploy

1. **GitHub**: crie um repositório vazio em github.com e rode:
   ```bash
   git remote add origin <URL-do-repositório>
   git branch -M main
   git push -u origin main
   ```
2. **Vercel**: importe o repositório em [vercel.com/new](https://vercel.com/new).
   Em Environment Variables, adicione as duas do `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   
   Deploy automático a cada push na `main`.
3. **Recuperação de senha em produção**: no Supabase Dashboard →
   Authentication → URL Configuration, adicione a URL da Vercel (ex.:
   `https://florescendo-em-cristo.vercel.app`) em "Redirect URLs", senão
   o link de "esqueci minha senha" não vai funcionar fora do localhost.

## O que foi feito nesta etapa

O projeto veio de uma conversão anterior para HTML estático puro
(arquivada em `_legacy-export/static-html-v1/`). Nesta etapa ele virou um
app de verdade:

- Todo o design e os textos originais foram preservados — comparei visual
  e conteúdo em cada página depois da conversão.
- Os 3 "posts" da Home eram maquete (só 1 tinha texto completo — os
  outros dois eram só título/resumo de exemplo). Não inventei o conteúdo
  que faltava: a Home agora mostra os posts reais que existirem no banco
  (hoje, só o que já estava escrito por completo). Os outros viram posts
  reais assim que a Bruna escrever e publicar.
- O quadro "Nesta série" (que citava 2 partes que não existiam) foi
  removido — não existe conceito de série no modelo de dados atual.
- O corpo de um post agora é HTML editável (título, parágrafo, citação,
  lista, link) em vez de blocos com estilo fixo escritos à mão; a caixa
  de oração em destaque do texto original virou uma citação em destaque
  comum — mesmo efeito visual, mais simples de a Bruna reproduzir
  escrevendo outro post.
- `uploads/` e `.thumbnail` do projeto original não eram usados em
  lugar nenhum e a imagem é o moodboard de **outro** projeto ("No
  Silêncio de São José") — seguem arquivados em `_unused-assets/`, fora
  do repositório (`.gitignore`), sem entrar no Git. Pode apagar a pasta
  se confirmar que não é nada seu.

## Próximos passos possíveis (não feitos, fora do pedido atual)

- Formulário de newsletter ("Quero receber") ainda é só visual — não
  salva e-mail em lugar nenhum.
- Páginas dedicadas por categoria (Devocionais, Estudos…) — hoje os
  cards da grade de categorias não linkam pra lugar nenhum.
- Compartilhar (WhatsApp/Instagram/Copiar link) no post ainda são links
  decorativos.
