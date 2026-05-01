import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "Ton Story · ต้นสตอรี่",
    template: "%s — Ton Story",
  },
  description: "Ariyapong Wongmaneerat (Tony) — senior software developer in Bangkok. Portfolio + bilingual blog.",
  authors: [{ name: "Ariyapong Wongmaneerat" }],
  openGraph: {
    title: "Ton Story · ต้นสตอรี่",
    description: "Tony's portfolio + bilingual blog.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#13110d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="page-view">{children}</body>
    </html>
  );
}
