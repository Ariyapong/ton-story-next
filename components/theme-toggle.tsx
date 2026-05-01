"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { CoffeeCup } from "@/components/coffee-cup";

const ORDER = ["light", "dark", "sepia"] as const;
type ThemeName = (typeof ORDER)[number];

const LABELS: Record<ThemeName, { en: string; th: string }> = {
  light: { en: "light", th: "สว่าง" },
  dark: { en: "dark", th: "มืด" },
  sepia: { en: "sepia", th: "ซีเปีย" },
};

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = ((theme === "system" ? resolvedTheme : theme) ?? "light") as ThemeName;

  const handleClick = () => {
    const idx = ORDER.indexOf(current);
    setTheme(ORDER[(idx + 1) % ORDER.length]);
  };

  return (
    <button
      type="button"
      aria-label={mounted ? `Theme: ${current}. Click to cycle.` : "Toggle theme"}
      onClick={handleClick}
      className="hover-lift inline-flex items-center gap-1.5 rounded-full border border-rule px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
    >
      {mounted ? (
        <>
          <ThemeIcon current={current} />
          <span>{LABELS[current].en}</span>
        </>
      ) : (
        <span className="opacity-0">theme</span>
      )}
    </button>
  );
}

function ThemeIcon({ current }: { current: ThemeName }) {
  if (current === "sepia") return <CoffeeCup size={11} />;
  if (current === "dark") return <span aria-hidden>☾</span>;
  return <span aria-hidden>☀</span>;
}
