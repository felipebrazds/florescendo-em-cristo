import Link from "next/link";
import { getPublishedPosts, getCategories } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { NewsletterSection } from "@/components/newsletter-section";

export const revalidate = 60;

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getPublishedPosts(6), getCategories()]);
  const latestPost = posts[0];

  return (
    <>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 1fr",
          alignItems: "stretch",
          minHeight: 560,
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 26, padding: "88px 5vw 88px 6vw" }}>
          <span style={{ fontFamily: "'Lora',serif", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--color-accent-2)" }}>
            Um lugar de descanso para a alma
          </span>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond',serif",
              fontWeight: 300,
              fontSize: 64,
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              color: "var(--color-ink)",
              textWrap: "pretty",
            }}
          >
            Como o lírio
            <br />
            entre os espinhos,
            <br />
            <em style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "var(--color-accent)" }}>
              floresça onde
              <br />
              Deus te plantou.
            </em>
          </h1>
          <p style={{ margin: 0, maxWidth: "44ch", fontSize: 17, lineHeight: 1.75, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
            Devocionais, estudos e histórias reais para mulheres que caminham com Cristo no meio da rotina, da casa e das lutas silenciosas.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 18, paddingTop: 6 }}>
            <Link
              href={latestPost ? `/posts/${latestPost.slug}` : "#"}
              className="btn-dark"
              style={{ padding: "15px 30px", color: "var(--color-bg)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}
            >
              Ler o devocional de hoje
            </Link>
            <a href="#escritos" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", borderBottom: "1px solid var(--color-line-strong)", paddingBottom: 3 }}>
              Conhecer o blog
            </a>
          </div>
        </div>
        <div className="photo-placeholder" style={{ justifyContent: "center", padding: 24, minHeight: 420 }}>
          <span>foto — lírios brancos, luz suave (vertical)</span>
        </div>
      </section>

      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 22,
          padding: "44px 6vw",
          background: "var(--color-bg-alt)",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <span style={{ width: 56, height: 1, background: "var(--color-line-strong)" }} />
        <p style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontStyle: "italic", color: "var(--color-ink-soft)", textAlign: "center", maxWidth: "60ch" }}>
          &ldquo;Observai os lírios do campo, como eles crescem; não trabalham, nem fiam.&rdquo;{" "}
          <span style={{ fontFamily: "'Lora',serif", fontStyle: "normal", fontSize: 12, letterSpacing: "0.16em", color: "var(--color-accent-2)" }}>
            MATEUS 6:28
          </span>
        </p>
        <span style={{ width: 56, height: 1, background: "var(--color-line-strong)" }} />
      </section>

      <section id="escritos" style={{ padding: "84px 6vw" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 24, marginBottom: 44 }}>
          <h2 style={{ margin: 0, fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: 38, color: "var(--color-ink)" }}>
            Escritos recentes
          </h2>
          <a href="#" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Ver todos
          </a>
        </div>
        {posts.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40 }}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} withExcerpt />
            ))}
          </div>
        ) : (
          <p style={{ margin: 0, fontSize: 15, color: "var(--color-muted)" }}>
            Ainda não há posts publicados. Assim que a Bruna publicar o primeiro, ele aparece aqui.
          </p>
        )}
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: 1,
          background: "var(--color-line-strong)",
          borderTop: "1px solid var(--color-line-strong)",
          borderBottom: "1px solid var(--color-line-strong)",
        }}
      >
        {categories.map((cat) => (
          <a
            key={cat.id}
            href="#"
            className="card-cat"
            style={{ display: "flex", flexDirection: "column", gap: 10, padding: "40px 26px", minHeight: 150 }}
          >
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: "var(--color-ink)" }}>{cat.name}</span>
            <span style={{ fontSize: 13, lineHeight: 1.6, color: "var(--color-muted)" }}>{cat.description}</span>
          </a>
        ))}
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 0, alignItems: "stretch" }}>
        <div className="photo-placeholder" style={{ padding: 20, minHeight: 440 }}>
          <span>foto — retrato ou mãos com bíblia</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 24, padding: "80px 6vw" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-accent-2)" }}>
            Testemunho
          </span>
          <p style={{ margin: 0, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 30, lineHeight: 1.45, color: "var(--color-ink)", textWrap: "pretty" }}>
            &ldquo;Eu achava que estava seca. Deus estava só me plantando mais fundo.&rdquo;
          </p>
          <p style={{ margin: 0, maxWidth: "48ch", fontSize: 16, lineHeight: 1.8, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
            Histórias de mulheres que atravessaram perdas, esperas e recomeços — e viram a fidelidade de Deus no meio disso. Toda semana, uma história nova.
          </p>
          <a href="#" style={{ alignSelf: "flex-start", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", borderBottom: "1px solid var(--color-line-strong)", paddingBottom: 3 }}>
            Ler o testemunho completo
          </a>
        </div>
      </section>

      <NewsletterSection
        heading="Uma palavra de cuidado, toda quinta-feira"
        subtext="Um devocional curto, um versículo para guardar e uma oração. Sem pressa, sem cobrança."
      />
    </>
  );
}
