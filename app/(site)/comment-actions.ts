"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CommentFormState = {
  error: string | null;
  comment: { id: string; author_name: string; body: string; created_at: string } | null;
};

export async function submitCommentAction(
  _prevState: CommentFormState,
  formData: FormData
): Promise<CommentFormState> {
  const postId = String(formData.get("post_id") ?? "").trim();
  const postSlug = String(formData.get("post_slug") ?? "").trim();
  const authorName = String(formData.get("author_name") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!postId) return { error: "Não identifiquei o post.", comment: null };
  if (!authorName) return { error: "Escreva seu nome.", comment: null };
  if (authorName.length > 120) return { error: "Nome longo demais.", comment: null };
  if (!body) return { error: "Escreva um comentário antes de enviar.", comment: null };
  if (body.length > 3000) return { error: "Comentário longo demais — resuma um pouco.", comment: null };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .insert({ post_id: postId, author_name: authorName, body })
    .select("id, author_name, body, created_at")
    .single();

  if (error || !data) {
    return { error: "Não consegui publicar seu comentário agora. Tenta de novo em instantes.", comment: null };
  }

  if (postSlug) revalidatePath(`/posts/${postSlug}`);

  return { error: null, comment: data };
}
