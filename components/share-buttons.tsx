"use client";

import { useEffect, useState } from "react";

/**
 * Compartilhar/copiar link de um post. `url` vem pronta do servidor (ver
 * app/(site)/posts/[slug]/page.tsx) em vez de ser montada a partir de
 * `window.location` no cliente — isso evita um mismatch de hidratação
 * (servidor não conhece `window`, cliente conheceria uma URL diferente da
 * enviada no HTML inicial).
 *
 * WhatsApp usa o intent público wa.me (funciona sem nenhuma integração).
 * Não existe intent de link equivalente para Instagram na web — por isso
 * "Compartilhar" usa a Web Share API nativa quando disponível (no celular
 * ela já lista o Instagram entre os apps), com "Copiar link" como
 * alternativa sempre presente.
 */
export function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  // Começa false (igual ao servidor) e só liga depois de montar no cliente,
  // pra não divergir do HTML renderizado no servidor (mismatch de hidratação).
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator.share === "function");
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function handleNativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // usuária cancelou o share sheet — nada a fazer.
    }
  }

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      {canNativeShare ? (
        <button
          type="button"
          onClick={handleNativeShare}
          style={{ background: "none", border: "none", padding: 0, font: "inherit", color: "var(--color-accent)", textAlign: "left", cursor: "pointer" }}
        >
          Compartilhar
        </button>
      ) : null}
      <button
        type="button"
        onClick={handleCopy}
        style={{ background: "none", border: "none", padding: 0, font: "inherit", color: "var(--color-accent)", textAlign: "left", cursor: "pointer" }}
      >
        {copied ? "Link copiado!" : "Copiar link"}
      </button>
    </div>
  );
}
