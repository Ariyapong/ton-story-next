"use client";

import { useEffect, useRef, useState } from "react";

const CONFETTI = ["☕", "✦", "·", "°", "✧", "·", "☕", "✦"];

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    let hideTimer: number | undefined;
    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      const clamped = Math.min(100, Math.max(0, pct));
      setProgress(clamped);
      // Fire once per page when the user actually finishes a meaningful scroll.
      if (clamped >= 99.5 && !firedRef.current && max > 240) {
        firedRef.current = true;
        setConfetti(true);
        hideTimer = window.setTimeout(() => setConfetti(false), 2400);
      }
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-rule"
      >
        <div
          className="h-full bg-accent transition-[width] duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {confetti && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 bottom-20 z-40 flex justify-center gap-3"
        >
          {CONFETTI.map((piece, i) => (
            <span
              key={i}
              className="text-xl text-accent opacity-0"
              style={{
                animation: "confetti-float 2.2s ease-out forwards",
                animationDelay: `${i * 70}ms`,
              }}
            >
              {piece}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
