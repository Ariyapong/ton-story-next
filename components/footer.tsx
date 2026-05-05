import Link from "next/link";

import { getDict, localizeHref, type Lang } from "@/lib/i18n";

export function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  const dict = getDict(lang);
  return (
    <footer className="theme-fade border-t border-rule">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-10 text-[11px] sm:grid-cols-3 sm:px-8">
        <div className="space-y-1.5">
          <div className="font-serif text-base italic">Ton Story</div>
          <div className="font-sans text-muted-foreground">
            Tony · ต้นสตอรี่ · Bangkok 🇹🇭
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Vol. 01 · MMXXVI
          </div>
        </div>

        <div className="space-y-1.5 font-sans">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {dict.footer.findMe}
          </div>
          <ul className="space-y-1">
            <li>
              <a
                href="https://github.com/Ariyapong"
                target="_blank"
                rel="noreferrer"
                className="hover-lift text-foreground hover:text-accent"
              >
                github.com/Ariyapong ↗
              </a>
            </li>
            <li>
              <a
                href="mailto:ariyapongw.ton@gmail.com"
                className="hover-lift text-foreground hover:text-accent"
              >
                ariyapongw.ton@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-1.5 font-sans sm:text-right">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {dict.footer.pages}
          </div>
          <ul className="space-y-1 text-foreground">
            <li>
              <Link href={localizeHref("/blog", lang)} className="hover-lift hover:text-accent">
                {dict.footer.blog}
              </Link>
            </li>
            <li>
              <Link href={localizeHref("/projects", lang)} className="hover-lift hover:text-accent">
                {dict.footer.projects}
              </Link>
            </li>
            <li>
              <Link href={localizeHref("/tags", lang)} className="hover-lift hover:text-accent">
                {dict.footer.tags}
              </Link>
            </li>
            <li>
              <Link href={localizeHref("/", lang)} className="hover-lift hover:text-accent">
                {dict.footer.about}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-6xl items-baseline justify-between gap-2 border-t border-rule px-5 py-4 font-mono text-[10px] text-muted-foreground sm:px-8">
        <span>
          © {year} Ariyapong Wimolnoch · Built with ❤️
        </span>
        <span className="hidden sm:inline">
          {dict.footer.tip}
        </span>
      </div>
    </footer>
  );
}
