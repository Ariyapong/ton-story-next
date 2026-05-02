"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV: { href: string; en: string; th: string }[] = [
  { href: "/", en: "Home", th: "หน้าแรก" },
  { href: "/blog", en: "Blog", th: "บล็อก" },
  { href: "/projects", en: "Projects", th: "ผลงาน" },
  { href: "/tags", en: "Tags", th: "แท็ก" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname() ?? "/";

  return (
    <header className="theme-fade sticky top-0 z-40 w-full border-b border-rule bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-baseline justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-baseline gap-2 hover-lift">
          <span className="font-serif text-xl italic">Ton Story</span>
          <span className="font-sans text-sm text-muted-foreground">· ต้นสตอรี่</span>
        </Link>

        <nav className="hidden items-baseline gap-6 md:flex">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            const className = cn(
              "hover-lift font-sans text-[11px] uppercase tracking-[0.18em]",
              active
                ? "border-b border-foreground pb-1 text-foreground"
                : "text-muted-foreground hover:text-foreground",
            );
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.th}
                className={className}
              >
                {item.en}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

function MobileNav({ pathname }: { pathname: string }) {
  return (
    <details className="relative md:hidden">
      <summary
        aria-label="Open navigation"
        className="flex h-6 w-6 cursor-pointer list-none items-center justify-center"
      >
        <span className="flex h-3.5 w-5 flex-col justify-between">
          <span className="block h-px bg-foreground" />
          <span className="ml-auto block h-px w-3 bg-foreground" />
          <span className="block h-px bg-foreground" />
        </span>
      </summary>
      <ul className="absolute right-0 mt-3 min-w-44 rounded-md border border-rule bg-card p-2 shadow-lg">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          const className = cn(
            "flex items-baseline justify-between gap-3 rounded px-2 py-1.5 font-sans text-[11px] uppercase tracking-[0.18em]",
            active
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          );
          return (
            <li key={item.href}>
              <Link href={item.href} className={className}>
                <span>{item.en}</span>
                <span className="text-[10px] normal-case tracking-normal text-muted-foreground">
                  {item.th}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
