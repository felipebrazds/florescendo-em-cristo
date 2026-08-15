import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentProfile } from "@/lib/auth";
import { signOutAction } from "@/app/admin/auth-actions";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const current = await getCurrentProfile();

  if (!current) {
    redirect("/admin/login");
  }

  if (current.profile?.role !== "admin") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "6vw", textAlign: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 420 }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, color: "var(--color-ink)" }}>
            Sem acesso ao painel
          </span>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--color-ink-soft)" }}>
            Sua conta ({current.user.email}) está autenticada, mas ainda não tem permissão de administradora.
            Peça para alguém com acesso ao banco te promover.
          </p>
          <form action={signOutAction}>
            <button type="submit" style={{ background: "none", border: "none", textDecoration: "underline", cursor: "pointer", fontFamily: "'Lora',serif", fontSize: 14, color: "var(--color-accent)" }}>
              Sair
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          padding: "20px 6vw",
          background: "var(--color-ink)",
          color: "var(--color-bg)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20 }}>
            Florescendo <em style={{ fontFamily: "'Playfair Display',serif" }}>em Cristo</em>
          </span>
          <nav style={{ display: "flex", gap: 20, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <Link href="/admin" style={{ color: "var(--color-bg)" }}>Posts</Link>
            <Link href="/admin/posts/new" style={{ color: "var(--color-bg)" }}>Novo post</Link>
          </nav>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 12 }}>
          <Link href="/" target="_blank" style={{ color: "rgba(244,238,228,0.75)" }}>
            Ver site ↗
          </Link>
          <span style={{ color: "rgba(244,238,228,0.5)" }}>{current.user.email}</span>
          <form action={signOutAction}>
            <button
              type="submit"
              style={{ background: "none", border: "none", color: "var(--color-gold)", cursor: "pointer", fontFamily: "'Lora',serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              Sair
            </button>
          </form>
        </div>
      </header>
      <main style={{ padding: "48px 6vw" }}>{children}</main>
    </div>
  );
}
