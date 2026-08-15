import Link from "next/link";
import { getAllPostsForAdmin } from "@/lib/posts";
import { formatDateShort } from "@/lib/format";
import { DeletePostButton } from "@/components/admin/delete-post-button";

export default async function AdminDashboardPage() {
  const posts = await getAllPostsForAdmin();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 960 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24 }}>
        <h1 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 34, color: "var(--color-ink)" }}>
          Seus posts
        </h1>
        <Link href="/admin/posts/new" className="btn-dark" style={{ padding: "12px 22px", color: "var(--color-bg)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
          + Novo post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p style={{ margin: 0, fontSize: 15, color: "var(--color-muted)" }}>
          Você ainda não escreveu nenhum post. Que tal começar agora?
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", background: "#fff", border: "1px solid var(--color-line)" }}>
          {posts.map((post) => (
            <div
              key={post.id}
              data-testid="post-row"
              data-post-slug={post.slug}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "18px 22px",
                borderBottom: "1px solid var(--color-line)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "3px 8px",
                      borderRadius: 2,
                      background: post.status === "published" ? "#e4efe0" : "#f1eade",
                      color: post.status === "published" ? "#2f5d34" : "#8b6b1f",
                    }}
                  >
                    {post.status === "published" ? "Publicado" : "Rascunho"}
                  </span>
                  {post.category ? (
                    <span style={{ fontSize: 12, color: "var(--color-accent-2)" }}>{post.category.name}</span>
                  ) : null}
                </div>
                <Link href={`/admin/posts/${post.id}/edit`} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, color: "var(--color-ink)" }}>
                  {post.title || "(sem título)"}
                </Link>
                <span style={{ fontSize: 12, color: "var(--color-caption)" }}>
                  {post.published_at ? `Publicado em ${formatDateShort(post.published_at)}` : `Criado em ${formatDateShort(post.created_at)}`}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flex: "none" }}>
                <Link href={`/admin/posts/${post.id}/edit`} style={{ fontSize: 13 }}>
                  Editar
                </Link>
                {post.status === "published" ? (
                  <a href={`/posts/${post.slug}`} target="_blank" style={{ fontSize: 13 }}>
                    Ver ↗
                  </a>
                ) : null}
                <DeletePostButton id={post.id} slug={post.slug} title={post.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
