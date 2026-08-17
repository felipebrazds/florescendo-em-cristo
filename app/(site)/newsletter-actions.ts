"use server";

import { createClient } from "@/lib/supabase/server";

export type NewsletterFormState = { error: string | null; subscribed: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeNewsletterAction(
  _prevState: NewsletterFormState,
  formData: FormData
): Promise<NewsletterFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return { error: "Digite um e-mail válido.", subscribed: false };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("newsletter_subscribers").insert({ email });

  if (error) {
    // Código 23505 = e-mail já assinado (unique constraint) — trata como sucesso,
    // já que o resultado que importa pra quem assinou é o mesmo.
    if (error.code === "23505") return { error: null, subscribed: true };
    return { error: "Não consegui salvar sua inscrição agora. Tenta de novo em instantes.", subscribed: false };
  }

  return { error: null, subscribed: true };
}
