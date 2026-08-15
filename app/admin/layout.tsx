export const metadata = {
  title: "Painel — Florescendo em Cristo",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg-alt)" }}>{children}</div>
  );
}
