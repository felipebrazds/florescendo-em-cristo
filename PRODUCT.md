# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Christian women navigating faith in the middle of ordinary routine — home, family, and quiet/silent struggles (waiting, loss, restarting, fatigue). Explicitly not gated by spiritual maturity: the "Sobre" page states there is no minimum level of faith required to belong here. The site is voiced by **Bruna Figueiredo**, a real author (esposa, mãe de 3) writing personally to this audience — confirmed as a real, real-launch project, not a demo persona.

## Product Purpose

**Florescendo em Cristo** ("Blossoming in Christ") is a devotional blog — "um lugar de descanso para a alma" (a place of rest for the soul). It publishes devotionals, bible studies (estudos), and testimonies (testemunhos) grounded in one author's lived faith rather than institutional teaching. Success means readers finding calm, honest spiritual encouragement amid daily overload, and subscribing to the weekly newsletter ("Carta semanal," sent Thursdays) to stay connected.

## Positioning

Word first, not opinion first — "tudo que escrevo passa pela Bíblia antes de passar pela minha opinião." Honest about real struggles without turning guilt into content. A deliberately calm, delicate reading space inside a rushed internet. Voiced by one real, named author rather than an editorial team or brand persona — personal, lived-experience writing, not generic devotional aggregation.

## Operating Context

- Public site: home (latest posts, categories, testimony spotlight, newsletter CTA), post detail pages, "Sobre" (author bio, origin story, values, family life), category browsing.
- Content pillars: **Estudos** (bible studies) and **Testemunhos** (testimonies) are the confirmed active categories, with **Família** (family/maternity) an intended third pillar per nav and footer copy. "Devocionais" was deliberately removed as a distinct filterable database category — devotional tone runs through all content rather than being its own browsable type.
- Weekly cadence: a short devotional letter ("Carta semanal") is intended to go out by email every Thursday; the on-page signup form is not yet wired to a delivery provider.
- A "pedido de oração" (prayer request) link exists in the UI but is not yet wired to any destination.
- Admin/CMS: single-author area ("Área da autora") behind Supabase auth login, no public signup — accounts are provisioned directly rather than self-served. Bruna writes and edits posts with a Tiptap rich-text editor, setting category, status (draft/published), cover image, and reading time from `/admin`.
- Language: Brazilian Portuguese throughout, including scripture quotations.

## Capabilities and Constraints

- Built on Next.js 16 (App Router) + React 19, with Supabase (Postgres + Auth) as the backend. Posts, categories, and profiles are Supabase tables; an `is_admin` Postgres function backs row-level security for the author role.
- Public read paths (home, post list, post detail) only query `status = "published"`; the admin dashboard reads all posts (draft + published) for the authenticated author, relying on Supabase RLS rather than app-level filtering to keep drafts private.
- The homepage testimony quote ("Eu achava que estava seca…") and the "toda semana, uma história nova" claim are inherited placeholder copy from the original AI-prototype export, not yet backed by real testimony content. Future work must not extend or repeat this pattern as confirmed fact — replace it with real material (or mark it explicitly draft) before launch.
- Newsletter subscription and prayer-request forms are visually complete but not yet functionally wired to any provider or destination.
- A prior version of the site existed as a static HTML export (`_legacy-export/static-html-v1/`) from an AI site-builder prototype. The current codebase is a from-scratch Next.js + Supabase rebuild of that prototype's design and content, not a port of its code.

## Brand Commitments

- Name: **Florescendo em Cristo**. Tagline: "Um lugar de descanso para a alma."
- Author identity: **Bruna Figueiredo** — esposa, mãe de 3, escritora — is a real person and the site's sole voice. Bio, "Sobre" narrative, and post content are hers and must stay attributed to her, never to a team or generic brand persona.
- Recurring scriptural motif: "o lírio entre os espinhos" (the lily among thorns), echoed in the homepage hero copy and hero photography.
- Named recurring format: the weekly email is called "Carta semanal."

## Evidence on Hand

- Real photography in use on the home page: `/public/images/lirios-1.jpg` (white lilies) and `/public/images/maos-biblia-1.png` (hands on a Bible).
- No confirmed author portrait yet — the "Sobre" page still shows a photo placeholder for Bruna, plus a second placeholder for a family/coffee-table photo.
- No real testimonies, subscriber counts, press, or third-party proof exist yet. The homepage testimony block is inherited placeholder content (see Capabilities and Constraints) — do not treat it as real evidence to build on.

## Product Principles

1. Word before opinion — everything published is checked against Scripture first.
2. Honesty without weight — name real struggles without turning guilt into content.
3. Delicacy as care — stay a calm, unhurried place to read, deliberately unlike the rest of the internet.
4. One real voice — the blog speaks as Bruna, a specific person, never an institutional or editorial "we."
5. No minimum faith level to enter — devotionals speak to women waiting, restarting, or already grounded alike, without gatekeeping.
