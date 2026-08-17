"use client";

import { useActionState, type CSSProperties } from "react";
import { sendPrayerRequestAction } from "@/app/(site)/prayer-actions";

const fieldStyle: CSSProperties = {
  padding: "15px 20px",
  border: "1px solid rgba(244,238,228,0.3)",
  background: "transparent",
  color: "var(--color-bg-alt)",
  fontFamily: "'Lora',serif",
  fontSize: 15,
  outline: "none",
};

/**
 * Área de pedido de oração embutida no rodapé das páginas — ocupa o lugar
 * que antes era da newsletter (removida). Mesmo formulário/tabela da página
 * dedicada /pedido-de-oracao, só que compacto e sempre à mão.
 */
export function PrayerSection({
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
  const [state, formAction, pending] = useActionState(sendPrayerRequestAction, {
    error: null,
    sent: false,
  });

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
        padding: `clamp(56px, 8vw, ${padding}px) 6vw`,
        background: "var(--color-ink)",
        color: "var(--color-bg-alt)",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: "'Cormorant Garamond',serif",
          fontWeight: 300,
          fontSize: `clamp(26px, 4vw + 14px, ${headingSize}px)`,
          lineHeight: 1.15,
          maxWidth: "22ch",
        }}
      >
        {heading}
      </h2>
      {subtext ? (
        <p style={{ margin: 0, maxWidth: "52ch", fontSize: 16, lineHeight: 1.75, color: "rgba(244,238,228,0.75)" }}>
          {subtext}
        </p>
      ) : null}

      {state.sent ? (
        <p
          style={{
            margin: 0,
            marginTop: 10,
            maxWidth: "44ch",
            fontFamily: "'Cormorant Garamond',serif",
            fontStyle: "italic",
            fontSize: 22,
            color: "var(--color-bg-alt)",
          }}
        >
          Recebido, com carinho.
        </p>
      ) : (
        <form
          action={formAction}
          className="prayer-form"
          style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}
        >
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <input name="name" placeholder="seu nome" required style={{ ...fieldStyle, flex: "1 1 180px" }} />
            <input name="email" type="email" placeholder="seu melhor e-mail" required style={{ ...fieldStyle, flex: "1 1 220px" }} />
          </div>
          <textarea
            name="message"
            placeholder="conte o que está enfrentando, ou o que você gostaria de pedir em oração"
            required
            rows={3}
            maxLength={4000}
            style={{ ...fieldStyle, resize: "vertical", fontSize: 15, textAlign: "left" }}
          />
          <button
            type="submit"
            disabled={pending}
            className="btn-gold"
            style={{
              alignSelf: "center",
              padding: "15px 30px",
              border: "none",
              color: "var(--color-ink)",
              fontFamily: "'Lora',serif",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: pending ? "default" : "pointer",
              opacity: pending ? 0.7 : 1,
            }}
          >
            {pending ? "Enviando…" : "Enviar pedido de oração"}
          </button>
          {state.error ? (
            <p style={{ margin: 0, fontSize: 13, color: "#f6b4b4" }}>{state.error}</p>
          ) : null}
        </form>
      )}
    </section>
  );
}
