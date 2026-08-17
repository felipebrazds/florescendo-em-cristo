"use client";

import { useActionState } from "react";
import { subscribeNewsletterAction } from "@/app/(site)/newsletter-actions";

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
  const [state, formAction, pending] = useActionState(subscribeNewsletterAction, {
    error: null,
    subscribed: false,
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

      {state.subscribed ? (
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
          Combinado — sua primeira carta chega na próxima quinta.
        </p>
      ) : (
        <form
          action={formAction}
          className="newsletter-form"
          style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}
        >
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <input
              type="email"
              name="email"
              placeholder="seu melhor e-mail"
              required
              className="newsletter-input"
              style={{
                padding: "15px 20px",
                border: "1px solid rgba(244,238,228,0.3)",
                background: "transparent",
                color: "var(--color-bg-alt)",
                fontFamily: "'Lora',serif",
                fontSize: 15,
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={pending}
              className="btn-gold"
              style={{
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
              {pending ? "Enviando…" : "Quero receber a carta"}
            </button>
          </div>
          {state.error ? (
            <p style={{ margin: 0, fontSize: 13, color: "#f6b4b4" }}>{state.error}</p>
          ) : null}
        </form>
      )}
    </section>
  );
}
