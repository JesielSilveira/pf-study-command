import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rotina futuro Agente Polica Federal",
  description: "Painel de preparação para Agente da Polícia Federal",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
