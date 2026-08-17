"use server";

import { createClient } from "@/lib/supabase/server";

export type PrayerFormState = { error: string | null; sent: boolean };

export async function sendPrayerRequestAction(
  _prevState: PrayerFormState,
  formData: FormData
): Promise<PrayerFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!message) {
    return { error: "Escreva seu pedido antes de enviar.", sent: false };
  }
  if (message.length > 4000) {
    return { error: "Seu pedido é longo demais — resuma um pouco, por favor.", sent: false };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("prayer_requests").insert({
    name: name || null,
    message,
  });

  if (error) {
    return { error: "Não consegui enviar agora. Tenta de novo em instantes.", sent: false };
  }

  return { error: null, sent: true };
}
