"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Fronteira de erro do grupo (site) — Next 16 chama com `retry`, não mais
 * `reset` (ver node_modules/next/dist/docs/01-app/01-getting-started/10-error-handling.md).
 * SiteHeader/SiteFooter não entram aqui: um erro de renderização pode ser
 * justamente em algo que eles usam, então mantemos essa página mínima e
 * autossuficiente para não arriscar derrubar a própria tela de erro.
 */
export default function SiteError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: "6vw",
        textAlign: "center",
        background: "var(--color-bg)",
      }}
    >
      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: "var(--color-ink)" }}>
        Florescendo <em style={{ fontFamily: "'Playfair Display',serif", color: "var(--color-accent)" }}>em Cristo</em>
      </span>
      <h1
        style={{
          margin: 0,
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 300,
          fontSize: "clamp(26px, 2.6vw + 16px, 36px)",
          color: "var(--color-ink)",
          textWrap: "pretty",
        }}
      >
        Algo não carregou direito.
      </h1>
      <p style={{ margin: 0, maxWidth: "44ch", fontSize: 16, lineHeight: 1.8, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
        Não foi culpa sua — tenta de novo em instantes.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginTop: 8 }}>
        <button
          type="button"
          onClick={() => retry()}
          className="btn-dark"
          style={{ padding: "15px 30px", border: "none", color: "var(--color-bg)", fontFamily: "'Lora',serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
        >
          Tentar de novo
        </button>
        <Link
          href="/"
          style={{ alignSelf: "center", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", borderBottom: "1px solid var(--color-line-strong)", paddingBottom: 3 }}
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
