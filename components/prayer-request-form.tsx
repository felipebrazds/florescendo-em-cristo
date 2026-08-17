"use client";

import { useActionState } from "react";
import Link from "next/link";
import { sendPrayerRequestAction } from "@/app/(site)/prayer-actions";

export function PrayerRequestForm() {
  const [state, formAction, pending] = useActionState(sendPrayerRequestAction, {
    error: null,
    sent: false,
  });

  if (state.sent) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: "32px 28px",
          background: "var(--color-bg-alt)",
          border: "1px solid var(--color-line)",
          textAlign: "center",
        }}
      >
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: "var(--color-ink)" }}>
          Recebido, com carinho.
        </span>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--color-ink-soft)" }}>
          Seu pedido chegou até a Bruna. Obrigada por confiar isso a nós.
        </p>
        <Link href="/" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 6 }}>
          ← Voltar ao início
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label className="admin-label" htmlFor="name">Seu nome (opcional)</label>
        <input className="admin-input" id="name" name="name" type="text" autoComplete="name" maxLength={120} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label className="admin-label" htmlFor="message">Seu pedido</label>
        <textarea
          className="admin-textarea"
          id="message"
          name="message"
          rows={6}
          required
          maxLength={4000}
          style={{ resize: "vertical" }}
        />
      </div>

      {state.error ? <p style={{ margin: 0, fontSize: 14, color: "#b00020" }}>{state.error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="btn-dark"
        style={{
          alignSelf: "flex-start",
          padding: "15px 30px",
          border: "none",
          color: "var(--color-bg)",
          fontFamily: "'Lora',serif",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          cursor: pending ? "default" : "pointer",
          opacity: pending ? 0.7 : 1,
        }}
      >
        {pending ? "Enviando…" : "Enviar pedido"}
      </button>
    </form>
  );
}
