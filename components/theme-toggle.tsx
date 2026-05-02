"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { CoffeeCup } from "@/components/coffee-cup";

const ORDER = ["light", "dark", "tea"] as const;
type ThemeName = (typeof ORDER)[number];

const LABELS: Record<ThemeName, { en: string; th: string }> = {
  light: { en: "milk", th: "นม" },
  dark: { en: "coffee", th: "กาแฟ" },
  tea: { en: "tea", th: "ชา" },
};

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const raw = (theme === "system" ? resolvedTheme : theme) ?? "light";
  const current: ThemeName = (ORDER as readonly string[]).includes(raw) ? (raw as ThemeName) : "light";

  const handleClick = () => {
    const idx = ORDER.indexOf(current);
    const next = ORDER[(idx + 1) % ORDER.length];
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (typeof doc.startViewTransition === "function") {
      doc.startViewTransition(() => setTheme(next));
    } else {
      setTheme(next);
    }
  };

  return (
    <button
      type="button"
      aria-label={mounted ? `Theme: ${LABELS[current].en}. Click to cycle.` : "Toggle theme"}
      onClick={handleClick}
      className="hover-lift inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-rule px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
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
  if (current === "tea") return <CoffeeCup size={11} />;
  if (current === "dark") return <span aria-hidden>☾</span>;
  return <span aria-hidden>☀</span>;
}
