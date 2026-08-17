"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/categorias/estudos", label: "Estudos" },
  { href: "/categorias/testemunhos", label: "Testemunhos" },
  { href: "/categorias/familia", label: "Família" },
  { href: "/categorias/proposito", label: "Propósito" },
  { href: "/sobre", label: "Sobre" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="site-header"
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

      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="nav-toggle-bar" />
        <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
      </button>

      <nav
        id="site-nav"
        className="site-nav"
        data-open={open}
        style={{
          fontFamily: "'Lora',serif",
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {NAV_LINKS.map((link) => (
          <Link key={link.label} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
