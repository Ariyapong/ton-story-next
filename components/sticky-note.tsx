"use client";

import { useEffect, useState } from "react";

interface StickyNoteProps {
  children: React.ReactNode;
  hint?: React.ReactNode;
}

// Easter-egg sticky note. Wonky and hand-placed on desktop, inline pull-quote on mobile.
// Click it to wiggle. Dismissible.
export function StickyNote({ children, hint }: StickyNoteProps) {
  const [dismissed, setDismissed] = useState(false);
  const [wiggle, setWiggle] = useState(false);

  useEffect(() => {
    if (wiggle) {
      const t = window.setTimeout(() => setWiggle(false), 600);
      return () => window.clearTimeout(t);
    }
  }, [wiggle]);

  if (dismissed) return null;

  return (
    <aside
      onClick={() => setWiggle(true)}
      className="hidden lg:block absolute right-6 top-2 max-w-[180px] cursor-pointer rounded-md border border-dashed border-accent bg-card px-3 py-2 font-serif text-xs italic leading-snug text-accent shadow-sm"
      style={{
        transform: `rotate(${wiggle ? -3 : 6}deg)`,
        transition: "transform 220ms ease",
      }}
    >
      {children}
      {hint && (
        <div className="mt-1 font-sans text-[10px] not-italic text-muted-foreground">
          {hint}
        </div>
      )}
      <button
        type="button"
        aria-label="Dismiss note"
        onClick={(e) => {
          e.stopPropagation();
          setDismissed(true);
        }}
        className="absolute -right-2 -top-2 h-5 w-5 rounded-full border border-rule bg-card font-mono text-[10px] text-muted-foreground hover:text-foreground"
      >
        ×
      </button>
    </aside>
  );
}
