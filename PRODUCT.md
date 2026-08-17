# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Christian women navigating faith in the middle of ordinary routine — home, family, and quiet/silent struggles (waiting, loss, restarting, fatigue). Explicitly not gated by spiritual maturity: the "Sobre" page states there is no minimum level of faith required to belong here. The site is voiced by **Bruna Figueiredo**, a real author (esposa, mãe de 3) writing personally to this audience — confirmed as a real, real-launch project, not a demo persona.

## Product Purpose

**Florescendo em Cristo** ("Blossoming in Christ") is a devotional blog — "um lugar de descanso para a alma" (a place of rest for the soul). It publishes devotionals, bible studies (estudos), and testimonies (testemunhos) grounded in one author's lived faith rather than institutional teaching. Success means readers finding calm, honest spiritual encouragement amid daily overload, engaging directly through comments on posts, and reaching out through a prayer request when something in the writing touches a real need.

## Positioning

Word first, not opinion first — "tudo que escrevo passa pela Bíblia antes de passar pela minha opinião." Honest about real struggles without turning guilt into content. A deliberately calm, delicate reading space inside a rushed internet. Voiced by one real, named author rather than an editorial team or brand persona — personal, lived-experience writing, not generic devotional aggregation.

## Operating Context

- Public site: home (latest posts, categories, testimony spotlight, prayer-request CTA), post detail pages (each with a comment section), `/posts` (full archive), `/categorias/[slug]` (per-category archive), `/pedido-de-oracao`, "Sobre" (author bio, origin story, values, family life).
- Content pillars: **Estudos** (bible studies), **Testemunhos** (testimonies), **Família** (family/maternity), and **Propósito** (purpose/calling) are the four confirmed active categories, each with its own archive page at `/categorias/<slug>` and linked from the main nav, footer, and home category grid. "Devocionais" was deliberately removed as a distinct filterable database category — devotional tone runs through all content rather than being its own browsable type.
- Newsletter signup was removed by explicit product decision (2026-08-17) — there is no email-capture feature on the site anymore. Do not reintroduce a newsletter CTA without a new explicit request; the `newsletter_subscribers` table still exists in Supabase (unused by the app) with its pre-removal rows, left untouched rather than dropped.
- Comments: every published post has a comment section (name + comment body, both required, no moderation queue — a submitted comment appears publicly right away). Backed by a `comments` Supabase table, public insert and public read, admin-only delete.
- Prayer requests: readers submit name, e-mail, and their request/situation, both inline at the bottom of Home, Sobre, and every post (`components/prayer-section.tsx`) and on a dedicated `/pedido-de-oracao` page — all three write to the same `prayer_requests` Supabase table (public insert, admin-only read). Bruna reads requests directly in Supabase for now; no email notification pipeline yet.
- Admin/CMS: single-author area ("Área da autora") behind Supabase auth login, no public signup — accounts are provisioned directly rather than self-served. Bruna writes and edits posts with a Tiptap rich-text editor, setting category, status (draft/published), cover image, and reading time from `/admin`.
- Language: Brazilian Portuguese throughout, including scripture quotations.

## Capabilities and Constraints

- Built on Next.js 16 (App Router) + React 19, with Supabase (Postgres + Auth) as the backend. Posts, categories, profiles, `prayer_requests`, and `comments` are the tables the app actually reads/writes (migrations `0001_init_blog_schema.sql`, `0002_newsletter_and_prayer_requests.sql`, `0003_comments_and_prayer_email.sql`); an unused `newsletter_subscribers` table remains from before the 2026-08-17 removal. An `is_admin` Postgres function backs row-level security for the author role.
- Public read paths (home, post list, post detail, category archives) only query `status = "published"`; the admin dashboard reads all posts (draft + published) for the authenticated author, relying on Supabase RLS rather than app-level filtering to keep drafts private.
- The homepage testimony quote ("Eu achava que estava seca…") and the "toda semana, uma história nova" claim are inherited placeholder copy from the original AI-prototype export, not yet backed by real testimony content. Future work must not extend or repeat this pattern as confirmed fact — replace it with real material (or mark it explicitly draft) before launch.
- Comment and prayer-request forms are live and functional (real Supabase writes, loading/success/error states) as of 2026-08-17. Comments publish immediately with no moderation step — a deliberate simplicity trade-off, not an oversight; revisit if spam/abuse becomes real.
- The "Instagram" and "E-mail" contact links in the footer are intentionally non-links ("em breve") — Bruna's real handle/address were never confirmed, so nothing was fabricated there.
- A prior version of the site existed as a static HTML export (`_legacy-export/static-html-v1/`) from an AI site-builder prototype. The current codebase is a from-scratch Next.js + Supabase rebuild of that prototype's design and content, not a port of its code.

## Brand Commitments

- Name: **Florescendo em Cristo**. Tagline: "Um lugar de descanso para a alma."
- Author identity: **Bruna Figueiredo** — esposa, mãe de 3, escritora — is a real person and the site's sole voice. Bio, "Sobre" narrative, and post content are hers and must stay attributed to her, never to a team or generic brand persona.
- Recurring scriptural motif: "o lírio entre os espinhos" (the lily among thorns), echoed in the homepage hero copy and hero photography.

## Evidence on Hand

- Real photography in use on the home page: `/public/images/lirios-1.jpg` (white lilies) and `/public/images/maos-biblia-1.png` (hands on a Bible).
- No confirmed author portrait yet — the "Sobre" page shows an on-brand illustrated placeholder (`components/photo-placeholder.tsx`: a line-drawn lily over a warm gradient, not the old debug-style striped box) for Bruna's portrait and for a family/coffee-table photo, until real photos are supplied.
- No real testimonies, subscriber counts, press, or third-party proof exist yet. The homepage testimony block is inherited placeholder content (see Capabilities and Constraints) — do not treat it as real evidence to build on.

## Product Principles

1. Word before opinion — everything published is checked against Scripture first.
2. Honesty without weight — name real struggles without turning guilt into content.
3. Delicacy as care — stay a calm, unhurried place to read, deliberately unlike the rest of the internet.
4. One real voice — the blog speaks as Bruna, a specific person, never an institutional or editorial "we."
5. No minimum faith level to enter — devotionals speak to women waiting, restarting, or already grounded alike, without gatekeeping.
