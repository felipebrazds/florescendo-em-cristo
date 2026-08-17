import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts, getCategories } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { NewsletterSection } from "@/components/newsletter-section";

export const revalidate = 60;

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getPublishedPosts(6), getCategories()]);
  const latestPost = posts[0];

  // Em telas largas a grade usa uma coluna por categoria; em mobile/tablet
  // ela sempre empilha (ver .categories-grid em globals.css).
  const categoriesGridStyle: CSSProperties & { "--cat-cols"?: number } = {
    gap: 1,
    background: "var(--color-line-strong)",
    borderTop: "1px solid var(--color-line-strong)",
    borderBottom: "1px solid var(--color-line-strong)",
    "--cat-cols": Math.max(categories.length, 1),
  };

  return (
    <>
      <section className="hero-grid" style={{ alignItems: "stretch", borderBottom: "1px solid var(--color-line)" }}>
        <div className="hero-copy" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 26 }}>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 300,
              fontSize: "clamp(36px, 4vw + 22px, 64px)",
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              color: "var(--color-ink)",
              textWrap: "pretty",
            }}
          >
            Como o lírio
            <br />
            entre os espinhos,
            <br />
            <em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--color-accent)" }}>
              floresça onde
              <br />
              Deus te plantou.
            </em>
          </h1>
          <p style={{ margin: 0, maxWidth: "44ch", fontSize: 17, lineHeight: 1.75, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
            <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>Um lugar de descanso para a alma</em> — estudos, testemunhos e histórias reais para mulheres que caminham com Cristo no meio da rotina, da casa e das lutas silenciosas.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 18, rowGap: 14, paddingTop: 6 }}>
            <Link
              href={latestPost ? `/posts/${latestPost.slug}` : "#"}
              className="btn-dark"
              style={{ padding: "15px 30px", color: "var(--color-bg)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              Ler o último escrito
            </Link>
            <a href="#escritos" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", borderBottom: "1px solid var(--color-line-strong)", paddingBottom: 3 }}>
              Conhecer o blog
            </a>
          </div>
        </div>
        <div className="photo-placeholder hero-photo">
          <Image
            src="/images/lirios-1.jpg"
            alt="Lírios brancos com luz suave"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      <section
        className="verse-bar"
        style={{
          justifyContent: "center",
          padding: "40px 6vw",
          background: "var(--color-bg-alt)",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <span className="verse-bar-rule" style={{ width: 56, height: 1, background: "var(--color-line-strong)" }} />
        <p style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(19px, 2.2vw + 14px, 26px)", fontStyle: "italic", color: "var(--color-ink-soft)", textAlign: "center", maxWidth: "60ch" }}>
          &ldquo;Observai os lírios do campo, como eles crescem; não trabalham, nem fiam.&rdquo;{" "}
          <span style={{ fontFamily: "'Lora',serif", fontStyle: "normal", fontSize: 12, letterSpacing: "0.16em", color: "var(--color-accent-2)" }}>
            MATEUS 6:28
          </span>
        </p>
        <span className="verse-bar-rule" style={{ width: 56, height: 1, background: "var(--color-line-strong)" }} />
      </section>

      <section id="escritos" style={{ padding: "clamp(56px, 8vw, 84px) 6vw" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 24, marginBottom: 44 }}>
          <h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "clamp(26px, 3vw + 20px, 38px)", color: "var(--color-ink)" }}>
            Escritos recentes
          </h2>
          <Link href="/posts" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Ver todos
          </Link>
        </div>
        {posts.length > 0 ? (
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} withExcerpt />
            ))}
          </div>
        ) : (
          <p style={{ margin: 0, maxWidth: "48ch", fontSize: 15, color: "var(--color-muted)" }}>
            Ainda não há posts publicados. Assim que a Bruna publicar o primeiro, ele aparece aqui.
          </p>
        )}
      </section>

      <section className="categories-grid" style={categoriesGridStyle}>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/categorias/${cat.slug}`}
            className="card-cat"
            style={{ display: "flex", flexDirection: "column", gap: 10, padding: "40px 26px", minHeight: 150 }}
          >
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: "var(--color-ink)" }}>{cat.name}</span>
            <span style={{ fontSize: 13, lineHeight: 1.6, color: "var(--color-muted)" }}>{cat.description}</span>
          </Link>
        ))}
      </section>

      <section className="testimony-grid" style={{ alignItems: "stretch" }}>
        <div className="photo-placeholder testimony-photo">
          <Image
            src="/images/maos-biblia-1.png"
            alt="Mãos em oração sobre a Bíblia"
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="testimony-copy" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-accent-2)" }}>
            Testemunho
          </span>
          <p style={{ margin: 0, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(22px, 2.6vw + 16px, 30px)", lineHeight: 1.45, color: "var(--color-ink)", textWrap: "pretty" }}>
            &ldquo;Eu achava que estava seca. Deus estava só me plantando mais fundo.&rdquo;
          </p>
          <p style={{ margin: 0, maxWidth: "48ch", fontSize: 16, lineHeight: 1.8, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
            Histórias de mulheres que atravessaram perdas, esperas e recomeços — e viram a fidelidade de Deus no meio disso. Toda semana, uma história nova.
          </p>
          <Link href="/categorias/testemunhos" style={{ alignSelf: "flex-start", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", borderBottom: "1px solid var(--color-line-strong)", paddingBottom: 3 }}>
            Ver testemunhos
          </Link>
        </div>
      </section>

      <NewsletterSection
        heading="Uma palavra de cuidado, toda quinta-feira"
        subtext="Uma palavra curta, um versículo para guardar e uma oração. Sem pressa, sem cobrança."
      />
    </>
  );
}
