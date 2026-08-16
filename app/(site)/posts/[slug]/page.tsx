import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { NewsletterSection } from "@/components/newsletter-section";
import { formatDateLong } from "@/lib/format";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Florescendo em Cristo`,
    description: post.excerpt ?? undefined,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, 3);

  return (
    <>
      <article>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22, padding: "76px 6vw 52px", textAlign: "center" }}>
          {post.category ? (
            <span style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-accent-2)" }}>
              {post.category.name}
            </span>
          ) : null}
          <h1 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 58, lineHeight: 1.1, letterSpacing: "-0.01em", maxWidth: "18ch", textWrap: "pretty" }}>
            {post.title}
          </h1>
          {post.excerpt ? (
            <p style={{ margin: 0, maxWidth: "56ch", fontFamily: "'Cormorant Garamond',serif", fontSize: 24, lineHeight: 1.5, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
              {post.excerpt}
            </p>
          ) : null}
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 13, color: "var(--color-caption)", paddingTop: 6 }}>
            <span style={{ width: 30, height: 1, background: "var(--color-line)" }} />
            <span>
              Por Bruna Figueiredo
              {post.published_at ? ` · ${formatDateLong(post.published_at)}` : ""}
              {post.reading_time_minutes ? ` · ${post.reading_time_minutes} min de leitura` : ""}
            </span>
            <span style={{ width: 30, height: 1, background: "var(--color-line)" }} />
          </div>
        </div>

        <div className="photo-placeholder" style={{ height: 460, margin: "0 6vw", padding: 20 }}>
          {post.cover_image_url ? (
            <img src={post.cover_image_url} alt="" />
          ) : (
            <span>foto de capa — não enviada ainda</span>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr minmax(0,660px) 1fr", gap: 48, padding: "72px 6vw 40px", alignItems: "start" }}>
          <aside style={{ display: "flex", flexDirection: "column", gap: 14, position: "sticky", top: 40 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-2)" }}>Compartilhar</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
              <a href="#">WhatsApp</a>
              <a href="#">Instagram</a>
              <a href="#">Copiar link</a>
            </div>
          </aside>

          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 26, margin: "20px 6vw 0", padding: "34px 0", borderTop: "1px solid var(--color-line)" }}>
          <div
            style={{
              width: 96,
              height: 96,
              flex: "none",
              borderRadius: "50%",
              background: "repeating-linear-gradient(135deg,#F1EADE 0px,#F1EADE 7px,#EBE1D2 7px,#EBE1D2 14px)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-2)" }}>Escrito por</span>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: "var(--color-ink)" }}>Bruna Figueiredo</span>
            <p style={{ margin: 0, maxWidth: "60ch", fontSize: 15, lineHeight: 1.7, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
              Esposa, mãe de 3 e escritora. Escreve sobre a fé no dia comum — a louça, a espera e a graça que sustenta as duas.
            </p>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section style={{ padding: "72px 6vw 84px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, marginBottom: 40 }}>
            <h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 34, color: "var(--color-ink)" }}>
              Continue lendo
            </h2>
            <a href="/" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Todos os escritos
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40 }}>
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      ) : (
        <div style={{ padding: "0 6vw 84px" }}>
          <a href="/" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            ← Todos os escritos
          </a>
        </div>
      )}

      <NewsletterSection heading="Receba uma palavra toda quinta-feira" padding={80} headingSize={40} />
    </>
  );
}
