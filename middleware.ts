import { NextResponse, type NextRequest } from "next/server";

import { LANGS } from "@/lib/i18n";

// Bare paths are canonical English URLs and are rewritten internally to
// /en/<path> so a single set of route files under app/(styled)/[lang]/
// serves both bare and prefixed URLs. /en/... and /th/... pass through.
//
// /bio is intentionally outside the [lang] segment (its own root-level
// route, no shared layout). Skip it here.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /en/bio is outside the [lang] tree (bio lives at app/bio/), so strip /en
  // and let the bare /bio route handle it. Without this rule /en/bio would
  // 404 — the only asymmetry in the canonical-bare alias pattern.
  if (pathname === "/en/bio" || pathname.startsWith("/en/bio/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3);
    return NextResponse.rewrite(url);
  }

  if (pathname === "/bio" || pathname.startsWith("/bio/")) {
    return NextResponse.next();
  }

  for (const lang of LANGS) {
    if (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)) {
      return NextResponse.next();
    }
  }

  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? "/en" : `/en${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Exclude API, Next internals, static files, sitemap, robots, favicons,
    // and anything under /public that has a file extension.
    "/((?!api|_next/static|_next/image|sitemap.xml|robots.txt|favicon.ico|icon.png|.*\\..*).*)",
  ],
};
