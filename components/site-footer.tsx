export function SiteFooter() {
  return (
    <footer
      style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr",
        gap: 48,
        padding: "64px 6vw",
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
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-accent-2)",
            marginBottom: 6,
          }}
        >
          Conteúdo
        </span>
        <a href="#">Devocionais diários</a>
        <a href="#">Estudos bíblicos</a>
        <a href="#">Testemunhos</a>
        <a href="#">Maternidade e família</a>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--color-accent-2)",
            marginBottom: 6,
          }}
        >
          Contato
        </span>
        <a href="#">Instagram</a>
        <a href="#">E-mail</a>
        <a href="#">Pedido de oração</a>
      </div>
    </footer>
  );
}
