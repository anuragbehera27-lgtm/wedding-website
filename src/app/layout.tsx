import type { Metadata } from "next";
import { Cormorant_Garamond, Josefin_Sans, Fleur_De_Leah } from "next/font/google";
import { LangProvider } from "@/context/LangContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal"],
  variable: "--font-josefin",
  display: "swap",
});

const fleur = Fleur_De_Leah({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fleur",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marta & Anurag — 5 September 2026",
  description:
    "Marta & Anurag — Wedding · 5 September 2026 · Agriturismo da Pippo, Cassignanica, Italy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${josefin.variable} ${fleur.variable} antialiased`}
      >
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
