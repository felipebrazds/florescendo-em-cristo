import Link from "next/link";
import type { PostWithCategory } from "@/lib/posts";
import { formatDateShort } from "@/lib/format";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

/**
 * Card usado em "Escritos recentes" (Home) e "Continue lendo" (Post).
 * `withExcerpt` replica a diferença visual que já existia no protótipo
 * entre esses dois lugares.
 */
export function PostCard({
  post,
  withExcerpt = false,
}: {
  post: PostWithCategory;
  withExcerpt?: boolean;
}) {
  const meta = post.published_at
    ? `${formatDateShort(post.published_at)}${
        post.reading_time_minutes ? ` · ${post.reading_time_minutes} min` : ""
      }`
    : null;

  return (
    <Link
      href={`/posts/${post.slug}`}
      style={{ display: "flex", flexDirection: "column", gap: withExcerpt ? 16 : 14, color: "inherit" }}
    >
      <div className="photo-placeholder" style={{ aspectRatio: "4/3" }}>
        {post.cover_image_url ? (
          <img src={post.cover_image_url} alt={`Capa do post ${post.title}`} />
        ) : (
          <PhotoPlaceholder caption="Capa a caminho" />
        )}
      </div>
      {post.category ? (
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-accent-2)",
          }}
        >
          {post.category.name}
        </span>
      ) : null}
      <h3
        style={{
          margin: 0,
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 400,
          fontSize: withExcerpt ? 26 : 24,
          lineHeight: 1.25,
          color: "var(--color-ink)",
          textWrap: "pretty",
        }}
      >
        {post.title}
      </h3>
      {withExcerpt && post.excerpt ? (
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
          {post.excerpt}
        </p>
      ) : null}
      {meta ? (
        <span style={{ fontSize: 12, color: "var(--color-caption)", fontStyle: "italic" }}>{meta}</span>
      ) : null}
    </Link>
  );
}
