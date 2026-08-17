import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getPublishedPostsByCategoryId } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} — Florescendo em Cristo`,
    description: category.description ?? undefined,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const posts = await getPublishedPostsByCategoryId(category.id);

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
          {category.name}
        </h1>
        {category.description ? (
          <p style={{ margin: 0, maxWidth: "50ch", fontSize: 17, lineHeight: 1.75, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
            {category.description}
          </p>
        ) : null}
      </div>

      <section style={{ padding: "0 6vw 84px" }}>
        {posts.length > 0 ? (
          <>
            {/* h2 "muda" (sr-only): os cards usam h3 — sem ela, o h1 pularia
                direto pro h3 e quebraria a hierarquia de headings. */}
            <h2 className="sr-only">Posts em {category.name}</h2>
            <div className="posts-grid">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} withExcerpt />
              ))}
            </div>
          </>
        ) : (
          <p style={{ margin: "0 auto", maxWidth: "48ch", fontSize: 15, color: "var(--color-muted)", textAlign: "center" }}>
            Ainda não há posts em {category.name.toLowerCase()}. Assim que a Bruna publicar o primeiro, ele aparece aqui.
          </p>
        )}
      </section>
    </>
  );
}
