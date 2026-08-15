import { notFound } from "next/navigation";
import { getCategories, getPostByIdForAdmin } from "@/lib/posts";
import { updatePostAction } from "@/app/admin/posts-actions";
import { PostForm } from "@/components/admin/post-form";

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; created?: string }>;
}) {
  const { id } = await params;
  const { saved, created } = await searchParams;
  const [post, categories] = await Promise.all([getPostByIdForAdmin(id), getCategories()]);

  if (!post) notFound();

  const boundAction = updatePostAction.bind(null, id);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
        <h1 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 34, color: "var(--color-ink)" }}>
          Editar post
        </h1>
        {saved || created ? (
          <span style={{ fontSize: 13, color: "#2f5d34" }}>
            {created ? "Post criado ✓" : "Alterações salvas ✓"}
          </span>
        ) : null}
      </div>
      <PostForm action={boundAction} categories={categories} defaultValues={post} submitLabel="Salvar alterações" />
    </div>
  );
}
