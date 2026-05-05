"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DEFAULT_LANG,
  getDict,
  isLang,
  localizeHref,
  type Lang,
} from "@/lib/i18n";
import { cn } from "@/lib/utils";

const NAV_KEYS = ["home", "blog", "projects", "tags"] as const;
const NAV_HREFS: Record<(typeof NAV_KEYS)[number], string> = {
  home: "/",
  blog: "/blog",
  projects: "/projects",
  tags: "/tags",
};

function isActive(pathname: string, href: string, lang: Lang) {
  const localized = localizeHref(href, lang);
  if (localized === "/" || localized === "/th") return pathname === localized;
  return pathname === localized || pathname.startsWith(`${localized}/`);
}

function useLang(): Lang {
  const raw = useParams<{ lang?: string }>()?.lang;
  return isLang(raw) ? raw : DEFAULT_LANG;
}

export function Header() {
  const pathname = usePathname() ?? "/";
  const lang = useLang();
  const dict = getDict(lang);

  return (
    <header className="theme-fade sticky top-0 z-40 w-full border-b border-rule bg-background/85 backdrop-blur">
      <div className="header-bar"></div>
      <div className="mx-auto flex w-full max-w-6xl items-baseline justify-between gap-4 px-5 py-4 sm:px-8">
        {/* Brand mark — bilingual side-by-side is intentional and stays. */}
        <Link
          href={localizeHref("/", lang)}
          className="flex items-baseline gap-2 hover-lift"
        >
          <span className="font-serif text-xl italic">Aritoton</span>
          <span className="font-sans text-sm text-muted-foreground">· อริโตต้น</span>
        </Link>

        <nav className="hidden items-baseline gap-6 md:flex">
          {NAV_KEYS.map((key) => {
            const href = NAV_HREFS[key];
            const active = isActive(pathname, href, lang);
            const className = cn(
              "hover-lift font-sans text-[11px] uppercase tracking-[0.18em]",
              active
                ? "border-b border-foreground pb-1 text-foreground"
                : "text-muted-foreground hover:text-foreground",
            );
            return (
              <Link
                key={key}
                href={localizeHref(href, lang)}
                className={className}
              >
                {dict.nav[key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <MobileNav pathname={pathname} lang={lang} />
        </div>
      </div>
    </header>
  );
}

function MobileNav({ pathname, lang }: { pathname: string; lang: Lang }) {
  const dict = getDict(lang);
  return (
    <details className="relative md:hidden">
      <summary
        aria-label={dict.a11y.openNav}
        className="flex h-6 w-6 cursor-pointer list-none items-center justify-center"
      >
        <span className="flex h-3.5 w-5 flex-col justify-between">
          <span className="block h-px bg-foreground" />
          <span className="ml-auto block h-px w-3 bg-foreground" />
          <span className="block h-px bg-foreground" />
        </span>
      </summary>
      <ul className="absolute right-0 mt-3 min-w-44 rounded-md border border-rule bg-card p-2 shadow-lg">
        {NAV_KEYS.map((key) => {
          const href = NAV_HREFS[key];
          const active = isActive(pathname, href, lang);
          const className = cn(
            "flex items-baseline justify-between gap-3 rounded px-2 py-1.5 font-sans text-[11px] uppercase tracking-[0.18em]",
            active
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          );
          return (
            <li key={key}>
              <Link href={localizeHref(href, lang)} className={className}>
                <span>{dict.nav[key]}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
