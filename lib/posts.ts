import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/database.types";

export type PostWithCategory = Tables<"posts"> & {
  category: Pick<Tables<"categories">, "id" | "name" | "slug"> | null;
};

const POST_CARD_FIELDS =
  "id, slug, title, excerpt, content, cover_image_url, status, reading_time_minutes, published_at, created_at, updated_at, author_id, category_id, category:categories(id, name, slug)";

export async function getPublishedPosts(limit?: number) {
  const supabase = await createClient();
  let query = supabase
    .from("posts")
    .select(POST_CARD_FIELDS)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as unknown as PostWithCategory[];
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_CARD_FIELDS)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data as unknown as PostWithCategory | null;
}

export async function getRelatedPosts(excludeSlug: string, limit = 3) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_CARD_FIELDS)
    .eq("status", "published")
    .neq("slug", excludeSlug)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as unknown as PostWithCategory[];
}

/** Todos os posts (rascunho + publicado) — só retorna algo de fato se quem
 * chamar for admin; RLS filtra sozinho para qualquer outra sessão. */
export async function getAllPostsForAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_CARD_FIELDS)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as PostWithCategory[];
}

export async function getPostByIdForAdmin(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_CARD_FIELDS)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data as unknown as PostWithCategory | null;
}

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getCategoryBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getPublishedPostsByCategoryId(categoryId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(POST_CARD_FIELDS)
    .eq("status", "published")
    .eq("category_id", categoryId)
    .order("published_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as PostWithCategory[];
}
