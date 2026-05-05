"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import {
  DEFAULT_LANG,
  LANGS,
  getDict,
  isLang,
  swapToLang,
  type Lang,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LABEL: Record<Lang, string> = {
  en: "EN",
  th: "TH",
};

export function LanguageSwitcher() {
  const pathname = usePathname() ?? "/";
  const rawLang = useParams<{ lang?: string }>()?.lang;
  const active: Lang = isLang(rawLang) ? rawLang : DEFAULT_LANG;
  const dict = getDict(active);

  return (
    <div
      className="inline-flex items-center rounded-full border border-rule font-mono text-[10px] uppercase tracking-wide"
      role="group"
      aria-label={dict.a11y.language}
    >
      {LANGS.map((lang, i) => {
        const isActive = lang === active;
        return (
          <span key={lang} className="contents">
            {i > 0 && (
              <span aria-hidden className="text-muted-foreground/50">
                |
              </span>
            )}
            <Link
              href={swapToLang(pathname, lang)}
              prefetch={false}
              aria-current={isActive ? "true" : undefined}
              hrefLang={lang}
              className={cn(
                "px-2 py-1 transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {LABEL[lang]}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
