"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Status = "checking" | "ready" | "invalid" | "saving" | "done";

export default function UpdatePasswordPage() {
  const [status, setStatus] = useState<Status>("checking");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    // O link de recuperação do Supabase entrega a sessão via #access_token
    // no fragmento da URL — só o navegador processa isso (nunca chega ao
    // servidor). O client detecta e dispara PASSWORD_RECOVERY/SIGNED_IN.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session)) {
        setStatus("ready");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setStatus((s) => (s === "checking" ? "ready" : s));
      else setTimeout(() => setStatus((s) => (s === "checking" ? "invalid" : s)), 2500);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = new FormData(e.currentTarget).get("password");
    if (typeof password !== "string" || password.length < 8) {
      setError("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }
    setStatus("saving");
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message);
      setStatus("ready");
      return;
    }
    setStatus("done");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 1200);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6vw" }}>
      <div style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", gap: 24 }}>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: "var(--color-ink)", textAlign: "center" }}>
          Definir nova senha
        </span>

        {status === "checking" ? (
          <p style={{ textAlign: "center", fontSize: 14, color: "var(--color-muted)" }}>Verificando o link…</p>
        ) : status === "invalid" ? (
          <>
            <p style={{ textAlign: "center", fontSize: 14, color: "#b00020" }}>
              Esse link de recuperação é inválido ou expirou. Peça um novo.
            </p>
            <Link href="/admin/forgot-password" style={{ textAlign: "center", fontSize: 13 }}>
              Pedir novo link
            </Link>
          </>
        ) : status === "done" ? (
          <p style={{ textAlign: "center", fontSize: 14, color: "var(--color-ink-soft)" }}>
            Senha atualizada! Entrando…
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label className="admin-label" htmlFor="password">Nova senha</label>
              <input
                className="admin-input"
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>
            {error ? <p style={{ margin: 0, fontSize: 14, color: "#b00020" }}>{error}</p> : null}
            <button
              type="submit"
              disabled={status === "saving"}
              className="btn-dark"
              style={{
                padding: "14px 24px",
                border: "none",
                color: "var(--color-bg)",
                fontFamily: "'Lora',serif",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: status === "saving" ? "default" : "pointer",
                opacity: status === "saving" ? 0.7 : 1,
              }}
            >
              {status === "saving" ? "Salvando…" : "Salvar nova senha"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
