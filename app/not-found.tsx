import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Página não encontrada — Florescendo em Cristo",
};

/**
 * Cobre tanto URLs que não batem com nenhuma rota quanto os notFound()
 * lançados dentro de app/(site) (slug de post/categoria inexistente) — sem
 * um not-found.tsx mais próximo em (site), o Next sobe até este arquivo.
 * Fica na raiz (não dentro de (site)) porque só a partir daqui o Next 16
 * também cobre URLs totalmente fora de qualquer rota.
 */
export default function NotFound() {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "var(--color-bg)" }}>
      <SiteHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          padding: "clamp(72px, 14vw, 120px) 6vw",
          textAlign: "center",
          minHeight: "50vh",
          justifyContent: "center",
        }}
      >
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, letterSpacing: "0.2em", color: "var(--color-accent-2)" }}>
          404
        </span>
        <h1
          style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 300,
            fontSize: "clamp(30px, 3vw + 18px, 44px)",
            lineHeight: 1.2,
            color: "var(--color-ink)",
            textWrap: "pretty",
          }}
        >
          Essa página não floresceu por aqui.
        </h1>
        <p style={{ margin: 0, maxWidth: "46ch", fontSize: 16, lineHeight: 1.8, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
          O endereço mudou ou nunca existiu. Que tal voltar para o início e continuar a leitura por lá?
        </p>
        <Link
          href="/"
          className="btn-dark"
          style={{ marginTop: 8, padding: "15px 30px", color: "var(--color-bg)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}
        >
          Voltar ao início
        </Link>
      </div>
      <SiteFooter />
    </div>
  );
}
