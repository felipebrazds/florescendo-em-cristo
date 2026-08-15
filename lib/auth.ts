import { createClient } from "@/lib/supabase/server";

/**
 * Current logged-in user + their profile (role included). Returns null when
 * signed out. Used by the /admin layout to gate the UI on top of RLS (which
 * already gates the data).
 */
export async function getCurrentProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return { user, profile };
}
