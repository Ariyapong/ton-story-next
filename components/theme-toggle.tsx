"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, BookOpen } from "lucide-react";

const ORDER = ["light", "dark", "sepia"] as const;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = (theme === "system" ? resolvedTheme : theme) ?? "light";

  const handleClick = () => {
    const idx = ORDER.indexOf(current as (typeof ORDER)[number]);
    const next = ORDER[(idx + 1) % ORDER.length];
    setTheme(next);
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      {mounted ? (
        <>
          {current === "light" && <Sun size={16} />}
          {current === "dark" && <Moon size={16} />}
          {current === "sepia" && <BookOpen size={16} />}
          <span className="capitalize">{current}</span>
        </>
      ) : (
        <span className="opacity-0">theme</span>
      )}
    </button>
  );
}
