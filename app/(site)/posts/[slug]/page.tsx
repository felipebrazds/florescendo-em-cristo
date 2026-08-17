import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { NewsletterSection } from "@/components/newsletter-section";
import { ShareButtons } from "@/components/share-buttons";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22, padding: "clamp(52px, 8vw, 76px) 6vw 52px", textAlign: "center" }}>
          {post.category ? (
            <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent-2)" }}>
              {post.category.name}
            </span>
          ) : null}
          <h1 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(32px, 3.2vw + 18px, 58px)", lineHeight: 1.1, letterSpacing: "-0.01em", maxWidth: "18ch", textWrap: "pretty" }}>
            {post.title}
          </h1>
          {post.excerpt ? (
            <p style={{ margin: 0, maxWidth: "56ch", fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(18px, 1.6vw + 12px, 24px)", lineHeight: 1.5, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
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

        <div className="photo-placeholder" style={{ height: "clamp(240px, 40vw, 460px)", margin: "0 6vw" }}>
          {post.cover_image_url ? (
            <img src={post.cover_image_url} alt={`Capa do post ${post.title}`} />
          ) : (
            <PhotoPlaceholder caption="Capa a caminho" />
          )}
        </div>

        <div className="post-body-grid" style={{ gap: 48, padding: "clamp(48px, 8vw, 72px) 6vw 40px", alignItems: "start" }}>
          <aside className="post-share-aside" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-2)" }}>Compartilhar</span>
            <ShareButtons
              title={post.title}
              url={`${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/posts/${post.slug}`}
            />
          </aside>

          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div />
        </div>

        <div className="author-bio" style={{ display: "flex", gap: 26, margin: "20px 6vw 0", padding: "34px 0", borderTop: "1px solid var(--color-line)" }}>
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
            <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-2)" }}>Escrito por</span>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: "var(--color-ink)" }}>Bruna Figueiredo</span>
            <p style={{ margin: 0, maxWidth: "60ch", fontSize: 15, lineHeight: 1.7, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
              Esposa, mãe de 3 e escritora. Escreve sobre a fé no dia comum — entre o serviço do lar e a busca pela santificação, a graça que sustenta os dois.
            </p>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section style={{ padding: "clamp(52px, 8vw, 72px) 6vw 84px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 24, marginBottom: 40 }}>
            <h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "clamp(24px, 2.6vw + 18px, 34px)", color: "var(--color-ink)" }}>
              Continue lendo
            </h2>
            <a href="/posts" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Todos os escritos
            </a>
          </div>
          <div className="posts-grid">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      ) : (
        <div style={{ padding: "0 6vw 84px" }}>
          <a href="/posts" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            ← Todos os escritos
          </a>
        </div>
      )}

      <NewsletterSection heading="Receba uma palavra toda quinta-feira" padding={80} headingSize={40} />
    </>
  );
}
