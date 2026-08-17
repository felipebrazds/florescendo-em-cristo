/**
 * Placeholder de foto on-brand: um lírio desenhado em linha (mesmo motivo
 * do hero — "como o lírio entre os espinhos") sobre um fundo em degradê
 * quente, com uma legenda na própria tipografia do site. Substitui a
 * textura listrada + legenda monoespaçada de debug do protótipo original.
 */
export function PhotoPlaceholder({ caption }: { caption: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        background:
          "radial-gradient(120% 100% at 50% 30%, var(--color-bg-alt) 0%, var(--color-line) 100%)",
      }}
    >
      <svg
        width="56"
        height="56"
        viewBox="0 0 120 120"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ opacity: 0.55 }}
      >
        <g transform="translate(60,64)">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path key={deg} d="M0,-6 C8,-20 8,-40 0,-58 C-8,-40 -8,-20 0,-6 Z" transform={`rotate(${deg})`} />
          ))}
          <circle r="4" />
        </g>
      </svg>
      <span
        style={{
          fontFamily: "'Lora',serif",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--color-accent-2)",
        }}
      >
        {caption}
      </span>
    </div>
  );
}
