import "./globals.css";

import type { Metadata } from "next";
import { Maitree } from "next/font/google";

import { Header } from "@/components/header";
import { ScreenProvider } from "@/providers/screen";
import { ThemeProvider } from "@/providers/theme";
import { cn } from "@/lib/utils";

const fontSans = Maitree({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Ton Story",
    template: "%s — Ton Story",
  },
  description: "Tony's portfolio and blog.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        id="page-view"
        className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider>
          <ScreenProvider>
            <Header />
            <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
          </ScreenProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
