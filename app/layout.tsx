import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Florescendo em Cristo",
  description:
    "Estudos, testemunhos e histórias reais para mulheres e mães, católicas ou cristãs, que carregam suas cruzes diárias sem desistir.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Lora:ital,wght@0,400;0,500;1,400&family=Playfair+Display:ital,wght@0,400;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
