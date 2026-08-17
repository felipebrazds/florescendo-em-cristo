import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Todos os escritos — Florescendo em Cristo",
  description: "Devocionais, estudos e histórias reais para mulheres que caminham com Cristo no meio da rotina.",
};

export default async function PostsIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, padding: "76px 6vw 52px", textAlign: "center", alignItems: "center" }}>
        <h1
          style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 300,
            fontSize: "clamp(36px, 4vw + 22px, 58px)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            color: "var(--color-ink)",
            textWrap: "pretty",
          }}
        >
          Todos os escritos
        </h1>
      </div>

      <section style={{ padding: "0 6vw 84px" }}>
        {posts.length > 0 ? (
          <>
            {/* h2 "muda" (sr-only): os cards usam h3 — sem ela, o h1 pularia
                direto pro h3 e quebraria a hierarquia de headings. */}
            <h2 className="sr-only">Posts publicados</h2>
            <div className="posts-grid">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} withExcerpt />
              ))}
            </div>
          </>
        ) : (
          <p style={{ margin: "0 auto", maxWidth: "48ch", fontSize: 15, color: "var(--color-muted)", textAlign: "center" }}>
            Ainda não há posts publicados. Assim que a Bruna publicar o primeiro, ele aparece aqui.
          </p>
        )}
      </section>
    </>
  );
}
