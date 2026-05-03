"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type Proverb = { th: string; en: string };

const PROVERBS: Proverb[] = [
  { th: "น้ำขึ้นให้รีบตัก", en: "When the tide rises, hurry and scoop." },
  { th: "ช้า ๆ ได้พร้าเล่มงาม", en: "Slow strokes forge the finest blade." },
  { th: "ความพยายามอยู่ที่ไหน ความสำเร็จอยู่ที่นั่น", en: "Where effort lives, success follows." },
  { th: "น้ำนิ่งไหลลึก", en: "Still water runs deep." },
  { th: "ตนเป็นที่พึ่งแห่งตน", en: "Be your own refuge." },
  { th: "อย่าผัดวันประกันพรุ่ง", en: "Don't put off until tomorrow." },
];

const KONAMI = [
  "arrowup", "arrowup", "arrowdown", "arrowdown",
  "arrowleft", "arrowright", "arrowleft", "arrowright",
  "b", "a",
];

// Map typed words to next-themes setTheme values (the provider re-maps these
// to data-theme="milk"/"coffee"/"tea" via its `value` prop).
const THEME_WORDS: Record<string, string> = {
  coffee: "dark",
  tea: "tea",
  milk: "light",
};

export function EasterEggs() {
  const { setTheme } = useTheme();
  const [proverb, setProverb] = useState<Proverb | null>(null);

  useEffect(() => {
    let textBuf = "";
    let textTimer: number | undefined;
    let konamiIdx = 0;

    function isTyping(target: EventTarget | null) {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
    }

    function onKey(e: KeyboardEvent) {
      if (isTyping(e.target)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const key = e.key.toLowerCase();

      // Konami sequence — match step, restart on any miss.
      if (key === KONAMI[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === KONAMI.length) {
          konamiIdx = 0;
          setProverb(PROVERBS[Math.floor(Math.random() * PROVERBS.length)]);
        }
      } else if (key === KONAMI[0]) {
        konamiIdx = 1;
      } else {
        konamiIdx = 0;
      }

      // Theme keystroke — buffer last 6 chars and check suffix matches.
      if (e.key.length === 1) {
        textBuf = (textBuf + key).slice(-6);
        if (textTimer) window.clearTimeout(textTimer);
        textTimer = window.setTimeout(() => {
          textBuf = "";
        }, 1200);
        for (const word of Object.keys(THEME_WORDS)) {
          if (textBuf.endsWith(word)) {
            const next = THEME_WORDS[word];
            const doc = document as Document & {
              startViewTransition?: (cb: () => void) => unknown;
            };
            if (typeof doc.startViewTransition === "function") {
              doc.startViewTransition(() => setTheme(next));
            } else {
              setTheme(next);
            }
            textBuf = "";
            break;
          }
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (textTimer) window.clearTimeout(textTimer);
    };
  }, [setTheme]);

  if (!proverb) return null;

  return (
    <aside
      role="status"
      className="fixed right-4 top-20 z-50 max-w-[260px] rounded-md border border-dashed border-accent bg-card px-4 py-3 font-serif italic leading-snug text-accent shadow-md"
      style={{ transform: "rotate(-2deg)" }}
    >
      <div className="text-sm">{proverb.th}</div>
      <div className="mt-1 font-sans text-[11px] not-italic text-muted-foreground">
        {proverb.en}
      </div>
      <button
        type="button"
        onClick={() => setProverb(null)}
        aria-label="Dismiss"
        className="absolute -right-2 -top-2 h-5 w-5 rounded-full border border-rule bg-card font-mono text-[10px] text-muted-foreground hover:text-foreground"
      >
        ×
      </button>
    </aside>
  );
}
