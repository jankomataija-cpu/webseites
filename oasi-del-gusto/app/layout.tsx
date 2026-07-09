import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oasi del Gusto – Eiscafé & Gelateria in Spaichingen",
  description:
    "Hausgemachtes italienisches Eis aus eigener Produktion, Kaffeespezialitäten und Dolce Vita mitten in Spaichingen. Marktplatz 9 – täglich 10 bis 23 Uhr.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Fonts per <link> statt next/font, damit der Build ohne Internetzugriff läuft */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
