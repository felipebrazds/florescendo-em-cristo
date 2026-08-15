import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "var(--color-bg)" }}>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
