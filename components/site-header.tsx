import Link from "next/link";

export function SiteHeader() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 32,
        padding: "26px 6vw",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 26,
            letterSpacing: "0.04em",
            color: "var(--color-ink)",
          }}
        >
          Florescendo
        </span>
        <span
          style={{
            fontFamily: "'Playfair Display',serif",
            fontStyle: "italic",
            fontSize: 24,
            lineHeight: 1,
            color: "var(--color-accent)",
            marginLeft: 14,
          }}
        >
          em Cristo
        </span>
      </div>
      <nav
        style={{
          display: "flex",
          gap: 34,
          fontFamily: "'Lora',serif",
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        <Link href="/">Início</Link>
        <Link href="#">Devocionais</Link>
        <Link href="#">Estudos</Link>
        <Link href="#">Testemunhos</Link>
        <Link href="#">Família</Link>
        <Link href="/sobre">Sobre</Link>
      </nav>
    </header>
  );
}
