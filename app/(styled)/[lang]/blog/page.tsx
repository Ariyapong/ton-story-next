import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Eyebrow } from "@/components/eyebrow";
import { getAllPosts } from "@/lib/blog";
import { formatDateMono, formatReadingTime } from "@/lib/format";
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
    title: dict.page.blogTitle,
    description: dict.page.blogDesc,
    alternates: {
      canonical: canonicalFor("/blog", lang),
      languages: hreflangAlternates("/blog"),
    },
    openGraph: { locale: ogLocale(lang) },
  };
}

export default async function BlogPage({
  params,
}: Readonly<{
  params: Promise<Params>;
}>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const dict = getDict(lang);
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <header className="flex items-baseline justify-between border-b border-rule pb-5">
        <div className="space-y-1">
          <Eyebrow>{dict.eyebrow.archive}</Eyebrow>
          <h1 className="font-serif text-4xl font-medium italic md:text-5xl">
            {dict.page.blogTitle}
          </h1>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          {dict.counter.entriesSorted(posts.length)}
        </div>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">{dict.empty.posts}</p>
      ) : (
        <ol>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={localizeHref(`/blog/${post.slug}`, lang)}
                data-post-row
                className="hover-lift grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b border-rule py-5 transition-colors hover:text-accent focus:text-accent focus:outline-none md:grid-cols-[100px_1fr_120px]"
              >
                <span className="order-2 flex items-baseline gap-2 font-mono text-[11px] text-muted-foreground md:order-1">
                  <span>{formatDateMono(post.date)}</span>
                  <span
                    className="rounded-full border border-rule px-1.5 py-px text-[9px] uppercase tracking-wide"
                    aria-label={`Language: ${post.lang.toUpperCase()}`}
                  >
                    {post.lang.toUpperCase()}
                  </span>
                </span>
                <span
                  lang={post.lang}
                  className="order-1 col-span-2 space-y-1.5 md:order-2 md:col-span-1"
                >
                  <span className="block font-serif text-xl leading-[1.2] md:text-[1.35rem]">
                    {post.title}
                  </span>
                  {post.excerpt && (
                    <span className="block font-sans text-[12px] leading-[1.55] text-muted-foreground">
                      {post.excerpt}
                    </span>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <span className="mt-1 flex flex-wrap gap-2.5 font-mono text-[10px] text-muted-foreground">
                      {post.tags.map((t) => (
                        <span key={t}>#{t}</span>
                      ))}
                    </span>
                  )}
                </span>
                <span className="order-3 text-right font-mono text-[10px] text-muted-foreground">
                  {formatReadingTime(post.readingTime.minutes)}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
