import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eventos de Adoração e Comunhão - 5 de Abril",
  description:
    "Tarde de Avivamento e Culto da Juventude TC - Venha viver uma experiência única!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
