"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signInAction } from "@/app/admin/auth-actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(signInAction, { error: null });

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6vw" }}>
      <div style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, textAlign: "center" }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: "var(--color-ink)" }}>Florescendo</span>
          <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 22, color: "var(--color-accent)" }}>em Cristo</span>
          <span style={{ marginTop: 10, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-accent-2)" }}>
            Área da autora
          </span>
        </div>

        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label className="admin-label" htmlFor="email">E-mail</label>
            <input className="admin-input" id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label className="admin-label" htmlFor="password">Senha</label>
            <input className="admin-input" id="password" name="password" type="password" autoComplete="current-password" required />
          </div>

          {state.error ? (
            <p style={{ margin: 0, fontSize: 14, color: "#b00020" }}>{state.error}</p>
          ) : null}

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
            {pending ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
          <Link href="/admin/forgot-password">Esqueci minha senha</Link>
          <Link href="/">← Voltar ao site</Link>
        </div>
      </div>
    </div>
  );
}
