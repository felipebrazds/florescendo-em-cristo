import type { Metadata } from "next";
import { NewsletterSection } from "@/components/newsletter-section";

export const metadata: Metadata = {
  title: "Sobre — Florescendo em Cristo",
};

const VALORES = [
  { num: "I", name: "Palavra em primeiro lugar", desc: "Tudo que escrevo passa pela Bíblia antes de passar pela minha opinião." },
  { num: "II", name: "Honestidade sem peso", desc: "Falo das lutas reais, mas sem transformar culpa em conteúdo." },
  { num: "III", name: "Delicadeza como cuidado", desc: "Um lugar calmo para ler, no meio de uma internet apressada." },
];

export default function SobrePage() {
  return (
    <>
      <section style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", alignItems: "stretch", borderBottom: "1px solid var(--color-line)" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 24, padding: "88px 5vw 88px 6vw" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-accent-2)" }}>Sobre</span>
          <h1 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 58, lineHeight: 1.1, letterSpacing: "-0.01em", textWrap: "pretty" }}>
            Prazer, eu sou a
            <br />
            <em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--color-accent)" }}>Bruna Figueiredo.</em>
          </h1>
          <p style={{ margin: 0, maxWidth: "46ch", fontSize: 18, lineHeight: 1.8, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
            Esposa, mãe de 3 e escritora. Escrevo sobre a fé no dia comum — entre o serviço do lar e a busca pela santificação, a graça que sustenta os dois.
          </p>
          <p style={{ margin: 0, maxWidth: "46ch", fontSize: 16, lineHeight: 1.8, color: "var(--color-muted)", textWrap: "pretty" }}>
            O Florescendo em Cristo nasceu de um diário de evolução espiritual — frases pequenas, escritas só para mim, que sem eu perceber começaram a tocar quem estava por perto. Hoje é o lugar onde compartilho o que Deus tem me ensinado, sem pressa e sem fórmula.
          </p>
        </div>
        <div className="photo-placeholder" style={{ justifyContent: "center", padding: 24, minHeight: 520 }}>
          <span>foto — retrato da Bruna (vertical)</span>
        </div>
      </section>

      <section style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22, padding: "44px 6vw", background: "var(--color-bg-alt)", borderBottom: "1px solid var(--color-line)" }}>
        <span style={{ width: 56, height: 1, background: "var(--color-line-strong)" }} />
        <p style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontStyle: "italic", color: "var(--color-ink-soft)", textAlign: "center", maxWidth: "60ch" }}>
          &ldquo;Eu sou a videira, vós as varas; quem permanece em mim, e eu nele, esse dá muito fruto.&rdquo;{" "}
          <span style={{ fontFamily: "'Lora',serif", fontStyle: "normal", fontSize: 12, letterSpacing: "0.16em", color: "var(--color-accent-2)" }}>JOÃO 15:5</span>
        </p>
        <span style={{ width: 56, height: 1, background: "var(--color-line-strong)" }} />
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "1fr minmax(0,660px) 1fr", gap: 48, padding: "84px 6vw" }}>
        <div />
        <div style={{ display: "flex", flexDirection: "column", gap: 28, fontSize: 18, lineHeight: 1.85, color: "var(--color-body)" }}>
          <h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 36, lineHeight: 1.2, color: "var(--color-ink)" }}>
            Como tudo começou
          </h2>
          <p style={{ margin: 0, textWrap: "pretty" }}>
            Comecei escrevendo um diário de evolução espiritual — só para mim, nos dias difíceis e nos dias de graça. Não era plano nem projeto: eram frases pequenas, quase despretensiosas. Aos poucos percebi que aquelas mesmas frases, quando compartilhadas, tocavam quem estava por perto.
          </p>
          <p style={{ margin: 0, textWrap: "pretty" }}>
            Foi então que entendi, pela graça de Deus, que podia usar essas palavras para alcançar mais corações. Hoje escrevo para compartilhar as entrelinhas de uma vida comum, na busca incessante pelo céu — na esperança de despertar em outras mulheres o mesmo amor imensurável e o mesmo desejo pelo eterno que sustentam os meus dias.
          </p>
          <h2 style={{ margin: "14px 0 0", fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 36, lineHeight: 1.2, color: "var(--color-ink)" }}>
            Para quem escrevo
          </h2>
          <p style={{ margin: 0, textWrap: "pretty" }}>
            Para mulheres e mães — católicas ou cristãs — que encontram no dia a dia as suas cruzes e, mesmo assim, não desistem. Para a que está esperando, a que está recomeçando e a que está firme e quer se aprofundar. Aqui não existe nível de fé mínimo para entrar.
          </p>
        </div>
        <div />
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--color-line-strong)", borderTop: "1px solid var(--color-line-strong)", borderBottom: "1px solid var(--color-line-strong)" }}>
        {VALORES.map((v) => (
          <div key={v.num} style={{ display: "flex", flexDirection: "column", gap: 12, padding: "52px 40px", background: "var(--color-bg)" }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, letterSpacing: "0.2em", color: "var(--color-accent-2)" }}>{v.num}</span>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, color: "var(--color-ink)" }}>{v.name}</span>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: "var(--color-ink-soft)", textWrap: "pretty" }}>{v.desc}</p>
          </div>
        ))}
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", alignItems: "stretch" }}>
        <div className="photo-placeholder" style={{ padding: 20, minHeight: 440 }}>
          <span>foto — família ou mesa de café</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 22, padding: "80px 6vw" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-accent-2)" }}>Fora do blog</span>
          <p style={{ margin: 0, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 28, lineHeight: 1.45, color: "var(--color-ink)", textWrap: "pretty" }}>
            &ldquo;Três filhos, uma casa barulhenta e um caderno que me acompanha há dez anos.&rdquo;
          </p>
          <p style={{ margin: 0, maxWidth: "48ch", fontSize: 16, lineHeight: 1.8, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
            Gosto de café passado devagar, lírios brancos na mesa e conversas longas. Se você chegasse aqui em casa, eu te serviria um café e perguntaria como está o seu coração de verdade.
          </p>
          <a href="#" className="btn-dark" style={{ alignSelf: "flex-start", padding: "15px 30px", color: "var(--color-bg)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Enviar um pedido de oração
          </a>
        </div>
      </section>

      <NewsletterSection
        heading="Vamos caminhar juntas?"
        subtext="Toda quinta-feira envio uma palavra curta, um versículo para guardar e uma oração."
      />
    </>
  );
}
