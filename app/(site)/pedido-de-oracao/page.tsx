import type { Metadata } from "next";
import { PrayerRequestForm } from "@/components/prayer-request-form";

export const metadata: Metadata = {
  title: "Pedido de oração — Florescendo em Cristo",
  description: "Deixe seu pedido de oração. A Bruna lê cada um com carinho.",
};

export default function PrayerRequestPage() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr minmax(0,560px) 1fr", padding: "88px 6vw 96px" }}>
      <div />
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 300,
              fontSize: "clamp(32px, 3vw + 20px, 46px)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: "var(--color-ink)",
              textWrap: "pretty",
            }}
          >
            Se você chegasse aqui em casa, eu te serviria um café e perguntaria como está o seu coração de verdade.
          </h1>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
            Escreva o que estiver pesando. Eu leio cada pedido — sem pressa e sem julgamento.
          </p>
        </div>
        <PrayerRequestForm />
      </div>
      <div />
    </div>
  );
}
