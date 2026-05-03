import "../globals.css";

import { IBM_Plex_Mono, IBM_Plex_Sans_Thai_Looped, IBM_Plex_Serif } from "next/font/google";

import { EasterEggs } from "@/components/easter-eggs";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { KeyboardNav } from "@/components/keyboard-nav";
import { ScreenProvider } from "@/providers/screen";
import { ThemeProvider } from "@/providers/theme";
import { cn } from "@/lib/utils";

const fontSerif = IBM_Plex_Serif({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const fontSans = IBM_Plex_Sans_Thai_Looped({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export default function StyledLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider>
      <ScreenProvider>
        <div
          className={cn(
            "theme-fade min-h-screen bg-background text-foreground",
            fontSerif.variable,
            fontSans.variable,
            fontMono.variable,
          )}
          style={{ fontFamily: "var(--font-serif)" }}
        >
          <Header />
          <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-10 sm:px-8 md:pt-14">
            {children}
          </main>
          <Footer />
          <KeyboardNav />
          <EasterEggs />
        </div>
      </ScreenProvider>
    </ThemeProvider>
  );
}
