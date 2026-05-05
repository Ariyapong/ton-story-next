"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { DEFAULT_LANG, isLang, localizeHref } from "@/lib/i18n";

// j / k navigation across `[data-post-row]` items, "g h" home, "/" focus search/href.
export function KeyboardNav() {
  const router = useRouter();
  const rawLang = useParams<{ lang?: string }>()?.lang;
  const lang = isLang(rawLang) ? rawLang : DEFAULT_LANG;

  useEffect(() => {
    let buf = "";
    let bufTimer: number | undefined;

    function isTyping(target: EventTarget | null) {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
    }

    function getRows(): HTMLAnchorElement[] {
      return Array.from(
        document.querySelectorAll<HTMLAnchorElement>("a[data-post-row]"),
      );
    }

    function activeIndex(rows: HTMLAnchorElement[]): number {
      const focused = document.activeElement;
      if (focused instanceof HTMLAnchorElement) {
        const i = rows.indexOf(focused);
        if (i !== -1) return i;
      }
      return -1;
    }

    function moveFocus(delta: number) {
      const rows = getRows();
      if (rows.length === 0) return;
      const i = activeIndex(rows);
      const next = Math.max(0, Math.min(rows.length - 1, i + delta));
      rows[next]?.focus();
      rows[next]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }

    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTyping(e.target)) return;

      if (e.key === "j") {
        e.preventDefault();
        moveFocus(1);
        return;
      }
      if (e.key === "k") {
        e.preventDefault();
        moveFocus(-1);
        return;
      }

      // chord: "g h" → home, "g b" → blog, "g p" → projects, "g t" → tags
      if (e.key.length === 1) {
        buf = (buf + e.key).slice(-2);
        if (bufTimer) window.clearTimeout(bufTimer);
        bufTimer = window.setTimeout(() => {
          buf = "";
        }, 700);
        if (buf === "gh") router.push(localizeHref("/", lang));
        else if (buf === "gb") router.push(localizeHref("/blog", lang));
        else if (buf === "gp") router.push(localizeHref("/projects", lang));
        else if (buf === "gt") router.push(localizeHref("/tags", lang));
        else if (buf === "ga") router.push(localizeHref("/", lang));
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (bufTimer) window.clearTimeout(bufTimer);
    };
  }, [router, lang]);

  return null;
}
