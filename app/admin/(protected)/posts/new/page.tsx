import { getCategories } from "@/lib/posts";
import { createPostAction } from "@/app/admin/posts-actions";
import { PostForm } from "@/components/admin/post-form";

export default async function NewPostPage() {
  const categories = await getCategories();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <h1 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 34, color: "var(--color-ink)" }}>
        Novo post
      </h1>
      <PostForm action={createPostAction} categories={categories} submitLabel="Salvar post" />
    </div>
  );
}
