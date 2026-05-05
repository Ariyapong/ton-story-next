import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { Eyebrow } from "@/components/eyebrow";
import { ReadingProgress } from "@/components/reading-progress";
import { getAdjacentPosts, getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog";
import { formatDateMono, formatReadingTime } from "@/lib/format";
import {
  LANGS,
  canonicalFor,
  getDict,
  hreflangAlternates,
  isLang,
  localizeHref,
  ogLocale,
} from "@/lib/i18n";

type Params = { lang: string; slug: string };

export function generateStaticParams() {
  return LANGS.flatMap((lang) =>
    getPostSlugs().map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const post = getPostBySlug(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  const url = canonicalFor(path, lang);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
      languages: hreflangAlternates(path),
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      locale: ogLocale(lang),
      publishedTime: post.date,
      authors: ["Ariyapong Wongmaneerat"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const dict = getDict(lang);

  const { prev, next } = getAdjacentPosts(slug);
  const related = getAllPosts()
    .filter((p) => p.slug !== slug && p.tags?.some((t) => post.tags?.includes(t)))
    .slice(0, 3);

  return (
    <>
      <ReadingProgress />
      <article className="grid grid-cols-1 gap-10 md:grid-cols-[140px_minmax(0,1fr)_160px] md:gap-12">
        <aside className="md:order-1">
          <div className="md:sticky md:top-24 md:space-y-5">
            {/* Mobile chip row */}
            <div className="flex flex-wrap gap-2 font-mono text-[10px] text-muted-foreground md:hidden">
              <span className="rounded-full border border-rule px-2 py-0.5">
                {formatDateMono(post.date)}
              </span>
              <span className="rounded-full border border-rule px-2 py-0.5">
                {formatReadingTime(post.readingTime.minutes)}
              </span>
              {post.tags?.map((t) => (
                <Link
                  key={t}
                  href={localizeHref(`/tags/${encodeURIComponent(t)}`, lang)}
                  className="rounded-full border border-rule px-2 py-0.5 hover:text-accent"
                >
                  #{t}
                </Link>
              ))}
            </div>
            <div className="hidden md:block">
              <Eyebrow className="mb-2">{dict.eyebrow.filed}</Eyebrow>
              <div className="font-mono text-[12px] leading-7">
                {post.tags?.map((t) => (
                  <Link
                    key={t}
                    href={localizeHref(`/tags/${encodeURIComponent(t)}`, lang)}
                    className="block hover:text-accent"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <Eyebrow className="mb-2">{dict.eyebrow.published}</Eyebrow>
              <div className="font-mono text-[12px]">
                {formatDateMono(post.date)}
              </div>
            </div>
            <div className="hidden md:block">
              <Eyebrow className="mb-2">{dict.eyebrow.reading}</Eyebrow>
              <div className="font-mono text-[12px]">
                {formatReadingTime(post.readingTime.minutes)}
              </div>
            </div>
            <div className="hidden md:block">
              <Link
                href={localizeHref("/blog", lang)}
                className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
              >
                {dict.nav.allPosts}
              </Link>
            </div>
          </div>
        </aside>

        <div className="min-w-0 max-w-[640px] md:order-2">
          <Link
            href={localizeHref("/blog", lang)}
            className="mb-3 inline-block font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground md:hidden"
          >
            {dict.nav.allPostsLong}
          </Link>
          <header className="space-y-2" lang={post.lang}>
            <h1 className="font-serif text-3xl font-medium leading-[1.05] tracking-tight md:text-[2.6rem]">
              {post.title}
            </h1>
          </header>
          <hr className="my-5 border-0 border-t border-rule" />
          <div className="prose-editorial max-w-none" lang={post.lang}>
            <MDXRemote
              source={post.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          <div className="mt-10 flex flex-wrap gap-2 border-t border-rule pt-5 font-mono text-[10px] text-muted-foreground">
            <CopyLink
              slug={post.slug}
              canonicalPath={canonicalFor(`/blog/${post.slug}`, lang)}
              copyLabel={dict.project.copyLink}
              copiedLabel={dict.project.copied}
            />
            <span className="ml-auto">j ↑ k ↓</span>
          </div>

          <nav className="mt-6 grid gap-3 border-t border-rule pt-5 sm:grid-cols-2">
            {prev ? (
              <Link
                href={localizeHref(`/blog/${prev.slug}`, lang)}
                className="hover-lift block rounded border border-rule p-3 hover:text-accent"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {dict.card.older}
                </div>
                <div lang={prev.lang} className="mt-1 font-serif text-sm">
                  {prev.title}
                </div>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={localizeHref(`/blog/${next.slug}`, lang)}
                className="hover-lift block rounded border border-rule p-3 text-right hover:text-accent"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {dict.card.newer}
                </div>
                <div lang={next.lang} className="mt-1 font-serif text-sm">
                  {next.title}
                </div>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>

        <aside className="md:order-3">
          <Eyebrow className="mb-2">{dict.eyebrow.related}</Eyebrow>
          <ul className="border-t border-rule">
            {related.length === 0 && (
              <li className="py-3 font-sans text-xs text-muted-foreground">
                {dict.empty.relatedPosts}
              </li>
            )}
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={localizeHref(`/blog/${p.slug}`, lang)}
                  data-post-row
                  className="hover-lift block border-b border-rule py-3 hover:text-accent focus:text-accent focus:outline-none"
                >
                  <div lang={p.lang} className="font-serif text-[13px] leading-[1.3]">
                    {p.title}
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                    {formatDateMono(p.date)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </article>
    </>
  );
}

function CopyLink({
  slug,
  canonicalPath,
  copyLabel,
  copiedLabel,
}: {
  slug: string;
  canonicalPath: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const id = `copy-${slug}`;
  const safeCopied = copiedLabel.replace(/'/g, "\\'");
  const script = `(function(){var b=document.getElementById('${id}');if(!b)return;b.addEventListener('click',function(){var u=window.location.origin+'${canonicalPath}';if(navigator.clipboard){navigator.clipboard.writeText(u);}var t=b.querySelector('span');if(t){var o=t.textContent;t.textContent='${safeCopied}';setTimeout(function(){t.textContent=o;},1400);}});})();`;
  return (
    <>
      <button
        id={id}
        type="button"
        className="rounded border border-rule px-2.5 py-1 hover:text-accent"
      >
        <span>{copyLabel}</span>
      </button>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
