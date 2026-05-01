// Root-level 404 — used for any unmatched URL.
// Loads its own copy of globals.css + fonts so it renders styled even though
// the root layout itself is minimal (the `/` page is intentionally unstyled).

import "./globals.css";

import Link from "next/link";
import { IBM_Plex_Mono, IBM_Plex_Sans_Thai_Looped, IBM_Plex_Serif } from "next/font/google";

import { cn } from "@/lib/utils";

const fontSerif = IBM_Plex_Serif({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const fontSans = IBM_Plex_Sans_Thai_Looped({
  subsets: ["thai", "latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});
const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});

export default function NotFound() {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground",
        fontSerif.variable,
        fontSans.variable,
        fontMono.variable,
      )}
      style={{ fontFamily: "var(--font-serif)" }}
    >
      <div className="relative inline-block font-serif text-[140px] font-medium italic leading-[0.85] tracking-tight md:text-[220px]">
        <span>4</span>
        <span style={{ color: "var(--accent)" }}>0</span>
        <span>4</span>
        {/* Stray semicolon — easter egg from Direction C */}
        <span
          className="absolute font-serif not-italic"
          style={{
            color: "var(--accent)",
            right: "-0.2em",
            bottom: "0.08em",
            fontSize: "0.32em",
            transform: "rotate(20deg)",
          }}
          aria-hidden="true"
        >
          ;
        </span>
      </div>

      <p className="mt-3 max-w-lg font-serif text-lg italic leading-[1.4] text-muted-foreground md:text-2xl">
        &ldquo;The page you wanted is not here.
        <br />
        The page that <em>is</em> here did not expect company.&rdquo;
      </p>
      <p className="mt-2 max-w-md font-sans text-sm leading-[1.6] text-muted-foreground md:text-base">
        หน้าที่คุณต้องการไม่ได้อยู่ที่นี่ — หน้าที่อยู่ที่นี่ก็ไม่ได้คาดว่าจะมีแขก
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-4 font-sans text-[11px] uppercase tracking-[0.18em]">
        <Link
          href="/"
          className="border-b border-foreground pb-1 text-foreground hover:text-accent"
        >
          Take me home →
        </Link>
        <span className="text-muted-foreground">กลับหน้าแรก</span>
      </div>

      <div className="absolute bottom-5 left-0 right-0 font-mono text-[10px] text-muted-foreground">
        (you found a stray semicolon. take it home, it&rsquo;s yours now.)
      </div>
    </div>
  );
}
