"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { estimateReadingMinutes, slugify } from "@/lib/format";

export type PostFormState = { error: string | null };

function readPostForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "");
  const categoryId = String(formData.get("category_id") ?? "") || null;
  const coverImageUrl = String(formData.get("cover_image_url") ?? "") || null;
  const status = formData.get("status") === "published" ? "published" : "draft";

  return {
    title,
    slug: slugify(slugInput || title),
    excerpt: excerpt || null,
    content,
    category_id: categoryId,
    cover_image_url: coverImageUrl,
    status,
  };
}

function revalidatePublicPages(slug?: string) {
  revalidatePath("/");
  if (slug) revalidatePath(`/posts/${slug}`);
}

export async function createPostAction(
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const fields = readPostForm(formData);
  if (!fields.title) return { error: "Dê um título ao post." };
  if (!fields.slug) return { error: "O endereço (slug) não pode ficar vazio." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("posts")
    .insert({
      ...fields,
      author_id: user?.id ?? null,
      reading_time_minutes: estimateReadingMinutes(fields.content),
      published_at: fields.status === "published" ? new Date().toISOString() : null,
    })
    .select("id, slug")
    .single();

  if (error) {
    if (error.code === "23505") return { error: "Já existe um post com esse endereço (slug). Escolha outro." };
    return { error: "Não consegui salvar o post. Tenta de novo em instantes." };
  }

  revalidatePublicPages(data.slug);
  redirect(`/admin/posts/${data.id}/edit?created=1`);
}

export async function updatePostAction(
  id: string,
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const fields = readPostForm(formData);
  if (!fields.title) return { error: "Dê um título ao post." };
  if (!fields.slug) return { error: "O endereço (slug) não pode ficar vazio." };

  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("posts")
    .select("status, published_at, slug")
    .eq("id", id)
    .maybeSingle();

  const publishedAt =
    fields.status === "published"
      ? (existing?.published_at ?? new Date().toISOString())
      : existing?.published_at ?? null;

  const { error } = await supabase
    .from("posts")
    .update({
      ...fields,
      reading_time_minutes: estimateReadingMinutes(fields.content),
      published_at: publishedAt,
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") return { error: "Já existe um post com esse endereço (slug). Escolha outro." };
    return { error: "Não consegui salvar as alterações. Tenta de novo em instantes." };
  }

  revalidatePublicPages(existing?.slug);
  revalidatePublicPages(fields.slug);
  redirect(`/admin/posts/${id}/edit?saved=1`);
}

export async function deletePostAction(id: string, slug: string) {
  const supabase = await createClient();
  await supabase.from("posts").delete().eq("id", id);
  revalidatePublicPages(slug);
  redirect("/admin");
}
