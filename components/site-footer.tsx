import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      className="site-footer"
      style={{
        borderTop: "1px solid var(--color-line)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <span
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 24,
            color: "var(--color-ink)",
          }}
        >
          Florescendo{" "}
          <em style={{ fontFamily: "'Playfair Display',serif", color: "var(--color-accent)" }}>
            em Cristo
          </em>
        </span>
        <p style={{ margin: 0, maxWidth: "38ch", fontSize: 14, lineHeight: 1.7, color: "var(--color-muted)" }}>
          Fé, delicadeza e verdade para o dia comum.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-accent-2)",
            marginBottom: 6,
          }}
        >
          Conteúdo
        </span>
        <Link href="/categorias/estudos">Estudos bíblicos</Link>
        <Link href="/categorias/testemunhos">Testemunhos</Link>
        <Link href="/categorias/familia">Maternidade e família</Link>
        <Link href="/categorias/proposito">Propósito</Link>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-accent-2)",
            marginBottom: 6,
          }}
        >
          Contato
        </span>
        <span style={{ color: "var(--color-caption)", cursor: "default" }}>Instagram — em breve</span>
        <span style={{ color: "var(--color-caption)", cursor: "default" }}>E-mail — em breve</span>
        <Link href="/pedido-de-oracao">Pedido de oração</Link>
      </div>
    </footer>
  );
}
