import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
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
            Find me · ติดต่อ
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
            Pages · หน้า
          </div>
          <ul className="space-y-1 text-foreground">
            <li>
              <Link href="/blog" className="hover-lift hover:text-accent">
                Blog · บล็อก
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover-lift hover:text-accent">
                Projects · ผลงาน
              </Link>
            </li>
            <li>
              <Link href="/tags" className="hover-lift hover:text-accent">
                Tags · แท็ก
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover-lift hover:text-accent">
                About · เกี่ยวกับ
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-6xl items-baseline justify-between gap-2 border-t border-rule px-5 py-4 font-mono text-[10px] text-muted-foreground sm:px-8">
        <span>
          © {year} Ariyapong Wongmaneerat · Built with Next.js + MDX
        </span>
        <span className="hidden sm:inline">
          tip: press <kbd className="border border-rule px-1.5 py-0.5">j</kbd>/
          <kbd className="border border-rule px-1.5 py-0.5">k</kbd> to navigate posts
        </span>
      </div>
    </footer>
  );
}
