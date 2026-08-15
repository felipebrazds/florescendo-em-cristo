export function NewsletterSection({
  heading,
  subtext,
  padding = 88,
  headingSize = 42,
}: {
  heading: string;
  subtext?: string;
  padding?: number;
  headingSize?: number;
}) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
        padding: `${padding}px 6vw`,
        background: "var(--color-ink)",
        color: "var(--color-bg-alt)",
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--color-gold)",
        }}
      >
        Carta semanal
      </span>
      <h2
        style={{
          margin: 0,
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 300,
          fontSize: headingSize,
          lineHeight: 1.15,
          maxWidth: "20ch",
        }}
      >
        {heading}
      </h2>
      {subtext ? (
        <p style={{ margin: 0, maxWidth: "52ch", fontSize: 16, lineHeight: 1.75, color: "rgba(244,238,228,0.75)" }}>
          {subtext}
        </p>
      ) : null}
      <form style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <input
          type="email"
          placeholder="seu melhor e-mail"
          style={{
            padding: "15px 20px",
            minWidth: 300,
            border: "1px solid rgba(244,238,228,0.3)",
            background: "transparent",
            color: "var(--color-bg-alt)",
            fontFamily: "'Lora',serif",
            fontSize: 15,
            outline: "none",
          }}
        />
        <button
          type="button"
          className="btn-gold"
          style={{
            padding: "15px 30px",
            border: "none",
            color: "var(--color-ink)",
            fontFamily: "'Lora',serif",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Quero receber
        </button>
      </form>
    </section>
  );
}
