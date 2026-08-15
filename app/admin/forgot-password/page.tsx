"use client";

import { useActionState } from "react";
import Link from "next/link";
import { requestPasswordResetAction } from "@/app/admin/auth-actions";

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState(requestPasswordResetAction, {
    error: null,
    sent: false,
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6vw" }}>
      <div style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, textAlign: "center" }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: "var(--color-ink)" }}>
            Recuperar senha
          </span>
        </div>

        {state.sent ? (
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--color-ink-soft)", textAlign: "center" }}>
            Se esse e-mail tiver uma conta, enviamos um link para redefinir a senha. Confira sua caixa de entrada (e o spam).
          </p>
        ) : (
          <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label className="admin-label" htmlFor="email">E-mail</label>
              <input className="admin-input" id="email" name="email" type="email" autoComplete="email" required />
            </div>
            {state.error ? <p style={{ margin: 0, fontSize: 14, color: "#b00020" }}>{state.error}</p> : null}
            <button
              type="submit"
              disabled={pending}
              className="btn-dark"
              style={{
                padding: "14px 24px",
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
              {pending ? "Enviando…" : "Enviar link de recuperação"}
            </button>
          </form>
        )}

        <div style={{ textAlign: "center", fontSize: 13 }}>
          <Link href="/admin/login">← Voltar ao login</Link>
        </div>
      </div>
    </div>
  );
}
