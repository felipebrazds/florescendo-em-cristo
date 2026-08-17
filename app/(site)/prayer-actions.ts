"use server";

import { createClient } from "@/lib/supabase/server";

export type PrayerFormState = { error: string | null; sent: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendPrayerRequestAction(
  _prevState: PrayerFormState,
  formData: FormData
): Promise<PrayerFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const message = String(formData.get("message") ?? "").trim();

  if (!name) return { error: "Escreva seu nome.", sent: false };
  if (name.length > 120) return { error: "Nome longo demais.", sent: false };
  if (!email || !EMAIL_RE.test(email)) return { error: "Digite um e-mail válido.", sent: false };
  if (!message) return { error: "Conte o que você gostaria de levar em oração.", sent: false };
  if (message.length > 4000) return { error: "Seu pedido é longo demais — resuma um pouco, por favor.", sent: false };

  const supabase = await createClient();
  const { error } = await supabase.from("prayer_requests").insert({ name, email, message });

  if (error) {
    return { error: "Não consegui enviar agora. Tenta de novo em instantes.", sent: false };
  }

  return { error: null, sent: true };
}
