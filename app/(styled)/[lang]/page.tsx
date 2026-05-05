import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Eyebrow } from "@/components/eyebrow";
import { StickyNote } from "@/components/sticky-note";
import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import {
  canonicalFor,
  getDict,
  hreflangAlternates,
  isLang,
  localizeHref,
  ogLocale,
} from "@/lib/i18n";

type Params = { lang: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const dict = getDict(lang);
  return {
    title: lang === "th" ? "เกี่ยวกับ" : "About",
    description: dict.page.homeDesc,
    alternates: {
      canonical: canonicalFor("/", lang),
      languages: hreflangAlternates("/"),
    },
    openGraph: { locale: ogLocale(lang) },
  };
}

// Type "ttt" anywhere → a tiny coffee cup appears next to the quote.
// Mirrors the egg on /bio; same trigger, same payload, just on this page.
const easterEggScript = `
  (function () {
    var buf = '';
    document.addEventListener('keydown', function (e) {
      if (e.key && e.key.length === 1) buf = (buf + e.key).slice(-3);
      if (buf === 'ttt') {
        var q = document.getElementById('quote');
        if (q && !document.getElementById('cup')) {
          var s = document.createElement('span');
          s.id = 'cup';
          s.textContent = ' ☕';
          q.appendChild(s);
        }
      }
    });
  })();
`;

export default async function HomePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const dict = getDict(lang);
  const recentPosts = getAllPosts().slice(0, 3);
  const featured = getAllProjects(lang).filter((p) => p.featured);

  return (
    <div className="relative space-y-12">
      <StickyNote
        hint={
          <>
            (....: try typing <code className="font-mono">ttt</code> 😎)
          </>
        }
      >
        ☕ pour another.
      </StickyNote>

      <section className="space-y-3">
        <Eyebrow>{dict.eyebrow.vol}</Eyebrow>
        {lang === "th" ? (
          <h1 className="font-sans text-4xl font-medium leading-[1.1] tracking-tight text-balance md:text-6xl">
            สวัสดี ผมต้น
          </h1>
        ) : (
          <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-balance md:text-6xl">
            Hi, I&rsquo;m <em className="italic">Ton</em>.
          </h1>
        )}
        <p className="font-sans text-base text-muted-foreground md:text-lg">
          {dict.home.tagline}
        </p>
      </section>

      <section className="grid gap-10 border-t border-rule pt-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
        <div className="space-y-5">
          <p
            className={
              lang === "th"
                ? "font-sans text-[15px] leading-[1.78] text-foreground"
                : "dropcap font-serif text-lg leading-relaxed text-foreground"
            }
          >
            {dict.home.bioParagraph}
          </p>
          <dl className="grid grid-cols-2 gap-y-3 border-t border-rule pt-5 font-sans text-sm">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {dict.eyebrow.role}
            </dt>
            <dd>{dict.home.role}</dd>
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {dict.eyebrow.based}
            </dt>
            <dd>{dict.home.based}</dd>
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {dict.eyebrow.stack}
            </dt>
            <dd>{dict.home.stack}</dd>
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {dict.eyebrow.findMe}
            </dt>
            <dd className="space-x-3">
              <a
                href="https://github.com/Ariyapong"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-accent decoration-1 underline-offset-4 hover:text-accent"
              >
                github
              </a>
              <a
                href="mailto:ariyapong.ton@aritoton.com"
                className="underline decoration-accent decoration-1 underline-offset-4 hover:text-accent"
              >
                email
              </a>
              {/* medium like in bio page*/}
              <a
                href="https://medium.com/@ariyapong"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-accent decoration-1 underline-offset-4 hover:text-accent"
              >
                medium
              </a>
            </dd>
          </dl>
        </div>

        <aside className="border-t border-rule pt-6 md:border-l md:border-t-0 md:pl-7 md:pt-0">
          <Eyebrow>{dict.eyebrow.fromDesk}</Eyebrow>
          <blockquote
            id="quote"
            className={
              lang === "th"
                ? "mt-3 font-sans text-xl leading-[1.4]"
                : "mt-3 font-serif text-2xl italic leading-[1.3]"
            }
          >
            {lang === "th"
              ? dict.home.quote
              : `“${dict.home.quote}”`}
          </blockquote>
          <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {dict.home.houseRule}
          </div>
        </aside>
      </section>

      <section className="grid gap-10 border-t border-rule pt-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-serif text-xl font-medium italic">
              {dict.eyebrow.recent}
            </h2>
            <Link
              href={localizeHref("/blog", lang)}
              className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
            >
              {dict.nav.all}
            </Link>
          </div>
          <ol className="border-t border-rule">
            {recentPosts.map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={localizeHref(`/blog/${p.slug}`, lang)}
                  data-post-row
                  className="hover-lift grid grid-cols-[34px_1fr_64px] items-baseline gap-3 border-b border-dashed border-rule py-3 hover:text-accent focus:text-accent focus:outline-none"
                >
                  <span className="font-mono text-[10px] text-muted-foreground">
                    №{String(i + 1).padStart(2, "0")}
                  </span>
                  <span lang={p.lang} className="space-y-0.5">
                    <span className="block font-serif text-base leading-[1.25]">
                      {p.title}
                    </span>
                    {p.excerpt && (
                      <span className="block font-sans text-[11px] text-muted-foreground">
                        {p.excerpt}
                      </span>
                    )}
                  </span>
                  <span className="text-right font-mono text-[10px] text-muted-foreground">
                    {p.readingTime.minutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <aside>
          <Eyebrow className="mb-3">{dict.eyebrow.featured}</Eyebrow>
          <ul className="border-t border-rule">
            {featured.map((p) => {
              return (
                <li key={p.slug}>
                  <Link
                    href={localizeHref(`/projects/${p.slug}`, lang)}
                    className="hover-lift flex border-b border-rule py-3 hover:text-accent"
                  >
                    <span
                      className="mr-4 w-1 self-stretch bg-stripe"
                      aria-hidden="true"
                    />
                    <span className="space-y-1">
                      <span className="block font-serif text-base font-medium">
                        {p.title}{" "}
                        {p.year && (
                          <span className="ml-1 font-mono text-[10px] text-muted-foreground">
                            &rsquo;{p.year}
                          </span>
                        )}
                      </span>
                      <span className="block font-sans text-[12px] leading-[1.45] text-muted-foreground">
                        {p.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </section>

      <section className="border-t border-rule pt-10 font-sans text-sm leading-[1.7] text-muted-foreground">
        <Eyebrow className="mb-2">{dict.eyebrow.footnote}</Eyebrow>
        <p>{dict.home.footnoteIntro}</p>
        <p className="mt-3">{dict.home.footnoteDrink}</p>
      </section>


      <script dangerouslySetInnerHTML={{ __html: easterEggScript }} />
    </div>
  );
}
